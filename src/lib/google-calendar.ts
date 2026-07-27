/**
 * Google Calendar Integration Service
 * Handles creating, updating, and deleting calendar events for appointments
 */

import { google } from 'googleapis';
import type { calendar_v3 } from 'googleapis';

// Initialize OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// For service account authentication (recommended for server-side)
const getServiceAccountAuth = () => {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Google Service Account credentials not configured');
  }

  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
};

// Get Calendar API instance
const getCalendar = () => {
  const auth = getServiceAccountAuth();
  return google.calendar({ version: 'v3', auth });
};

export interface AppointmentData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorName: string;
  doctorEmail: string;
  serviceName: string;
  date: Date;
  startTime: string;
  endTime: string;
  notes?: string;
  reason?: string;
}

/**
 * Create a calendar event for an appointment
 */
export async function createCalendarEvent(data: AppointmentData): Promise<string> {
  try {
    const calendar = getCalendar();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    // Parse date and time
    const appointmentDate = new Date(data.date);
    const [startHours, startMinutes] = data.startTime.split(':');
    const [endHours, endMinutes] = data.endTime.split(':');

    const startDateTime = new Date(appointmentDate);
    startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0);

    const endDateTime = new Date(appointmentDate);
    endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 0);

    // Create event
    const event: calendar_v3.Schema$Event = {
      summary: `${data.serviceName} - ${data.patientName}`,
      description: `
Appointment Details:
- Patient: ${data.patientName}
- Phone: ${data.patientPhone}
- Doctor: ${data.doctorName}
- Service: ${data.serviceName}
${data.reason ? `- Reason: ${data.reason}` : ''}
${data.notes ? `- Notes: ${data.notes}` : ''}

Powered by SmileSync Dental Clinic
      `.trim(),
      location: process.env.NEXT_PUBLIC_APP_NAME || 'SmileSync Dental Clinic',
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: process.env.NEXT_PUBLIC_TIMEZONE || 'America/New_York',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: process.env.NEXT_PUBLIC_TIMEZONE || 'America/New_York',
      },
      attendees: [
        { email: data.patientEmail, displayName: data.patientName },
        { email: data.doctorEmail, displayName: data.doctorName },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'email', minutes: 60 }, // 1 hour before
          { method: 'popup', minutes: 30 }, // 30 minutes before
        ],
      },
      colorId: '5', // Yellow color for appointments
      status: 'confirmed',
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: 'all', // Send email notifications to attendees
    });

    if (!response.data.id) {
      throw new Error('Failed to create calendar event');
    }

    return response.data.id;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw new Error(`Failed to create calendar event: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Update a calendar event
 */
export async function updateCalendarEvent(
  eventId: string,
  data: Partial<AppointmentData>
): Promise<void> {
  try {
    const calendar = getCalendar();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    // Get existing event
    const existingEvent = await calendar.events.get({
      calendarId,
      eventId,
    });

    if (!existingEvent.data) {
      throw new Error('Event not found');
    }

    // Update event fields
    const updates: calendar_v3.Schema$Event = { ...existingEvent.data };

    if (data.patientName || data.serviceName) {
      updates.summary = `${data.serviceName || 'Appointment'} - ${data.patientName || 'Patient'}`;
    }

    if (data.date && data.startTime && data.endTime) {
      const appointmentDate = new Date(data.date);
      const [startHours, startMinutes] = data.startTime.split(':');
      const [endHours, endMinutes] = data.endTime.split(':');

      const startDateTime = new Date(appointmentDate);
      startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0);

      const endDateTime = new Date(appointmentDate);
      endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 0);

      updates.start = {
        dateTime: startDateTime.toISOString(),
        timeZone: process.env.NEXT_PUBLIC_TIMEZONE || 'America/New_York',
      };

      updates.end = {
        dateTime: endDateTime.toISOString(),
        timeZone: process.env.NEXT_PUBLIC_TIMEZONE || 'America/New_York',
      };
    }

    await calendar.events.update({
      calendarId,
      eventId,
      requestBody: updates,
      sendUpdates: 'all',
    });
  } catch (error) {
    console.error('Error updating calendar event:', error);
    throw new Error(`Failed to update calendar event: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Cancel a calendar event
 */
export async function cancelCalendarEvent(eventId: string): Promise<void> {
  try {
    const calendar = getCalendar();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: 'all', // Notify attendees
    });
  } catch (error) {
    console.error('Error canceling calendar event:', error);
    throw new Error(`Failed to cancel calendar event: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get a calendar event
 */
export async function getCalendarEvent(eventId: string) {
  try {
    const calendar = getCalendar();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    const response = await calendar.events.get({
      calendarId,
      eventId,
    });

    return response.data;
  } catch (error) {
    console.error('Error getting calendar event:', error);
    return null;
  }
}

/**
 * Check if calendar integration is enabled
 */
export function isCalendarEnabled(): boolean {
  return process.env.ENABLE_GOOGLE_CALENDAR === 'true' &&
    !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    !!process.env.GOOGLE_PRIVATE_KEY;
}
