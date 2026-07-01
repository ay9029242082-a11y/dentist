export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  rating: number;
  education: string;
  bio: string;
  availableDays: number[]; // 0 = Sunday, 1 = Monday, etc.
  availableHours: string[];
}

export interface Service {
  id: string;
  name: string;
  category: 'Preventative' | 'Restorative' | 'Cosmetic' | 'Emergency';
  price: number;
  duration: string;
  description: string;
  icon: string;
  recoveryTime: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorId: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  treatment: string;
}

export interface HygieneTask {
  id: string;
  name: string;
  description: string;
  streak: number;
  lastCompleted: string | null; // YYYY-MM-DD
}
