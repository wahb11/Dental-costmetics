import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Server Supabase client — uses Project URL + Publishable key
 * (the two values from Supabase Dashboard → Connect).
 */
export function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
    );
  }

  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return client;
}

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

export type AppointmentRow = {
  id?: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string | null;
  doctor_name: string;
  doctor_email: string;
  service_name: string;
  appointment_date: string; // YYYY-MM-DD
  start_time: string;
  notes: string | null;
  status?: string;
  confirmation_sent?: boolean;
  reminder_sent?: boolean;
  created_at?: string;
};
