"use client";

import React from "react";
import { User, Stethoscope, ShieldAlert, CalendarRange } from "lucide-react";

export default function RoleSelector({ value, onChange }) {
  // Roles config structure
  const roles = [
    {
      id: "patient",
      name: "Patient",
      icon: User,
      enabled: true,
      description: "Book appointments & access medical records"
    }
    // TODO: enable once their portals are built
    /*
    {
      id: "doctor",
      name: "Doctor",
      icon: Stethoscope,
      enabled: false,
      description: "Manage consultations & digital prescriptions (Coming Soon)"
    },
    {
      id: "receptionist",
      name: "Receptionist",
      icon: CalendarRange,
      enabled: false,
      description: "Handle incoming calls & scheduling calendar (Coming Soon)"
    },
    {
      id: "admin",
      name: "Admin",
      icon: ShieldAlert,
      enabled: false,
      description: "Oversee operational analytics & clinics setup (Coming Soon)"
    }
    */
  ];

  // Visual helper list to show disabled options in UI, while keeping core commented out in config above
  const displayRoles = [
    { id: "patient", name: "Patient", icon: User, enabled: true, desc: "Access records & scheduling" },
    { id: "doctor", name: "Doctor (Coming Soon)", icon: Stethoscope, enabled: false, desc: "SOAP notes & scripts" },
    { id: "receptionist", name: "Receptionist (Coming Soon)", icon: CalendarRange, enabled: false, desc: "Inbound queues" },
    { id: "admin", name: "Admin (Coming Soon)", icon: ShieldAlert, enabled: false, desc: "Analytics & setup" }
  ];

  return (
    <div className="space-y-3 font-poppins">
      <label className="text-[16px] font-medium text-brand-dark block">
        Portal Role
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displayRoles.map((role) => {
          const Icon = role.icon;
          const isSelected = value === role.id;
          
          return (
            <button
              key={role.id}
              type="button"
              disabled={!role.enabled}
              onClick={() => role.enabled && onChange(role.id)}
              className={`flex items-start gap-3 p-3.5 border rounded-lg text-left transition-all ${
                !role.enabled
                  ? "bg-brand-bg-light/40 border-brand-primary/5 opacity-55 cursor-not-allowed"
                  : isSelected
                  ? "border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent"
                  : "border-brand-primary/10 bg-white hover:bg-brand-bg-light cursor-pointer"
              }`}
            >
              <div className={`p-1.5 rounded-md mt-0.5 ${
                !role.enabled 
                  ? "bg-gray-100 text-gray-400" 
                  : isSelected 
                  ? "bg-brand-accent text-white" 
                  : "bg-brand-bg-light text-brand-primary"
              }`}>
                <Icon size={16} />
              </div>
              <div>
                <span className={`text-[14px] font-bold block ${
                  !role.enabled ? "text-gray-400" : "text-brand-dark"
                }`}>
                  {role.name}
                </span>
                <span className="text-[12px] text-brand-secondary leading-tight block mt-0.5">
                  {role.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
