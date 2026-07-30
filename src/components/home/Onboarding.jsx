"use client";

import React from "react";
import { motion } from "framer-motion";
import { Headphones } from "lucide-react";
import { H2, H3, Body } from "../common/Typography";
import { Card } from "../common/Card";
import Container from "../common/Container";

export default function Onboarding() {
  const phases = [
    {
      num: "01",
      phase: "PHASE 1",
      days: "Days 1–3",
      title: "Discovery & Setup",
      bullets: [
        "Clinic, providers & services configured",
        "Working hours & booking rules",
        "Branding & message templates"
      ]
    },
    {
      num: "02",
      phase: "PHASE 2",
      days: "Days 4–7",
      title: "Data & Integrations",
      bullets: [
        "Patient & appointment import",
        "WhatsApp, SMS & payments connected",
        "Calendar & EHR sync"
      ]
    },
    {
      num: "03",
      phase: "PHASE 3",
      days: "Days 8–12",
      title: "Configure & Train",
      bullets: [
        "Reminder & automation rules",
        "Hands-on staff training",
        "Test bookings & dry run"
      ]
    },
    {
      num: "04",
      phase: "PHASE 4",
      days: "Days 13–14",
      title: "Go-Live & Optimise",
      bullets: [
        "Soft launch with live support",
        "Monitor & fine-tune",
        "Success review & handoff"
      ]
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 border-b border-brand-bg-light">
      <Container className="space-y-12 md:space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase font-poppins block">
            — Onboarding
          </span>
          <H2 className="text-brand-primary font-semibold leading-tight">
            Live in about two weeks — not two quarters.
          </H2>
          <Body variant="secondary">
            No rip-and-replace, no lengthy IT project. A guided four-phase rollout gets your clinic fully
            operational fast, with your data migrated and your team trained.
          </Body>
        </div>

        {/* Horizontal/Vertical Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {phases.map((phase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Card className="h-full relative p-6 md:p-8 flex flex-col justify-between border-t-4 border-t-brand-primary shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-brand-accent tracking-wider font-poppins">
                      {phase.phase}
                    </span>
                    <span className="text-xs font-bold text-brand-secondary/40 font-poppins">
                      {phase.num}
                    </span>
                  </div>
                  <H3 className="text-brand-dark text-lg font-bold mb-1">{phase.days}</H3>
                  <span className="font-poppins text-brand-primary font-semibold text-[16px] block mb-4">
                    {phase.title}
                  </span>
                  <ul className="space-y-2 border-t border-brand-bg-light pt-4">
                    {phase.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex gap-2 items-start text-brand-secondary">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                        <span className="font-poppins text-[16px] leading-[1.4]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Ongoing Support bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-brand-primary text-white rounded-xl p-6 flex gap-4 items-center border border-brand-accent/20 shadow-md"
        >
          <div className="h-10 w-10 bg-brand-accent/20 text-brand-accent rounded-lg flex items-center justify-center shrink-0">
            <Headphones size={20} />
          </div>
          <Body variant="white" className="text-[16px] leading-[1.6]">
            <span className="font-semibold text-brand-accent">Ongoing success & support</span> — a dedicated onboarding specialist, live chat support, a full help centre, and free product updates so the platform keeps getting better.
          </Body>
        </motion.div>
      </Container>
    </section>
  );
}
