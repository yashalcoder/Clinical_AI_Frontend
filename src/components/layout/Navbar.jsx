"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, Menu, X } from "lucide-react";
import { Button } from "../common/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-bg-light">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 bg-brand-primary rounded-lg flex items-center justify-center text-brand-accent transition-transform group-hover:scale-105">
            <Activity size={20} />
          </div>
          <span className="font-poppins text-[20px] font-bold text-brand-primary tracking-tight">
            ClinicFlow <span className="text-brand-accent">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="font-poppins text-[16px] font-medium text-brand-secondary hover:text-brand-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="font-poppins text-[16px] font-medium text-brand-secondary hover:text-brand-primary transition-colors">
            How It Works
          </a>
          <a href="#roi" className="font-poppins text-[16px] font-medium text-brand-secondary hover:text-brand-primary transition-colors">
            ROI Calculator
          </a>
          <a href="#pricing" className="font-poppins text-[16px] font-medium text-brand-secondary hover:text-brand-primary transition-colors">
            Pricing
          </a>
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="secondary" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="accent" size="sm">
              Start Free Pilot
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 text-brand-primary hover:bg-brand-bg-light rounded-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Links Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-brand-bg-light bg-white px-6 py-4 flex flex-col gap-4 animate-fadeIn">
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="font-poppins text-[16px] font-medium text-brand-secondary hover:text-brand-primary py-2"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="font-poppins text-[16px] font-medium text-brand-secondary hover:text-brand-primary py-2"
          >
            How It Works
          </a>
          <a
            href="#roi"
            onClick={() => setIsOpen(false)}
            className="font-poppins text-[16px] font-medium text-brand-secondary hover:text-brand-primary py-2"
          >
            ROI Calculator
          </a>
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="font-poppins text-[16px] font-medium text-brand-secondary hover:text-brand-primary py-2"
          >
            Pricing
          </a>
          <hr className="border-brand-bg-light" />
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="secondary" className="w-full">
                Log In
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setIsOpen(false)}>
              <Button variant="accent" className="w-full">
                Start Free Pilot
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
