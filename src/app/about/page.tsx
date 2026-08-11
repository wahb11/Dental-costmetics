"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMotion from "@/components/motion/PageMotion";
import Link from "next/link";
import { Award, Heart, Users, Target, Calendar, Sparkles } from "lucide-react";

const milestones = [
  {
    year: "2011",
    title: "Founded",
    description: "Started with a vision to revolutionize dental care",
  },
  {
    year: "2015",
    title: "Expansion",
    description: "Opened our second location and hired 10+ dentists",
  },
  {
    year: "2018",
    title: "Technology",
    description: "Introduced state-of-the-art 3D imaging technology",
  },
  {
    year: "2020",
    title: "Digital First",
    description: "Launched online booking and patient portal",
  },
  {
    year: "2023",
    title: "Award Winning",
    description: "Recognized as Best Dental Clinic in the region",
  },
  {
    year: "2026",
    title: "Innovation",
    description: "SmileSync platform launched with AI diagnostics",
  },
];

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "Your comfort and well-being are our top priorities",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in dental care",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Embracing cutting-edge technology and techniques",
  },
  {
    icon: Users,
    title: "Teamwork",
    description: "Collaborative approach for comprehensive care",
  },
];

const team = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Dental Officer",
    image: "👩‍⚕️",
    specialization: "General Dentistry & Implantology",
  },
  {
    name: "Dr. Michael Chen",
    role: "Head of Orthodontics",
    image: "👨‍⚕️",
    specialization: "Orthodontics & Facial Orthopedics",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Cosmetic Specialist",
    image: "👩‍⚕️",
    specialization: "Cosmetic & Aesthetic Dentistry",
  },
  {
    name: "Dr. James Wilson",
    role: "Oral Surgeon",
    image: "👨‍⚕️",
    specialization: "Oral & Maxillofacial Surgery",
  },
];

export default function AboutPage() {
  return (
    <PageMotion>
      <Navbar />

      <section className="page-hero bg-gradient-to-br from-primary/10 to-accent/10 pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="hero-anim mb-6 text-5xl font-bold md:text-6xl">
            About <span className="gradient-text">SmileSync</span>
          </h1>
          <p className="hero-anim mx-auto max-w-3xl text-xl text-muted-foreground">
            Transforming dental care through innovation, compassion, and
            excellence. We&apos;re more than a clinic—we&apos;re your partners
            in oral health.
          </p>
        </div>
      </section>

      <section className="anim-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="reveal-left shadow-premium">
              <CardContent className="p-8">
                <Target className="mb-4 h-12 w-12 text-primary" />
                <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  To provide exceptional, patient-centered dental care using the
                  latest technology and techniques. We&apos;re committed to
                  making every visit comfortable, efficient, and effective.
                </p>
              </CardContent>
            </Card>

            <Card className="reveal-right shadow-premium">
              <CardContent className="p-8">
                <Sparkles className="mb-4 h-12 w-12 text-primary" />
                <h2 className="mb-4 text-3xl font-bold">Our Vision</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  To revolutionize dental care by seamlessly integrating
                  advanced technology with personalized service, making quality
                  oral healthcare accessible and enjoyable for everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="anim-section bg-secondary/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="reveal mb-4 text-4xl font-bold">Our Journey</h2>
            <p className="reveal text-xl text-muted-foreground">
              15+ years of excellence in dental care
            </p>
          </div>

          <div className="reveal-stagger grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {milestones.map((milestone) => (
              <Card key={milestone.year} className="reveal-item shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                    {milestone.year.slice(2)}
                  </div>
                  <p className="mb-1 text-sm font-medium text-primary">
                    {milestone.year}
                  </p>
                  <h3 className="mb-2 text-xl font-semibold">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="anim-section py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="reveal mb-4 text-4xl font-bold">Our Core Values</h2>
            <p className="reveal text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="reveal-stagger grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="reveal-item text-center shadow-lg">
                <CardContent className="p-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="anim-section bg-secondary/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="reveal mb-4 text-4xl font-bold">Meet Our Leadership</h2>
            <p className="reveal text-xl text-muted-foreground">
              Expert professionals dedicated to your care
            </p>
          </div>

          <div className="reveal-stagger grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card
                key={member.name}
                className="reveal-item text-center shadow-lg transition-all hover:shadow-premium"
              >
                <CardContent className="p-6">
                  <div className="mb-4 text-6xl">{member.image}</div>
                  <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                  <p className="mb-2 text-sm font-medium text-primary">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.specialization}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/doctors">
              <Button size="lg">
                View All Doctors
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="anim-section py-16 md:py-20">
        <div className="reveal-scale mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold">
            Ready to Experience the SmileSync Difference?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Join thousands of satisfied patients who trust us with their smiles
          </p>
          <Link href="/appointments/book">
            <Button size="lg" className="shadow-lg">
              <Calendar className="mr-2 h-5 w-5" />
              Book Your Appointment
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </PageMotion>
  );
}
