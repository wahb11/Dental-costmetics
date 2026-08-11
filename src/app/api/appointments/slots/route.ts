import { NextRequest, NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: NextRequest) {
  const doctorEmail = request.nextUrl.searchParams
    .get("doctorEmail")
    ?.trim()
    .toLowerCase();
  const date = request.nextUrl.searchParams.get("date")?.trim();

  if (!doctorEmail || !date || !DATE_PATTERN.test(date)) {
    return NextResponse.json(
      { error: "A valid doctor and date are required." },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Appointment availability is not configured." },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await getSupabase()
      .from("appointments")
      .select("start_time")
      .eq("doctor_email", doctorEmail)
      .eq("appointment_date", date)
      .neq("status", "cancelled");

    if (error) {
      console.error("[slots] supabase query failed:", error);
      return NextResponse.json(
        { error: "Could not load available times." },
        { status: 500 }
      );
    }

    const bookedTimes = [
      ...new Set((data || []).map((appointment) => appointment.start_time)),
    ];

    return NextResponse.json({ bookedTimes });
  } catch (error) {
    console.error("[slots] error:", error);
    return NextResponse.json(
      { error: "Could not load available times." },
      { status: 500 }
    );
  }
}
