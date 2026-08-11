/**
 * Public appointment booking via Supabase (URL + publishable key)
 * Emails patient + doctor on success
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { sendBookingEmails, isEmailEnabled } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      notes,
      doctorName,
      doctorEmail,
      serviceName,
      date,
      startTime,
    } = body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !doctorName ||
      !doctorEmail ||
      !serviceName ||
      !date ||
      !startTime
    ) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    const appointmentDate = new Date(date);
    if (Number.isNaN(appointmentDate.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    // Store as YYYY-MM-DD for Supabase `date` column
    const dateOnly = appointmentDate.toISOString().slice(0, 10);
    const patientName = `${String(firstName).trim()} ${String(lastName).trim()}`;

    let appointmentId: string | null = null;
    let persisted = false;

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error:
            "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env",
        },
        { status: 500 }
      );
    }

    const supabase = getSupabase();
    const normalizedDoctorEmail = String(doctorEmail).trim().toLowerCase();
    const normalizedStartTime = String(startTime).trim();
    const { data: existingAppointments, error: availabilityError } =
      await supabase
        .from("appointments")
        .select("id")
        .eq("doctor_email", normalizedDoctorEmail)
        .eq("appointment_date", dateOnly)
        .eq("start_time", normalizedStartTime)
        .neq("status", "cancelled")
        .limit(1);

    if (availabilityError) {
      console.error("[book] availability check failed:", availabilityError);
      return NextResponse.json(
        { error: "Could not verify appointment availability." },
        { status: 500 }
      );
    }

    if (existingAppointments && existingAppointments.length > 0) {
      return NextResponse.json(
        { error: "That appointment time has already been booked." },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        patient_name: patientName,
        patient_email: String(email).trim().toLowerCase(),
        patient_phone: String(phone).trim(),
        doctor_name: String(doctorName).trim(),
        doctor_email: normalizedDoctorEmail,
        service_name: String(serviceName).trim(),
        appointment_date: dateOnly,
        start_time: normalizedStartTime,
        notes: notes ? String(notes) : null,
        status: "pending",
        confirmation_sent: false,
        reminder_sent: false,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[book] supabase insert failed:", error);
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "That appointment time has already been booked." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        {
          error:
            error.message.includes("Could not find the table") ||
            error.code === "42P01"
              ? "Appointments table missing. Run supabase/schema.sql in the Supabase SQL Editor."
              : `Database error: ${error.message}`,
        },
        { status: 500 }
      );
    }

    appointmentId = data?.id ?? null;
    persisted = !!appointmentId;

    let emails = { patientSent: false, doctorSent: false };
    if (isEmailEnabled()) {
      emails = await sendBookingEmails({
        patientName,
        patientEmail: String(email).trim(),
        patientPhone: String(phone).trim(),
        doctorName: String(doctorName).trim(),
        doctorEmail: String(doctorEmail).trim(),
        serviceName: String(serviceName).trim(),
        date: dateOnly,
        startTime: String(startTime),
        notes: notes ? String(notes) : undefined,
      });

      if (persisted && appointmentId && (emails.patientSent || emails.doctorSent)) {
        await supabase
          .from("appointments")
          .update({ confirmation_sent: true })
          .eq("id", appointmentId);
      }
    }

    return NextResponse.json(
      {
        success: true,
        appointmentId,
        persisted,
        emails,
        message:
          emails.patientSent || emails.doctorSent
            ? "Appointment booked. Confirmation emails sent to patient and doctor."
            : "Appointment saved. Enable SMTP / ENABLE_EMAIL_NOTIFICATIONS to send emails.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[book] error:", error);
    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 }
    );
  }
}
