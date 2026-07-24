"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  UserPlus,
  Clock,
  AlertCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Total Patients",
    value: "2,350",
    change: "+15.3%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Appointments Today",
    value: "48",
    change: "+8.2%",
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Active Doctors",
    value: "25",
    change: "+2",
    icon: Activity,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
];

const recentAppointments = [
  {
    id: "1",
    patient: "John Doe",
    doctor: "Dr. Sarah Johnson",
    service: "General Checkup",
    time: "09:00 AM",
    status: "Completed",
  },
  {
    id: "2",
    patient: "Jane Smith",
    doctor: "Dr. Michael Chen",
    service: "Teeth Cleaning",
    time: "10:30 AM",
    status: "In Progress",
  },
  {
    id: "3",
    patient: "Bob Wilson",
    doctor: "Dr. Emily Rodriguez",
    service: "Root Canal",
    time: "02:00 PM",
    status: "Scheduled",
  },
  {
    id: "4",
    patient: "Alice Brown",
    doctor: "Dr. James Wilson",
    service: "Dental Implant",
    time: "03:30 PM",
    status: "Scheduled",
  },
];

const recentPatients = [
  {
    id: "1",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    registeredOn: "2026-07-24",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    registeredOn: "2026-07-23",
    status: "Active",
  },
  {
    id: "3",
    name: "David Martinez",
    email: "david.m@example.com",
    registeredOn: "2026-07-22",
    status: "Active",
  },
];

const doctorPerformance = [
  { name: "Dr. Sarah Johnson", patients: 145, rating: 4.9, revenue: "$12,450" },
  { name: "Dr. Michael Chen", patients: 132, rating: 4.8, revenue: "$11,230" },
  { name: "Dr. Emily Rodriguez", patients: 128, rating: 5.0, revenue: "$10,890" },
  { name: "Dr. James Wilson", patients: 115, rating: 4.9, revenue: "$9,650" },
];

const alerts = [
  {
    id: "1",
    type: "warning",
    message: "Low inventory: Dental gloves (50 units remaining)",
    time: "10 mins ago",
  },
  {
    id: "2",
    type: "info",
    message: "Dr. Sarah Johnson schedule for next week needs approval",
    time: "1 hour ago",
  },
  {
    id: "3",
    type: "urgent",
    message: "Payment gateway maintenance scheduled for tonight",
    time: "2 hours ago",
  },
];

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen pt-24 pb-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your dental clinic management
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className={`text-sm font-medium ${stat.color}`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Today's Appointments</span>
                    <Button variant="ghost" size="sm">View All</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{appointment.patient}</h3>
                            <p className="text-sm text-muted-foreground">
                              {appointment.doctor} • {appointment.service}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{appointment.time}</p>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                appointment.status === "Completed"
                                  ? "bg-green-500/10 text-green-600"
                                  : appointment.status === "In Progress"
                                  ? "bg-blue-500/10 text-blue-600"
                                  : "bg-yellow-500/10 text-yellow-600"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Doctor Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {doctorPerformance.map((doctor, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                            {doctor.name.split(" ")[1].charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {doctor.patients} patients • ⭐ {doctor.rating}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            {doctor.revenue}
                          </p>
                          <p className="text-xs text-muted-foreground">This month</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Patients */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Registrations</span>
                    <Button variant="ghost" size="sm">View All</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <UserPlus className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{patient.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {patient.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {new Date(patient.registeredOn).toLocaleDateString()}
                          </p>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                            {patient.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Alerts & Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 border rounded-lg ${
                        alert.type === "urgent"
                          ? "bg-red-500/5 border-red-200"
                          : alert.type === "warning"
                          ? "bg-yellow-500/5 border-yellow-200"
                          : "bg-blue-500/5 border-blue-200"
                      }`}
                    >
                      <p className="text-sm font-medium mb-1">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
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
                  <Button className="w-full justify-start" variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Patient
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Gateway</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Service</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backup System</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-600">
                      Pending
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
