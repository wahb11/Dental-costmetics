"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Award, Heart, Users, Target, Calendar, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "2011", title: "Founded", description: "Started with a vision to revolutionize dental care" },
  { year: "2015", title: "Expansion", description: "Opened our second location and hired 10+ dentists" },
  { year: "2018", title: "Technology", description: "Introduced state-of-the-art 3D imaging technology" },
  { year: "2020", title: "Digital First", description: "Launched online booking and patient portal" },
  { year: "2023", title: "Award Winning", description: "Recognized as Best Dental Clinic in the region" },
  { year: "2026", title: "Innovation", description: "SmileSync platform launched with AI diagnostics" },
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
  const timelineRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    // Timeline animation
    gsap.from(".timeline-item", {
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 80%",
      },
      x: -100,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Values animation
    gsap.from(".value-card", {
      scrollTrigger: {
        trigger: valuesRef.current,
        start: "top 80%",
      },
      y: 80,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Team animation
    gsap.from(".team-card", {
      scrollTrigger: {
        trigger: teamRef.current,
        start: "top 80%",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">SmileSync</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming dental care through innovation, compassion, and excellence. 
            We're more than a clinic—we're your partners in oral health.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-premium">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To provide exceptional, patient-centered dental care using the latest 
                  technology and techniques. We're committed to making every visit 
                  comfortable, efficient, and effective.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-premium">
              <CardContent className="p-8">
                <Sparkles className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To revolutionize dental care by seamlessly integrating advanced 
                  technology with personalized service, making quality oral healthcare 
                  accessible and enjoyable for everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              15+ years of excellence in dental care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="timeline-item shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="value-card text-center shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-muted-foreground">
              Expert professionals dedicated to your care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="team-card text-center shadow-lg hover:shadow-premium transition-all">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.specialization}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/doctors">
              <Button size="lg">
                View All Doctors
                <Users className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience the SmileSync Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of satisfied patients who trust us with their smiles
          </p>
          <Link href="/appointments/book">
            <Button size="lg" className="shadow-lg">
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Appointment
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
