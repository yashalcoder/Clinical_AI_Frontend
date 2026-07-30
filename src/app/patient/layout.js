import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata = {
  title: {
    template: "%s | ClinicFlow AI Patient Portal",
    default: "Patient Portal Dashboard"
  },
  description: "Secure, HIPAA-compliant patient communication, booking schedules, and medical files."
};

export default function PatientLayout({ children }) {
  return (
    <div className="flex bg-brand-bg-light min-h-screen text-brand-dark overflow-x-hidden">
      {/* Collapsible Sidebar - Left */}
      <Sidebar />

      {/* Main Content Area - Right */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar controls */}
        <Header />

        {/* Dynamic Inner Router Views */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
