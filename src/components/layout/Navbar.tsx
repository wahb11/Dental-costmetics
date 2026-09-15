"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Calendar, Moon, Sun, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Dr. Moazzam", href: "/doctors" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomeHero = pathname === "/" && !scrolled;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 shadow-lg backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary flex-shrink-0">
              <Smile className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-[family-name:var(--font-display)] text-base sm:text-lg font-bold leading-tight",
                  isHomeHero ? "text-white" : "gradient-text"
                )}
              >
                Dental Cosmetics
              </span>
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-medium leading-tight",
                  isHomeHero ? "text-white/70" : "text-muted-foreground"
                )}
              >
                & Root canal Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  pathname === item.href
                    ? "bg-primary text-white"
                    : isHomeHero
                      ? "text-white/85 hover:bg-white/10 hover:text-white"
                      : "text-foreground hover:bg-accent"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden items-center space-x-2 md:space-x-4 md:flex">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "rounded-lg p-2 transition-colors",
                isHomeHero ? "text-white hover:bg-white/10" : "hover:bg-accent"
              )}
              suppressHydrationWarning
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <div className="h-5 w-5" />
              )}
            </button>

            <Link href="tel:03023699996" className="hidden lg:block">
              <Button
                variant="ghost"
                size="sm"
                className={isHomeHero ? "text-white hover:bg-white/10 hover:text-white" : ""}
              >
                <Phone className="mr-2 h-4 w-4" />
                0302 3699996
              </Button>
            </Link>

            <Link href="/appointments/book">
              <Button
                size="sm"
                className={cn(
                  "shadow-lg",
                  isHomeHero && "bg-sky-400 text-[#031525] hover:bg-sky-300"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Book Appointment</span>
                <span className="md:hidden">Book</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "rounded-lg p-2 md:hidden",
              isHomeHero ? "text-white hover:bg-white/10" : "hover:bg-accent"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  pathname === item.href
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-accent"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <a href="tel:03023699996" onClick={() => setIsOpen(false)} className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call: 0302 3699996
                </Button>
              </a>
              <Link href="/appointments/book" onClick={() => setIsOpen(false)}>
                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
