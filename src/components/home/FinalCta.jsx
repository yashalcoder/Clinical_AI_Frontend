"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, Globe } from "lucide-react";
import { H2, H3, Body } from "../common/Typography";
import { Button } from "../common/Button";
import Container from "../common/Container";

export default function FinalCta() {
  const steps = [
    {
      num: "1",
      title: "Book a live demo",
      desc: "A 30-minute walkthrough tailored to your clinic's size and specialty."
    },
    {
      num: "2",
      title: "Start your free pilot",
      desc: "Run ClinicFlow AI for 14 days with your real patients and schedule."
    },
    {
      num: "3",
      title: "Go live & grow",
      desc: "Full onboarding, migration, and training — then watch the metrics move."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#061E16] to-[#030F0B] text-white py-20 md:py-28 border-b border-brand-accent/10 animate-fadeIn">
      <Container className="space-y-16 md:space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase font-poppins block">
            — Next Steps
          </span>
          <H2 className="text-white font-bold leading-tight">
            Give your team the freedom to do what they trained for:{" "}
            <span className="text-brand-accent">care.</span>
          </H2>
          <Body variant="white" className="text-gray-300">
            See ClinicFlow AI running on your own clinic's workflow. Book a live demo, then start a
            no-risk pilot — we'll have you live in about two weeks.
          </Body>
        </div>

        {/* 3 Step Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 relative"
            >
              <div className="h-9 w-9 rounded-lg bg-brand-accent text-brand-primary flex items-center justify-center font-poppins font-bold mb-6">
                {step.num}
              </div>
              <H3 className="text-white text-lg font-bold mb-2">{step.title}</H3>
              <Body variant="white" className="text-gray-300 text-sm font-light">
                {step.desc}
              </Body>
            </motion.div>
          ))}
        </div>

        <hr className="border-white/10" />

        {/* Contact Block Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-brand-accent border border-white/10">
              <Mail size={18} />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block font-poppins">
                Email
              </span>
              <a href="mailto:hello@clinicflow.ai" className="font-poppins font-medium text-white hover:text-brand-accent transition-colors">
                hello@clinicflow.ai
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-brand-accent border border-white/10">
              <Phone size={18} />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block font-poppins">
                Phone / WhatsApp
              </span>
              <span className="font-poppins font-medium text-white">
                +1 (555) 019-2834
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-brand-accent border border-white/10">
              <Globe size={18} />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block font-poppins">
                Website
              </span>
              <a href="https://www.clinicflow.ai" target="_blank" rel="noopener noreferrer" className="font-poppins font-medium text-white hover:text-brand-accent transition-colors">
                www.clinicflow.ai
              </a>
            </div>
          </div>
        </div>

        {/* Highlighting Tagline */}
        <div className="text-center pt-8">
          <span className="font-poppins text-brand-accent text-lg font-bold tracking-wide uppercase">
            ClinicFlow AI — Automate the Clinic. Elevate the Care.
          </span>
        </div>
      </Container>
    </section>
  );
}
