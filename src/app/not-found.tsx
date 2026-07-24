"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
          <div className="text-6xl mb-4">🦷</div>
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto mb-8">
            Oops! It looks like this page has gone missing. Don't worry, your smile is still safe with us!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="shadow-lg">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/services">
              <Button variant="link">Services</Button>
            </Link>
            <Link href="/doctors">
              <Button variant="link">Doctors</Button>
            </Link>
            <Link href="/appointments/book">
              <Button variant="link">Book Appointment</Button>
            </Link>
            <Link href="/contact">
              <Button variant="link">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
