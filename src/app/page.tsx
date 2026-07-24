"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Dynamically import Three.js component
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />,
});

gsap.registerPlugin(ScrollTrigger);

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
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Hero animation
    const heroTimeline = gsap.timeline();
    heroTimeline
      .from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(
        ".hero-subtitle",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        ".hero-buttons",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

    // Services animation
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Stats animation
    gsap.from(".stat-card", {
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });

    // Features animation
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
      },
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, [mounted]);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden noise">
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />}>
          <HeroScene />
        </Suspense>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
            Your Perfect Smile
            <br />
            <span className="gradient-text">Starts Here</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience modern dental care with cutting-edge technology and compassionate professionals.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointments/book">
              <Button size="lg" className="text-lg shadow-premium">
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="text-lg">
                Explore Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="stat-card glass border-none">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive dental care tailored to your unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="service-card group hover:shadow-premium transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <CardContent className="p-6">
                    <service.icon className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">SmileSync</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our patient-first approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card glass border-none">
                <CardContent className="p-8 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="glass border-none shadow-premium">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold mb-4">
                Ready for Your Best Smile?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Book your appointment today and take the first step towards perfect oral health
              </p>
              <Link href="/appointments/book">
                <Button size="lg" className="text-lg shadow-lg">
                  <Calendar className="w-5 h-5 mr-2" />
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
