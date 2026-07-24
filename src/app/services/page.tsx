"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Clock, DollarSign } from "lucide-react";

const services = [
  {
    id: "general-dentistry",
    title: "General Dentistry",
    description:
      "Comprehensive oral health care including checkups, cleanings, and preventive treatments",
    icon: "🦷",
    duration: "30-60 min",
    priceRange: "$80-$200",
    color: "bg-blue-500",
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    description:
      "Transform your smile with veneers, bonding, and cosmetic procedures",
    icon: "✨",
    duration: "60-120 min",
    priceRange: "$300-$2,000",
    color: "bg-purple-500",
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    description:
      "Professional whitening treatments for a brighter, more confident smile",
    icon: "💎",
    duration: "60-90 min",
    priceRange: "$300-$600",
    color: "bg-cyan-500",
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    description:
      "Permanent tooth replacement solutions that look and function like natural teeth",
    icon: "🔧",
    duration: "Multiple visits",
    priceRange: "$2,000-$5,000",
    color: "bg-green-500",
  },
  {
    id: "orthodontics",
    title: "Orthodontics & Braces",
    description:
      "Straighten your teeth with traditional braces or clear aligners",
    icon: "🎯",
    duration: "12-24 months",
    priceRange: "$3,000-$8,000",
    color: "bg-pink-500",
  },
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    description:
      "Save infected teeth and eliminate pain with advanced endodontic care",
    icon: "🏥",
    duration: "60-90 min",
    priceRange: "$800-$1,500",
    color: "bg-orange-500",
  },
  {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    description:
      "Specialized dental care for children in a friendly, comfortable environment",
    icon: "👶",
    duration: "30-45 min",
    priceRange: "$60-$150",
    color: "bg-yellow-500",
  },
  {
    id: "emergency-dentistry",
    title: "Emergency Dental Care",
    description:
      "24/7 urgent care for dental emergencies, accidents, and severe pain",
    icon: "🚨",
    duration: "Immediate",
    priceRange: "$100-$500",
    color: "bg-red-500",
  },
  {
    id: "oral-surgery",
    title: "Oral Surgery",
    description:
      "Tooth extractions, wisdom teeth removal, and surgical procedures",
    icon: "⚕️",
    duration: "45-120 min",
    priceRange: "$200-$2,000",
    color: "bg-indigo-500",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-br from-primary/10 to-accent/10 pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl font-bold md:text-6xl">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Comprehensive dental care tailored to your unique needs. From
            routine checkups to advanced procedures, we&apos;re here for you.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`}>
                <Card className="group h-full cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-premium">
                  <CardHeader>
                    <div
                      className={`mb-4 flex h-16 w-16 items-center justify-center rounded-xl text-3xl transition-transform group-hover:scale-110 ${service.color}`}
                    >
                      {service.icon}
                    </div>
                    <CardTitle className="mb-2 text-2xl">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {service.duration}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-primary">
                      <DollarSign className="mr-1 h-4 w-4" />
                      {service.priceRange}
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full transition-all group-hover:bg-primary group-hover:text-white"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-4xl font-bold">
            Not Sure Which Service You Need?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Book a consultation with our experts and we&apos;ll help you find
            the perfect treatment plan.
          </p>
          <Link href="/appointments/book">
            <Button size="lg" className="shadow-lg">
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
