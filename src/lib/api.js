import { sampleDoctors } from "../data/sampleDoctors";
import { sampleAppointments } from "../data/sampleAppointments";
import { sampleMessages } from "../data/sampleMessages";
import { API_BASE_URL } from "./constants";

// Helper for simulating api request latency (500ms delay) so loading states and skeletons are fully visible
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Keep local in-memory state for appointments and messages to make dashboard interactive
let inMemoryAppointments = [...sampleAppointments];
let inMemoryMessages = [...sampleMessages];
let inMemoryProfile = {
  name: "Yashasvi Sharma",
  email: "patient.yash@gmail.com",
  phone: "+1 (555) 019-2834",
  dob: "1994-11-12",
  insuranceProvider: "Blue Shield Healthcare",
  insuranceId: "BS-8839201-A",
  emailNotifications: true,
  smsNotifications: true,
  marketingEmails: false
};
let inMemoryInvoices = [
  { id: "inv-001", doctorName: "Dr. Sarah Jenkins", date: "2026-07-20", amount: 150.00, status: "paid", description: "Blood work analysis follow-up" },
  { id: "inv-002", doctorName: "Dr. Marcus Vance", date: "2026-07-28", amount: 220.00, status: "unpaid", description: "ECG diagnostic testing & consultation" }
];
let inMemoryRecords = [
  {
    id: "rec-1",
    date: "2026-07-27",
    doctorName: "Dr. Sarah Jenkins",
    specialty: "General Medicine",
    type: "Lab Report Summary",
    notes: "CBC and Lipid panel show standard ranges. HDL cholesterol is slightly elevated, recommended continuation of diet control and light cardio. Vitamin D levels are at 24 ng/mL, prescribing supplement.",
    attachments: [
      { name: "BloodPanel_Results.pdf", size: "1.4 MB", url: "#" }
    ]
  },
  {
    id: "rec-2",
    date: "2026-05-12",
    doctorName: "Dr. Elena Rostova",
    specialty: "Pediatrics",
    type: "Immunization Record",
    notes: "Administered Tdap booster vaccine. Height: 125cm (50th percentile), Weight: 26kg (45th percentile). General reflexes normal. Healthy developmental cycle.",
    attachments: [
      { name: "Vaccination_Card_May2026.pdf", size: "820 KB", url: "#" }
    ]
  }
];
let inMemoryPrescriptions = [
  {
    id: "rx-1",
    name: "Vitamin D3 (Cholecalciferol)",
    dosage: "50,000 IU",
    frequency: "Once a week (Sunday morning)",
    duration: "12 Weeks",
    doctorName: "Dr. Sarah Jenkins",
    date: "2026-07-27",
    status: "active",
    pharmacy: "CVS Pharmacy #4823"
  },
  {
    id: "rx-2",
    name: "Amoxicillin",
    dosage: "500 mg",
    frequency: "Three times daily with food",
    duration: "7 Days",
    doctorName: "Dr. Elena Rostova",
    date: "2026-05-12",
    status: "expired",
    pharmacy: "Walgreens Pharmacy #9901"
  }
];

// Authentication Services
export async function loginWithEmail(email, password) {
  await delay(1000);
  // Perform mock validation
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }
  
  // Create mock user
  const user = {
    uid: "mock-user-123",
    name: inMemoryProfile.name,
    email: email,
    role: "Patient"
  };
  
  return { success: true, user };
}

export async function loginWithGoogle() {
  await delay(1200);
  const user = {
    uid: "mock-google-456",
    name: "Google Patient User",
    email: "google.patient@gmail.com",
    role: "Patient"
  };
  return { success: true, user };
}

export async function signupWithEmail(name, email, password) {
  await delay(1000);
  if (!name || !email || !password) {
    throw new Error("All fields are required.");
  }
  
  inMemoryProfile.name = name;
  inMemoryProfile.email = email;
  
  const user = {
    uid: "mock-user-789",
    name,
    email,
    role: "Patient"
  };
  return { success: true, user };
}

// Dashboard Summary
export async function getDashboardSummary() {
  await delay(600);
  
  const upcoming = inMemoryAppointments.filter(
    (apt) => apt.status === "confirmed" || apt.status === "pending"
  );
  const unreadMessagesCount = inMemoryMessages.filter((m) => m.sender !== "patient").length;
  const outstandingBalance = inMemoryInvoices
    .filter((inv) => inv.status === "unpaid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return {
    nextAppointment: upcoming.length > 0 ? upcoming[0] : null,
    stats: {
      pendingForms: 1, // Intake consent form
      unreadMessages: unreadMessagesCount,
      outstandingBalance: outstandingBalance
    },
    notifications: [
      { id: 1, type: "appointment", text: "Your appointment with Dr. Jenkins is confirmed.", time: "1 hour ago" },
      { id: 2, type: "billing", text: "New invoice issued for your visit on July 28th.", time: "1 day ago" },
      { id: 3, type: "record", text: "New lab result PDF was uploaded.", time: "2 days ago" }
    ]
  };
}

