"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Calendar,
  Shield,
  Clock,
  Award,
  Heart,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    title: "General Dentistry",
    description: "Comprehensive care for your oral health",
    icon: Shield,
    href: "/services/general-dentistry",
  },
  {
    title: "Cosmetic Dentistry",
    description: "Transform your smile with confidence",
    icon: Sparkles,
    href: "/services/cosmetic-dentistry",
  },
  {
    title: "Dental Implants",
    description: "Permanent solution for missing teeth",
    icon: Award,
    href: "/services/dental-implants",
  },
  {
    title: "Orthodontics",
    description: "Straighten teeth for a perfect smile",
    icon: Heart,
    href: "/services/orthodontics",
  },
];

const stats = [
  { label: "Happy Patients", value: "10,000+", icon: Users },
  { label: "Success Rate", value: "98%", icon: TrendingUp },
  { label: "Expert Doctors", value: "25+", icon: Award },
  { label: "Years Experience", value: "15+", icon: Star },
];

const features = [
  {
    title: "Modern Technology",
    description: "State-of-the-art equipment for precise treatments",
    icon: Sparkles,
  },
  {
    title: "24/7 Emergency Care",
    description: "Always here when you need us most",
    icon: Clock,
  },
  {
    title: "Expert Team",
    description: "Highly trained and experienced professionals",
    icon: Award,
  },
  {
    title: "Insurance Accepted",
    description: "We work with all major insurance providers",
    icon: Shield,
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 via-background to-accent/20 pt-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.25), transparent 45%), radial-gradient(circle at 80% 70%, hsl(202 83% 41% / 0.2), transparent 40%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            Your Perfect Smile
            <br />
            <span className="gradient-text">Starts Here</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground md:text-2xl">
            Experience modern dental care with cutting-edge technology and
            compassionate professionals.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/appointments/book">
              <Button size="lg" className="text-lg shadow-premium">
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="text-lg">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="glass border-none">
                <CardContent className="p-6 text-center">
                  <stat.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                  <div className="mb-2 text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Comprehensive dental care tailored to your unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link key={service.href} href={service.href}>
                <Card className="group h-full cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-premium">
                  <CardContent className="p-6">
                    <service.icon className="mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
                    <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Learn More
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services">
              <Button variant="outline" size="lg">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Doctors preview */}
      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Meet Our <span className="gradient-text">Doctors</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Experienced specialists dedicated to your smile
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "General Dentistry & Implantology",
                emoji: "👩‍⚕️",
              },
              {
                name: "Dr. Michael Chen",
                role: "Orthodontics & Facial Orthopedics",
                emoji: "👨‍⚕️",
              },
              {
                name: "Dr. Emily Rodriguez",
                role: "Cosmetic & Aesthetic Dentistry",
                emoji: "👩‍⚕️",
              },
            ].map((doctor) => (
              <Card key={doctor.name} className="text-center shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-4 text-6xl">{doctor.emoji}</div>
                  <h3 className="mb-1 text-xl font-semibold">{doctor.name}</h3>
                  <p className="mb-6 text-sm text-primary">{doctor.role}</p>
                  <Link href="/doctors">
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/doctors">
              <Button size="lg">
                <Users className="mr-2 h-5 w-5" />
                See All Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Why Choose <span className="gradient-text">SmileSync</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Experience the difference with our patient-first approach
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="glass border-none">
                <CardContent className="flex items-start space-x-4 p-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Card className="glass border-none shadow-premium">
            <CardContent className="p-12">
              <h2 className="mb-4 text-4xl font-bold">
                Ready for Your Best Smile?
              </h2>
              <p className="mb-8 text-xl text-muted-foreground">
                Book your appointment today and take the first step towards
                perfect oral health
              </p>
              <Link href="/appointments/book">
                <Button size="lg" className="text-lg shadow-lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Your Visit
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </>
  );
}
