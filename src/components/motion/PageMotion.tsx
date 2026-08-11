"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type PageMotionProps = {
  children: React.ReactNode;
  className?: string;
  /** Re-run when list filters change */
  deps?: unknown[];
};

/**
 * Site-wide scroll animation wrapper.
 * Add these classes in any page:
 * - page-hero          hero entrance
 * - anim-section       section clip/scale wipe
 * - reveal             fade + rise
 * - reveal-left/right  slide in
 * - reveal-scale       scale up
 * - reveal-stagger     stagger children (.reveal-item or direct children)
 */
export default function PageMotion({
  children,
  className,
  deps = [],
}: PageMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      // Hero block
      const hero = root.querySelector(".page-hero");
      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          hero.querySelectorAll(".hero-anim"),
          { y: 50, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1 },
          0
        ).fromTo(
          hero.querySelectorAll(".hero-anim-scale"),
          { scale: 0.92, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1, stagger: 0.08 },
          0.15
        );
      }

      // Section transitions
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".anim-section")).forEach((section) => {
        gsap.fromTo(
          section,
          {
            clipPath: "inset(10% 6% 10% 6% round 24px)",
            scale: 0.96,
            opacity: 0.65,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 92%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });

      // Generic reveals
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".reveal")).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".reveal-left")).forEach((el) => {
        gsap.fromTo(
          el,
          { x: -70, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".reveal-right")).forEach((el) => {
        gsap.fromTo(
          el,
          { x: 70, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".reveal-scale")).forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.88, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.9,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Stagger groups
      gsap.utils
        .toArray<HTMLElement>(root.querySelectorAll(".reveal-stagger"))
        .forEach((group) => {
          const items =
            group.querySelectorAll(".reveal-item").length > 0
              ? group.querySelectorAll(".reveal-item")
              : group.children;

          gsap.fromTo(
            items,
            { y: 70, autoAlpha: 0, scale: 0.94 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: group,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

      // Parallax backgrounds
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".parallax-bg")).forEach((bg) => {
        gsap.to(bg, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: bg.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      const failsafe = window.setTimeout(() => {
        gsap.set(
          root.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger > *, .reveal-item, .hero-anim, .hero-anim-scale"
          ),
          { clearProps: "all", autoAlpha: 1 }
        );
      }, 7000);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => window.clearTimeout(failsafe);
    },
    { scope: rootRef, dependencies: deps }
  );

  return (
    <div ref={rootRef} className={cn("overflow-x-hidden", className)}>
      {children}
    </div>
  );
}
