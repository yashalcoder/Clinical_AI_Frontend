"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Sparkles, Shield, Compass, CalendarCheck2, Globe } from "lucide-react";
import { H2, H3, Body } from "../common/Typography";
import { Card } from "../common/Card";
import Container from "../common/Container";

export default function WhyUs() {
  const reasons = [
    {
      title: "All-in-one, not bolted-on",
      desc: "One platform replaces eight disconnected tools — one login, one record, one bill, zero integration headaches.",
      icon: Layers
    },
    {
      title: "AI-native from day one",
      desc: "Reception, documentation, and analytics are powered by AI at the core — not a chatbot added as an afterthought.",
      icon: Sparkles
    },
    {
      title: "Built for SMB clinics",
      desc: "Priced and designed for small and mid-sized practices — enterprise power without the enterprise price tag or complexity.",
      icon: Compass
    },
    {
      title: "WhatsApp-first & localised",
      desc: "Meets patients on the channels they already use, tuned to your market's languages, currency, and payment methods.",
      icon: Globe
    },
    {
      title: "Live in ~2 weeks",
      desc: "Guided onboarding, full data migration, and staff training — value in days, not a multi-quarter IT project.",
      icon: CalendarCheck2
    },
    {
      title: "Secure & compliance-ready",
      desc: "Encryption, role-based access, and audit trails designed to support HIPAA, GDPR, and local regulations.",
      icon: Shield
    }
  ];

  return (
    <section className="bg-white py-20 md:py-28 border-b border-brand-bg-light" id="why-us">
      <Container className="space-y-16 md:space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase font-poppins block">
            — Why ClinicFlow AI
          </span>
          <H2 className="text-brand-primary font-semibold leading-tight">
            Why clinics choose us over stitching tools together.
          </H2>
        </div>

        {/* 6 item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Card className="h-full space-y-4 p-6 md:p-8 border-t-2 border-t-brand-accent/20 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 bg-brand-bg-light text-brand-accent rounded-lg flex items-center justify-center border border-brand-accent/15">
                    <Icon size={20} />
                  </div>
                  <H3 className="text-brand-dark text-lg font-semibold !mb-0">{reason.title}</H3>
                  <Body variant="secondary" className="text-[16px] leading-[1.6]">
                    {reason.desc}
                  </Body>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
