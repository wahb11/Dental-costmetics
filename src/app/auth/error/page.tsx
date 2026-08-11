"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMotion from "@/components/motion/PageMotion";

export default function AuthErrorPage() {
  return (
    <PageMotion>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-4 pb-16 pt-28">
        <Card className="reveal-scale w-full max-w-md text-center shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Something went wrong while signing in. Please try again.
            </p>
            <Link href="/auth/signin">
              <Button className="w-full">Back to Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </PageMotion>
  );
}
