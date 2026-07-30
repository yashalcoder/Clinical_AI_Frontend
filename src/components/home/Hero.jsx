"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { H1, Body } from "../common/Typography";
import { Button } from "../common/Button";
import Container from "../common/Container";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-gradient-to-b from-[#061E16] to-brand-primary text-white overflow-hidden border-b border-brand-accent/10">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F3D2E_1px,transparent_1px),linear-gradient(to_bottom,#0F3D2E_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      {/* Decorative Blur Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />

      <Container className="relative py-20 md:py-28 md:pb-36 flex flex-col items-start gap-8 z-10">
        {/* Confidential Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 border border-brand-accent/30 rounded-full px-4 py-1.5 bg-brand-accent/5 text-[14px] text-brand-accent font-medium tracking-wider uppercase font-poppins"
        >
          <span>AI-Powered Clinic Automation Platform</span>
        </motion.div>

        {/* H1 Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-4xl"
        >
          <H1 className="text-white font-bold leading-tight !mb-0">
            The <span className="text-brand-accent underline decoration-brand-accent/30 underline-offset-8">AI Operating System</span> for Modern Clinics
          </H1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl"
        >
          <Body variant="white" className="text-gray-300 text-lg md:text-xl leading-[1.6]">
            Automate the front desk, the follow-ups, the clinical notes, and the numbers — so
            your team stops chasing paperwork and starts growing the practice.
          </Body>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-3 mt-2"
        >
          {[
            { label: "24/7 AI Reception", dot: "bg-[#14B88A]" },
            { label: "Zero-Effort Reminders", dot: "bg-[#FF6B4A]" },
            { label: "AI Clinical Notes", dot: "bg-[#FFD15C]" },
            { label: "Built-in Payments", dot: "bg-[#4AA6FF]" }
          ].map((pill, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 border border-brand-accent/20 rounded-full bg-brand-primary/50 text-[16px] text-gray-200"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${pill.dot}`} />
              <span className="font-poppins">{pill.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
        >
          <Link href="/signup" className="w-full sm:w-auto">
            <Button variant="accent" size="lg" className="w-full sm:w-auto px-8">
              Start Free Pilot
            </Button>
          </Link>
          <a href="#how-it-works" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 px-8">
              Book a Live Demo
            </Button>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
