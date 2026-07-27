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
  Star,
  Users,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Dynamically import Three.js component with proper typing
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />,
  }
);

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
  { label: "Years Experience", value: "10+", icon: Award },
  { label: "Success Rate", value: "98%", icon: TrendingUp },
  { label: "Happy Patients", value: "8,750+", icon: Users },
];

const coreValues = [
  {
    number: "01",
    title: "Specialist-Led Care",
    description:
      "Every treatment is overseen by board-certified specialists with years of experience in their field.",
    color: "from-blue-50 to-white",
  },
  {
    number: "02",
    title: "Built Around You",
    description:
      "We craft personalized treatment plans that fit your lifestyle, timeline, and budget perfectly.",
    color: "from-blue-100 to-blue-50",
    featured: true,
  },
  {
    number: "03",
    title: "Cutting-Edge Precision",
    description:
      "Advanced technology meets meticulous care for predictable, lasting results you can trust.",
    color: "from-blue-50 to-white",
  },
  {
    number: "04",
    title: "Uncompromising Safety",
    description:
      "Hospital-grade sterilization and strict protocols ensure your wellbeing at every visit.",
    color: "from-blue-50 to-white",
  },
  {
    number: "05",
    title: "Absolute Safety",
    description:
      "Your health and comfort are our top priorities with comprehensive safety measures.",
    color: "from-blue-50 to-white",
  },
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
  }, [mounted]);

  return (
    <>
      <Navbar />

      {/* Hero Section - Design from mockup */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50"
      >
        {/* Background Three.js Scene */}
        <Suspense fallback={<div className="absolute inset-0" />}>
          <HeroScene />
        </Suspense>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Small Logo/Badge */}
              <div className="hero-title">
                <div className="inline-flex items-center gap-2 text-primary mb-6">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-lg">SmileSync</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="hero-title text-5xl md:text-7xl font-light leading-tight">
                YOUR SMILE
                <br />
                <span className="font-normal">IS OUR</span>{" "}
                <span className="font-bold text-primary">CARE</span>
              </h1>

              {/* Subheadline */}
              <p className="hero-subtitle text-lg md:text-xl text-gray-600 max-w-lg">
                Modern dental care that blends art with science, ensuring
                exceptional results with genuine comfort.
              </p>

              {/* CTA Button */}
              <div className="hero-buttons">
                <Link href="/appointments/book">
                  <Button
                    size="lg"
                    className="rounded-full px-8 py-6 text-base bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                  >
                    Book Appointment
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Social Media Links */}
              <div className="flex gap-4 pt-4">
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  >
                    <span className="text-xs font-bold">fb</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  >
                    <span className="text-xs font-bold">in</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  >
                    <span className="text-xs font-bold">tw</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  >
                    <span className="text-xs font-bold">yt</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Content - 3D Tooth with Feature Labels */}
            <div className="relative">
              {/* Feature Labels around the tooth */}
              <div className="absolute -top-8 right-20 hero-subtitle">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200">
                  <p className="text-xs md:text-sm font-medium text-gray-700">
                    Strength Of ZIRCONIA Crowns
                  </p>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 hero-subtitle">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200">
                  <p className="text-xs md:text-sm font-medium text-gray-700">
                    Root Treatment
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-8 right-1/4 hero-subtitle">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200">
                  <p className="text-xs md:text-sm font-medium text-gray-700">
                    Advance Whiting
                  </p>
                </div>
              </div>

              <div className="absolute top-1/3 -left-8 hero-subtitle">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200">
                  <p className="text-xs md:text-sm font-medium text-gray-700">
                    Cosmetic Dentistry
                  </p>
                </div>
              </div>

              {/* Central 3D visualization is handled by HeroScene */}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-subtitle">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* Clinical Precision Section */}
      <section ref={statsRef} className="relative py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a4d] via-[#003380] to-[#001a4d]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a4d] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Headline */}
          <div className="text-center mb-20 stat-card">
            <div className="inline-block mb-6">
              <span className="text-sm uppercase tracking-[0.3em] text-gray-400 border border-gray-600 px-6 py-2 rounded-full">
                About Clinic
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white leading-tight max-w-4xl mx-auto">
              WHERE CLINICAL PRECISION
              <br />
              <span className="font-normal">MEETS GENUINE</span>{" "}
              <span className="font-bold">COMFORT.</span>
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card text-center group">
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/20">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Number */}
                  <div className="text-5xl md:text-7xl font-bold text-white mb-3">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="text-base md:text-lg text-gray-300 font-light">
                    {stat.label}
                  </div>

                  {/* Decorative Line */}
                  <div className="mt-6 mx-auto w-12 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-300 text-lg mb-6">
              Experience world-class dental care backed by cutting-edge
              technology
            </p>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />
      </section>

      {/* Beyond Dentistry - Core Values Section */}
      <section
        ref={servicesRef}
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20 service-card">
            <div className="inline-block mb-6">
              <span className="text-sm uppercase tracking-[0.3em] text-gray-500 border border-gray-300 px-6 py-2 rounded-full">
                About Clinic
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light leading-tight mb-4">
              Beyond Dentistry
              <br />
              <span className="block mt-2">
                — Where <span className="text-primary font-bold">Care</span>
              </span>
              <span className="block mt-2">
                Becomes <span className="text-primary font-bold">Craft</span>
              </span>
            </h2>
          </div>

          {/* Core Values Cards */}
          <div className="relative">
            {/* Cards Container with Horizontal Scroll */}
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className={`service-card min-w-[300px] md:min-w-[350px] snap-center ${
                    value.featured ? "transform scale-105" : ""
                  }`}
                >
                  <Card
                    className={`h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${
                      value.color
                    } ${value.featured ? "ring-2 ring-primary ring-offset-4" : ""}`}
                  >
                    <CardContent className="p-8 h-full flex flex-col">
                      {/* Number Badge */}
                      <div
                        className={`text-6xl md:text-7xl font-bold mb-6 ${
                          value.featured ? "text-primary" : "text-gray-300"
                        }`}
                      >
                        {value.number}
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-2xl font-bold mb-4 ${
                          value.featured ? "text-primary" : "text-gray-900"
                        }`}
                      >
                        {value.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {value.description}
                      </p>

                      {/* Featured Badge */}
                      {value.featured && (
                        <div className="mt-6 pt-6 border-t border-primary/20">
                          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                            <Sparkles className="w-4 h-4" />
                            Featured Approach
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {coreValues.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === 1
                      ? "bg-primary w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Experience dental care that goes beyond routine treatments—where
              every procedure is crafted with precision and genuine care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="rounded-full px-8">
                  Explore All Services
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/appointments/book">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-white">
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
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
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
      <section className="py-20 bg-secondary/30">
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
              <Card key={index} className="glass border-none">
                <CardContent className="p-8 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
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
                Book your appointment today and take the first step towards
                perfect oral health
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
