"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { H2, H3, Body } from "../common/Typography";
import Container from "../common/Container";

export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Patient reaches out",
      modules: "Modules 1 · 2",
      desc: "The AI receptionist picks up instantly on any channel, checks live availability, and books the slot — no hold music, no missed calls."
    },
    {
      num: "2",
      title: "Appointment is created",
      modules: "Modules 3 · 4",
      desc: "Confirmation and reminders fire automatically at 24 h and 2 h. The patient completes digital intake and consent forms before arriving."
    },
    {
      num: "3",
      title: "Consultation day",
      modules: "Modules 5 · 6",
      desc: "The doctor sees the full schedule and patient history on one dashboard while the AI documents the visit in real time as a SOAP note."
    },
    {
      num: "4",
      title: "Payment & post-visit",
      modules: "Modules 7 · 8",
      desc: "Prescription and invoice are generated instantly, payment is collected via a link, and follow-up messages keep the patient on track."
    },
    {
      num: "5",
      title: "Retain & grow",
      modules: "Modules 9 · 10",
      desc: "Recall and review campaigns bring patients back, while live analytics surface no-show rates, revenue trends, and retention for management."
    }
  ];

  return (
    <section className="bg-white py-20 md:py-28 border-b border-brand-bg-light" id="how-it-works">
      <Container className="space-y-16 md:space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase font-poppins block">
            — How It Works Together
          </span>
          <H2 className="text-brand-primary font-semibold leading-tight">
            A closed loop where every step feeds the next.
          </H2>
          <Body variant="secondary">
            Patient interaction triggers scheduling, scheduling triggers communication, the portal surfaces
            records for the doctor, and every interaction flows into the analytics engine — one connected journey,
            start to finish.
          </Body>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-16 space-y-12">
          {/* Vertical connector line */}
          <div className="absolute left-4 sm:left-8 top-4 bottom-4 w-0.5 bg-brand-primary/10" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Number Circle Badge */}
              <div className="absolute -left-[32px] sm:-left-[48px] top-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-brand-primary text-white border-4 border-white flex items-center justify-center font-poppins font-bold text-sm sm:text-base shadow-sm group-hover:bg-brand-accent transition-colors">
                {step.num}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <H3 className="text-brand-dark text-xl font-bold !mb-0">{step.title}</H3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-bg-light border border-brand-accent/20 text-[14px] text-brand-accent font-semibold font-poppins">
                    {step.modules}
                  </span>
                </div>
                <Body variant="secondary" className="max-w-2xl text-[16px] leading-[1.6]">
                  {step.desc}
                </Body>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing alert banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto bg-brand-accent/5 border border-brand-accent/20 rounded-xl p-6 flex gap-4 items-center"
        >
          <div className="h-10 w-10 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0">
            <RefreshCw size={20} className="animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <Body className="text-[16px] leading-[1.6]">
            <span className="font-semibold text-brand-primary">Every interaction feeds the analytics engine</span> — so the more the clinic runs, the smarter and more profitable it becomes.
          </Body>
        </motion.div>
      </Container>
    </section>
  );
}
