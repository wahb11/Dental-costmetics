"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMotion from "@/components/motion/PageMotion";
import { ArrowLeft, Award, Calendar, MapPin, Star } from "lucide-react";

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

export default function DoctorProfilePage() {
  const params = useParams();
  const doctor = useMemo(
    () => doctors.find((d) => d.id === params.id),
    [params.id]
  );

  if (!doctor) {
    return (
      <>
        <Navbar />
        <PageMotion>
          <div className="page-hero mx-auto max-w-3xl px-4 pb-20 pt-32 text-center">
            <h1 className="hero-anim mb-4 text-3xl font-bold">Doctor not found</h1>
            <Link href="/doctors" className="hero-anim inline-block">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Doctors
              </Button>
            </Link>
          </div>
        </PageMotion>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageMotion>
        <section className="page-hero bg-gradient-to-br from-primary/10 to-accent/10 pb-16 pt-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link href="/doctors" className="hero-anim inline-block">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Doctors
              </Button>
            </Link>
            <Card className="reveal reveal-scale shadow-premium">
              <CardContent className="p-8">
                <div className="mb-8 text-center">
                  <div className="mb-4 text-8xl">{doctor.image}</div>
                  <h1 className="mb-2 text-4xl font-bold">{doctor.name}</h1>
                  <p className="mb-3 text-lg text-primary">{doctor.specialization}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{doctor.rating}</span>
                    <span className="text-muted-foreground">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Award className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Experience</p>
                      <p className="text-muted-foreground">
                        {doctor.experience} years
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Languages</p>
                      <p className="text-muted-foreground">
                        {doctor.languages.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-muted-foreground">{doctor.bio}</p>
                <p className="mb-2 text-sm">
                  <span className="font-medium">Education:</span> {doctor.education}
                </p>
                <p className="mb-6 text-sm">
                  <span className="font-medium">Certifications:</span>{" "}
                  {doctor.certifications.join(", ")}
                </p>

                <div className="mb-8">
                  <p className="mb-2 font-medium">Available Days</p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availableDays.map((day) => (
                      <span
                        key={day}
                        className="rounded bg-primary/10 px-3 py-1 text-sm text-primary"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href={`/appointments/book?doctor=${doctor.id}`}>
                  <Button size="lg" className="w-full">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book with {doctor.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </PageMotion>
      <Footer />
    </>
  );
}
