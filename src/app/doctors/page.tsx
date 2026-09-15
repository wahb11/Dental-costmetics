"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMotion from "@/components/motion/PageMotion";
import Link from "next/link";
import { Calendar, Star, Award, MapPin, Search, Phone } from "lucide-react";

const doctors = [
  {
    id: "1",
    name: "Dr. Moazzam",
    image: "/images/dr-moazzam.png",
    specialization: "General & Cosmetic Dentistry, Root Canal Specialist",
    experience: 15,
    rating: 4.9,
    reviews: 63,
    languages: ["English", "Urdu"],
    education: "BDS - Bachelor of Dental Surgery",
    certifications: ["Root Canal Specialist", "Cosmetic Dentistry", "Dental Implants"],
    bio: "Dr. Moazzam is a highly skilled and experienced dentist specializing in cosmetic dentistry and root canal treatments. With over 15 years of experience, he is known for his gentle approach, meticulous attention to detail, and commitment to providing the best treatment with the latest innovations. Patients consistently praise his professionalism, expertise, and the comfortable environment he creates.",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    clinicAddress: "Model town, bank square market, Block C Model Town, Lahore, 54700",
    phone: "0302 3699996",
  },
];

const specializations = [
  "All Specializations",
  "General Dentistry",
  "Cosmetic Dentistry",
  "Root Canal Treatment",
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
            Meet <span className="gradient-text">Dr. Moazzam</span>
          </h1>
          <p className="hero-anim mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
            Expert dental professional dedicated to your oral health and beautiful smile. Specializing in cosmetic dentistry and root canal treatments in Lahore.
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
              <div className="reveal-stagger grid grid-cols-1 gap-6">
                {filteredDoctors.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className="reveal-item shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-premium"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4 text-center">
                        <div className="mb-3 relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary shadow-lg">
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
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
                          <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Clinic Location</p>
                            <p className="text-sm text-muted-foreground">
                              {doctor.clinicAddress}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Contact</p>
                            <p className="text-sm text-muted-foreground">
                              <a href={`tel:${doctor.phone}`} className="hover:text-primary transition-colors">
                                {doctor.phone}
                              </a>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
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
