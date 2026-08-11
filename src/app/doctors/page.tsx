"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMotion from "@/components/motion/PageMotion";
import Link from "next/link";
import { Calendar, Star, Award, MapPin, Search } from "lucide-react";

const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    image: "👩‍⚕️",
    specialization: "General Dentistry & Implantology",
    experience: 12,
    rating: 4.9,
    reviews: 256,
    languages: ["English", "Spanish"],
    education: "DDS, Harvard School of Dental Medicine",
    certifications: ["Board Certified", "Invisalign Certified"],
    bio: "Passionate about providing comprehensive dental care with a gentle touch.",
    availableDays: ["Mon", "Wed", "Fri"],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    image: "👨‍⚕️",
    specialization: "Orthodontics & Facial Orthopedics",
    experience: 10,
    rating: 4.8,
    reviews: 189,
    languages: ["English", "Mandarin"],
    education: "DMD, University of Pennsylvania",
    certifications: ["Board Certified Orthodontist"],
    bio: "Expert in creating beautiful smiles through advanced orthodontic treatments.",
    availableDays: ["Tue", "Thu", "Sat"],
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    image: "👩‍⚕️",
    specialization: "Cosmetic & Aesthetic Dentistry",
    experience: 8,
    rating: 5.0,
    reviews: 324,
    languages: ["English", "Spanish", "French"],
    education: "DDS, UCLA School of Dentistry",
    certifications: ["Cosmetic Dentistry Certified", "Veneers Specialist"],
    bio: "Dedicated to helping patients achieve their dream smile through cosmetic procedures.",
    availableDays: ["Mon", "Tue", "Thu"],
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    image: "👨‍⚕️",
    specialization: "Oral & Maxillofacial Surgery",
    experience: 15,
    rating: 4.9,
    reviews: 201,
    languages: ["English"],
    education: "DDS, MD, Columbia University",
    certifications: ["Board Certified Oral Surgeon", "Dental Implant Specialist"],
    bio: "Specializing in complex surgical procedures with minimally invasive techniques.",
    availableDays: ["Mon", "Wed", "Fri"],
  },
  {
    id: "5",
    name: "Dr. Lisa Anderson",
    image: "👩‍⚕️",
    specialization: "Pediatric Dentistry",
    experience: 9,
    rating: 4.9,
    reviews: 412,
    languages: ["English", "Spanish"],
    education: "DDS, Boston University",
    certifications: ["Board Certified Pediatric Dentist"],
    bio: "Creating positive dental experiences for children in a fun, caring environment.",
    availableDays: ["Tue", "Wed", "Thu"],
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    image: "👨‍⚕️",
    specialization: "Endodontics & Root Canal Therapy",
    experience: 11,
    rating: 4.8,
    reviews: 178,
    languages: ["English", "Korean"],
    education: "DDS, NYU College of Dentistry",
    certifications: ["Board Certified Endodontist"],
    bio: "Expert in saving teeth through advanced endodontic procedures.",
    availableDays: ["Mon", "Tue", "Fri"],
  },
];

const specializations = [
  "All Specializations",
  "General Dentistry",
  "Orthodontics",
  "Cosmetic Dentistry",
  "Oral Surgery",
  "Pediatric Dentistry",
  "Endodontics",
];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All Specializations");

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec =
      selectedSpec === "All Specializations" ||
      doctor.specialization.includes(selectedSpec);
    return matchesSearch && matchesSpec;
  });

  return (
    <>
      <Navbar />

      <PageMotion deps={[filteredDoctors]}>
        <section className="page-hero bg-gradient-to-br from-primary/10 to-accent/10 pb-16 pt-32">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="hero-anim mb-6 text-5xl font-bold md:text-6xl">
              Meet Our <span className="gradient-text">Expert Dentists</span>
            </h1>
            <p className="hero-anim mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
              World-class dental professionals dedicated to your oral health and
              beautiful smile
            </p>

            <div className="hero-anim mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 pl-12 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="anim-section reveal border-b py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              {specializations.map((spec) => (
                <Button
                  key={spec}
                  variant={selectedSpec === spec ? "default" : "outline"}
                  onClick={() => setSelectedSpec(spec)}
                  size="sm"
                >
                  {spec}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {filteredDoctors.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-xl text-muted-foreground">
                  No doctors found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="reveal-stagger grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDoctors.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className="reveal-item shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-premium"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4 text-center">
                        <div className="mb-3 text-7xl">{doctor.image}</div>
                        <h3 className="mb-1 text-2xl font-bold">{doctor.name}</h3>
                        <p className="mb-2 text-sm font-medium text-primary">
                          {doctor.specialization}
                        </p>

                        <div className="mb-3 flex items-center justify-center space-x-1">
                          <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{doctor.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({doctor.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="mb-6 space-y-3">
                        <div className="flex items-start space-x-2">
                          <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Experience</p>
                            <p className="text-sm text-muted-foreground">
                              {doctor.experience} years
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Languages</p>
                            <p className="text-sm text-muted-foreground">
                              {doctor.languages.join(", ")}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="mb-1 text-sm font-medium">Available Days</p>
                          <div className="flex gap-2">
                            {doctor.availableDays.map((day) => (
                              <span
                                key={day}
                                className="rounded bg-primary/10 px-2 py-1 text-xs text-primary"
                              >
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-sm italic text-muted-foreground">
                          &ldquo;{doctor.bio}&rdquo;
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/doctors/${doctor.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Profile
                          </Button>
                        </Link>
                        <Link
                          href={`/appointments/book?doctor=${doctor.id}`}
                          className="flex-1"
                        >
                          <Button className="w-full">
                            <Calendar className="mr-2 h-4 w-4" />
                            Book
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="anim-section reveal-scale bg-secondary/30 py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-4xl font-bold">
              Can&apos;t Find the Right Specialist?
            </h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Contact us and we&apos;ll help you find the perfect doctor for your
              needs
            </p>
            <Link href="/contact">
              <Button size="lg" className="shadow-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </PageMotion>

      <Footer />
    </>
  );
}
