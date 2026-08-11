/**
 * Email Service — SMTP (your Gmail / personal email)
 * Sends booking confirmations + reminders to patients AND doctors.
 */

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

export interface EmailTemplate {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

let transporter: Transporter | null = null;

const getTransporter = (): Transporter => {
  if (transporter) return transporter;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error("SMTP credentials not configured");
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
};

export function isEmailEnabled(): boolean {
  return (
    process.env.ENABLE_EMAIL_NOTIFICATIONS === "true" &&
    !!process.env.SMTP_HOST &&
    !!process.env.SMTP_USER &&
    !!process.env.SMTP_PASSWORD
  );
}

export async function sendEmail(options: EmailTemplate): Promise<boolean> {
  try {
    if (!isEmailEnabled()) {
      console.log("[email] skipped (ENABLE_EMAIL_NOTIFICATIONS or SMTP not set)");
      return false;
    }

    const mailer = getTransporter();
    await mailer.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ""),
      replyTo: process.env.EMAIL_REPLY_TO || process.env.SMTP_USER,
    });

    console.log("[email] sent to:", options.to);
    return true;
  } catch (error) {
    console.error("[email] send failed:", error);
    return false;
  }
}

function formatDate(date: Date | string) {
  const isDateOnly = typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date);
  const value = isDateOnly
    ? new Date(`${date}T00:00:00Z`)
    : date instanceof Date
      ? date
      : new Date(date);

  return value.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    // A database `date` is a calendar date, not a moment in time. Formatting
    // it in UTC prevents timezone conversion from moving it to the prior day.
    timeZone: isDateOnly
      ? "UTC"
      : process.env.NEXT_PUBLIC_TIMEZONE || "America/New_York",
  });
}

function clinicName() {
  return process.env.NEXT_PUBLIC_APP_NAME || "SmileSync Dental Clinic";
}

function clinicAddress() {
  return process.env.CLINIC_ADDRESS || "Our clinic";
}

function supportEmail() {
  return process.env.NEXT_PUBLIC_SUPPORT_EMAIL || process.env.SMTP_USER || "support@smilesync.com";
}

