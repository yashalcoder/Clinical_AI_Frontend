"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, Key, ClipboardList, CheckCircle2, Server, Database } from "lucide-react";
import { H2, H3, Body } from "../common/Typography";
import { Card } from "../common/Card";
import Container from "../common/Container";

export default function Security() {
  const securityItems = [
    {
      title: "End-to-End Encryption",
      desc: "Data encrypted in transit (TLS) and at rest (AES-256) across every service and store.",
      icon: Key
    },
    {
      title: "Role-Based Access Control",
      desc: "Least-privilege permissions ensure staff only see what their role requires.",
      icon: Shield
    },
    {
      title: "Full Audit Trails",
      desc: "Every access and change to a record is logged, timestamped, and traceable.",
      icon: ClipboardList
    },
    {
      title: "Compliance-Ready",
      desc: "Designed to support HIPAA, GDPR, and local data-protection frameworks, with BAA readiness.",
      icon: CheckCircle2
    },
    {
      title: "Data Residency Options",
      desc: "Choose where patient data is hosted to meet local and regional requirements.",
      icon: Server
    },
    {
      title: "Automated Backups & DR",
      desc: "Continuous backups and disaster-recovery keep the clinic running, always.",
      icon: Database
    }
  ];

  return (
    <section className="bg-brand-bg-light py-20 md:py-28 border-b border-brand-bg-light">
      <Container className="space-y-16 md:space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase font-poppins block">
            — Security & Compliance
          </span>
          <H2 className="text-brand-primary font-semibold leading-tight">
            Patient data, protected by design.
          </H2>
          <Body variant="secondary">
            Healthcare data demands the highest standard of care. ClinicFlow AI is engineered around
            privacy and security from the ground up, with controls designed to support regulatory
            requirements in every market it serves.
          </Body>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {securityItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Card className="h-full space-y-4 p-6 md:p-8 border-l-2 border-l-brand-primary/20 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 bg-brand-primary text-brand-accent rounded-lg flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <H3 className="text-brand-dark text-lg font-semibold !mb-0">{item.title}</H3>
                  <Body variant="secondary" className="text-[16px] leading-[1.6]">
                    {item.desc}
                  </Body>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Muted Disclaimer footer */}
        <div className="text-center pt-4">
          <span className="font-poppins text-brand-secondary text-[14px] italic">
            Compliance posture depends on final deployment and configuration; ClinicFlow AI provides the controls and documentation to support certification.
          </span>
        </div>
      </Container>
    </section>
  );
}
