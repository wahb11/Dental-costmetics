"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const headline = ["Exceptional", "dental", "care", "in", "Lahore."];
const marqueeItems = [
  "Root Canal Treatment",
  "Cosmetic Dentistry",
  "Dental Implants",
  "Teeth Whitening",
  "Scaling & Cleaning",
  "Bridges & Dentures",
];

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-bg-img",
        { scale: 1.25, filter: "blur(8px)", opacity: 0.4 },
        { scale: 1, filter: "blur(0px)", opacity: 1, duration: 2.4, ease: "power2.out" },
        0
      )
        .fromTo(".hero-veil", { opacity: 1 }, { opacity: 0.7, duration: 1.8 }, 0.15)
        .fromTo(
          ".hero-brand",
          { y: 80, autoAlpha: 0, letterSpacing: "0.35em" },
          { y: 0, autoAlpha: 1, letterSpacing: "-0.02em", duration: 1.2 },
          0.3
        )
        .fromTo(
          ".hero-word",
          { yPercent: 130, rotateX: -70, autoAlpha: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            autoAlpha: 1,
            duration: 1.05,
            stagger: 0.1,
            ease: "power3.out",
          },
          0.5
        )
        .fromTo(
          ".hero-sub",
          { y: 50, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
          { y: 0, autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 1 },
          1.05
        )
        .fromTo(
          ".hero-cta",
          { y: 40, autoAlpha: 0, scale: 0.9 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.85, stagger: 0.14 },
          1.2
        )
        .fromTo(
          ".hero-orb",
          { scale: 0.2, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.5, stagger: 0.12, ease: "back.out(1.6)" },
          0.55
        )
        .fromTo(".hero-marquee", { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 1.35)
        .fromTo(".hero-scroll", { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 1.5);

      gsap.to(".hero-orb-a", {
        y: -36,
        x: 20,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".hero-orb-b", {
        y: 28,
        x: -24,
        duration: 5.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".hero-orb-c", {
        y: -22,
        x: -14,
        rotation: 180,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const track = root.querySelector(".hero-marquee-track") as HTMLElement | null;
      if (track) {
        const width = track.scrollWidth / 2;
        gsap.fromTo(
          track,
          { x: 0 },
          { x: -width, duration: 26, ease: "none", repeat: -1 }
        );
      }

      const onMove = (e: MouseEvent) => {
        if (!stageRef.current) return;
        const rect = stageRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(".hero-parallax-slow", {
          x: x * 30,
          y: y * 20,
          duration: 1.1,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(".hero-parallax-fast", {
          x: x * -50,
          y: y * -34,
          duration: 0.85,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(".hero-bg-img", {
          x: x * -22,
          y: y * -14,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(".hero-content", {
          x: x * 10,
          y: y * 6,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      stageRef.current?.addEventListener("mousemove", onMove);

      const magnets = gsap.utils.toArray<HTMLElement>(".hero-magnetic");
      const cleanups: Array<() => void> = [];
      magnets.forEach((el) => {
        const enter = () => gsap.to(el, { scale: 1.06, duration: 0.3 });
        const leave = () =>
          gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.55, ease: "elastic.out(1, 0.4)" });
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - (r.left + r.width / 2)) * 0.28,
            y: (e.clientY - (r.top + r.height / 2)) * 0.28,
            duration: 0.3,
          });
        };
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        el.addEventListener("mousemove", move);
        cleanups.push(() => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
          el.removeEventListener("mousemove", move);
        });
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        })
        .to(".hero-content", { y: -140, autoAlpha: 0, scale: 0.92 }, 0)
        .to(".hero-bg-img", { scale: 1.2, y: 80 }, 0)
        .to(".hero-marquee", { y: 80, autoAlpha: 0 }, 0)
        .to(".hero-orb", { scale: 1.4, autoAlpha: 0, stagger: 0.05 }, 0);

      return () => {
        stageRef.current?.removeEventListener("mousemove", onMove);
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#031525] text-white"
    >
      <div ref={stageRef} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2400&q=80"
          alt="Dental Cosmetics & Root canal Center - Modern dental clinic"
          fill
          priority
          className="hero-bg-img object-cover will-change-transform"
          sizes="100vw"
        />
        <div className="hero-veil absolute inset-0 bg-gradient-to-br from-[#021526]/95 via-[#0a3a5c]/75 to-[#031525]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.22),transparent_45%)]" />

        <div className="hero-orb hero-orb-a hero-parallax-fast pointer-events-none absolute left-[8%] top-[22%] h-40 w-40 rounded-full bg-sky-400/25 blur-2xl md:h-56 md:w-56" />
        <div className="hero-orb hero-orb-b hero-parallax-slow pointer-events-none absolute right-[10%] top-[28%] h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl md:h-72 md:w-72" />
        <div className="hero-orb hero-orb-c hero-parallax-fast pointer-events-none absolute bottom-[22%] left-[35%] h-32 w-32 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm" />
      </div>

      <div className="hero-content relative z-10 w-full px-4 pb-28 pt-32 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl" style={{ perspective: "900px" }}>
          <p className="hero-brand mb-6 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-sky-200 sm:text-4xl md:text-5xl lg:text-6xl">
            Dental Cosmetics & Root canal Center
          </p>

          <h1 className="max-w-5xl font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {headline.map((word) => (
              <span
                key={word}
                className="mr-[0.28em] inline-block overflow-hidden align-bottom"
                style={{ perspective: "600px" }}
              >
                <span className="hero-word inline-block origin-bottom will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-6 max-w-xl text-base text-sky-50/80 sm:text-lg md:text-xl">
            Expert dental care by Dr. Moazzam in Model Town, Lahore. 
            Specializing in cosmetic dentistry and painless root canal treatments.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/appointments/book" className="hero-cta hero-magnetic inline-flex">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-8 py-4 text-base font-semibold text-[#031525] shadow-[0_20px_50px_-20px_rgba(56,189,248,0.8)]">
                <Calendar className="h-5 w-5" />
                Book Appointment
              </span>
            </Link>
            <Link href="/services" className="hero-cta hero-magnetic inline-flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-md">
                Explore Services
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-marquee absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t border-white/10 bg-black/30 py-4 backdrop-blur-md">
        <div className="hero-marquee-track flex w-max gap-10 whitespace-nowrap px-4 text-sm uppercase tracking-[0.25em] text-sky-100/70">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="inline-flex items-center gap-10">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300/70" />
            </span>
          ))}
        </div>
      </div>

      <div className="hero-scroll absolute bottom-24 right-6 z-10 hidden flex-col items-center gap-2 text-sky-100/60 md:flex lg:right-10">
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>
  );
}
