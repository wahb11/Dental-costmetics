# SmileSync - Quick Start Guide 🚀

Get SmileSync up and running in 5 minutes!

## 📋 Prerequisites

Make sure you have these installed:
- Node.js 18 or higher
- npm or yarn
- PostgreSQL database (or use a cloud service like Supabase/Neon)

## 🏃 Quick Setup

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```env
# Database - Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/smilesync"

# NextAuth - Generate a secret with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** in your browser! 🎉

## 📱 What You'll See

Once running, you can explore:

- **Home Page** (`/`) - Stunning 3D hero scene with animations
- **Services** (`/services`) - All dental services
- **Doctors** (`/doctors`) - Meet our dental team
- **Book Appointment** (`/appointments/book`) - Multi-step booking system
- **About** (`/about`) - Our story and team
- **Contact** (`/contact`) - Get in touch
- **Blog** (`/blog`) - Dental health articles

### Dashboards (Demo - No Auth Required Yet)

- **Patient Portal** - `/patient/dashboard`
- **Admin Dashboard** - `/admin/dashboard`
- **Doctor Dashboard** - `/doctor/dashboard`

## 🎨 Key Features Working

✅ 3D Three.js hero scene with floating tooth model  
✅ GSAP scroll animations throughout  
✅ Dark/Light mode toggle  
✅ Smooth scrolling (Lenis)  
✅ Responsive design  
✅ Multi-step appointment booking  
✅ Service pages with details  
✅ Doctor profiles and search  
✅ Patient/Admin/Doctor dashboards  
✅ Contact form  
✅ Blog system  

## 🔧 Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npx prisma studio        # Open Prisma Studio (database GUI)
npx prisma db push       # Push schema changes
npx prisma generate      # Regenerate Prisma Client

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
```

## 🗄️ Database Setup Options

### Option 1: Local PostgreSQL

```bash
# Install PostgreSQL locally, then:
createdb smilesync
```

Update `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/smilesync"
```

### Option 2: Cloud Database (Easiest)

**Using Supabase (Free):**
1. Go to https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Update `.env` with your connection string

**Using Neon (Free):**
1. Go to https://neon.tech
2. Create new project
3. Copy connection string
4. Update `.env`

## 🎯 Next Steps

1. **Customize Content**: Edit pages in `src/app/`
2. **Add More Components**: Create in `src/components/`
3. **Setup Authentication**: Configure NextAuth providers
4. **Add Real Data**: Seed database with actual services/doctors
5. **Deploy**: Deploy to Vercel, Netlify, or your platform

## 🐛 Common Issues

### Error: Cannot find module 'next'
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Database Connection Error
- Check your `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Try `npx prisma db push` again

### Three.js Scene Not Showing
- Check browser console for errors
- Three.js requires WebGL support
- Try disabling browser extensions

### Port 3000 Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
PORT=3001 npm run dev
```

## 📚 Documentation

For detailed documentation, see [README.md](./README.md)

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: { DEFAULT: "hsl(202 83% 41%)" }, // Change this
    }
  }
}
```

### Modify 3D Scene

Edit `src/components/three/HeroScene.tsx` to customize the 3D tooth model and animations.

### Change Animations

GSAP animations are in individual page components. Look for `useEffect` with `gsap` imports.

## 💡 Tips

- **Fast Refresh**: Changes are instant in dev mode
- **Type Safety**: TypeScript catches errors before runtime
- **Database GUI**: Use `npx prisma studio` to view/edit data
- **Dark Mode**: Toggle in navbar works out of the box
- **Responsive**: Test on mobile by resizing browser

## 🚀 You're Ready!

SmileSync is now running. Start customizing and building your dental practice website!

**Need Help?** Check the full [README.md](./README.md) or open an issue.

---

Built with ❤️ using Next.js 15, React 18, Three.js, GSAP, and TailwindCSS
