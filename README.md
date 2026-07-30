# ClinicFlow AI

**The AI Operating System for Modern Clinics**

ClinicFlow AI is an AI-powered clinic automation ERP platform that replaces the eight+ disconnected tools most small and mid-sized clinics run on today — phone calls, WhatsApp, paper reminders, spreadsheets, and manual note-taking — with one connected system.

The platform automates the front desk, patient follow-ups, clinical documentation, and billing, so clinic teams spend less time on paperwork and more time on care.

---

## ✨ Key Features

- **24/7 AI Reception** — automated call/message handling, live availability checks, instant booking, and double-booking prevention
- **Omnichannel Communication** — unified inbox for WhatsApp, SMS, voice, and email
- **Smart Reminders & No-Show Recovery** — automated 24h/2h reminders with one-tap confirm/reschedule and waitlist auto-fill
- **Patient Portal & Digital Intake** — self-service booking, digital intake forms, and secure record access
- **AI Clinical Documentation** — ambient speech-to-text SOAP notes with doctor sign-off
- **e-Prescriptions & Records** — digital prescriptions, full medical history, and audit-logged records
- **Billing, Payments & Claims** — instant invoicing, online payments, and insurance claims tracking
- **Reactivation & Reputation Engine** — automated recall campaigns and review requests
- **Analytics & Reporting** — live dashboards for revenue, no-show rate, and retention

## 🩺 Patient Portal (current focus)

This repo currently implements the **Patient-facing portal**, including:

- Dashboard — appointment overview, quick stats, notifications
- Appointments — multi-step booking flow, reschedule/cancel, live slot availability
- Messages — unified chat with the clinic
- Medical Records — visit history, lab results, attachments
- Prescriptions — active and past prescriptions
- Billing & Payments — invoices and online payment
- Profile & Settings

> Doctor, Receptionist, and Clinic Admin portals are scaffolded in the codebase (routes/config present but commented out) for future development.

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Language:** JavaScript (JSX)

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/<your-username>/clinicflow-ai.git
cd clinicflow-ai

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
app/            # Pages & routes (App Router)
components/     # Reusable UI components (common, layout, home, auth, patient)
lib/            # API service layer & config
data/           # Sample/placeholder data
public/         # Static assets
```

## 📌 Status

🚧 Actively in development — frontend for Home, Auth, and Patient Portal in progress.

## 📄 License

This project is proprietary/confidential. All rights reserved.
