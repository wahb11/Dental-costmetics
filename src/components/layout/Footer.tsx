"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const footerLinks = {
  services: [
    { name: "Root Canal Treatment", href: "/services/root-canal" },
    { name: "Teeth Whitening", href: "/services/teeth-whitening" },
    { name: "Dental Implants", href: "/services/dental-implants" },
    { name: "Scaling & Cleaning", href: "/services/scaling" },
    { name: "Tooth Filling", href: "/services/filling" },
    { name: "Bridges & Dentures", href: "/services/bridges-dentures" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Doctors", href: "/doctors" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Contact", href: "/contact" },
    { name: "Insurance", href: "/insurance" },
    { name: "FAQs", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-col",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="footer-col lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Smile className="h-6 w-6 text-white" />
              </div>
              <span className="text-base sm:text-xl font-bold gradient-text">Dental Cosmetics & Root canal Center</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Excellence in dental care with Dr. Moazzam. Specializing in cosmetic dentistry and root canal treatments in Lahore.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:03023699996" className="hover:text-primary transition-colors">0302 3699996</a>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:info@dentalcosmetics.pk" className="hover:text-primary transition-colors">info@dentalcosmetics.pk</a>
              </div>
              <div className="flex items-start text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Model town, bank square market, Block C Model Town, Lahore, 54700</span>
              </div>
              <div className="flex items-start text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Mon-Sat: 5:00 PM - 9:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="mb-4 font-semibold">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-col mb-8 border-t border-border pt-8">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest news and updates from SmileSync.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0 text-center md:text-left" suppressHydrationWarning>
            © {currentYear} Dental Cosmetics & Root canal Center. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
