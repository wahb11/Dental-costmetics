import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SmileSync - Modern Dental Care Management",
  description:
    "Connecting Patients. Simplifying Care. Professional dental clinic management system with advanced booking and patient care.",
  keywords: [
    "dental clinic",
    "dentist",
    "appointments",
    "dental care",
    "orthodontics",
    "cosmetic dentistry",
  ],
  authors: [{ name: "SmileSync" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smilesync.com",
    title: "SmileSync - Modern Dental Care Management",
    description: "Connecting Patients. Simplifying Care.",
    siteName: "SmileSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmileSync - Modern Dental Care Management",
    description: "Connecting Patients. Simplifying Care.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${body.variable} ${display.variable} ${body.className} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
