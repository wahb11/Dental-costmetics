/**
 * Cron Job: Send Appointment Reminders
 * Runs daily to send reminder emails for upcoming appointments
 * 
 * Set up in production with:
 * - Vercel Cron Jobs (vercel.json)
 * - Or external cron service hitting this endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendAppointmentReminder, isEmailEnabled } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isEmailEnabled()) {
      return NextResponse.json(
        { message: 'Email notifications are disabled' },
        { status: 200 }
      );
    }

    // Get tomorrow's date (for 24-hour reminders)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    // Find appointments scheduled for tomorrow that haven't received reminder
    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: tomorrow,
          lt: dayAfter,
        },
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
        reminderSent: false,
      },
      include: {
        patient: {
          include: {
            user: {
              select: {
                email: true,
              },
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

    const results = {
      total: appointments.length,
      sent: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Send reminder emails
    for (const appointment of appointments) {
      try {
        const emailSent = await sendAppointmentReminder({
          patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
          patientEmail: appointment.patient.user.email,
          doctorName: `Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
          serviceName: appointment.service.name,
          date: appointment.date,
          startTime: appointment.startTime,
          location:
            process.env.NEXT_PUBLIC_APP_NAME || 'SmileSync Dental Clinic',
        });

        if (emailSent) {
          // Mark reminder as sent
          await prisma.appointment.update({
            where: { id: appointment.id },
            data: { reminderSent: true },
          });

          // Create notification
          await prisma.notification.create({
            data: {
              userId: appointment.patientId,
              title: 'Appointment Reminder',
              message: `Reminder: Your appointment is tomorrow at ${appointment.startTime}`,
              type: 'appointment',
              link: `/patient/dashboard`,
            },
          });

          results.sent++;
          console.log(
            `✅ Reminder sent for appointment ${appointment.id} to ${appointment.patient.user.email}`
          );
        } else {
          results.failed++;
          results.errors.push(
            `Failed to send reminder for appointment ${appointment.id}`
          );
        }
      } catch (error) {
        results.failed++;
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        results.errors.push(
          `Error for appointment ${appointment.id}: ${errorMessage}`
        );
        console.error(
          `❌ Failed to send reminder for appointment ${appointment.id}:`,
          error
        );
      }
    }

    console.log(
      `📧 Appointment Reminders: ${results.sent} sent, ${results.failed} failed out of ${results.total}`
    );

    return NextResponse.json({
      success: true,
      message: 'Reminders processed',
      results,
    });
  } catch (error) {
    console.error('Error in send-reminders cron job:', error);
    return NextResponse.json(
      {
        error: 'Failed to process reminders',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Allow POST as well for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}
