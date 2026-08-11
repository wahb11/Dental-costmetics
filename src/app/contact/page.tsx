"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMotion from "@/components/motion/PageMotion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["contact@smilesync.com", "support@smilesync.com"],
    color: "text-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Dental Street", "Healthcare City, HC 12345"],
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon-Fri: 8:00 AM - 8:00 PM", "Sat-Sun: 9:00 AM - 5:00 PM"],
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
];

const departments = [
  { name: "General Inquiries", email: "info@smilesync.com", phone: "+1 (555) 123-4567" },
  { name: "Appointments", email: "appointments@smilesync.com", phone: "+1 (555) 123-4568" },
  { name: "Emergency", email: "emergency@smilesync.com", phone: "+1 (555) 911-9111" },
  { name: "Insurance", email: "insurance@smilesync.com", phone: "+1 (555) 123-4569" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <PageMotion>
      <Navbar />

      {/* Hero Section */}
      <section className="page-hero pt-32 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="hero-anim text-5xl md:text-6xl font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="hero-anim text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="reveal-item text-center shadow-lg">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className={`w-8 h-8 ${info.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="reveal-left">
              <Card className="shadow-premium">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center">
                    <MessageSquare className="w-8 h-8 mr-3 text-primary" />
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john.doe@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        className="flex w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Departments & Map */}
            <div className="reveal-right space-y-6">
              {/* Departments */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Contact by Department</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">{dept.name}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {dept.email}
                        </p>
                        <p className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {dept.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Our Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-64 bg-secondary/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        Interactive map would go here
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        123 Dental Street, Healthcare City
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Action */}
              <Card className="shadow-lg bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    Need an Appointment?
                  </h3>
                  <p className="mb-4 opacity-90">
                    Book online in just a few clicks
                  </p>
                  <Link href="/appointments/book">
                    <Button variant="secondary" size="lg" className="w-full">
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="anim-section reveal-scale py-20 bg-red-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full mb-4">
            <Phone className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">24/7 Emergency Contact</h2>
          <p className="text-xl text-muted-foreground mb-6">
            For dental emergencies, call us immediately
          </p>
          <a href="tel:+15559119111">
            <Button size="lg" variant="destructive" className="text-xl px-8">
              <Phone className="w-6 h-6 mr-3" />
              +1 (555) 911-9111
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </PageMotion>
  );
}
