-- Run this once in Supabase SQL Editor for an existing SmileSync database.
-- If it reports duplicate rows, resolve those duplicate appointments first.

create unique index if not exists appointments_doctor_slot_uidx
  on public.appointments (doctor_email, appointment_date, start_time)
  where status <> 'cancelled';
