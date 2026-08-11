-- SmileSync — clean database schema
-- Run once in Supabase → SQL Editor → New query → Run
-- WARNING: This DROPS old project tables. Booking data in those tables is deleted.

-- =============================================================================
-- 1) Remove old Prisma / legacy tables (order doesn't matter with CASCADE)
-- =============================================================================

drop table if exists public."Payment" cascade;
drop table if exists public."Invoice" cascade;
drop table if exists public."Prescription" cascade;
drop table if exists public."Review" cascade;
drop table if exists public."Message" cascade;
drop table if exists public."Notification" cascade;
drop table if exists public."File" cascade;
drop table if exists public."MedicalRecord" cascade;
drop table if exists public."Treatment" cascade;
drop table if exists public."Appointment" cascade;
drop table if exists public."Availability" cascade;
drop table if exists public."Service" cascade;
drop table if exists public."Patient" cascade;
drop table if exists public."Doctor" cascade;
drop table if exists public."User" cascade;
drop table if exists public."BlogPost" cascade;
drop table if exists public."Insurance" cascade;
drop table if exists public."Gallery" cascade;
drop table if exists public."Inventory" cascade;
drop table if exists public."Analytics" cascade;

-- snake_case variants (if an older migration used these names)
drop table if exists public.payments cascade;
drop table if exists public.invoices cascade;
drop table if exists public.prescriptions cascade;
drop table if exists public.reviews cascade;
drop table if exists public.messages cascade;
drop table if exists public.notifications cascade;
drop table if exists public.files cascade;
drop table if exists public.medical_records cascade;
drop table if exists public.treatments cascade;
drop table if exists public.availability cascade;
drop table if exists public.services cascade;
drop table if exists public.patients cascade;
drop table if exists public.doctors cascade;
drop table if exists public.users cascade;
drop table if exists public.blog_posts cascade;
drop table if exists public.insurance cascade;
drop table if exists public.gallery cascade;
drop table if exists public.inventory cascade;
drop table if exists public.analytics cascade;
drop table if exists public.appointments cascade;

-- Old Prisma enums (ignore errors if they don't exist)
drop type if exists public."UserRole" cascade;
drop type if exists public."AppointmentStatus" cascade;
drop type if exists public."PaymentStatus" cascade;
drop type if exists public."TreatmentStatus" cascade;
drop type if exists public.user_role cascade;
drop type if exists public.appointment_status cascade;
drop type if exists public.payment_status cascade;
drop type if exists public.treatment_status cascade;

-- =============================================================================
-- 2) Only table SmileSync needs: appointments
-- =============================================================================

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  patient_email text not null,
  patient_phone text,
  doctor_name text not null,
  doctor_email text not null,
  service_name text not null,
  appointment_date date not null,
  start_time text not null,
  notes text,
  status text not null default 'pending',
  confirmation_sent boolean not null default false,
  reminder_sent boolean not null default false,
  created_at timestamptz not null default now()
);

create index appointments_date_idx
  on public.appointments (appointment_date);

create index appointments_reminder_idx
  on public.appointments (reminder_sent, appointment_date);

-- Prevent two active appointments from claiming the same doctor's time slot.
create unique index appointments_doctor_slot_uidx
  on public.appointments (doctor_email, appointment_date, start_time)
  where status <> 'cancelled';

alter table public.appointments enable row level security;

-- Public booking form can create rows
create policy "Allow public insert appointments"
  on public.appointments
  for insert
  to anon, authenticated
  with check (true);

-- Server / cron can read appointments
create policy "Allow public read appointments"
  on public.appointments
  for select
  to anon, authenticated
  using (true);

-- Cron can mark reminder_sent / confirmation_sent
create policy "Allow public update appointments"
  on public.appointments
  for update
  to anon, authenticated
  using (true)
  with check (true);
