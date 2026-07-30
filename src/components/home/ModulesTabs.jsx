"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  MessageSquare,
  BellRing,
  UserCheck,
  LayoutDashboard,
  BrainCircuit,
  FileSpreadsheet,
  FilePlus,
  RefreshCw,
  LineChart
} from "lucide-react";
import { H2, H3, Body } from "../common/Typography";
import { Card } from "../common/Card";
import Container from "../common/Container";

export default function ModulesTabs() {
  const [activeSuite, setActiveSuite] = useState(0);

  const suites = [
    {
      name: "Front Office",
      meta: "Automate patient-facing interactions",
      modules: [
        {
          num: "01",
          title: "AI Receptionist & Smart Scheduling",
          solves: "missed calls · double bookings",
          icon: PhoneCall,
          bullets: [
            "Answers inbound calls & messages automatically, 24/7",
            "Checks live availability; books, reschedules & cancels",
            "Detects and prevents double-bookings",
            "Auto-fills cancellations from the waitlist"
          ]
        },
        {
          num: "02",
          title: "Omnichannel Communication",
          solves: "fragmented communication",
          icon: MessageSquare,
          bullets: [
            "Unified inbox: WhatsApp, SMS, voice & email in one place",
            "Instant AI answers to common patient FAQs",
            "Two-way messaging with full conversation history",
            "Broadcast updates & campaigns to patient segments"
          ]
        },
        {
          num: "03",
          title: "Smart Reminders & No-Show Recovery",
          solves: "no-shows · empty slots",
          icon: BellRing,
          bullets: [
            "Automated reminders at 24 h and 2 h before visits",
            "One-tap confirm / reschedule from the message",
            "Auto-rebooks freed slots from the waitlist instantly",
            "Post-visit follow-up & recall messages"
          ]
        }
      ]
    },
    {
      name: "Patient Experience",
      meta: "Self-service patient hub",
      modules: [
        {
          num: "04",
          title: "Patient Portal & Digital Intake",
          solves: "admin load · slow intake",
          icon: UserCheck,
          bullets: [
            "Patients self-book, reschedule & message the clinic",
            "Digital intake & consent forms before arrival",
            "Insurance & ID capture, secure record access",
            "Cuts phone volume and front-desk queues"
          ]
        }
      ]
    },
    {
      name: "Clinical Productivity",
      meta: "Give doctors their time back",
      modules: [
        {
          num: "05",
          title: "Doctor Dashboard & Care Coordination",
          solves: "scattered records",
          icon: LayoutDashboard,
          bullets: [
            "Daily schedule, patient timeline & history at a glance",
            "Follow-up tracker and task lists per patient",
            "Role-based shared records across the team",
            "Mobile-friendly for doctors on the move"
          ]
        },
        {
          num: "06",
          title: "AI Clinical Documentation",
          solves: "manual notes · fatigue",
          icon: BrainCircuit,
          bullets: [
            "Ambient speech-to-text notes in structured SOAP format",
            "Auto-drafted follow-up & care recommendations",
            "Suggested diagnosis/procedure codes for billing",
            "Doctor reviews & signs off — always in control"
          ]
        }
      ]
    },
    {
      name: "Revenue & Growth",
      meta: "Collect more, win patients back",
      modules: [
        {
          num: "07",
          title: "e-Prescriptions & Records",
          solves: "paperwork · lost records",
          icon: FilePlus,
          bullets: [
            "Generate and send digital prescriptions in seconds",
            "Reusable templates for common conditions",
            "Full medical history, attachments & lab results",
            "Secure, searchable, and audit-logged"
          ]
        },
        {
          num: "08",
          title: "Billing, Payments & Claims",
          solves: "leaked revenue · slow collection",
          icon: FileSpreadsheet,
          bullets: [
            "Instant invoices & online payment links (card, wallet, local)",
            "Automated outstanding-balance reminders",
            "Insurance & claims workflow with status tracking",
            "Daily reconciliation and revenue reports"
          ]
        },
        {
          num: "09",
          title: "Reactivation & Reputation Engine",
          solves: "patient churn · weak online presence",
          icon: RefreshCw,
          bullets: [
            "Auto-recall campaigns for overdue & lapsed patients",
            "Smart review requests to boost your Google rating",
            "Referral prompts turn happy patients into new ones",
            "Birthday, seasonal & check-up nudges"
          ]
        }
      ]
    },
    {
      name: "Intelligence",
      meta: "Run the practice on data",
      modules: [
        {
          num: "10",
          title: "Analytics, Reporting & Forecasting",
          solves: "no data visibility · blind planning",
          icon: LineChart,
          bullets: [
            "Live revenue, no-show & retention dashboards",
            "Appointment volume & slot-utilisation trends",
            "Provider performance & capacity insights",
            "Patient acquisition & lifetime-value tracking",
            "Automated weekly & monthly reports"
          ]
        }
      ]
    }
  ];

  return (
    <section className="bg-brand-bg-light py-16 md:py-24 border-b border-brand-bg-light" id="modules">
      <Container className="space-y-12 md:space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase font-poppins block">
            — The Platform
          </span>
          <H2 className="text-brand-primary font-semibold leading-tight">
            Ten modules. Five suites. One connected clinic OS.
          </H2>
          <Body variant="secondary">
            Each module solves a specific operational pain and is designed to complement the others. Start
            with what you need today; switch on the rest as you grow.
          </Body>
        </div>

        {/* Dynamic Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-brand-primary/10 pb-2">
          {suites.map((suite, idx) => {
            const isActive = activeSuite === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveSuite(idx)}
                className={`relative px-4 py-2 text-[16px] font-semibold font-poppins rounded-lg transition-colors cursor-pointer focus:outline-none ${
                  isActive ? "text-white" : "text-brand-secondary hover:text-brand-primary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSuiteTab"
                    className="absolute inset-0 bg-brand-primary rounded-lg z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{suite.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Suite Details Panel */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSuite}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="border-l-4 border-brand-accent pl-4">
                <span className="text-xs font-bold text-brand-accent uppercase tracking-widest font-poppins">
                  {suites[activeSuite].name} Suite
                </span>
                <H3 className="text-brand-primary !mb-0">{suites[activeSuite].meta}</H3>
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-2">
                {suites[activeSuite].modules.map((mod, modIdx) => {
                  const IconComp = mod.icon;
                  return (
                    <Card key={modIdx} className="h-full flex flex-col justify-between p-6 md:p-8 border-t-2 border-t-brand-accent/20 shadow-sm hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="h-10 w-10 bg-brand-bg-light text-brand-accent rounded-lg flex items-center justify-center border border-brand-accent/10">
                            <IconComp size={20} />
                          </div>
                          <span className="font-poppins font-bold text-brand-secondary text-[16px]">
                            MODULE {mod.num}
                          </span>
                        </div>
                        <div>
                          <H3 className="text-brand-dark text-lg font-semibold mb-1">{mod.title}</H3>
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-brand-error/5 text-brand-error border border-brand-error/10 text-xs font-semibold uppercase tracking-wider font-poppins">
                            Solves: {mod.solves}
                          </span>
                        </div>
                        <ul className="space-y-2 pt-2 border-t border-brand-bg-light">
                          {mod.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx} className="flex items-start gap-2 text-brand-secondary">
                              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent shrink-0 mt-2" />
                              <span className="font-poppins text-[16px] leading-[1.4]">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
