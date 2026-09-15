"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import {
  Calendar,
  Shield,
  Clock,
  Award,
  Heart,
  Zap,
  ArrowRight,
  Users,
  TrendingUp,
  ChevronRight,
  Star,
  CheckCircle,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    title: "Root Canal Treatment",
    description: "Expert root canal therapy with minimal discomfort",
    icon: Shield,
    href: "/services/root-canal",
  },
  {
    title: "Cosmetic Dentistry",
    description: "Transform your smile with confidence",
    icon: Zap,
    href: "/services/teeth-whitening",
  },
  {
    title: "Dental Implants",
    description: "Permanent solution for missing teeth",
    icon: Award,
    href: "/services/dental-implants",
  },
  {
    title: "Scaling & Cleaning",
    description: "Professional cleaning for healthy teeth",
    icon: Heart,
    href: "/services/scaling",
  },
];

const stats = [
  { label: "Years Experience", value: "15+", target: 15, suffix: "+", icon: Award },
  { label: "Success Rate", value: "98%", target: 98, suffix: "%", icon: TrendingUp },
  { label: "Happy Patients", value: "1,000+", target: 1000, suffix: "+", icon: Users },
];

const coreValues = [
  {
    number: "01",
    title: "Specialist-Led Care",
    description:
      "Every treatment is overseen by board-certified specialists with years of experience in their field.",
    featured: false,
  },
  {
    number: "02",
    title: "Built Around You",
    description:
      "We craft personalized treatment plans that fit your lifestyle, timeline, and budget perfectly.",
    featured: true,
  },
  {
    number: "03",
    title: "Cutting-Edge Precision",
    description:
      "Advanced technology meets meticulous care for predictable, lasting results you can trust.",
    featured: false,
  },
  {
    number: "04",
    title: "Uncompromising Safety",
    description:
      "Hospital-grade sterilization and strict protocols ensure your wellbeing at every visit.",
    featured: false,
  },
];

