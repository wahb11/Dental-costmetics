/**
 * Individual Appointment API Route
 * Handles updating and cancelling appointments with Google Calendar & Email
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  updateCalendarEvent,
  cancelCalendarEvent,
  isCalendarEnabled,
} from '@/lib/google-calendar';
import { sendAppointmentCancellation, isEmailEnabled } from '@/lib/email';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
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
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointment' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, date, startTime, endTime, notes, cancellationNote } = body;

    // Get existing appointment
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: {
        patient: {
          include: {
            user: {
              select: { email: true },
            },
          },
        },
        doctor: {
          include: {
            user: {
              select: { email: true },
            },
          },
        },
        service: true,
      },
    });

    if (!existingAppointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Handle cancellation
    if (status === 'CANCELLED') {
      // Cancel Google Calendar event if exists
      if (
        existingAppointment.googleCalendarId &&
        isCalendarEnabled()
      ) {
        try {
          await cancelCalendarEvent(existingAppointment.googleCalendarId);
          console.log(
            'Google Calendar event cancelled:',
            existingAppointment.googleCalendarId
          );
        } catch (error) {
          console.error('Failed to cancel calendar event:', error);
        }
      }

      // Update appointment
      const updatedAppointment = await prisma.appointment.update({
        where: { id: params.id },
        data: {
          status: 'CANCELLED',
          cancellationNote,
        },
      });

      // Send cancellation email
      if (isEmailEnabled()) {
        try {
          await sendAppointmentCancellation({
            patientName: `${existingAppointment.patient.firstName} ${existingAppointment.patient.lastName}`,
            patientEmail: existingAppointment.patient.user.email,
            doctorName: `Dr. ${existingAppointment.doctor.firstName} ${existingAppointment.doctor.lastName}`,
            serviceName: existingAppointment.service.name,
            date: existingAppointment.date,
            startTime: existingAppointment.startTime,
            reason: cancellationNote,
          });
          console.log(
            'Cancellation email sent to:',
            existingAppointment.patient.user.email
          );
        } catch (error) {
          console.error('Failed to send cancellation email:', error);
        }
      }

      // Create notification
      await prisma.notification.create({
        data: {
          userId: existingAppointment.patientId,
          title: 'Appointment Cancelled',
          message: `Your appointment on ${existingAppointment.date.toLocaleDateString()} at ${
            existingAppointment.startTime
          } has been cancelled.`,
          type: 'appointment',
          link: `/patient/dashboard`,
        },
      });

      return NextResponse.json({
        appointment: updatedAppointment,
        message: 'Appointment cancelled successfully',
      });
    }

    // Handle rescheduling
    if (date || startTime || endTime) {
      const newDate = date ? new Date(date) : existingAppointment.date;
      const newStartTime = startTime || existingAppointment.startTime;
      const newEndTime = endTime || existingAppointment.endTime;

      // Check for conflicts
      const conflictingAppointment = await prisma.appointment.findFirst({
        where: {
          id: { not: params.id },
          doctorId: existingAppointment.doctorId,
          date: newDate,
          startTime: newStartTime,
          status: {
            not: 'CANCELLED',
          },
        },
      });

      if (conflictingAppointment) {
        return NextResponse.json(
          { error: 'Doctor is not available at this time' },
          { status: 409 }
        );
      }

      // Update Google Calendar event if exists
      if (
        existingAppointment.googleCalendarId &&
        isCalendarEnabled()
      ) {
        try {
          await updateCalendarEvent(existingAppointment.googleCalendarId, {
            patientName: `${existingAppointment.patient.firstName} ${existingAppointment.patient.lastName}`,
            patientEmail: existingAppointment.patient.user.email,
            patientPhone: existingAppointment.patient.phone,
            doctorName: `Dr. ${existingAppointment.doctor.firstName} ${existingAppointment.doctor.lastName}`,
            doctorEmail: existingAppointment.doctor.user.email,
            serviceName: existingAppointment.service.name,
            date: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            notes,
          });
          console.log(
            'Google Calendar event updated:',
            existingAppointment.googleCalendarId
          );
        } catch (error) {
          console.error('Failed to update calendar event:', error);
        }
      }
    }

    // Update appointment
    const updatedAppointment = await prisma.appointment.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(date && { date: new Date(date) }),
        ...(startTime && { startTime }),
        ...(endTime && { endTime }),
        ...(notes && { notes }),
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
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

    return NextResponse.json({
      appointment: updatedAppointment,
      message: 'Appointment updated successfully',
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get appointment
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Cancel Google Calendar event if exists
    if (appointment.googleCalendarId && isCalendarEnabled()) {
      try {
        await cancelCalendarEvent(appointment.googleCalendarId);
      } catch (error) {
        console.error('Failed to cancel calendar event:', error);
      }
    }

    // Delete appointment
    await prisma.appointment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: 'Appointment deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    );
  }
}
