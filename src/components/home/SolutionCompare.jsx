"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { H2, Body } from "../common/Typography";
import Container from "../common/Container";

export default function SolutionCompare() {
  const oldTools = [
    "Phone & paper appointment book",
    "WhatsApp & SMS on separate apps",
    "Manual reminder calls",
    "Handwritten consultation notes",
    "Spreadsheet for payments & tracking",
    "No reporting or analytics"
  ];

  const newTools = [
    "AI receptionist & smart scheduling",
    "Unified omnichannel inbox",
    "Automated reminders & recovery",
    "AI speech-to-text SOAP notes",
    "Built-in payments & claims",
    "Live growth & revenue analytics"
  ];

  return (
    <section className="bg-white py-16 md:py-24 border-b border-brand-bg-light">
      <Container className="space-y-12 md:space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase font-poppins block">
            — The Solution
          </span>
          <H2 className="text-brand-primary font-semibold leading-tight">
            One platform. Every clinic workflow. Fully automated.
          </H2>
          <Body variant="secondary">
            ClinicFlow AI consolidates the receptionist calls, WhatsApp groups, paper reminders,
            manual note-taking, billing spreadsheets, and follow-up chasing into a single, connected
            system. Nine modules across five suites — all sharing one patient record, one schedule, and
            one source of truth.
          </Body>
        </div>

        {/* Side-by-side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-center">
          {/* Left panel: Old way */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 border-2 border-dashed border-brand-error/20 bg-brand-error/[0.02] rounded-2xl p-6 md:p-8"
          >
            <span className="text-xs font-bold text-brand-error uppercase tracking-widest font-poppins block mb-6">
              Today · 8+ Disconnected Tools
            </span>
            <ul className="space-y-4">
              {oldTools.map((tool, index) => (
                <li key={index} className="flex gap-3 items-center text-brand-secondary">
                  <span className="h-6 w-6 rounded-full bg-red-50 flex items-center justify-center text-brand-error shrink-0">
                    <X size={14} />
                  </span>
                  <span className="font-poppins text-[16px]">{tool}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Middle connector icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="hidden lg:flex h-12 w-12 bg-brand-primary text-brand-accent rounded-full items-center justify-center shrink-0 shadow-md border border-brand-accent/20 mx-auto"
          >
            <ArrowRight size={20} />
          </motion.div>

          {/* Right panel: ClinicFlow AI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-brand-primary text-white rounded-2xl p-6 md:p-8 shadow-xl border border-brand-accent/20"
          >
            <span className="text-xs font-bold text-brand-accent uppercase tracking-widest font-poppins block mb-6">
              With ClinicFlow AI · 1 Platform
            </span>
            <ul className="space-y-4">
              {newTools.map((tool, index) => (
                <li key={index} className="flex gap-3 items-center text-gray-200">
                  <span className="h-6 w-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0">
                    <Check size={14} />
                  </span>
                  <span className="font-poppins text-[16px] font-medium">{tool}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
