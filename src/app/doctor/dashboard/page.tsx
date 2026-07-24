"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import {
  Calendar,
  Users,
  Clock,
  TrendingUp,
  User,
  FileText,
  MessageSquare,
  Settings,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const todayAppointments = [
  {
    id: "1",
    patient: "John Doe",
    time: "09:00 AM",
    service: "General Checkup",
    status: "Completed",
    duration: "30 min",
  },
  {
    id: "2",
    patient: "Jane Smith",
    time: "10:30 AM",
    service: "Teeth Cleaning",
    status: "In Progress",
    duration: "45 min",
  },
  {
    id: "3",
    patient: "Bob Wilson",
    time: "02:00 PM",
    service: "Root Canal",
    status: "Upcoming",
    duration: "90 min",
  },
  {
    id: "4",
    patient: "Alice Brown",
    time: "03:30 PM",
    service: "Consultation",
    status: "Upcoming",
    duration: "30 min",
  },
];

const recentPatients = [
  {
    id: "1",
    name: "Michael Johnson",
    lastVisit: "2026-07-20",
    diagnosis: "Cavity Treatment",
    nextAppointment: "2026-08-05",
  },
  {
    id: "2",
    name: "Sarah Williams",
    lastVisit: "2026-07-18",
    diagnosis: "Teeth Cleaning",
    nextAppointment: "2026-12-18",
  },
  {
    id: "3",
    name: "David Martinez",
    lastVisit: "2026-07-15",
    diagnosis: "Root Canal",
    nextAppointment: "2026-07-30",
  },
];

const stats = [
  {
    title: "Today's Patients",
    value: "12",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "This Week",
    value: "48",
    icon: Calendar,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Avg. Rating",
    value: "4.9",
    icon: TrendingUp,
    color: "text-yellow-600",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Total Patients",
    value: "324",
    icon: User,
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
  },
];

const tasks = [
  { id: "1", task: "Review X-rays for John Doe", priority: "High", completed: false },
  { id: "2", task: "Follow up with Jane Smith's treatment", priority: "Medium", completed: false },
  { id: "3", task: "Complete patient notes for today", priority: "Low", completed: true },
];

export default function DoctorDashboard() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen pt-24 pb-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Doctor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Dr. Sarah Johnson</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
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
              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Today's Schedule</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      July 24, 2026
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center justify-center w-16 text-center">
                          <Clock className="w-5 h-5 text-primary mb-1" />
                          <span className="text-xs font-medium">{appointment.time}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.patient}</h3>
                          <p className="text-sm text-muted-foreground">
                            {appointment.service} • {appointment.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            appointment.status === "Completed"
                              ? "bg-green-500/10 text-green-600"
                              : appointment.status === "In Progress"
                              ? "bg-blue-500/10 text-blue-600"
                              : "bg-yellow-500/10 text-yellow-600"
                          }`}
                        >
                          {appointment.status}
                        </span>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Patients */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Patients</span>
                    <Button variant="ghost" size="sm">View All</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {patient.diagnosis}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last: {new Date(patient.lastVisit).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Records
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Today's Tasks</span>
                    <Button variant="ghost" size="sm">+ Add</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 border rounded-lg ${
                        task.completed ? "bg-accent/30" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {task.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-muted rounded flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                            {task.task}
                          </p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                              task.priority === "High"
                                ? "bg-red-500/10 text-red-600"
                                : task.priority === "Medium"
                                ? "bg-yellow-500/10 text-yellow-600"
                                : "bg-green-500/10 text-green-600"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
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
                    <FileText className="w-4 h-4 mr-2" />
                    Write Prescription
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Schedule
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Availability Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg bg-blue-500/5">
                    <p className="text-sm font-medium mb-1">New Patient Request</p>
                    <p className="text-xs text-muted-foreground">
                      Michael Brown requested an appointment
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium mb-1">Lab Results Ready</p>
                    <p className="text-xs text-muted-foreground">
                      Results for Jane Smith are available
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
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
