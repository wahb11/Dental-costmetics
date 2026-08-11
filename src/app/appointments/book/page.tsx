"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMotion from "@/components/motion/PageMotion";
import { Calendar, User, Stethoscope, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const steps = [
  { id: 1, name: "Service", icon: Stethoscope },
  { id: 2, name: "Doctor & Date", icon: Calendar },
  { id: 3, name: "Your Details", icon: User },
  { id: 4, name: "Confirmation", icon: CheckCircle },
];

const services = [
  { id: "1", name: "General Checkup", duration: "30 min", price: "$80" },
  { id: "2", name: "Teeth Cleaning", duration: "45 min", price: "$120" },
  { id: "3", name: "Teeth Whitening", duration: "60 min", price: "$300" },
  { id: "4", name: "Dental Implants", duration: "120 min", price: "$2,500" },
  { id: "5", name: "Root Canal", duration: "90 min", price: "$800" },
  { id: "6", name: "Braces Consultation", duration: "45 min", price: "$150" },
];

const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: "General Dentistry",
    rating: 4.9,
    image: "👩‍⚕️",
    email: process.env.NEXT_PUBLIC_DOCTOR_EMAIL_SARAH || "doctor.sarah@example.com",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "Orthodontics",
    rating: 4.8,
    image: "👨‍⚕️",
    email: process.env.NEXT_PUBLIC_DOCTOR_EMAIL_MICHAEL || "doctor.michael@example.com",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialization: "Cosmetic Dentistry",
    rating: 5.0,
    image: "👩‍⚕️",
    email: process.env.NEXT_PUBLIC_DOCTOR_EMAIL_EMILY || "doctor.emily@example.com",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialization: "Oral Surgery",
    rating: 4.9,
    image: "👨‍⚕️",
    email: process.env.NEXT_PUBLIC_DOCTOR_EMAIL_JAMES || "doctor.james@example.com",
  },
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

export default function BookAppointmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    setSelectedTime("");
    setBookedTimes([]);
    setSubmitError("");

    const doctor = doctors.find((item) => item.id === selectedDoctor);
    if (!doctor || !selectedDate) {
      setLoadingSlots(false);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      doctorEmail: doctor.email,
      date: selectedDate,
    });

    setLoadingSlots(true);
    fetch(`/api/appointments/slots?${params}`, { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Could not load available times.");
        }
        setBookedTimes(data.bookedTimes || []);
      })
      .catch((error) => {
        if (error instanceof Error && error.name !== "AbortError") {
          setSubmitError(error.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingSlots(false);
      });

    return () => controller.abort();
  }, [selectedDoctor, selectedDate]);

  const handleNext = () => {
    if (currentStep < 4) {
      setSubmitError("");
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setSubmitError("");
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");

    const doctor = doctors.find((d) => d.id === selectedDoctor);
    const service = services.find((s) => s.id === selectedService);

    if (!doctor || !service) {
      setSubmitError("Please select a service and doctor.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes,
          doctorId: doctor.id,
          doctorName: doctor.name,
          doctorEmail: doctor.email,
          serviceId: service.id,
          serviceName: service.name,
          date: selectedDate,
          startTime: selectedTime,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          setBookedTimes((times) =>
            times.includes(selectedTime) ? times : [...times, selectedTime]
          );
          setSelectedTime("");
          setCurrentStep(2);
        }
        throw new Error(data.error || "Booking failed");
      }

      toast.success(
        data.message ||
          "Appointment booked! Confirmation emails were sent to you and your doctor."
      );
      setBookedTimes((times) =>
        times.includes(selectedTime) ? times : [...times, selectedTime]
      );
      setSelectedTime("");
      setCurrentStep(2);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not complete booking."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageMotion deps={[currentStep]}>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="page-hero reveal mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="hero-anim flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all",
                        currentStep >= step.id
                          ? "bg-primary text-white"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        currentStep >= step.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-1 mx-4 rounded transition-all",
                        currentStep > step.id ? "bg-primary" : "bg-secondary"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="reveal-scale shadow-premium">
            <CardHeader>
              <CardTitle className="text-3xl">
                {currentStep === 1 && "Select Service"}
                {currentStep === 2 && "Choose Doctor & Date"}
                {currentStep === 3 && "Your Information"}
                {currentStep === 4 && "Confirm Booking"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "What service are you interested in?"}
                {currentStep === 2 && "Pick your preferred doctor and time"}
                {currentStep === 3 && "Tell us about yourself"}
                {currentStep === 4 && "Review and confirm your appointment"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Select Service */}
              {currentStep === 1 && (
                <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Card
                      key={service.id}
                      className={cn(
                        "reveal-item cursor-pointer transition-all hover:shadow-lg",
                        selectedService === service.id &&
                          "ring-2 ring-primary bg-primary/5"
                      )}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">
                          {service.name}
                        </h3>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{service.duration}</span>
                          <span className="font-semibold text-primary">
                            {service.price}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Step 2: Select Doctor & Date */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Doctor Selection */}
                  <div>
                    <Label className="text-lg mb-4 block">Select Doctor</Label>
                    <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
                      {doctors.map((doctor) => (
                        <Card
                          key={doctor.id}
                          className={cn(
                            "reveal-item cursor-pointer transition-all hover:shadow-lg",
                            selectedDoctor === doctor.id &&
                              "ring-2 ring-primary bg-primary/5"
                          )}
                          onClick={() => setSelectedDoctor(doctor.id)}
                        >
                          <CardContent className="p-4 flex items-center space-x-4">
                            <div className="text-4xl">{doctor.image}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{doctor.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {doctor.specialization}
                              </p>
                              <p className="text-sm text-primary">
                                ⭐ {doctor.rating}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <Label htmlFor="date" className="text-lg">
                      Select Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="mt-2"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label className="text-lg mb-4 block">Select Time</Label>
                    <div className="reveal-stagger grid grid-cols-3 gap-3">
                      {timeSlots.map((time) => {
                        const isBooked = bookedTimes.includes(time);

                        return (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            disabled={loadingSlots || isBooked}
                            className="reveal-item w-full"
                          >
                            {isBooked ? `${time} — Booked` : time}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Patient Information */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Any specific concerns or requests?"
                      className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-secondary/30 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-semibold">
                        {services.find((s) => s.id === selectedService)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Doctor:</span>
                      <span className="font-semibold">
                        {doctors.find((d) => d.id === selectedDoctor)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-semibold">
                        {new Date(selectedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-semibold">{selectedTime}</span>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Patient:</span>
                        <span className="font-semibold">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-semibold">{formData.email}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-semibold">{formData.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                {currentStep < 4 ? (
                  <Button onClick={handleNext} disabled={!canProceed()}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} size="lg" disabled={submitting}>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {submitting ? "Booking..." : "Confirm Booking"}
                  </Button>
                )}
              </div>
              {submitError && (
                <p className="mt-4 text-sm text-destructive">{submitError}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </PageMotion>
  );

  function canProceed() {
    switch (currentStep) {
      case 1:
        return selectedService !== "";
      case 2:
        return selectedDoctor !== "" && selectedDate !== "" && selectedTime !== "";
      case 3:
        return (
          formData.firstName !== "" &&
          formData.lastName !== "" &&
          formData.email !== "" &&
          formData.phone !== ""
        );
      default:
        return true;
    }
  }
}