const features = [
  {
    title: "Latest Technology",
    description: "State-of-the-art equipment for precise, comfortable treatments",
    icon: Zap,
  },
  {
    title: "Expert Care",
    description: "Dr. Moazzam's 15+ years of specialized dental expertise",
    icon: Award,
  },
  {
    title: "Gentle Approach",
    description: "Painless procedures with a caring, professional touch",
    icon: Heart,
  },
  {
    title: "Proven Results",
    description: "4.9/5 rating with 63+ satisfied patient reviews",
    icon: Shield,
  },
];

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ---- Section wipe transitions ----
      gsap.utils.toArray<HTMLElement>(".anim-section").forEach((section) => {
        gsap.fromTo(
          section,
          {
            clipPath: "inset(12% 8% 12% 8% round 28px)",
            scale: 0.94,
            opacity: 0.55,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );
      });

      // ---- Stats: pin + headline scrub + count ----
      const statsSection = pageRef.current?.querySelector(".stats-section");
      if (statsSection) {
        const statsTl = gsap.timeline({
          scrollTrigger: {
            trigger: statsSection,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          },
        });

        statsTl
          .fromTo(
            ".stats-eyebrow",
            { y: 40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1 },
            0
          )
          .fromTo(
            ".stats-title-line",
            { y: 80, autoAlpha: 0, rotateX: -40 },
            { y: 0, autoAlpha: 1, rotateX: 0, stagger: 0.15, duration: 1 },
            0.1
          );

        gsap.fromTo(
          ".stat-reveal",
          { y: 100, autoAlpha: 0, scale: 0.85 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".stats-grid",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
          const target = Number(el.dataset.target || 0);
          const suffix = el.dataset.suffix || "";
          const obj = { val: 0 };
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(obj, {
                val: target,
                duration: 2.2,
                ease: "power2.out",
                onUpdate: () => {
                  const n = Math.floor(obj.val);
                  el.textContent =
                    target >= 1000
                      ? `${n.toLocaleString()}${suffix}`
                      : `${n}${suffix}`;
                },
              });
            },
          });
        });
      }

      // ---- Values: horizontal scroll on desktop ----
      mm.add("(min-width: 1024px)", () => {
        const valuesSection = pageRef.current?.querySelector(".values-section");
        const track = pageRef.current?.querySelector(".values-track") as HTMLElement | null;
        if (!valuesSection || !track) return;

        const totalScroll = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);

        gsap.to(track, {
          x: () => -totalScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: valuesSection,
            start: "top top",
            end: () => `+=${totalScroll() + 400}`,
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(
          ".value-card",
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesSection,
              start: "top 60%",
              once: true,
            },
          }
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          ".value-card",
          { y: 80, autoAlpha: 0, rotateY: -12 },
          {
            y: 0,
            autoAlpha: 1,
            rotateY: 0,
            stagger: 0.14,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".values-section",
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ---- Services ----
      gsap.fromTo(
        ".services-heading > *",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".service-card",
        { y: 90, autoAlpha: 0, scale: 0.88, rotate: -2 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.85,
          stagger: {
            each: 0.12,
            from: "start",
          },
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ---- Features ----
      gsap.fromTo(
        ".features-heading > *",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".feature-card",
        { x: -70, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.95,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ---- CTA ----
      gsap.fromTo(
        ".cta-block",
        { y: 80, autoAlpha: 0, scale: 0.9, filter: "blur(10px)" },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax backgrounds
      gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((bg) => {
        gsap.to(bg, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: bg.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Failsafe: never leave content invisible
      const failsafe = window.setTimeout(() => {
        gsap.set(
          [
            ".stat-reveal",
            ".value-card",
            ".service-card",
            ".feature-card",
            ".cta-block",
            ".stats-eyebrow",
            ".stats-title-line",
            ".services-heading > *",
            ".features-heading > *",
          ],
          { clearProps: "all", autoAlpha: 1 }
        );
      }, 8000);

      return () => {
        window.clearTimeout(failsafe);
        mm.revert();
      };
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="overflow-x-hidden">
      <Navbar />
      <HeroSection />

      {/* Stats */}
      <section className="anim-section stats-section relative overflow-hidden py-28 md:py-36">
        <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-[#001a4d] via-[#003380] to-[#001a4d]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center" style={{ perspective: "800px" }}>
            <span className="stats-eyebrow mb-6 inline-block border border-white/20 px-6 py-2 text-sm uppercase tracking-[0.3em] text-sky-200/70">
              About Clinic
            </span>
            <h2 className="mx-auto max-w-4xl font-[family-name:var(--font-display)] text-4xl font-medium leading-tight text-white md:text-6xl">
              <span className="stats-title-line block">Where clinical precision</span>
              <span className="stats-title-line block">meets genuine comfort.</span>
            </h2>
          </div>

          <div className="stats-grid mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-reveal text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                    <stat.icon className="h-8 w-8 text-sky-200" />
                  </div>
                </div>
                <div
                  className="stat-number mb-3 font-[family-name:var(--font-display)] text-5xl font-bold text-white md:text-7xl"
                  data-target={stat.target}
                  data-suffix={stat.suffix}
                >
                  0
                </div>
                <div className="text-base font-light text-sky-100/70 md:text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="stat-reveal mt-16 text-center">
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Values — horizontal on desktop */}
      <section className="anim-section values-section overflow-hidden bg-gradient-to-b from-[#f4f8fb] to-white py-24 md:py-28 lg:h-screen lg:py-0">
        <div className="flex h-full flex-col justify-center">
          <div className="mb-10 px-4 text-center sm:px-6 lg:mb-14 lg:px-10 lg:text-left">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-tight md:text-6xl">
              Beyond dentistry —
              <br />
              where <span className="text-primary">care</span> becomes{" "}
              <span className="text-primary">craft</span>
            </h2>
          </div>

          <div className="values-track flex w-full flex-col gap-6 px-4 sm:px-6 md:grid md:grid-cols-2 lg:flex lg:w-max lg:flex-row lg:gap-8 lg:px-10">
            {coreValues.map((value) => (
              <Card
                key={value.number}
                className={`value-card h-full border-none shadow-lg transition-shadow hover:shadow-xl lg:h-[420px] lg:w-[360px] lg:flex-shrink-0 ${
                  value.featured ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
              >
                <CardContent className="flex h-full flex-col p-8">
                  <div
                    className={`mb-6 font-[family-name:var(--font-display)] text-6xl font-bold ${
                      value.featured ? "text-primary" : "text-slate-200"
                    }`}
                  >
                    {value.number}
                  </div>
                  <h3
                    className={`mb-4 text-2xl font-bold ${
                      value.featured ? "text-primary" : "text-slate-900"
                    }`}
                  >
                    {value.title}
                  </h3>
                  <p className="flex-grow leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="anim-section services-section bg-white py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="services-heading mb-14 text-center">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-medium md:text-5xl">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Expert dental care by Dr. Moazzam at Dental Cosmetics & Root canal Center
            </p>
          </div>

          <div className="services-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link key={service.href} href={service.href}>
                <Card className="service-card group h-full cursor-pointer border-slate-100 transition-shadow hover:shadow-premium">
                  <CardContent className="p-6">
                    <service.icon className="mb-4 h-12 w-12 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                    <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Learn More
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="anim-section py-24 md:py-28 bg-gradient-to-b from-white to-[#f4f8fb]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-medium md:text-5xl">
              <span className="text-primary">Transformations</span> That Speak
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              See the amazing results Dr. Moazzam achieves for our patients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
              afterImage="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80"
              beforeLabel="Before"
              afterLabel="After"
              className="rounded-xl overflow-hidden shadow-xl"
            />
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
              afterImage="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
              beforeLabel="Before"
              afterLabel="After"
              className="rounded-xl overflow-hidden shadow-xl"
            />
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Ready to transform your smile? Book your consultation today
            </p>
            <Link href="/appointments/book">
              <Button size="lg" className="shadow-lg">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="anim-section features-section bg-[#eef5fa] py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="features-heading mb-14 text-center">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-medium md:text-5xl">
              Why Choose <span className="text-primary">Us</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Experience excellence at Dental Cosmetics & Root canal Center
            </p>
          </div>

          <div className="features-grid grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="feature-card border-none bg-white/80 shadow-md backdrop-blur-sm"
              >
                <CardContent className="flex items-start space-x-4 p-8">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="anim-section py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-medium md:text-5xl">
              What Our <span className="text-primary">Patients Say</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Real experiences from our satisfied patients
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Feryal Malik",
                review: "My experience at Dental Cosmetics with Dr. Moazzam was exceptional. Got my tooth filling and scaling done and I must say he is a very competent and thorough professional.",
                rating: 5
              },
              {
                name: "Assad Ali Rizvi",
                review: "Excellent dental care. The staff was friendly, professional, and made me feel at ease. The dentist explained everything clearly. Highly recommend!",
                rating: 5
              },
              {
                name: "Mehreen Ali",
                review: "Dr. Moazzam's professionalism and competence were evident throughout. With several treatments including root canals, fillings, and bridges, the results were outstanding!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="reveal-item">
                <CardContent className="p-6">
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground italic">&ldquo;{testimonial.review}&rdquo;</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">Google Review</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-4">
              <strong>4.9/5</strong> rating from <strong>63+ Google reviews</strong>
            </p>
          </div>
        </div>
      </section>

      {/* About Dr. Moazzam Section */}
      <section className="anim-section py-16 md:py-24 lg:py-32 bg-gradient-to-br from-[#001a4d] via-[#003380] to-[#001a4d] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="mb-4 lg:mb-6 font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-medium md:text-5xl">
                Meet <span className="text-sky-300">Dr. Moazzam</span>
              </h2>
              <p className="text-base lg:text-lg text-sky-100/80 mb-4 lg:mb-6 leading-relaxed">
                With over 15 years of experience, Dr. Moazzam is renowned for his expertise in cosmetic dentistry and painless root canal treatments. His gentle approach and meticulous attention to detail have earned him the trust of thousands of patients across Lahore.
              </p>
              <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-sky-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white text-sm lg:text-base">15+ Years Experience</p>
                    <p className="text-sky-100/70 text-sm lg:text-base">Specialized in advanced dental procedures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-sky-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white text-sm lg:text-base">Latest Technology</p>
                    <p className="text-sky-100/70 text-sm lg:text-base">State-of-the-art equipment and techniques</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-sky-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white text-sm lg:text-base">Patient-Centered Care</p>
                    <p className="text-sky-100/70 text-sm lg:text-base">Comfortable, caring environment for all</p>
                  </div>
                </div>
              </div>
              <Link href="/doctors">
                <Button size="lg" className="bg-sky-400 text-[#031525] hover:bg-sky-300 w-full sm:w-auto">
                  Learn More About Dr. Moazzam
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-sm lg:max-w-md">
                <div className="absolute inset-0 bg-sky-400/20 blur-3xl rounded-full"></div>
                <img 
                  src="/images/dr-moazzam.png" 
                  alt="Dr. Moazzam"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="anim-section cta-section py-24 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Card className="cta-block overflow-hidden border-none bg-gradient-to-br from-[#04233d] to-[#0b4f78] text-white shadow-premium">
            <CardContent className="p-12 md:p-16">
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-medium md:text-5xl">
                Ready for your best smile?
              </h2>
              <p className="mb-8 text-xl text-sky-100/80">
                Book your appointment today and take the first step towards
                perfect oral health
              </p>
              <Link href="/appointments/book">
                <Button
                  size="lg"
                  className="rounded-full bg-sky-400 px-8 text-base text-[#031525] hover:bg-sky-300"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Your Visit
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