// Appointments Management
export async function getAppointments(status = "all") {
  await delay(500);
  const today = new Date();
  
  return inMemoryAppointments.filter(apt => {
    const aptDate = new Date(apt.date);
    if (status === "upcoming") {
      return aptDate >= today && (apt.status === "confirmed" || apt.status === "pending");
    } else if (status === "past") {
      return aptDate < today || apt.status === "completed" || apt.status === "cancelled";
    }
    return true;
  });
}

export async function getDoctors() {
  await delay(400);
  return sampleDoctors;
}

export async function getAvailableSlots(doctorId, dateString) {
  await delay(400);
  const doctor = sampleDoctors.find((d) => d.id === doctorId);
  if (!doctor) return [];
  
  // Return slots or default slots if date is not explicitly configured
  return doctor.slots[dateString] || ["09:00 AM", "10:00 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:00 PM"];
}

export async function createAppointment(payload) {
  await delay(800);
  const doctor = sampleDoctors.find((d) => d.id === payload.doctorId);
  
  // Standard instant confirm or approval pending based on date choice
  const outcomeStatus = payload.date.includes("01") ? "pending" : "confirmed";

  const newAppointment = {
    id: `apt-${Date.now()}`,
    doctorId: payload.doctorId,
    doctorName: doctor ? doctor.name : "Staff Physician",
    specialty: doctor ? doctor.specialty : "General Medicine",
    date: payload.date,
    time: payload.time,
    type: payload.type,
    status: outcomeStatus,
    reason: payload.reason,
    notes: payload.notes || ""
  };

  inMemoryAppointments = [newAppointment, ...inMemoryAppointments];
  return { success: true, appointment: newAppointment };
}

export async function updateAppointment(id, payload) {
  await delay(600);
  inMemoryAppointments = inMemoryAppointments.map((apt) => {
    if (apt.id === id) {
      return { ...apt, ...payload, status: "confirmed" }; // Re-confirming rescheduled appointment
    }
    return apt;
  });
  return { success: true };
}

export async function cancelAppointment(id) {
  await delay(600);
  inMemoryAppointments = inMemoryAppointments.map((apt) => {
    if (apt.id === id) {
      return { ...apt, status: "cancelled" };
    }
    return apt;
  });
  return { success: true };
}

// Messaging Services
export async function getMessages() {
  await delay(400);
  return inMemoryMessages;
}

export async function sendMessage(payload) {
  // Simulates short network delay then replies with AI auto-response
  const patientMsg = {
    id: `msg-${Date.now()}`,
    sender: "patient",
    text: payload.text,
    timestamp: new Date().toISOString()
  };
  
  inMemoryMessages = [...inMemoryMessages, patientMsg];
  
  // Trigger async AI reply after some delay
  setTimeout(() => {
    const aiResponse = {
      id: `msg-reply-${Date.now()}`,
      sender: "system",
      text: `Thank you for your message: "${payload.text}". This has been routed to our clinical staff. A member of our team will follow up if additional details are needed.`,
      timestamp: new Date().toISOString()
    };
    inMemoryMessages = [...inMemoryMessages, aiResponse];
  }, 2000);

  return patientMsg;
}

// Medical Records
export async function getMedicalRecords() {
  await delay(500);
  return inMemoryRecords;
}

// Prescriptions
export async function getPrescriptions() {
  await delay(500);
  return inMemoryPrescriptions;
}

// Invoices / Billing
export async function getInvoices() {
  await delay(500);
  return inMemoryInvoices;
}

export async function payInvoice(id) {
  await delay(1000);
  inMemoryInvoices = inMemoryInvoices.map((inv) => {
    if (inv.id === id) {
      return { ...inv, status: "paid" };
    }
    return inv;
  });
  return { success: true };
}

// Profile / Settings
export async function getProfile() {
  await delay(400);
  return inMemoryProfile;
}

export async function updateProfile(payload) {
  await delay(600);
  inMemoryProfile = { ...inMemoryProfile, ...payload };
  return { success: true, profile: inMemoryProfile };
}
