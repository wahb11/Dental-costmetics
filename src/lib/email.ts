/**
 * Email Service
 * Handles sending emails via SMTP (Gmail) or alternative services
 */

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// Email templates
export interface EmailTemplate {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

// Create SMTP transporter
let transporter: Transporter | null = null;

const getTransporter = (): Transporter => {
  if (transporter) return transporter;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error('SMTP credentials not configured');
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
};

/**
 * Send email
 */
export async function sendEmail(options: EmailTemplate): Promise<boolean> {
  try {
    if (process.env.ENABLE_EMAIL_NOTIFICATIONS !== 'true') {
      console.log('Email notifications disabled');
      return false;
    }

    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@smilesync.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      replyTo: process.env.EMAIL_REPLY_TO,
    });

    console.log('Email sent successfully to:', options.to);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Email Templates

/**
 * Appointment Confirmation Email
 */
export async function sendAppointmentConfirmation(data: {
  patientName: string;
  patientEmail: string;
  doctorName: string;
  serviceName: string;
  date: Date;
  startTime: string;
  location: string;
}) {
  const formattedDate = data.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
    .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: bold; color: #667eea; }
    .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🦷 Appointment Confirmed!</h1>
    </div>
    <div class="content">
      <p>Dear ${data.patientName},</p>
      <p>Your appointment at <strong>${process.env.NEXT_PUBLIC_APP_NAME || 'SmileSync Dental Clinic'}</strong> has been confirmed.</p>
      
      <div class="appointment-details">
        <h3>Appointment Details</h3>
        <div class="detail-row">
          <span class="detail-label">Date:</span> ${formattedDate}
        </div>
        <div class="detail-row">
          <span class="detail-label">Time:</span> ${data.startTime}
        </div>
        <div class="detail-row">
          <span class="detail-label">Doctor:</span> ${data.doctorName}
        </div>
        <div class="detail-row">
          <span class="detail-label">Service:</span> ${data.serviceName}
        </div>
        <div class="detail-row">
          <span class="detail-label">Location:</span> ${data.location}
        </div>
      </div>

      <p><strong>Important Reminders:</strong></p>
      <ul>
        <li>Please arrive 10 minutes before your scheduled time</li>
        <li>Bring your insurance card and valid ID</li>
        <li>If you need to reschedule, please contact us at least 24 hours in advance</li>
      </ul>

      <center>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/patient/dashboard" class="button">View in Dashboard</a>
      </center>

      <p>If you have any questions, feel free to contact us at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@smilesync.com'}</p>
      
      <p>Looking forward to seeing you!<br>
      <strong>The SmileSync Team</strong></p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_APP_NAME || 'SmileSync'}. All rights reserved.</p>
      <p>This email was sent to ${data.patientEmail}</p>
    </div>
  </div>
</body>
</html>
  `;

  return await sendEmail({
    to: data.patientEmail,
    subject: `Appointment Confirmed - ${formattedDate} at ${data.startTime}`,
    html,
  });
}

/**
 * Appointment Reminder Email
 */
export async function sendAppointmentReminder(data: {
  patientName: string;
  patientEmail: string;
  doctorName: string;
  serviceName: string;
  date: Date;
  startTime: string;
  location: string;
}) {
  const formattedDate = data.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .reminder-box { background: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: bold; color: #f5576c; }
    .button { display: inline-block; padding: 12px 30px; background: #f5576c; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⏰ Appointment Reminder</h1>
    </div>
    <div class="content">
      <div class="reminder-box">
        <h3 style="margin-top:0;">📅 Your appointment is coming up!</h3>
        <p style="margin-bottom:0;">This is a friendly reminder about your upcoming appointment.</p>
      </div>

      <p>Dear ${data.patientName},</p>
      
      <div class="appointment-details">
        <h3>Appointment Details</h3>
        <div class="detail-row">
          <span class="detail-label">Date:</span> ${formattedDate}
        </div>
        <div class="detail-row">
          <span class="detail-label">Time:</span> ${data.startTime}
        </div>
        <div class="detail-row">
          <span class="detail-label">Doctor:</span> ${data.doctorName}
        </div>
        <div class="detail-row">
          <span class="detail-label">Service:</span> ${data.serviceName}
        </div>
        <div class="detail-row">
          <span class="detail-label">Location:</span> ${data.location}
        </div>
      </div>

      <p><strong>Before Your Visit:</strong></p>
      <ul>
        <li>Complete any pre-appointment forms in your patient portal</li>
        <li>Prepare a list of any medications you're currently taking</li>
        <li>Note any concerns or questions you'd like to discuss</li>
      </ul>

      <center>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/patient/dashboard" class="button">Confirm Appointment</a>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments/reschedule" class="button" style="background:#6c757d;">Reschedule</a>
      </center>

      <p>See you soon!<br>
      <strong>The SmileSync Team</strong></p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_APP_NAME || 'SmileSync'}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  return await sendEmail({
    to: data.patientEmail,
    subject: `Reminder: Upcoming Appointment - ${formattedDate} at ${data.startTime}`,
    html,
  });
}

/**
 * Appointment Cancellation Email
 */
export async function sendAppointmentCancellation(data: {
  patientName: string;
  patientEmail: string;
  doctorName: string;
  serviceName: string;
  date: Date;
  startTime: string;
  reason?: string;
}) {
  const formattedDate = data.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .cancellation-box { background: #fee; border: 2px solid #c92a2a; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>❌ Appointment Cancelled</h1>
    </div>
    <div class="content">
      <div class="cancellation-box">
        <h3 style="margin-top:0; color:#c92a2a;">Your appointment has been cancelled</h3>
        ${data.reason ? `<p><strong>Reason:</strong> ${data.reason}</p>` : ''}
      </div>

      <p>Dear ${data.patientName},</p>
      <p>This is to confirm that your appointment has been cancelled.</p>
      
      <div class="appointment-details">
        <h3>Cancelled Appointment</h3>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${data.startTime}</p>
        <p><strong>Doctor:</strong> ${data.doctorName}</p>
        <p><strong>Service:</strong> ${data.serviceName}</p>
      </div>

      <p>We'd love to see you again! You can book a new appointment at your convenience.</p>

      <center>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments/book" class="button">Book New Appointment</a>
      </center>

      <p>If you have any questions, please contact us at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@smilesync.com'}</p>
      
      <p>Best regards,<br>
      <strong>The SmileSync Team</strong></p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_APP_NAME || 'SmileSync'}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  return await sendEmail({
    to: data.patientEmail,
    subject: `Appointment Cancelled - ${formattedDate} at ${data.startTime}`,
    html,
  });
}

/**
 * Welcome Email for New Patients
 */
export async function sendWelcomeEmail(data: {
  patientName: string;
  patientEmail: string;
}) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🦷 Welcome to SmileSync!</h1>
    </div>
    <div class="content">
      <p>Dear ${data.patientName},</p>
      <p>Welcome to ${process.env.NEXT_PUBLIC_APP_NAME || 'SmileSync Dental Clinic'}! We're excited to have you as part of our dental family.</p>
      
      <p>Your account has been successfully created. You can now:</p>
      <ul>
        <li>📅 Book appointments online</li>
        <li>📊 View your medical records</li>
        <li>💊 Access prescriptions</li>
        <li>💳 Manage payments and invoices</li>
        <li>📧 Communicate with our team</li>
      </ul>

      <center>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/patient/dashboard" class="button">Go to Dashboard</a>
      </center>

      <p>If you have any questions, our support team is here to help at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@smilesync.com'}</p>
      
      <p>Best regards,<br>
      <strong>The SmileSync Team</strong></p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_APP_NAME || 'SmileSync'}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  return await sendEmail({
    to: data.patientEmail,
    subject: `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME || 'SmileSync'}!`,
    html,
  });
}

/**
 * Check if email service is enabled
 */
export function isEmailEnabled(): boolean {
  return process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true' &&
    !!process.env.SMTP_HOST &&
    !!process.env.SMTP_USER &&
    !!process.env.SMTP_PASSWORD;
}
