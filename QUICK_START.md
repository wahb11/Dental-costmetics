# 🚀 SmileSync Quick Start

## ⚡ 5-Minute Setup

### 1. Environment Setup (2 minutes)

```bash
# Copy environment template
cp .env.example .env

# Edit .env - MINIMUM REQUIRED:
nano .env
```

**Required Variables:**
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/smilesync"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
SMTP_USER="your-gmail@gmail.com"
SMTP_PASSWORD="your-16-digit-app-password"
GOOGLE_SERVICE_ACCOUNT_EMAIL="service-account@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
ENABLE_EMAIL_NOTIFICATIONS="true"
ENABLE_GOOGLE_CALENDAR="true"
```

### 2. Database Setup (1 minute)

```bash
# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 3. Run Project (1 minute)

```bash
# Install dependencies (if not done)
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Visit: **http://localhost:3002**

---

## 📧 Gmail App Password (30 seconds)

1. [Enable 2-Step Verification](https://myaccount.google.com/security)
2. [Generate App Password](https://myaccount.google.com/apppasswords)
3. Select **Mail** > **Other (SmileSync)**
4. Copy 16-digit code to `.env` as `SMTP_PASSWORD`

---

## 📅 Google Calendar Setup (2 minutes)

### Quick Steps:
1. [Create Google Cloud Project](https://console.cloud.google.com) → "New Project"
2. Enable **Google Calendar API** → APIs & Services → Library
3. Create **Service Account** → APIs & Services → Credentials
4. Download **JSON key** → Keys tab → Add Key → JSON
5. Share calendar with service account email → [Google Calendar](https://calendar.google.com) → Settings → Share

### Extract from JSON:
```json
{
  "client_email": "← copy to GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "private_key": "← copy to GOOGLE_PRIVATE_KEY",
  "project_id": "← copy to GOOGLE_PROJECT_ID"
}
```

---

## ✅ Testing Checklist

### Test Email:
```bash
# Create appointment via UI at /appointments/book
# Check patient's email inbox
# Should receive confirmation email ✅
```

### Test Calendar:
```bash
# After creating appointment
# Check Google Calendar
# Event should appear with attendees ✅
```

### Test API:
```bash
curl -X POST http://localhost:3002/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "xxx",
    "doctorId": "yyy",
    "serviceId": "zzz",
    "date": "2026-08-01",
    "startTime": "10:00",
    "endTime": "11:00"
  }'
```

---

## 🐛 Quick Fixes

### Email Not Working?
```bash
# Check credentials
echo $SMTP_USER
echo $SMTP_PASSWORD

# Test SMTP
node -e "require('nodemailer').createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: { user: 'your@gmail.com', pass: 'app-password' }
}).verify(console.log)"
```

### Calendar Not Working?
```bash
# Verify service account email
echo $GOOGLE_SERVICE_ACCOUNT_EMAIL

# Check if added to calendar
# Go to calendar settings → Share with specific people
```

### Database Connection Error?
```bash
# Check if PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Or use Supabase (recommended):
# https://supabase.com → New Project → Copy connection string
```

---

## 📚 Full Documentation

- **SETUP_GUIDE.md** - Complete step-by-step setup
- **INTEGRATION_SUMMARY.md** - What's been built & how it works
- **.env.example** - All environment variables explained

---

## 🎯 Project Status

✅ Database schema updated (18 models)
✅ Google Calendar integration complete
✅ Email service with beautiful templates
✅ API routes for appointments
✅ Automated reminder system
✅ Full documentation

**Ready for:** Development, Testing, Production Deployment

---

## 🚢 Deploy to Production

```bash
# Deploy to Vercel
vercel deploy

# Set environment variables in Vercel dashboard
# Cron jobs will run automatically (vercel.json configured)
```

---

## 💡 Key Features

| Feature | Status | Details |
|---------|--------|---------|
| 📊 Database | ✅ Complete | 18 models from your old project |
| 📧 Email | ✅ Integrated | Gmail SMTP with HTML templates |
| 📅 Calendar | ✅ Integrated | Google Calendar auto-sync |
| ⏰ Reminders | ✅ Automated | Daily cron job at 9:00 AM |
| 🔐 Auth | ✅ Ready | NextAuth with roles |
| 💳 Payments | ⏳ Optional | Stripe ready (env vars) |
| 📱 SMS | ⏳ Optional | Twilio ready (env vars) |

---

## 🆘 Need Help?

1. Check console logs for errors
2. Review SETUP_GUIDE.md for detailed instructions
3. Verify all environment variables are set
4. Test each integration separately
5. Check API quotas (Google, Gmail)

---

**Let's build something amazing! 🦷✨**
