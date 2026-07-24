# 🚀 How to Run SmileSync

## Option 1: Automatic Setup (Recommended)

```bash
# Run the setup script
node setup.js
```

This will:
- Create `.env` file
- Install dependencies
- Setup database schema
- Guide you through initial setup

Then:
```bash
npm run dev
```

## Option 2: Manual Setup

### Step 1: Install Dependencies

```bash
npm install --legacy-peer-deps
```

**Why `--legacy-peer-deps`?**  
Due to React 18/19 compatibility with Three.js packages.

### Step 2: Create Environment File

Create `.env` in the root directory:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/smilesync"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Generate secret:**
```bash
openssl rand -base64 32
```

### Step 3: Database Setup (Optional for Testing UI)

**For full functionality:**
```bash
npx prisma generate
npx prisma db push
```

**Note**: You can skip this and still see all pages with mock data!

### Step 4: Start Development Server

```bash
npm run dev
```

### Step 5: Open Browser

Visit: **http://localhost:3000**

## 🎯 What Works Without Database

✅ All pages and navigation  
✅ 3D hero scene  
✅ Animations and scroll effects  
✅ Dark/light mode  
✅ Responsive design  
✅ Forms (UI only)  
✅ Mock data displays  

## 🗄️ What Needs Database

- Real data persistence
- Authentication
- Appointment booking (saving)
- User profiles
- Admin operations

## 🌐 Available Pages

Once running, visit:

### Main Pages
- **Home**: http://localhost:3000
- **Services**: http://localhost:3000/services
- **Doctors**: http://localhost:3000/doctors
- **About**: http://localhost:3000/about
- **Contact**: http://localhost:3000/contact
- **Blog**: http://localhost:3000/blog

### Booking
- **Book Appointment**: http://localhost:3000/appointments/book

### Dashboards (Demo Mode)
- **Patient**: http://localhost:3000/patient/dashboard
- **Admin**: http://localhost:3000/admin/dashboard
- **Doctor**: http://localhost:3000/doctor/dashboard

### Dynamic Pages
- **Service Detail**: http://localhost:3000/services/general-dentistry
- **404 Page**: http://localhost:3000/any-invalid-url

## 🎨 Features to Test

### 1. Navigation
- Click navbar links
- Try mobile menu (resize browser)
- Toggle dark/light mode (top right)

### 2. 3D Scene
- Watch the floating tooth model on home page
- 3D tools rotating in background
- Particle effects

### 3. Animations
- Scroll down any page
- Watch elements fade in
- Stagger animations on cards

### 4. Booking Flow
1. Go to `/appointments/book`
2. Select a service
3. Choose doctor and date/time
4. Fill patient info
5. See confirmation

### 5. Search & Filter
- Search doctors by name
- Filter services by category
- Search blog posts

### 6. Dashboards
- View patient dashboard stats
- See admin analytics
- Check doctor schedule

## 🐛 Troubleshooting

### Port 3000 in use
```bash
# Kill the process
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Three.js not loading
- Check browser console
- Enable WebGL in browser settings
- Try different browser (Chrome/Firefox recommended)

### Database connection error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- For testing, skip database setup (pages still work!)

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## 📱 Mobile Testing

### Option 1: Resize Browser
Just make your browser window smaller

### Option 2: Chrome DevTools
1. Open DevTools (F12)
2. Click device toolbar icon
3. Select mobile device

### Option 3: Network Testing
```bash
# Find your IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Then visit from mobile
http://YOUR-IP:3000
```

## 🎯 Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npx prisma studio        # Visual database editor
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema to database

# Code Quality
npm run lint             # Check code quality
```

## 🔥 Pro Tips

### 1. Fast Refresh
Changes appear instantly - just save the file!

### 2. Multiple Pages
Open multiple tabs to test different sections simultaneously

### 3. Console
Keep browser console open (F12) to see any errors

### 4. Prisma Studio
Run `npx prisma studio` to see/edit database visually

### 5. Component Isolation
Each page is self-contained - easy to test individually

## ✅ Success Checklist

After running, you should see:

- [ ] Dev server starts without errors
- [ ] Home page loads at http://localhost:3000
- [ ] 3D tooth model appears and rotates
- [ ] Navigation works
- [ ] Dark/light mode toggle works
- [ ] Animations trigger on scroll
- [ ] All pages are accessible
- [ ] Responsive design works (resize browser)

## 🎉 You're Running!

If you see the SmileSync home page with the 3D tooth model, you're all set!

**Next Steps:**
1. Explore all pages
2. Test the booking flow
3. Check out the dashboards
4. Toggle dark mode
5. Resize for mobile view

## 📚 More Info

- Full documentation: [README.md](./README.md)
- Quick start: [QUICKSTART.md](./QUICKSTART.md)
- Project status: [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

---

**Need Help?** Open an issue or check the documentation files.

**Enjoying SmileSync?** Star the repo! ⭐
