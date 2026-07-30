"use client";

import React from "react";
import { motion } from "framer-motion";
import { H2, Body } from "../common/Typography";
import { Card } from "../common/Card";
import Container from "../common/Container";

export default function Pitch() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="bg-white py-16 md:py-24 border-b border-brand-bg-light" id="features">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-12 md:space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase font-poppins block">
              — The Pitch
            </span>
            <H2 className="text-brand-primary font-semibold leading-tight">
              Your front desk is where revenue is won or lost — every single day.
            </H2>
            <Body variant="secondary">
              A missed call is a lost patient. An empty slot is lost income. An hour spent on paperwork is an hour not spent on care.
              Most clinics still run these critical workflows on phone calls, WhatsApp threads, paper reminders, and spreadsheets —
              and it quietly drains revenue and burns out staff.
            </Body>
          </motion.div>

          {/* Core Platform Quote Card */}
          <motion.div variants={itemVariants}>
            <div className="bg-brand-primary text-white rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-lg border border-brand-accent/15">
              <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none select-none text-[150px] font-bold font-poppins leading-none">
                “
              </div>
              <div className="relative z-10 max-w-4xl space-y-4">
                <Body variant="white" className="text-lg md:text-xl font-medium leading-[1.6]">
                  ClinicFlow AI is the{" "}
                  <span className="text-brand-accent font-semibold">all-in-one AI platform</span> that
                  runs your front desk, follow-ups, documentation, and payments — automatically. It
                  answers every patient, fills every schedule gap, writes every consultation note,
                  and collects every payment. It works{" "}
                  <span className="text-brand-accent font-semibold">24/7</span>, never forgets a
                  reminder, never misses a message, and costs less than a part-time receptionist.
                </Body>
                <div className="pt-2">
                  <span className="text-xs text-brand-accent uppercase tracking-widest font-semibold font-poppins">
                    — One platform to replace eight. Built specifically for small and mid-sized clinics.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3 Animated Stat Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-4"
          >
            {/* Stat 1 */}
            <motion.div variants={itemVariants}>
              <Card hoverable className="h-full flex flex-col justify-between p-6 md:p-8 border-l-4 border-l-brand-accent shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    <span className="text-brand-accent text-lg font-bold">↓</span>
                    <span className="font-poppins text-3xl md:text-[36px] font-bold text-brand-primary leading-none">
                      50%
                    </span>
                  </div>
                  <Body className="text-[16px] font-normal leading-[1.6]">
                    <span className="font-semibold text-brand-dark">Administrative workload</span> removed from your team through end-to-end automation.
                  </Body>
                </div>
              </Card>
            </motion.div>

            {/* Stat 2 */}
            <motion.div variants={itemVariants}>
              <Card hoverable className="h-full flex flex-col justify-between p-6 md:p-8 border-l-4 border-l-brand-error shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    <span className="text-brand-error text-lg font-bold">↓</span>
                    <span className="font-poppins text-3xl md:text-[36px] font-bold text-brand-error leading-none">
                      No-Shows
                    </span>
                  </div>
                  <Body className="text-[16px] font-normal leading-[1.6]">
                    <span className="font-semibold text-brand-dark">Automated reminders & waitlist recovery</span> turn empty slots back into revenue.
                  </Body>
                </div>
              </Card>
            </motion.div>

            {/* Stat 3 */}
            <motion.div variants={itemVariants}>
              <Card hoverable className="h-full flex flex-col justify-between p-6 md:p-8 border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    <span className="font-poppins text-3xl md:text-[36px] font-bold text-amber-500 leading-none">
                      24/7
                    </span>
                  </div>
                  <Body className="text-[16px] font-normal leading-[1.6]">
                    <span className="font-semibold text-brand-dark">Always-on AI reception</span> books, reschedules, and answers patients around the clock.
                  </Body>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
