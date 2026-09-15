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
  "root-canal": {
    title: "Root Canal Treatment",
    description: "Save infected teeth and eliminate pain with advanced endodontic care",
    duration: "60-90 min",
    priceRange: "Contact for pricing",
    fullDescription:
      "Root canal therapy removes infected pulp, cleans the canals, and seals the tooth so you can keep your natural smile pain-free. Dr. Moazzam specializes in painless root canal treatments using the latest techniques and equipment.",
    causes: [
      "Deep tooth decay reaching the pulp",
      "Cracked or chipped tooth",
      "Repeated dental procedures on the same tooth",
      "Tooth trauma or injury",
      "Bacterial infection in the tooth pulp",
    ],
    symptoms: [
      "Severe toothache when chewing or applying pressure",
      "Prolonged sensitivity to hot or cold temperatures",
      "Discoloration (darkening) of the tooth",
      "Swelling and tenderness in nearby gums",
      "Persistent or recurring pimple on the gums (abscess)",
      "Bad taste in mouth or bad breath",
    ],
    benefits: [
      "Relieve toothache and infection",
      "Preserve your natural tooth",
      "Prevent spread of infection to surrounding teeth",
      "Restore normal chewing function",
      "Cost-effective compared to tooth extraction and implant",
      "Maintain natural appearance of your smile",
    ],
    procedures: [
      { name: "Diagnosis & X-rays", description: "Comprehensive examination and imaging to confirm infection and plan treatment" },
      { name: "Anesthesia", description: "Local anesthesia to ensure painless procedure" },
      { name: "Pulp Removal", description: "Remove infected or damaged pulp tissue from tooth interior" },
      { name: "Canal Cleaning", description: "Clean, disinfect, and shape the root canals" },
      { name: "Filling & Sealing", description: "Fill canals with biocompatible material and seal the tooth" },
      { name: "Restoration", description: "Crown or filling placement for lasting strength and protection" },
    ],
    faqs: [
      {
        question: "Is a root canal painful?",
        answer: "With modern anesthesia and Dr. Moazzam's gentle technique, most patients experience little to no discomfort. The procedure actually relieves the pain caused by infection.",
      },
      {
        question: "Do I always need a crown after root canal?",
        answer: "For back teeth (molars), a crown is highly recommended to protect the tooth from fracture. Front teeth may only need a filling depending on the extent of damage.",
      },
      {
        question: "How long does recovery take?",
        answer: "Most patients return to normal activities the next day. Some mild sensitivity may last a few days and can be managed with over-the-counter pain relievers.",
      },
    ],
  },
  "teeth-whitening": {
    title: "Teeth Whitening & Bleaching",
    description: "Professional whitening for a brighter, more confident smile",
    duration: "60-90 min",
    priceRange: "Contact for pricing",
    fullDescription:
      "Our professional teeth whitening treatments safely lift stains and discoloration for a noticeably brighter smile. Dr. Moazzam uses advanced whitening systems that deliver dramatic results while protecting your enamel.",
    causes: [
      "Coffee, tea, and red wine consumption",
      "Tobacco use (smoking or chewing)",
      "Natural aging process",
      "Certain medications (antibiotics, antihistamines)",
      "Poor dental hygiene",
      "Fluorosis (excessive fluoride during tooth development)",
    ],
    symptoms: [
      "Yellow or brown tooth discoloration",
      "Surface stains on enamel",
      "Dull or lackluster smile",
      "Uneven tooth color",
      "Loss of confidence in appearance",
    ],
    benefits: [
      "Dramatically whiter teeth in one visit",
      "Boost self-confidence and self-esteem",
      "Safe and dentist-supervised treatment",
      "Customized to your desired shade",
      "Long-lasting results with proper care",
      "Non-invasive cosmetic enhancement",
    ],
    procedures: [
      { name: "Consultation", description: "Assess current tooth color and set whitening goals" },
      { name: "Dental Cleaning", description: "Remove surface debris for optimal results" },
      { name: "Shade Selection", description: "Choose your target shade with professional guidance" },
      { name: "Gum Protection", description: "Apply protective barrier to gums and soft tissue" },
      { name: "Whitening Application", description: "Apply professional-strength whitening gel" },
      { name: "Light Activation", description: "LED light activation for enhanced results (if applicable)" },
      { name: "Final Rinse", description: "Remove gel and reveal your brighter smile" },
      { name: "Aftercare Instructions", description: "Tips to maintain your new brilliant smile" },
    ],
    faqs: [
      {
        question: "How long do whitening results last?",
        answer: "Results typically last 1-3 years depending on lifestyle habits. Avoiding staining foods and maintaining good oral hygiene extends the results.",
      },
      {
        question: "Will whitening make my teeth sensitive?",
        answer: "Mild temporary sensitivity is common but usually resolves within 1-2 days. Dr. Moazzam can recommend desensitizing treatments if needed.",
      },
      {
        question: "Can all teeth be whitened?",
        answer: "Natural teeth respond well to whitening. Crowns, veneers, and fillings won't change color, so we'll help you understand what to expect based on your dental work.",
      },
    ],
  },
  "dental-implants": {
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions that look and function like natural teeth",
    duration: "Multiple visits (3-6 months process)",
    priceRange: "Contact for pricing",
    fullDescription: "Dental implants are the gold standard for tooth replacement. Dr. Moazzam provides expertly placed implants that look, feel, and function just like natural teeth, providing a permanent solution that preserves your jawbone and facial structure.",
    causes: [
      "Tooth loss due to decay or infection",
      "Periodontal (gum) disease",
      "Tooth trauma or injury",
      "Congenital absence of teeth",
      "Failed root canal treatment",
      "Severe tooth fracture",
    ],
    symptoms: [
      "One or more missing teeth",
      "Difficulty chewing or speaking",
      "Shifting of adjacent teeth",
      "Bone loss in the jaw",
      "Changes in facial appearance",
      "Loss of confidence in smile",
      "Discomfort from ill-fitting dentures",
    ],
    benefits: [
      "Permanent tooth replacement solution",
      "Natural look, feel, and function",
      "Preserve jawbone and prevent bone loss",
      "No impact on adjacent healthy teeth",
      "Improved chewing ability and speech",
      "Durable and long-lasting (can last a lifetime)",
      "Easy maintenance like natural teeth",
      "Prevent facial sagging from bone loss",
    ],
    procedures: [
      { name: "Initial Consultation", description: "Comprehensive exam, 3D imaging, and treatment planning" },
      { name: "Bone Grafting (if needed)", description: "Build up jawbone if insufficient for implant support" },
      { name: "Implant Placement Surgery", description: "Surgical insertion of titanium post into jawbone" },
      { name: "Healing Period", description: "3-6 months osseointegration (implant fuses with bone)" },
      { name: "Abutment Placement", description: "Attach connector piece to implant" },
      { name: "Impression & Crown Fabrication", description: "Create custom crown to match your natural teeth" },
      { name: "Crown Placement", description: "Attach final restoration for complete tooth replacement" },
      { name: "Follow-up Care", description: "Regular checkups to ensure implant success" },
    ],
    faqs: [
      {
        question: "How long does the implant process take?",
        answer: "The complete process typically takes 3-6 months from implant placement to final crown. This allows time for the implant to integrate with your jawbone.",
      },
      {
        question: "Are dental implants painful?",
        answer: "The procedure is done under local anesthesia, so you won't feel pain during placement. Most patients report minimal discomfort during recovery, manageable with over-the-counter pain medication.",
      },
      {
        question: "How long do dental implants last?",
        answer: "With proper care and oral hygiene, dental implants can last a lifetime. The crown may need replacement after 10-15 years due to normal wear.",
      },
      {
        question: "Am I a good candidate for dental implants?",
        answer: "Most healthy adults with sufficient jawbone are good candidates. Dr. Moazzam will evaluate your specific situation during the consultation.",
      },
    ],
  },
  "scaling": {
    title: "Scaling & Teeth Cleaning",
    description: "Professional deep cleaning to remove plaque, tartar and prevent gum disease",
    duration: "45-60 min",
    priceRange: "Contact for pricing",
    fullDescription:
      "Professional teeth scaling and cleaning removes hardened plaque (tartar) and bacteria from teeth and below the gumline. Dr. Moazzam provides thorough yet gentle cleaning to maintain optimal oral health and prevent gum disease.",
    causes: [
      "Buildup of plaque and tartar on teeth",
      "Poor or inconsistent oral hygiene",
      "Infrequent dental visits",
      "Diet high in sugars and starches",
      "Smoking or tobacco use",
      "Certain medications that reduce saliva",
    ],
    symptoms: [
      "Yellow or brown deposits on teeth",
      "Bad breath (halitosis) that persists",
      "Swollen, red, or bleeding gums",
      "Gum recession or sensitivity",
      "Loose teeth or tooth mobility",
      "Pain when chewing",
      "Visible calculus (tartar) buildup",
    ],
    benefits: [
      "Remove stubborn plaque and tartar",
      "Prevent gum disease and tooth decay",
      "Fresher breath and cleaner mouth feel",
      "Brighter, cleaner-looking teeth",
      "Early detection of oral health issues",
      "Reduce risk of systemic health problems",
      "Maintain healthy gums and teeth",
    ],
    procedures: [
      { name: "Oral Examination", description: "Check teeth, gums, and overall oral health" },
      { name: "Scaling", description: "Remove plaque and tartar from tooth surfaces and below gumline" },
      { name: "Root Planing (if needed)", description: "Smooth root surfaces to prevent bacteria buildup" },
      { name: "Polishing", description: "Polish teeth to remove surface stains" },
      { name: "Fluoride Treatment", description: "Apply fluoride to strengthen enamel (optional)" },
      { name: "Oral Hygiene Education", description: "Tips for effective home care between visits" },
    ],
    faqs: [
      {
        question: "How often should I get scaling done?",
        answer: "Dr. Moazzam recommends professional cleaning every 6 months for most patients. Those with gum disease may need more frequent visits (every 3-4 months).",
      },
      {
        question: "Does scaling damage tooth enamel?",
        answer: "No, professional scaling is safe and does not damage enamel. It only removes hardened deposits that brushing cannot eliminate.",
      },
      {
        question: "Will scaling hurt?",
        answer: "Most patients experience little to no discomfort. If you have sensitive teeth or gum disease, local anesthesia can be applied to ensure comfort.",
      },
      {
        question: "Why can't I just brush harder at home?",
        answer: "Once plaque hardens into tartar (calculus), it cannot be removed by brushing alone. Professional instruments are needed to safely remove it.",
      },
    ],
  },
  "filling": {
    title: "Tooth Filling",
    description: "Restore damaged or decayed teeth with high-quality filling materials",
    duration: "30-45 min",
    priceRange: "Contact for pricing",
    fullDescription:
      "Tooth fillings restore teeth damaged by decay, cracks, or wear. Dr. Moazzam uses modern composite materials that match your natural tooth color for seamless, durable restorations that preserve your smile's appearance.",
    causes: [
      "Tooth decay (cavities) from bacteria and acids",
      "Cracked or fractured teeth",
      "Worn teeth from grinding (bruxism)",
      "Broken or chipped teeth from trauma",
      "Erosion from acidic foods or GERD",
      "Old fillings that need replacement",
    ],
    symptoms: [
      "Toothache or pain when chewing",
      "Sensitivity to hot, cold, or sweet foods",
      "Visible holes or pits in teeth",
      "Dark spots or discoloration",
      "Rough or sharp edges on teeth",
      "Food getting stuck in teeth",
      "Bad taste or bad breath from decay",
    ],
    benefits: [
      "Stop decay from progressing",
      "Restore tooth structure and function",
      "Eliminate pain and sensitivity",
      "Natural-looking tooth-colored materials",
      "Quick and painless procedure",
      "Prevent need for root canal or extraction",
      "Long-lasting and durable results",
    ],
    procedures: [
      { name: "Examination & Diagnosis", description: "Identify extent of decay or damage with exam and X-rays" },
      { name: "Anesthesia", description: "Local anesthetic to numb the area for comfortable treatment" },
      { name: "Decay Removal", description: "Remove decayed or damaged tooth structure" },
      { name: "Tooth Preparation", description: "Clean and shape the cavity for filling placement" },
      { name: "Filling Placement", description: "Apply composite resin material in layers" },
      { name: "Shaping & Polishing", description: "Contour filling to match natural tooth shape and polish" },
      { name: "Bite Check", description: "Ensure proper bite alignment and comfort" },
    ],
    faqs: [
      {
        question: "How long do fillings last?",
        answer: "Composite fillings typically last 5-10 years or longer with proper care. Longevity depends on location, size, and oral hygiene habits.",
      },
      {
        question: "Will I feel pain during the filling?",
        answer: "No, Dr. Moazzam uses local anesthesia to ensure you feel no pain during the procedure. You may feel slight pressure but no discomfort.",
      },
      {
        question: "Can I eat immediately after a filling?",
        answer: "With composite fillings, you can eat as soon as the numbness wears off (about 1-2 hours). Avoid very hard or sticky foods for the first day.",
      },
      {
        question: "What's the difference between white and silver fillings?",
        answer: "White (composite) fillings match your tooth color and bond to the tooth structure. Silver (amalgam) fillings are visible but very durable. Dr. Moazzam primarily uses tooth-colored fillings for aesthetic results.",
      },
    ],
  },
  "bridges-dentures": {
    title: "Bridges & Dentures",
    description: "Custom-made bridges and dentures to restore your smile and function",
    duration: "Multiple visits (2-4 weeks process)",
    priceRange: "Contact for pricing",
    fullDescription:
      "Dental bridges and dentures are prosthetic solutions for missing teeth. Dr. Moazzam creates custom-fitted restorations that restore your ability to chew, speak, and smile with confidence. Whether you need to replace one tooth or a full arch, we have solutions tailored to your needs.",
    causes: [
      "Tooth loss from decay or gum disease",
      "Tooth extraction due to damage",
      "Trauma or injury",
      "Congenital absence of teeth",
      "Advanced periodontal disease",
      "Failed dental restorations",
    ],
    symptoms: [
      "One or more missing teeth",
      "Difficulty chewing food",
      "Slurred speech or difficulty speaking",
      "Shifting of remaining teeth",
      "Facial sagging or aged appearance",
      "Jaw pain or TMJ issues",
      "Loss of confidence in smile",
      "Nutritional deficiencies from limited diet",
    ],
    benefits: [
      "Restore ability to eat and chew properly",
      "Improve speech and pronunciation",
      "Prevent remaining teeth from shifting",
      "Support facial structure and appearance",
      "Boost self-confidence and smile",
      "Customized for natural appearance",
      "Affordable tooth replacement option",
      "Improve overall quality of life",
    ],
    procedures: [
      { name: "Consultation", description: "Evaluate oral health and discuss replacement options" },
      { name: "Impressions & Measurements", description: "Take precise molds of your mouth" },
      { name: "Tooth Preparation (for bridges)", description: "Shape adjacent teeth to support the bridge" },
      { name: "Temporary Restoration", description: "Provide temporary prosthetic while permanent is made" },
      { name: "Fabrication", description: "Custom creation of bridge or denture in dental lab" },
      { name: "Fitting & Adjustments", description: "Try in prosthetic and make necessary adjustments" },
      { name: "Final Placement", description: "Permanently cement bridge or deliver denture" },
      { name: "Follow-up Care", description: "Instruction on care and maintenance, schedule checkups" },
    ],
    faqs: [
      {
        question: "What's the difference between a bridge and a denture?",
        answer: "A bridge is fixed (cemented) and replaces one or more teeth using adjacent teeth for support. Dentures are removable and can replace several teeth (partial denture) or all teeth (full denture).",
      },
      {
        question: "How long do bridges and dentures last?",
        answer: "Bridges typically last 10-15 years or longer. Dentures usually need replacement or relining every 5-7 years as the jawbone changes shape.",
      },
      {
        question: "Will dentures affect how I eat?",
        answer: "There's an adjustment period, but most patients adapt quickly. Start with soft foods and gradually progress to your regular diet. Properly fitted dentures restore most chewing function.",
      },
      {
        question: "Are bridges better than implants?",
        answer: "Both have advantages. Bridges are faster and more affordable but require altering adjacent teeth. Implants preserve natural teeth but take longer and cost more. Dr. Moazzam will help you choose the best option.",
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

          <div className="flex items-start">
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

              {/* Causes */}
              {service.causes && (
                <div className="reveal">
                  <h2 className="text-3xl font-bold mb-6">Common Causes</h2>
                  <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.causes.map((cause: string, index: number) => (
                      <div key={index} className="reveal-item flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-100">
                        <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
                        <span className="text-sm">{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Symptoms */}
              {service.symptoms && (
                <div className="reveal">
                  <h2 className="text-3xl font-bold mb-6">Signs & Symptoms</h2>
                  <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.symptoms.map((symptom: string, index: number) => (
                      <div key={index} className="reveal-item flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                        <span className="text-orange-500 text-xl flex-shrink-0">🔍</span>
                        <span className="text-sm">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="reveal">
                <h2 className="text-3xl font-bold mb-6">Benefits of Treatment</h2>
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
                <h2 className="text-3xl font-bold mb-6">Treatment Process</h2>
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
