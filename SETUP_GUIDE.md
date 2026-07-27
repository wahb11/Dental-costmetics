# SmileSync Setup Guide
## Full Integration with Google Calendar & Email Notifications

This guide will help you set up SmileSync with complete Google Calendar integration and email notifications for appointments.

---

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud - Supabase recommended)
- Gmail account for SMTP email sending
- Google Cloud Platform account (free tier is sufficient)

---

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

```bash
# Install PostgreSQL
# Windows: Download from postgresql.org
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
psql -U postgres
CREATE DATABASE smilesync;
\q
```

### Option 2: Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Use it in your `.env` file

---

## 🔐 Environment Configuration

### 1. Copy Environment Template

```bash
cp .env.example .env
```

### 2. Configure Database

```env
DATABASE_URL="postgresql://user:password@localhost:5432/smilesync"
# OR for Supabase:
# DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### 3. Configure NextAuth

```bash
# Generate secret key
openssl rand -base64 32
```

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-generated-secret-here"
```

---

## 📧 Email Setup (Gmail SMTP)

### Step 1: Enable 2-Step Verification

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled

### Step 2: Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Other (Custom name)"
3. Enter "SmileSync" as the name
4. Click **Generate**
5. Copy the 16-character password

### Step 3: Configure .env

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-16-digit-app-password-here"
EMAIL_FROM="SmileSync Dental <noreply@smilesync.com>"
EMAIL_REPLY_TO="support@smilesync.com"
ENABLE_EMAIL_NOTIFICATIONS="true"
```

---

## 📅 Google Calendar Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "New Project"
3. Name it "SmileSync" and create

### Step 2: Enable Calendar API

1. In the project, go to **APIs & Services** > **Library**
2. Search for "Google Calendar API"
3. Click **Enable**

### Step 3: Create Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Name: "smilesync-calendar-service"
4. Click **Create and Continue**
5. Grant role: **Editor** or **Owner**
6. Click **Done**

### Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create New Key**
4. Choose **JSON** format
5. Download the key file

### Step 5: Extract Credentials

Open the downloaded JSON file and find:
- `client_email` - This is your service account email
- `private_key` - This is your private key (keep the `\n` characters)
- `project_id` - This is your project ID

### Step 6: Share Calendar with Service Account

1. Open [Google Calendar](https://calendar.google.com)
2. Find your calendar in the left sidebar
3. Click the three dots > **Settings and sharing**
4. Under "Share with specific people", click **Add people**
5. Add your service account email (from step 5)
6. Give it **Make changes to events** permission
7. Click **Send**

### Step 7: Configure .env

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL="smilesync-calendar-service@your-project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID="your-google-cloud-project-id"
GOOGLE_CALENDAR_ID="primary"
ENABLE_GOOGLE_CALENDAR="true"
```

**Important:** The private key must include the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts with `\n` for newlines.

---

## 💳 Payment Gateway (Optional - Stripe)

### Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for an account
3. Complete verification

### Step 2: Get API Keys

1. Go to **Developers** > **API Keys**
2. Copy **Publishable key** and **Secret key**

### Step 3: Configure .env

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your-key"
STRIPE_SECRET_KEY="sk_test_your-key"
ENABLE_PAYMENT_GATEWAY="true"
```

---

## 📱 SMS Notifications (Optional - Twilio)

### Step 1: Create Twilio Account

1. Go to [twilio.com](https://twilio.com)
2. Sign up and verify your account
3. Get a free trial phone number

### Step 2: Configure .env

```env
TWILIO_ACCOUNT_SID="your-account-sid"
TWILIO_AUTH_TOKEN="your-auth-token"
TWILIO_PHONE_NUMBER="+1234567890"
ENABLE_SMS_NOTIFICATIONS="true"
```

---

## 🚀 Installation & Running

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Run Database Migrations

```bash
npx prisma db push
```

### 4. Seed Database (Optional)

```bash
# Create seed script first, then:
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3002

