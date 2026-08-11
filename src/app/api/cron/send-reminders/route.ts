/**
 * Cron: remind patient + doctor about upcoming appointments
 * Auth: Authorization: Bearer <CRON_SECRET>
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { sendReminderEmails, isEmailEnabled } from "@/lib/email";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isEmailEnabled()) {
      return NextResponse.json(
        { message: "Email notifications are disabled" },
        { status: 200 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 500 }
      );
    }

    const hoursBefore = parseInt(process.env.REMINDER_HOURS_BEFORE || "24", 10);
    const daysAhead = Math.max(1, Math.floor(hoursBefore / 24));

    const windowStart = new Date();
    windowStart.setHours(0, 0, 0, 0);
    windowStart.setDate(windowStart.getDate() + daysAhead);

    const windowEnd = new Date(windowStart);
    windowEnd.setDate(windowEnd.getDate() + 1);

    const startStr = windowStart.toISOString().slice(0, 10);
    const endStr = windowEnd.toISOString().slice(0, 10);

    const supabase = getSupabase();
    const { data: appointments, error } = await supabase
      .from("appointments")
      .select("*")
      .gte("appointment_date", startStr)
      .lt("appointment_date", endStr)
      .in("status", ["pending", "confirmed", "PENDING", "CONFIRMED"])
      .eq("reminder_sent", false);

    if (error) {
      console.error("[reminders] query failed:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = appointments || [];
    const results = {
      total: rows.length,
      sent: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const row of rows) {
      try {
        const emails = await sendReminderEmails({
          patientName: row.patient_name,
          patientEmail: row.patient_email,
          patientPhone: row.patient_phone || undefined,
          doctorName: row.doctor_name,
          doctorEmail: row.doctor_email,
          serviceName: row.service_name,
          date: row.appointment_date,
          startTime: row.start_time,
        });

        if (emails.patientSent || emails.doctorSent) {
          await supabase
            .from("appointments")
            .update({ reminder_sent: true })
            .eq("id", row.id);
          results.sent++;
        } else {
          results.failed++;
          results.errors.push(`Email failed for ${row.id}`);
        }
      } catch (err) {
        results.failed++;
        results.errors.push(
          `Error for ${row.id}: ${err instanceof Error ? err.message : "Unknown"}`
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Reminders processed",
      window: { start: startStr, end: endStr },
      results,
    });
  } catch (error) {
    console.error("send-reminders cron error:", error);
    return NextResponse.json(
      {
        error: "Failed to process reminders",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
