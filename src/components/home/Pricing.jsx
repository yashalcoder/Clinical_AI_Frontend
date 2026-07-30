"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Info, Flame } from "lucide-react";
import { H2, H3, Body } from "../common/Typography";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import Container from "../common/Container";

export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      desc: "Solo & single-doctor clinics getting started with automation.",
      price: "129",
      billing: "billed annually · or $149 monthly",
      features: [
        { text: "AI receptionist & smart scheduling", included: true },
        { text: "Automated reminders (SMS / WhatsApp)", included: true },
        { text: "Patient portal & digital intake", included: true },
        { text: "Online payments & invoicing", included: true },
        { text: "Basic analytics dashboard", included: true },
        { text: "1 provider included", included: true },
        { text: "AI documentation & claims", included: false }
      ],
      cta: "Start with Starter",
      popular: false
    },
    {
      name: "Growth",
      desc: "Busy multi-doctor clinics that want the full engine.",
      price: "329",
      billing: "billed annually · or $379 monthly",
      features: [
        { text: "Omnichannel unified inbox", included: true },
        { text: "AI clinical documentation (SOAP)", included: true },
        { text: "No-show recovery & waitlist auto-fill", included: true },
        { text: "Reactivation & review engine", included: true },
        { text: "Full analytics & reporting", included: true },
        { text: "Up to 6 providers", included: true },
        { text: "Priority support", included: true }
      ],
      cta: "Choose Growth",
      popular: true
    },
    {
      name: "Pro / Network",
      desc: "Large or multi-location clinics & groups.",
      price: "699",
      billing: "billed annually · or custom",
      features: [
        { text: "Insurance & claims automation", included: true },
        { text: "Multi-location management", included: true },
        { text: "Advanced analytics & forecasting", included: true },
        { text: "API & custom EHR / lab integrations", included: true },
        { text: "Dedicated success manager & SLA", included: true },
        { text: "Unlimited providers", included: true },
        { text: "Custom onboarding", included: true }
      ],
      cta: "Talk to Sales",
      popular: false
    }
  ];

  return (
    <section className="bg-brand-bg-light py-16 md:py-24 border-b border-brand-bg-light" id="pricing">
      <Container className="space-y-12 md:space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase font-poppins block">
            — Pricing & Packages
          </span>
          <H2 className="text-brand-primary font-semibold leading-tight">
            Simple, transparent pricing. Less than a part-time receptionist.
          </H2>
          <Body variant="secondary">
            Start with the plan that fits your clinic today and scale as you grow. No hidden fees — every
            plan includes onboarding support and free updates.
          </Body>
        </div>

        {/* 3 Tiers grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col h-full"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-brand-primary text-brand-accent text-xs font-bold font-poppins uppercase tracking-widest px-4 py-1.5 rounded-full border border-brand-accent/25">
                    Most Popular
                  </span>
                </div>
              )}

              <Card
                className={`h-full flex flex-col justify-between p-8 relative flex-1 ${
                  tier.popular ? "border-2 border-brand-accent shadow-md bg-white" : "border border-brand-primary/10"
                }`}
              >
                <div className="space-y-6">
                  {/* Title & Desc */}
                  <div>
                    <span className="font-poppins text-brand-primary font-bold text-[24px] block mb-1">
                      {tier.name}
                    </span>
                    <Body variant="secondary" className="text-sm font-normal">
                      {tier.desc}
                    </Body>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold font-poppins text-brand-primary">$</span>
                      <span className="text-[44px] font-extrabold font-poppins text-brand-primary leading-none">
                        {tier.price}
                      </span>
                      <span className="text-sm text-brand-secondary font-poppins font-medium">
                        /mo
                      </span>
                    </div>
                    <span className="text-xs text-brand-secondary font-poppins font-medium">
                      {tier.billing}
                    </span>
                  </div>

                  <hr className="border-brand-bg-light" />

                  {/* Features list */}
                  <div>
                    <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-poppins block mb-4">
                      {tier.popular ? "Everything in Starter, plus" : "Includes"}
                    </span>
                    <ul className="space-y-3.5">
                      {tier.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className={`flex items-start gap-2.5 text-[15px] font-poppins ${
                            feat.included ? "text-brand-dark" : "text-brand-secondary/40 line-through decoration-brand-secondary/30"
                          }`}
                        >
                          <span
                            className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              feat.included ? "bg-brand-accent/15 text-brand-accent" : "bg-brand-bg-light text-brand-secondary/30"
                            }`}
                          >
                            <Check size={12} />
                          </span>
                          <span className="leading-snug">{feat.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link href="/signup">
                    <Button
                      variant={tier.popular ? "accent" : "secondary"}
                      className="w-full font-bold"
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Addon guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="flex gap-4 items-start p-6 bg-white border border-brand-primary/5">
            <Info className="text-brand-accent shrink-0 mt-0.5" size={20} />
            <div>
              <span className="font-poppins font-bold text-brand-dark text-[16px] block mb-1">
                Flexible add-ons
              </span>
              <Body variant="secondary" className="text-sm">
                Extra providers, additional AI conversation & messaging bundles, custom integrations,
                and white-labelling — add only what you need.
              </Body>
            </div>
          </Card>
          <Card className="flex gap-4 items-start p-6 bg-white border border-brand-primary/5">
            <Info className="text-brand-accent shrink-0 mt-0.5" size={20} />
            <div>
              <span className="font-poppins font-bold text-brand-dark text-[16px] block mb-1">
                Configurable to your market
              </span>
              <Body variant="secondary" className="text-sm">
                <span className="font-semibold text-brand-dark">Indicative pricing in USD</span>. Plans,
                currency, and payment methods are tailored to your region and local channels.
              </Body>
            </div>
          </Card>
        </div>

        {/* Founding Offer Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-orange-500 text-white rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center border border-orange-400 shadow-lg relative overflow-hidden"
        >
          <div className="absolute right-4 top-4 opacity-10 pointer-events-none select-none text-[80px] font-bold">
            ⚡
          </div>
          <div className="h-12 w-12 bg-white/20 text-white rounded-xl flex items-center justify-center shrink-0 border border-white/25">
            <Flame size={26} className="animate-pulse" />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <span className="font-poppins font-bold text-[18px] sm:text-[20px] block">
              Founding Clinic Offer — limited spots
            </span>
            <Body variant="white" className="text-[16px] text-orange-50 font-normal leading-[1.6]">
              Get a <span className="font-bold underline decoration-white/40">14-day free pilot</span>,{" "}
              <span className="font-bold">50% off your first 3 months</span>, and free onboarding — with
              your price locked for life. Be one of the first clinics to run on ClinicFlow AI.
            </Body>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
