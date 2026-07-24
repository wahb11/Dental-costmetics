"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Calendar,
  FileText,
  Pill,
  DollarSign,
  Clock,
  Bell,
  MessageSquare,
  User,
  Activity,
  Download,
  Eye,
} from "lucide-react";
import Link from "next/link";

const upcomingAppointments = [
  {
    id: "1",
    service: "General Checkup",
    doctor: "Dr. Sarah Johnson",
    date: "2026-07-28",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: "2",
    service: "Teeth Cleaning",
    doctor: "Dr. Michael Chen",
    date: "2026-08-15",
    time: "02:00 PM",
    status: "Pending",
  },
];

const recentRecords = [
  {
    id: "1",
    date: "2026-07-10",
    diagnosis: "Routine Checkup",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: "2",
    date: "2026-06-15",
    diagnosis: "Dental Cleaning",
    doctor: "Dr. Michael Chen",
  },
];

const prescriptions = [
  {
    id: "1",
    medication: "Amoxicillin 500mg",
    dosage: "3 times daily",
    validUntil: "2026-08-01",
  },
  {
    id: "2",
    medication: "Ibuprofen 400mg",
    dosage: "As needed for pain",
    validUntil: "2026-07-30",
  },
];

const pendingInvoices = [
  {
    id: "INV-001",
    service: "General Checkup",
    amount: 120,
    dueDate: "2026-08-05",
    status: "Pending",
  },
];

const notifications = [
  {
    id: "1",
    title: "Appointment Reminder",
    message: "Your appointment with Dr. Sarah Johnson is in 3 days",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Prescription Ready",
    message: "Your prescription is ready for pickup",
    time: "1 day ago",
    read: false,
  },
];

export default function PatientDashboard() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen pt-24 pb-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Patient Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your health overview.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
                    <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
                  </div>
                  <Calendar className="w-10 h-10 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Records</p>
                    <p className="text-3xl font-bold">{recentRecords.length}</p>
                  </div>
                  <FileText className="w-10 h-10 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Prescriptions</p>
                    <p className="text-3xl font-bold">{prescriptions.length}</p>
                  </div>
                  <Pill className="w-10 h-10 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pending</p>
                    <p className="text-3xl font-bold">${pendingInvoices[0]?.amount || 0}</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Upcoming Appointments</span>
                    <Link href="/patient/appointments">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.service}</h3>
                          <p className="text-sm text-muted-foreground">
                            {appointment.doctor}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appointment.status === "Confirmed"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-yellow-500/10 text-yellow-600"
                          }`}
                        >
                          {appointment.status}
                        </span>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Link href="/appointments/book">
                    <Button className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book New Appointment
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Medical Records */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Medical Records</span>
                    <Link href="/patient/records">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{record.diagnosis}</h3>
                          <p className="text-sm text-muted-foreground">
                            {record.doctor} • {new Date(record.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Prescriptions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Active Prescriptions</span>
                    <Link href="/patient/prescriptions">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {prescriptions.map((prescription) => (
                    <div
                      key={prescription.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Pill className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{prescription.medication}</h3>
                          <p className="text-sm text-muted-foreground">
                            {prescription.dosage}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Valid until: {new Date(prescription.validUntil).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border rounded-lg ${
                        !notification.read ? "bg-primary/5 border-primary/20" : ""
                      }`}
                    >
                      <h4 className="font-semibold text-sm mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  ))}
                  <Link href="/patient/notifications">
                    <Button variant="outline" className="w-full" size="sm">
                      View All Notifications
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Pending Invoices */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Pending Invoices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pendingInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="p-3 border rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-sm">{invoice.id}</h4>
                          <p className="text-xs text-muted-foreground">
                            {invoice.service}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          ${invoice.amount}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                      <Button size="sm" className="w-full">
                        Pay Now
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/patient/profile">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Update Profile
                    </Button>
                  </Link>
                  <Link href="/patient/messages">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Doctor
                    </Button>
                  </Link>
                  <Link href="/patient/reports">
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="w-4 h-4 mr-2" />
                      View Reports
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
