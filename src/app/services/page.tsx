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
import PageMotion from "@/components/motion/PageMotion";
import { ArrowRight, Clock, Activity, Zap, Wrench, Wind, Stethoscope, GitBranch } from "lucide-react";

const services = [
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    description:
      "Save infected teeth and eliminate pain with advanced endodontic care by Dr. Moazzam",
    icon: Activity,
    duration: "60-90 min",
    priceRange: "Contact for pricing",
    color: "bg-red-500",
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening & Bleaching",
    description:
      "Professional whitening treatments for a brighter, more confident smile",
    icon: Zap,
    duration: "60-90 min",
    priceRange: "Contact for pricing",
    color: "bg-cyan-500",
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    description:
      "Permanent tooth replacement solutions that look and function like natural teeth",
    icon: Wrench,
    duration: "Multiple visits",
    priceRange: "Contact for pricing",
    color: "bg-green-500",
  },
  {
    id: "scaling",
    title: "Scaling & Teeth Cleaning",
    description:
      "Professional deep cleaning to remove plaque, tartar and prevent gum disease",
    icon: Wind,
    duration: "45-60 min",
    priceRange: "Contact for pricing",
    color: "bg-blue-500",
  },
  {
    id: "filling",
    title: "Tooth Filling",
    description:
      "Restore damaged or decayed teeth with high-quality filling materials",
    icon: Stethoscope,
    duration: "30-45 min",
    priceRange: "Contact for pricing",
    color: "bg-purple-500",
  },
  {
    id: "bridges-dentures",
    title: "Bridges & Dentures",
    description:
      "Custom-made bridges and dentures to restore your smile and function",
    icon: GitBranch,
    duration: "Multiple visits",
    priceRange: "Contact for pricing",
    color: "bg-orange-500",
  },
];

export default function ServicesPage() {
  return (
    <PageMotion>
      <Navbar />

      <section className="page-hero bg-gradient-to-br from-primary/10 to-accent/10 pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="hero-anim mb-6 text-5xl font-bold md:text-6xl">
            Our <span className="gradient-text">Dental Services</span>
          </h1>
          <p className="hero-anim mx-auto max-w-3xl text-xl text-muted-foreground">
            Expert dental care by Dr. Moazzam. From routine care to advanced cosmetic procedures, we&apos;re here for your dental health.
          </p>
        </div>
      </section>

      <section className="anim-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-stagger grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="reveal-item"
              >
                <Card className="group h-full cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-premium">
                  <CardHeader>
                    <div
                      className={`mb-4 flex h-16 w-16 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${service.color}`}
                    >
                      <service.icon className="h-8 w-8 text-white" />
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

      <section className="anim-section bg-secondary/30 py-16 md:py-20">
        <div className="reveal-scale mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
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
    </PageMotion>
  );
}
