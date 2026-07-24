import { UserRole, AppointmentStatus, PaymentStatus, TreatmentStatus } from "@prisma/client";

export type { UserRole, AppointmentStatus, PaymentStatus, TreatmentStatus };

export interface User {
  id: string;
  email: string;
  role: UserRole;
  image?: string;
  emailVerified?: Date;
}

export interface Patient {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  allergies?: string;
  medications?: string;
  medicalConditions?: string;
  bloodType?: string;
}

export interface Doctor {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  specialization: string;
  licenseNumber: string;
  phone: string;
  bio?: string;
  education?: string;
  experience: number;
  languages: string[];
  consultationFee: number;
  rating: number;
  reviewCount: number;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  serviceId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  reason?: string;
  patient?: Patient;
  doctor?: Doctor;
  service?: Service;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  image?: string;
  featured: boolean;
  active: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  amount: number;
  tax: number;
  discount: number;
  totalAmount: number;
  status: PaymentStatus;
  dueDate: Date;
  paidAt?: Date;
  items: InvoiceItem[];
  notes?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Treatment {
  id: string;
  patientId: string;
  doctorId: string;
  name: string;
  description: string;
  toothNumber?: string;
  status: TreatmentStatus;
  startDate: Date;
  endDate?: Date;
  cost: number;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  diagnosis: string;
  symptoms?: string;
  vitalSigns?: {
    bloodPressure?: string;
    temperature?: number;
    heartRate?: number;
    weight?: number;
  };
  notes?: string;
  prescriptions?: string;
  attachments: string[];
  recordDate: Date;
}

export interface Review {
  id: string;
  patientId: string;
  doctorId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  patient?: Patient;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalRevenue: number;
  totalAppointments: number;
  totalPatients: number;
  totalDoctors: number;
  revenueChange: number;
  appointmentsChange: number;
  patientsChange: number;
  doctorsChange: number;
}
