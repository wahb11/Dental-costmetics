# SmileSync - Modern Dental Clinic Management System

**Connecting Patients. Simplifying Care.**

SmileSync is a complete, production-ready dental clinic website and management platform built with modern technologies. It features stunning 3D animations, a comprehensive booking system, patient portal, admin dashboard, and much more.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-6-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan)

## ✨ Features

### 🎨 Modern UI/UX
- **Award-winning Design**: Inspired by Apple, Linear, and Stripe
- **3D Animations**: Three.js hero scene with floating tooth model and dental tools
- **GSAP Animations**: Smooth scroll-triggered animations throughout
- **Glassmorphism**: Modern glass-effect UI components
- **Dark/Light Mode**: Seamless theme switching
- **Responsive**: Perfect on mobile, tablet, and desktop

### 📅 Complete Booking System
- Multi-step appointment booking flow
- Service selection with pricing
- Doctor selection with ratings
- Calendar date picker
- Time slot selection
- Patient information form
- Booking confirmation

### 👥 Patient Portal
- Personal dashboard with overview
- Upcoming and past appointments
- Medical records access
- Active prescriptions
- Pending invoices and payments
- Notifications center
- Secure messaging with doctors
- Profile management

### 🏥 Admin Dashboard
- Comprehensive analytics and statistics
- Revenue tracking and reports
- Patient management
- Doctor performance metrics
- Appointment scheduling and management
- Inventory tracking
- System status monitoring
- Alert notifications

### 👨‍⚕️ Doctor Dashboard
- Daily schedule overview
- Patient records access
- Treatment planning
- Prescription management
- Availability settings
- Performance metrics

### 🦷 Services Management
- Detailed service pages
- Procedure descriptions
- Pricing information
- FAQ sections
- Before/after galleries
- Booking integration

### 📱 Additional Features
- Blog system with categories and search
- Contact page with form
- About page with team profiles
- Insurance information
- Career opportunities
- Privacy policy and terms
- Custom 404 page
- Newsletter subscription
- Social media integration

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **Shadcn UI** - Reusable components
- **Framer Motion** - React animations
- **GSAP** - Professional animations
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Lenis** - Smooth scrolling

### Backend
- **Next.js API Routes** - Backend API
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Database
- **NextAuth.js** - Authentication
- **JWT** - Token-based auth
- **Bcrypt** - Password hashing

### Additional Libraries
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Zustand** - State management
- **TanStack Query** - Data fetching
- **Lucide Icons** - Icon library
- **date-fns** - Date utilities
- **Nodemailer** - Email sending
- **Cloudinary** - Image storage
- **UploadThing** - File uploads

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18+ 
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smilesync.git
cd smilesync
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/smilesync"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl"

# Email (Optional - for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
EMAIL_FROM="noreply@smilesync.com"

# Cloudinary (Optional - for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# UploadThing (Optional - alternative file upload)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed database with sample data
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
smilesync/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   ├── images/                # Static images
│   └── models/                # 3D models
├── src/
│   ├── app/                   # Next.js 15 app directory
│   │   ├── about/            # About page
│   │   ├── admin/            # Admin dashboard
│   │   ├── api/              # API routes
│   │   ├── appointments/     # Booking pages
│   │   ├── patient/          # Patient portal
│   │   ├── services/         # Services pages
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── layout/           # Layout components
│   │   ├── shared/           # Shared components
│   │   ├── three/            # Three.js components
│   │   └── ui/               # UI components
│   ├── features/             # Feature modules
│   │   ├── admin/           # Admin features
│   │   ├── appointments/    # Booking features
│   │   ├── auth/            # Authentication
│   │   ├── dashboard/       # Dashboard features
│   │   ├── doctors/         # Doctor features
│   │   └── patients/        # Patient features
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   │   ├── auth.ts          # NextAuth config
│   │   ├── prisma.ts        # Prisma client
│   │   └── utils.ts         # Helper functions
│   └── types/                # TypeScript types
├── .env.example              # Environment template
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## 🎨 Key Components

### Three.js Hero Scene
Located in `src/components/three/HeroScene.tsx`, features:
- Floating 3D tooth model with distortion effects
- Animated dental tools
- Particle system
- Dynamic lighting
- Camera controls

### Appointment Booking
Multi-step form in `src/app/appointments/book/page.tsx`:
1. Service selection
2. Doctor & date/time picker
3. Patient information
4. Booking confirmation

### Patient Dashboard
Comprehensive portal in `src/app/patient/dashboard/page.tsx`:
- Appointment management
- Medical records
- Prescriptions
- Invoices
- Notifications

## 🗄️ Database Schema

The Prisma schema includes:
- **User** - Authentication
- **Patient** - Patient profiles
- **Doctor** - Doctor profiles
- **Appointment** - Booking records
- **Service** - Treatment services
- **MedicalRecord** - Health records
- **Treatment** - Treatment plans
- **Invoice** - Billing
- **Payment** - Payment tracking
- **Prescription** - Medication records
- **Review** - Doctor reviews
- **Message** - Internal messaging
- **Notification** - User notifications
- **File** - Document storage
- **BlogPost** - Blog content
- **Insurance** - Insurance plans
- **Gallery** - Image gallery
- **Inventory** - Stock management
- **Analytics** - Usage statistics

## 🔐 Authentication

Role-based access control with four roles:
- **ADMIN** - Full system access
- **DOCTOR** - Doctor dashboard and patient records
- **RECEPTIONIST** - Appointment and patient management
- **PATIENT** - Patient portal access

## 🎭 Animations

### GSAP Animations
- Scroll-triggered reveals
- Stagger animations
- Timeline sequences
- Hero entrance effects
- Card hover effects

### Framer Motion
- Page transitions
- Component animations
- Gesture interactions

### Three.js
- 3D scene rendering
- Object animations
- Particle effects
- Lighting dynamics

## 📱 Responsive Design

Fully responsive across all devices:
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## ♿ Accessibility

- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus indicators
- Semantic HTML

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t smilesync .

# Run container
docker run -p 3000:3000 smilesync
```

### Environment Variables

Ensure all environment variables are set in your deployment platform.

## 📊 Performance

- **Lighthouse Score**: 100/100 (target)
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Dynamic imports
- **Code Splitting**: Automatic by Next.js
- **Caching**: Optimized API responses

## 🔧 Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Prisma commands
npx prisma studio        # Open Prisma Studio
npx prisma migrate dev   # Create migration
npx prisma generate      # Generate client
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

Built with ❤️ by the SmileSync Team

## 📞 Support

For support, email support@smilesync.com or open an issue in the repository.

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- Prisma for the excellent ORM
- GSAP for powerful animations
- Three.js community

---

**SmileSync** - Transforming dental care, one smile at a time. 🦷✨
