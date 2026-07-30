"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { H2, H3, Body } from "../common/Typography";
import { Card } from "../common/Card";
import Container from "../common/Container";

export default function ProblemGrid() {
  const problems = [
    {
      num: "1",
      title: "Chaotic Scheduling",
      desc: "Double bookings, missed calls, and manual errors across paper diaries and disconnected calendars.",
      badge: "Lost patients · Revenue loss"
    },
    {
      num: "2",
      title: "Fragmented Communication",
      desc: "Phone, WhatsApp, SMS, and paper with no central hub — messages slip through the cracks.",
      badge: "Missed follow-ups · High admin load"
    },
    {
      num: "3",
      title: "Appointment No-Shows",
      desc: "No automated reminders means patients simply forget, leaving expensive gaps in the schedule.",
      badge: "Empty slots · Wasted capacity"
    },
    {
      num: "4",
      title: "Repetitive Admin Tasks",
      desc: "Booking, answering the same FAQs, and sending reminders — all done manually, all day long.",
      badge: "Staff burnout · High cost"
    },
    {
      num: "5",
      title: "No Data Visibility",
      desc: "Decisions made on gut feel, not numbers. No view of no-shows, revenue trends, or retention.",
      badge: "Poor planning · Hidden leakage"
    },
    {
      num: "6",
      title: "Manual Documentation",
      desc: "Doctors write notes during and after every consult, shrinking face time and adding fatigue.",
      badge: "Less care time · Physician fatigue"
    }
  ];

  return (
    <section className="bg-brand-bg-light py-16 md:py-24 border-b border-brand-bg-light">
      <Container className="space-y-12 md:space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase font-poppins block">
            — The Problem
          </span>
          <H2 className="text-brand-primary font-semibold leading-tight">
            Clinics are drowning in admin — and it's costing them patients.
          </H2>
          <Body variant="secondary">
            Manual, phone-based, and paper-driven workflows create six compounding problems.
            Individually they look like minor friction. Together, they are a serious leak in revenue,
            staff time, and patient trust.
          </Body>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {problems.map((prob, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full flex flex-col justify-between p-6 md:p-8 relative border-t-2 border-t-brand-primary/20 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="h-8 w-8 bg-brand-bg-light border border-brand-primary/10 text-brand-primary font-bold rounded-lg flex items-center justify-center font-poppins">
                      {prob.num}
                    </span>
                  </div>
                  <H3 className="text-brand-dark text-xl font-semibold !mb-0">{prob.title}</H3>
                  <Body variant="secondary" className="text-[16px] leading-[1.6]">
                    {prob.desc}
                  </Body>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-bg-light">
                  <span className="inline-block text-[14px] font-semibold text-brand-error uppercase tracking-wider font-poppins">
                    {prob.badge}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Alert Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4 items-start"
        >
          <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={24} />
          <div>
            <span className="font-poppins font-medium text-amber-900 text-[16px] leading-[1.6]">
              Every one of these is a leak
            </span>
            <span className="font-poppins text-amber-800 text-[16px] leading-[1.6]">
              {" "}
              — in your revenue, your team's time, and your patients' experience. The clinics that plug these
              leaks first will out-grow the ones that don't.
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