function baseLayout(opts: {
  title: string;
  headerColor: string;
  body: string;
  footerNote?: string;
}) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; background: #f1f5f9; }
    .container { max-width: 600px; margin: 24px auto; padding: 0 16px; }
    .header { background: ${opts.headerColor}; color: white; padding: 28px 24px; text-align: center; border-radius: 12px 12px 0 0; }
    .content { background: #fff; padding: 28px 24px; border-radius: 0 0 12px 12px; }
    .box { background: #f8fafc; padding: 16px 18px; border-radius: 8px; margin: 18px 0; border-left: 4px solid #0284c7; }
    .row { padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
    .label { font-weight: 700; color: #0369a1; display: inline-block; min-width: 90px; }
    .footer { text-align: center; padding: 16px; color: #64748b; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1 style="margin:0;font-size:22px;">${opts.title}</h1></div>
    <div class="content">${opts.body}</div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} ${clinicName()}. All rights reserved.</p>
      ${opts.footerNote ? `<p>${opts.footerNote}</p>` : ""}
    </div>
  </div>
</body>
</html>`;
}

function detailsBox(rows: Array<[string, string]>) {
  return `<div class="box">${rows
    .map(
      ([label, value]) =>
        `<div class="row"><span class="label">${label}</span> ${value}</div>`
    )
    .join("")}</div>`;
}

export type AppointmentEmailData = {
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
  doctorName: string;
  doctorEmail: string;
  serviceName: string;
  date: Date | string;
  startTime: string;
  notes?: string;
};

/** Confirmation to patient + doctor after booking */
export async function sendBookingEmails(data: AppointmentEmailData) {
  const when = formatDate(data.date);
  const location = clinicAddress();

  const patientHtml = baseLayout({
    title: "🦷 Appointment Confirmed",
    headerColor: "linear-gradient(135deg,#0369a1,#0ea5e9)",
    footerNote: `Sent to ${data.patientEmail}`,
    body: `
      <p>Hi ${data.patientName},</p>
      <p>Your appointment at <strong>${clinicName()}</strong> is confirmed.</p>
      ${detailsBox([
        ["Date", when],
        ["Time", data.startTime],
        ["Doctor", data.doctorName],
        ["Service", data.serviceName],
        ["Location", location],
      ])}
      <p><strong>Please remember:</strong></p>
      <ul>
        <li>Arrive 10 minutes early</li>
        <li>Bring your ID and insurance card</li>
        <li>Reply to this email or call us to reschedule (24h notice preferred)</li>
      </ul>
      <p>Questions? Contact us at ${supportEmail()}</p>
      <p>See you soon,<br/><strong>${clinicName()}</strong></p>
    `,
  });

  const doctorHtml = baseLayout({
    title: "📋 New Appointment Booked",
    headerColor: "linear-gradient(135deg,#0f766e,#14b8a6)",
    footerNote: `Sent to ${data.doctorEmail}`,
    body: `
      <p>Hi ${data.doctorName},</p>
      <p>A new appointment has been booked with you.</p>
      ${detailsBox([
        ["Patient", data.patientName],
        ["Email", data.patientEmail],
        ["Phone", data.patientPhone || "—"],
        ["Date", when],
        ["Time", data.startTime],
        ["Service", data.serviceName],
        ["Notes", data.notes || "—"],
      ])}
      <p>Please review your schedule and prepare accordingly.</p>
      <p>— ${clinicName()}</p>
    `,
  });

  const [patientSent, doctorSent] = await Promise.all([
    sendEmail({
      to: data.patientEmail,
      subject: `Appointment Confirmed — ${when} at ${data.startTime}`,
      html: patientHtml,
    }),
    sendEmail({
      to: data.doctorEmail,
      subject: `New Booking — ${data.patientName} on ${when} at ${data.startTime}`,
      html: doctorHtml,
    }),
  ]);

  return { patientSent, doctorSent };
}

/** Reminder to patient + doctor (e.g. 24h before) */
export async function sendReminderEmails(data: AppointmentEmailData) {
  const when = formatDate(data.date);
  const location = clinicAddress();

  const patientHtml = baseLayout({
    title: "⏰ Appointment Reminder",
    headerColor: "linear-gradient(135deg,#c2410c,#f97316)",
    body: `
      <p>Hi ${data.patientName},</p>
      <p>This is a friendly reminder about your upcoming appointment.</p>
      ${detailsBox([
        ["Date", when],
        ["Time", data.startTime],
        ["Doctor", data.doctorName],
        ["Service", data.serviceName],
        ["Location", location],
      ])}
      <p>If you need to reschedule, reply to this email or contact ${supportEmail()}.</p>
      <p>— ${clinicName()}</p>
    `,
  });

  const doctorHtml = baseLayout({
    title: "⏰ Upcoming Appointment Reminder",
    headerColor: "linear-gradient(135deg,#7c2d12,#ea580c)",
    body: `
      <p>Hi ${data.doctorName},</p>
      <p>Reminder: you have an appointment coming up.</p>
      ${detailsBox([
        ["Patient", data.patientName],
        ["Email", data.patientEmail],
        ["Phone", data.patientPhone || "—"],
        ["Date", when],
        ["Time", data.startTime],
        ["Service", data.serviceName],
      ])}
      <p>— ${clinicName()}</p>
    `,
  });

  const [patientSent, doctorSent] = await Promise.all([
    sendEmail({
      to: data.patientEmail,
      subject: `Reminder: Appointment ${when} at ${data.startTime}`,
      html: patientHtml,
    }),
    sendEmail({
      to: data.doctorEmail,
      subject: `Reminder: ${data.patientName} — ${when} at ${data.startTime}`,
      html: doctorHtml,
    }),
  ]);

  return { patientSent, doctorSent };
}

/** @deprecated use sendBookingEmails — kept for older API routes */
export async function sendAppointmentConfirmation(data: {
  patientName: string;
  patientEmail: string;
  doctorName: string;
  serviceName: string;
  date: Date;
  startTime: string;
  location: string;
  doctorEmail?: string;
  patientPhone?: string;
  notes?: string;
}) {
  if (data.doctorEmail) {
    const result = await sendBookingEmails({
      patientName: data.patientName,
      patientEmail: data.patientEmail,
      patientPhone: data.patientPhone,
      doctorName: data.doctorName,
      doctorEmail: data.doctorEmail,
      serviceName: data.serviceName,
      date: data.date,
      startTime: data.startTime,
      notes: data.notes,
    });
    return result.patientSent;
  }

  return sendEmail({
    to: data.patientEmail,
    subject: `Appointment Confirmed - ${formatDate(data.date)} at ${data.startTime}`,
    html: baseLayout({
      title: "🦷 Appointment Confirmed",
      headerColor: "#0284c7",
      body: `<p>Hi ${data.patientName},</p><p>Your appointment with ${data.doctorName} for ${data.serviceName} is confirmed on ${formatDate(data.date)} at ${data.startTime}.</p>`,
    }),
  });
}

/** @deprecated use sendReminderEmails */
export async function sendAppointmentReminder(data: {
  patientName: string;
  patientEmail: string;
  doctorName: string;
  serviceName: string;
  date: Date;
  startTime: string;
  location: string;
  doctorEmail?: string;
  patientPhone?: string;
}) {
  if (data.doctorEmail) {
    const result = await sendReminderEmails({
      ...data,
      doctorEmail: data.doctorEmail,
    });
    return result.patientSent;
  }

  return sendEmail({
    to: data.patientEmail,
    subject: `Reminder: Upcoming Appointment - ${formatDate(data.date)} at ${data.startTime}`,
    html: baseLayout({
      title: "⏰ Reminder",
      headerColor: "#ea580c",
      body: `<p>Hi ${data.patientName}, reminder for ${formatDate(data.date)} at ${data.startTime} with ${data.doctorName}.</p>`,
    }),
  });
}

export async function sendAppointmentCancellation(data: {
  patientName: string;
  patientEmail: string;
  doctorName: string;
  serviceName: string;
  date: Date;
  startTime: string;
  reason?: string;
  doctorEmail?: string;
}) {
  const when = formatDate(data.date);
  const patientSent = await sendEmail({
    to: data.patientEmail,
    subject: `Appointment Cancelled — ${when} at ${data.startTime}`,
    html: baseLayout({
      title: "❌ Appointment Cancelled",
      headerColor: "#b91c1c",
      body: `
        <p>Hi ${data.patientName},</p>
        <p>Your appointment has been cancelled.</p>
        ${detailsBox([
          ["Date", when],
          ["Time", data.startTime],
          ["Doctor", data.doctorName],
          ["Service", data.serviceName],
          ["Reason", data.reason || "—"],
        ])}
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments/book">Book a new appointment</a></p>
      `,
    }),
  });

  let doctorSent = false;
  if (data.doctorEmail) {
    doctorSent = await sendEmail({
      to: data.doctorEmail,
      subject: `Cancelled — ${data.patientName} on ${when} at ${data.startTime}`,
      html: baseLayout({
        title: "❌ Appointment Cancelled",
        headerColor: "#b91c1c",
        body: `
          <p>Hi ${data.doctorName},</p>
          <p>The following appointment was cancelled:</p>
          ${detailsBox([
            ["Patient", data.patientName],
            ["Date", when],
            ["Time", data.startTime],
            ["Service", data.serviceName],
            ["Reason", data.reason || "—"],
          ])}
        `,
      }),
    });
  }

  return patientSent || doctorSent;
}