---

## 🧪 Testing Email & Calendar

### Test Email Sending

1. Create a test appointment
2. Check the patient's email inbox
3. You should receive:
   - Appointment confirmation email
   - Calendar invitation (from Google Calendar)

### Test Google Calendar

1. After creating an appointment, check your Google Calendar
2. The event should appear with:
   - Patient and doctor as attendees
   - Appointment details in description
   - Automatic reminders set

### Debug Logs

Check the console for:
```
✅ Email sent successfully to: patient@example.com
✅ Google Calendar event created: event-id-123
```

---

## 📊 Database Schema

The updated schema includes:

### Appointment Model Extensions
- `googleCalendarId` - Stores the Google Calendar event ID
- `reminderSent` - Tracks if reminder email was sent
- `confirmationSent` - Tracks if confirmation email was sent
- `cancellationNote` - Reason for cancellation
- `rescheduledFrom` - Links to original appointment if rescheduled

---

## 🔥 Common Issues & Solutions

### Email Not Sending

**Problem:** SMTP authentication failed

**Solution:**
- Ensure 2-Step Verification is enabled
- Generate a new App Password
- Don't use your regular Gmail password
- Check SMTP settings are correct

### Calendar Events Not Creating

**Problem:** Permission denied or 404

**Solution:**
- Verify service account email is added to calendar
- Check "Make changes to events" permission is granted
- Ensure Calendar API is enabled
- Verify private key format (must include newlines as `\n`)

### Database Connection Errors

**Problem:** Can't connect to PostgreSQL

**Solution:**
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Verify database exists
- Check firewall settings

### React Version Conflicts

**Problem:** Multiple React instances

**Solution:**
```bash
# Already handled in package.json with overrides
npm install --legacy-peer-deps
```

---

## 📚 API Endpoints

### Appointments

- `POST /api/appointments` - Create appointment (with email & calendar)
- `GET /api/appointments` - List appointments
- `GET /api/appointments/[id]` - Get single appointment
- `PATCH /api/appointments/[id]` - Update appointment
- `DELETE /api/appointments/[id]` - Delete appointment (admin only)

### Example Create Appointment Request

```json
POST /api/appointments
{
  "patientId": "clxxx...",
  "doctorId": "clyyy...",
  "serviceId": "clzzz...",
  "date": "2026-08-01",
  "startTime": "10:00",
  "endTime": "11:00",
  "notes": "First visit",
  "reason": "Routine checkup"
}
```

### Response

```json
{
  "appointment": { ... },
  "message": "Appointment created successfully",
  "calendarCreated": true,
  "emailSent": true
}
```

---

## 🛡️ Security Best Practices

1. **Never commit `.env` file** - Already in `.gitignore`
2. **Use environment variables** - All secrets in `.env`
3. **Rotate keys regularly** - Change API keys periodically
4. **Use HTTPS in production** - Required for OAuth
5. **Validate all inputs** - Use Zod schemas
6. **Rate limit APIs** - Prevent abuse
7. **Monitor logs** - Watch for unauthorized access

---

## 🎯 Next Steps

1. ✅ Set up all environment variables
2. ✅ Run database migrations
3. ✅ Test email sending
4. ✅ Test calendar integration
5. ✅ Create seed data
6. ✅ Test booking flow end-to-end
7. ⏭️ Deploy to production (Vercel recommended)
8. ⏭️ Set up monitoring (Sentry, LogRocket)
9. ⏭️ Configure domain and SSL
10. ⏭️ Set up automated backups

---

## 🤝 Support

If you encounter issues:

1. Check the console for error messages
2. Review this guide thoroughly
3. Verify all environment variables
4. Check API quotas (Google Calendar, email)
5. Review database logs

---

## 📄 License

This project is part of SmileSync Dental Clinic Management System.

---

**Happy Coding! 🦷✨**

