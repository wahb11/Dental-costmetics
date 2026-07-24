"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Clock, DollarSign } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "general-dentistry",
    title: "General Dentistry",
    description: "Comprehensive oral health care including checkups, cleanings, and preventive treatments",
    icon: "🦷",
    duration: "30-60 min",
    priceRange: "$80-$200",
    color: "bg-blue-500",
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    description: "Transform your smile with veneers, bonding, and cosmetic procedures",
    icon: "✨",
    duration: "60-120 min",
    priceRange: "$300-$2,000",
    color: "bg-purple-500",
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    description: "Professional whitening treatments for a brighter, more confident smile",
    icon: "💎",
    duration: "60-90 min",
    priceRange: "$300-$600",
    color: "bg-cyan-500",
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions that look and function like natural teeth",
    icon: "🔧",
    duration: "Multiple visits",
    priceRange: "$2,000-$5,000",
    color: "bg-green-500",
  },
  {
    id: "orthodontics",
    title: "Orthodontics & Braces",
    description: "Straighten your teeth with traditional braces or clear aligners",
    icon: "🎯",
    duration: "12-24 months",
    priceRange: "$3,000-$8,000",
    color: "bg-pink-500",
  },
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    description: "Save infected teeth and eliminate pain with advanced endodontic care",
    icon: "🏥",
    duration: "60-90 min",
    priceRange: "$800-$1,500",
    color: "bg-orange-500",
  },
  {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    description: "Specialized dental care for children in a friendly, comfortable environment",
    icon: "👶",
    duration: "30-45 min",
    priceRange: "$60-$150",
    color: "bg-yellow-500",
  },
  {
    id: "emergency-dentistry",
    title: "Emergency Dental Care",
    description: "24/7 urgent care for dental emergencies, accidents, and severe pain",
    icon: "🚨",
    duration: "Immediate",
    priceRange: "$100-$500",
    color: "bg-red-500",
  },
  {
    id: "oral-surgery",
    title: "Oral Surgery",
    description: "Tooth extractions, wisdom teeth removal, and surgical procedures",
    icon: "⚕️",
    duration: "45-120 min",
    priceRange: "$200-$2,000",
    color: "bg-indigo-500",
  },
];

export default function ServicesPage() {
  const servicesRef = useRef(null);

  useEffect(() => {
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 80%",
      },
      y: 80,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive dental care tailored to your unique needs. From routine checkups to advanced procedures, we're here for you.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link key={service.id} href={`/services/${service.id}`}>
                <Card className="service-card group hover:shadow-premium transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full">
                  <CardHeader>
                    <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform`}>
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {service.duration}
                    </div>
                    <div className="flex items-center text-sm text-primary font-semibold">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {service.priceRange}
                    </div>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Book a consultation with our experts and we'll help you find the perfect treatment plan.
          </p>
          <Link href="/appointments/book">
            <Button size="lg" className="shadow-lg">
              Schedule Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
