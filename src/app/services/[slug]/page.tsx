"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, CheckCircle, Clock, DollarSign, ArrowLeft } from "lucide-react";

const servicesData: Record<string, any> = {
  "general-dentistry": {
    title: "General Dentistry",
    description: "Comprehensive oral health care for the whole family",
    icon: "🦷",
    duration: "30-60 min",
    priceRange: "$80-$200",
    fullDescription: "Our general dentistry services provide comprehensive oral health care to keep your teeth and gums healthy. We focus on preventive care to help you maintain optimal oral health and catch potential issues early.",
    benefits: [
      "Prevent dental problems before they start",
      "Maintain healthy teeth and gums",
      "Early detection of oral health issues",
      "Professional cleaning and polishing",
      "Personalized oral hygiene guidance",
    ],
    procedures: [
      { name: "Dental Examination", description: "Comprehensive oral health assessment" },
      { name: "Professional Cleaning", description: "Remove plaque and tartar buildup" },
      { name: "X-rays", description: "Diagnostic imaging when needed" },
      { name: "Fluoride Treatment", description: "Strengthen tooth enamel" },
      { name: "Oral Cancer Screening", description: "Early detection screening" },
    ],
    faqs: [
      {
        question: "How often should I visit the dentist?",
        answer: "We recommend visiting every 6 months for routine checkups and cleanings.",
      },
      {
        question: "Does dental cleaning hurt?",
        answer: "Professional cleanings are generally painless. Some sensitivity is normal if you have gum disease.",
      },
    ],
  },
  "cosmetic-dentistry": {
    title: "Cosmetic Dentistry",
    description: "Transform your smile with advanced cosmetic procedures",
    icon: "✨",
    duration: "60-120 min",
    priceRange: "$300-$2,000",
    fullDescription: "Enhance your smile's appearance with our comprehensive cosmetic dentistry services. We use the latest techniques and materials to give you the confident, beautiful smile you deserve.",
    benefits: [
      "Boost your self-confidence",
      "Improve smile aesthetics",
      "Natural-looking results",
      "Long-lasting transformations",
      "Customized treatment plans",
    ],
    procedures: [
      { name: "Porcelain Veneers", description: "Ultra-thin shells for perfect teeth" },
      { name: "Teeth Bonding", description: "Repair chips and gaps" },
      { name: "Smile Makeover", description: "Complete smile transformation" },
      { name: "Gum Contouring", description: "Reshape your gum line" },
    ],
    faqs: [
      {
        question: "How long do veneers last?",
        answer: "With proper care, porcelain veneers can last 10-15 years or longer.",
      },
      {
        question: "Is cosmetic dentistry covered by insurance?",
        answer: "Most cosmetic procedures are not covered, but we offer flexible payment plans.",
      },
    ],
  },
  "dental-implants": {
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions",
    icon: "🔧",
    duration: "Multiple visits",
    priceRange: "$2,000-$5,000",
    fullDescription: "Dental implants are the gold standard for tooth replacement. They look, feel, and function just like natural teeth, providing a permanent solution that preserves your jawbone and facial structure.",
    benefits: [
      "Permanent tooth replacement",
      "Natural look and feel",
      "Preserve jawbone health",
      "Improved chewing ability",
      "No impact on adjacent teeth",
    ],
    procedures: [
      { name: "Consultation & Planning", description: "3D imaging and treatment design" },
      { name: "Implant Placement", description: "Surgical insertion of titanium post" },
      { name: "Healing Period", description: "3-6 months osseointegration" },
      { name: "Abutment Placement", description: "Connector for crown" },
      { name: "Crown Placement", description: "Custom crown attachment" },
    ],
    faqs: [
      {
        question: "How long does the implant process take?",
        answer: "The complete process typically takes 3-6 months from start to finish.",
      },
      {
        question: "Are dental implants painful?",
        answer: "The procedure is done under anesthesia. Most patients report minimal discomfort during recovery.",
      },
    ],
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug] || servicesData["general-dentistry"];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </Link>
          
          <div className="flex items-start space-x-6">
            <div className="text-6xl">{service.icon}</div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-4">{service.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-5 h-5 mr-2" />
                  {service.duration}
                </div>
                <div className="flex items-center text-primary font-semibold">
                  <DollarSign className="w-5 h-5 mr-1" />
                  {service.priceRange}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-3xl font-bold mb-4">Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedure Steps */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Procedure Steps</h2>
                <div className="space-y-4">
                  {service.procedures.map((procedure: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              {procedure.name}
                            </h3>
                            <p className="text-muted-foreground">
                              {procedure.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {service.faqs.map((faq: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Book Appointment Card */}
              <Card className="sticky top-24 shadow-premium">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Ready to Book?</h3>
                  <p className="text-muted-foreground mb-6">
                    Schedule your appointment today and take the first step towards a healthier smile.
                  </p>
                  <Link href="/appointments/book">
                    <Button className="w-full mb-3" size="lg">
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Appointment
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Consultation with our expert team</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Personalized treatment plan</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>State-of-the-art equipment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Comfortable, caring environment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Follow-up care and support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
