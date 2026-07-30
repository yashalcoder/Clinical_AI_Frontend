import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-primary border-t border-brand-accent/15 py-12 px-6 text-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-white/10 rounded-lg flex items-center justify-center text-brand-accent">
            <Activity size={16} />
          </div>
          <span className="font-poppins text-lg font-bold text-white tracking-tight">
            ClinicFlow <span className="text-brand-accent">AI</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 text-[14px]">
          <Link href="/login" className="hover:text-white transition-colors font-poppins">
            Patient Portal
          </Link>
          <a href="#features" className="hover:text-white transition-colors font-poppins">
            Features
          </a>
          <a href="#pricing" className="hover:text-white transition-colors font-poppins">
            Pricing
          </a>
          <span className="text-gray-500 font-poppins">
            Privacy Policy
          </span>
          <span className="text-gray-500 font-poppins">
            Terms of Service
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-xs text-gray-500 font-poppins">
          &copy; {new Date().getFullYear()} ClinicFlow AI. All rights reserved.
          <span className="block mt-1 text-[10px] text-gray-600">
            Confidential Business Proposal Doc v2.0
          </span>
        </div>
      </div>
    </footer>
  );
}
