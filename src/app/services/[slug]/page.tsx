"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMotion from "@/components/motion/PageMotion";
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
  "teeth-whitening": {
    title: "Teeth Whitening",
    description: "Professional whitening for a brighter, more confident smile",
    icon: "💎",
    duration: "60-90 min",
    priceRange: "$300-$600",
    fullDescription:
      "Our professional whitening treatments safely lift stains and discoloration for a noticeably brighter smile in a single visit or with custom take-home trays.",
    benefits: [
      "Faster, more predictable results than OTC kits",
      "Dentist-supervised and enamel-safe",
      "Custom shade matching",
      "Long-lasting brightness with proper care",
    ],
    procedures: [
      { name: "Shade Assessment", description: "Evaluate current color and goals" },
      { name: "Protection", description: "Isolate gums and soft tissue" },
      { name: "Whitening Application", description: "Professional-strength gel and light activation if needed" },
      { name: "Aftercare Guidance", description: "Tips to maintain your new shade" },
    ],
    faqs: [
      {
        question: "How long do results last?",
        answer: "Typically 6–24 months depending on diet, smoking, and oral hygiene.",
      },
      {
        question: "Will whitening make my teeth sensitive?",
        answer: "Mild temporary sensitivity is common and usually resolves within a day or two.",
      },
    ],
  },
  orthodontics: {
    title: "Orthodontics & Braces",
    description: "Straighten teeth with braces or clear aligners",
    icon: "🎯",
    duration: "12-24 months",
    priceRange: "$3,000-$8,000",
    fullDescription:
      "From traditional braces to clear aligners, our orthodontic care corrects bite issues and creates balanced, confident smiles for teens and adults.",
    benefits: [
      "Improved bite and jaw alignment",
      "Easier cleaning and healthier gums",
      "Discreet clear aligner options",
      "Customized treatment timelines",
    ],
    procedures: [
      { name: "Consultation & Scan", description: "Digital imaging and treatment planning" },
      { name: "Appliance Placement", description: "Braces or aligner fitting" },
      { name: "Progress Visits", description: "Adjustments and monitoring" },
      { name: "Retention", description: "Retainers to protect your new smile" },
    ],
    faqs: [
      {
        question: "Are clear aligners right for me?",
        answer: "They work well for many mild-to-moderate cases. Complex bites may need braces.",
      },
      {
        question: "How often are appointments?",
        answer: "Usually every 6–10 weeks depending on your treatment plan.",
      },
    ],
  },
  "root-canal": {
    title: "Root Canal Treatment",
    description: "Save infected teeth and eliminate pain",
    icon: "🏥",
    duration: "60-90 min",
    priceRange: "$800-$1,500",
    fullDescription:
      "Root canal therapy removes infected pulp, cleans the canals, and seals the tooth so you can keep your natural smile pain-free.",
    benefits: [
      "Relieve toothache and infection",
      "Preserve your natural tooth",
      "Prevent spread of infection",
      "Restore chewing function",
    ],
    procedures: [
      { name: "Diagnosis", description: "Exam and X-rays to confirm need" },
      { name: "Cleaning", description: "Remove infected tissue from canals" },
      { name: "Sealing", description: "Fill and seal the tooth" },
      { name: "Restoration", description: "Crown or filling for lasting strength" },
    ],
    faqs: [
      {
        question: "Is a root canal painful?",
        answer: "With modern anesthesia, most patients say it feels similar to getting a filling.",
      },
      {
        question: "Do I always need a crown after?",
        answer: "Often yes for back teeth, to protect the tooth from fracture.",
      },
    ],
  },
  "pediatric-dentistry": {
    title: "Pediatric Dentistry",
    description: "Gentle dental care designed for children",
    icon: "👶",
    duration: "30-45 min",
    priceRange: "$60-$150",
    fullDescription:
      "We create positive first dental experiences with age-appropriate care, from cleanings and sealants to early orthodontic guidance.",
    benefits: [
      "Kid-friendly environment",
      "Preventive focus",
      "Early detection of issues",
      "Education for parents and kids",
    ],
    procedures: [
      { name: "Wellness Visit", description: "Exam, cleaning, and fluoride as needed" },
      { name: "Sealants", description: "Protect molars from cavities" },
      { name: "Growth Monitoring", description: "Track bite and jaw development" },
      { name: "Habit Coaching", description: "Brushing and diet guidance" },
    ],
    faqs: [
      {
        question: "When should my child first visit?",
        answer: "By their first birthday or within 6 months of the first tooth erupting.",
      },
      {
        question: "Are X-rays safe for kids?",
        answer: "We use low-dose digital imaging only when clinically needed.",
      },
    ],
  },
  "emergency-dentistry": {
    title: "Emergency Dental Care",
    description: "Urgent care for pain, trauma, and sudden dental issues",
    icon: "🚨",
    duration: "Immediate",
    priceRange: "$100-$500",
    fullDescription:
      "Same-day urgent care for severe pain, broken teeth, abscesses, and dental trauma—so you get relief fast.",
    benefits: [
      "Rapid pain relief",
      "Same-day appointments when available",
      "Stabilization of injuries",
      "Clear next-step treatment plans",
    ],
    procedures: [
      { name: "Triage", description: "Assess urgency and symptoms" },
      { name: "Pain Control", description: "Medication and local anesthesia as needed" },
      { name: "Stabilization", description: "Temporary repairs or drainage" },
      { name: "Follow-up Plan", description: "Definitive treatment scheduling" },
    ],
    faqs: [
      {
        question: "What counts as a dental emergency?",
        answer: "Uncontrolled pain, swelling, trauma, knocked-out teeth, and uncontrolled bleeding.",
      },
      {
        question: "Should I go to the ER?",
        answer: "For life-threatening issues yes; for most tooth pain, call us first.",
      },
    ],
  },
  "oral-surgery": {
    title: "Oral Surgery",
    description: "Extractions teeth, wisdom teeth, and surgical care",
    icon: "⚕️",
    duration: "45-120 min",
    priceRange: "$200-$2,000",
    fullDescription:
      "Our surgical team provides extractions-tooth care, wisdom teeth removal, and related procedures with a focus on comfort and smooth recovery.",
    benefits: [
      "Experienced surgical clinicians",
      "Minimally invasive techniques when possible",
      "Clear recovery instructions",
      "Sedation options when appropriate",
    ],
    procedures: [
      { name: "Consultation", description: "Exam, imaging, and planning" },
      { name: "Procedure", description: "Extraction or surgical treatment" },
      { name: "Recovery Support", description: "Medications and aftercare" },
      { name: "Follow-up", description: "Healing check and next steps" },
    ],
    faqs: [
      {
        question: "How long is recovery after wisdom teeth removal?",
        answer: "Most people feel significantly better within 3–7 days.",
      },
      {
        question: "Will I be sedated?",
        answer: "Options range from local anesthesia to sedation based on complexity and preference.",
      },
    ],
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug];

  if (!service) {
    return (
      <PageMotion>
        <Navbar />
        <div className="reveal-scale mx-auto max-w-3xl px-4 pb-20 pt-32 text-center">
          <h1 className="mb-4 text-3xl font-bold">Service not found</h1>
          <Link href="/services">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
        </div>
        <Footer />
      </PageMotion>
    );
  }

  return (
    <PageMotion>
      <Navbar />

      {/* Hero Section */}
      <section className="page-hero pt-32 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services">
            <Button variant="ghost" className="hero-anim mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </Link>

          <div className="flex items-start space-x-6">
            <div className="hero-anim-scale text-6xl">{service.icon}</div>
            <div className="flex-1">
              <h1 className="hero-anim text-5xl font-bold mb-4">{service.title}</h1>
              <p className="hero-anim text-xl text-muted-foreground mb-6">
                {service.description}
              </p>
              <div className="hero-anim flex flex-wrap gap-4">
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
              <div className="reveal">
                <h2 className="text-3xl font-bold mb-4">Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Benefits */}
              <div className="reveal">
                <h2 className="text-3xl font-bold mb-6">Benefits</h2>
                <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit: string, index: number) => (
                    <div key={index} className="reveal-item flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedure Steps */}
              <div className="reveal">
                <h2 className="text-3xl font-bold mb-6">Procedure Steps</h2>
                <div className="reveal-stagger space-y-4">
                  {service.procedures.map((procedure: any, index: number) => (
                    <Card key={index} className="reveal-item">
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
              <div className="reveal">
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="reveal-stagger space-y-4">
                  {service.faqs.map((faq: any, index: number) => (
                    <Card key={index} className="reveal-item">
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
            <div className="reveal-right space-y-6">
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
    </PageMotion>
  );
}
