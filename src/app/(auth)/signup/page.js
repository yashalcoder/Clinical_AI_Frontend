import React from "react";
import Link from "next/link";
import { Activity, Check } from "lucide-react";
import SignupForm from "@/components/auth/SignupForm";
import { H2, Body } from "@/components/common/Typography";

export const metadata = {
  title: "Sign Up",
  description: "Create your ClinicFlow AI Patient Account to self-book appointments and access lab reports."
};

export default function SignupPage() {
  const highlights = [
    "Select doctor and date slots live",
    "Pre-fill medical forms digitally",
    "Message care team in real time",
    "View prescription history instantly"
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left panel: Brand and highlights */}
      <div className="relative md:w-1/2 bg-brand-primary text-white flex flex-col justify-between p-8 md:p-16 overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#14B88A_1px,transparent_1px),linear-gradient(to_bottom,#14B88A_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-accent/10 blur-[100px] pointer-events-none" />

        {/* Brand logo top link */}
        <Link href="/" className="flex items-center gap-2 group relative z-10">
          <div className="h-9 w-9 bg-white/10 rounded-lg flex items-center justify-center text-brand-accent transition-transform group-hover:scale-105">
            <Activity size={20} />
          </div>
          <span className="font-poppins text-[20px] font-bold text-white tracking-tight">
            ClinicFlow <span className="text-brand-accent">AI</span>
          </span>
        </Link>

        {/* Content body */}
        <div className="space-y-8 my-auto relative z-10 max-w-lg">
          <H2 className="text-white text-[30px] md:text-[36px] font-bold leading-tight !mb-0">
            A self-service hub patients actually use.
          </H2>
          <ul className="space-y-4">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex gap-3 items-center">
                <span className="h-6 w-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0">
                  <Check size={14} />
                </span>
                <span className="font-poppins text-[16px] text-gray-200">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-gray-400 font-poppins">
          &copy; {new Date().getFullYear()} ClinicFlow AI. HIPAA Compliant & Secure.
        </div>
      </div>

      {/* Right panel: Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white overflow-y-auto">
        <SignupForm />
      </div>
    </div>
  );
}
