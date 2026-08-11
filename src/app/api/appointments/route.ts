/**
 * Appointments API Route
 * Handles creating, updating appointments with Google Calendar & Email integration
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createCalendarEvent, isCalendarEnabled } from '@/lib/google-calendar';
import { sendBookingEmails, isEmailEnabled } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const patientId = searchParams.get('patientId');
    const doctorId = searchParams.get('doctorId');
    const status = searchParams.get('status');

    const where: any = {};
    if (patientId) where.patientId = patientId;
    if (doctorId) where.doctorId = doctorId;
    if (status) where.status = status;

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            specialization: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
        service: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      patientId,
      doctorId,
      serviceId,
      date,
      startTime,
      endTime,
      notes,
      reason,
    } = body;

    // Validate required fields
    if (!patientId || !doctorId || !serviceId || !date || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get patient, doctor, and service details
    const [patient, doctor, service] = await Promise.all([
      prisma.patient.findUnique({
        where: { id: patientId },
        include: {
          user: {
            select: { email: true },
          },
        },
      }),
      prisma.doctor.findUnique({
        where: { id: doctorId },
        include: {
          user: {
            select: { email: true },
          },
        },
      }),
      prisma.service.findUnique({
        where: { id: serviceId },
      }),
    ]);

    if (!patient || !doctor || !service) {
      return NextResponse.json(
        { error: 'Invalid patient, doctor, or service ID' },
        { status: 400 }
      );
    }

    // Check for conflicting appointments
    const appointmentDate = new Date(date);
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId,
        date: appointmentDate,
        startTime,
        status: {
          not: 'CANCELLED',
        },
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'Doctor is not available at this time' },
        { status: 409 }
      );
    }

    // Create Google Calendar event if enabled
    let googleCalendarId: string | null = null;
    if (isCalendarEnabled()) {
      try {
        googleCalendarId = await createCalendarEvent({
          patientName: `${patient.firstName} ${patient.lastName}`,
          patientEmail: patient.user.email,
          patientPhone: patient.phone,
          doctorName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
          doctorEmail: doctor.user.email,
          serviceName: service.name,
          date: appointmentDate,
          startTime,
          endTime,
          notes,
          reason,
        });
        console.log('Google Calendar event created:', googleCalendarId);
      } catch (error) {
        console.error('Failed to create calendar event:', error);
        // Continue without calendar event - don't fail the appointment
      }
    }

    // Create appointment in database
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        serviceId,
        date: appointmentDate,
        startTime,
        endTime,
        status: 'PENDING',
        notes,
        reason,
        googleCalendarId,
        confirmationSent: false,
        reminderSent: false,
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            user: {
              select: { email: true },
            },
          },
        },
        doctor: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
    });

    // Send confirmation emails to patient AND doctor
    if (isEmailEnabled()) {
      try {
        const emails = await sendBookingEmails({
          patientName: `${patient.firstName} ${patient.lastName}`,
          patientEmail: patient.user.email,
          patientPhone: patient.phone,
          doctorName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
          doctorEmail: doctor.user.email,
          serviceName: service.name,
          date: appointmentDate,
          startTime,
          notes: notes || undefined,
        });

        if (emails.patientSent || emails.doctorSent) {
          await prisma.appointment.update({
            where: { id: appointment.id },
            data: { confirmationSent: true },
          });
        }

        console.log('Confirmation emails:', emails);
      } catch (error) {
        console.error('Failed to send confirmation email:', error);
      }
    }

    // Create notification for patient
    await prisma.notification.create({
      data: {
        userId: patientId,
        title: 'Appointment Confirmed',
        message: `Your appointment with Dr. ${doctor.firstName} ${doctor.lastName} on ${appointmentDate.toLocaleDateString()} at ${startTime} has been confirmed.`,
        type: 'appointment',
        link: `/patient/dashboard`,
      },
    });

    return NextResponse.json(
      {
        appointment,
        message: 'Appointment created successfully',
        calendarCreated: !!googleCalendarId,
        emailSent: appointment.confirmationSent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}
