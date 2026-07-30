"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Calculator } from "lucide-react";
import { H2, H3, H4, Body } from "../common/Typography";
import { Card } from "../common/Card";
import Container from "../common/Container";

export default function RoiSection() {
  // Calculator inputs
  const [doctors, setDoctors] = useState(3);
  const [apptsPerDay, setApptsPerDay] = useState(40);
  const [revenuePerVisit, setRevenuePerVisit] = useState(60);
  const [workingDays, setWorkingDays] = useState(25);

  const metrics = [
    { name: "Administrative workload", result: "↓ up to 50%", trend: "down" },
    { name: "Appointment no-show rate", result: "↓ significantly", trend: "down" },
    { name: "Reception time on routine tasks", result: "↓ freed for care", trend: "down" },
    { name: "Patient satisfaction score", result: "↑ improved", trend: "up" },
    { name: "Clinic revenue (fewer empty slots)", result: "↑ increased", trend: "up" },
    { name: "Doctor documentation time", result: "↓ reduced per visit", trend: "down" },
    { name: "Data-driven decision making", result: "✓ enabled", trend: "check" }
  ];

  // Dynamic calculations based on formula
  const calculations = useMemo(() => {
    const totalVisits = doctors * apptsPerDay * workingDays;
    const recoveredNoShowsVisits = Math.round(totalVisits * 0.04); // ~120 for 3000 visits
    const recoveredNoShowsVal = recoveredNoShowsVisits * revenuePerVisit;

    const capturedCallsVisits = Math.round(doctors * 6.67); // ~20 for 3 doctors
    const capturedCallsVal = capturedCallsVisits * revenuePerVisit;

    const adminHoursSaved = Math.round(doctors * 41.67); // ~125 for 3 doctors

    const totalUpside = recoveredNoShowsVal + capturedCallsVal;
    const planCost = 329;
    const roiMultiplier = planCost > 0 ? Math.round(totalUpside / planCost) : 0;

    return {
      recoveredNoShowsVal,
      recoveredNoShowsVisits,
      capturedCallsVal,
      capturedCallsVisits,
      adminHoursSaved,
      totalUpside,
      roiMultiplier
    };
  }, [doctors, apptsPerDay, revenuePerVisit, workingDays]);

  return (
    <section className="bg-white py-16 md:py-24 border-b border-brand-bg-light" id="roi">
      <Container className="space-y-12 md:space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase font-poppins block">
            — Outcomes & ROI
          </span>
          <H2 className="text-brand-primary font-semibold leading-tight">
            The numbers that make it an easy decision.
          </H2>
          <Body variant="secondary">
            ClinicFlow AI is built to pay for itself many times over — by recovering lost appointments,
            capturing missed bookings, and freeing your team from routine work.
          </Body>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Metrics Table (Left) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[14px] font-bold text-brand-primary tracking-wider uppercase font-poppins block pl-1">
              Key Metrics & Impact
            </span>
            <div className="border border-brand-bg-light rounded-xl overflow-hidden shadow-sm">
              <table className="min-w-full divide-y divide-brand-bg-light">
                <thead className="bg-brand-bg-light">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-primary uppercase tracking-wider font-poppins">
                      Metric
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-brand-primary uppercase tracking-wider font-poppins">
                      Expected Result
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-brand-bg-light">
                  {metrics.map((metric, idx) => (
                    <tr key={idx} className="hover:bg-brand-bg-light/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-[16px] text-brand-dark font-poppins font-medium">
                        {metric.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[16px] font-poppins font-semibold">
                        <span
                          className={`flex items-center gap-1.5 ${
                            metric.trend === "down"
                              ? "text-brand-error"
                              : metric.trend === "up"
                              ? "text-brand-accent"
                              : "text-brand-primary"
                          }`}
                        >
                          {metric.trend === "down" && <TrendingDown size={16} />}
                          {metric.trend === "up" && <TrendingUp size={16} />}
                          {metric.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Calculator (Right) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-gradient-to-br from-[#061E16] to-brand-primary text-white border border-brand-accent/20 p-8 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <Calculator className="text-brand-accent" size={24} />
                <H3 className="text-white !mb-0">Illustrative ROI Calculator</H3>
              </div>

              {/* Input Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Inputs */}
                <div className="space-y-2">
                  <label className="flex justify-between text-sm font-poppins text-gray-300">
                    <span>Number of Doctors</span>
                    <span className="text-white font-bold">{doctors}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={doctors}
                    onChange={(e) => setDoctors(parseInt(e.target.value))}
                    className="w-full accent-brand-accent bg-white/20 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex justify-between text-sm font-poppins text-gray-300">
                    <span>Appts / Day per Doctor</span>
                    <span className="text-white font-bold">{apptsPerDay}</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={apptsPerDay}
                    onChange={(e) => setApptsPerDay(parseInt(e.target.value))}
                    className="w-full accent-brand-accent bg-white/20 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex justify-between text-sm font-poppins text-gray-300">
                    <span>Avg Revenue per Visit</span>
                    <span className="text-white font-bold">${revenuePerVisit}</span>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    value={revenuePerVisit}
                    step="5"
                    onChange={(e) => setRevenuePerVisit(parseInt(e.target.value))}
                    className="w-full accent-brand-accent bg-white/20 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex justify-between text-sm font-poppins text-gray-300">
                    <span>Working Days / Month</span>
                    <span className="text-white font-bold">{workingDays}</span>
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="30"
                    value={workingDays}
                    onChange={(e) => setWorkingDays(parseInt(e.target.value))}
                    className="w-full accent-brand-accent bg-white/20 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic Outputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Result Card 1 */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-xs text-gray-300 font-semibold font-poppins tracking-wider uppercase block mb-2">
                    Recovered No-Shows
                  </span>
                  <div>
                    <span className="font-poppins text-[28px] font-bold text-white block">
                      ${calculations.recoveredNoShowsVal.toLocaleString()}
                      <span className="text-sm font-normal text-gray-400">/mo</span>
                    </span>
                    <span className="text-xs text-brand-accent font-poppins">
                      ≈{calculations.recoveredNoShowsVisits} visits recovered
                    </span>
                  </div>
                </div>

                {/* Result Card 2 */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-xs text-gray-300 font-semibold font-poppins tracking-wider uppercase block mb-2">
                    Captured Missed Calls
                  </span>
                  <div>
                    <span className="font-poppins text-[28px] font-bold text-white block">
                      ${calculations.capturedCallsVal.toLocaleString()}
                      <span className="text-sm font-normal text-gray-400">/mo</span>
                    </span>
                    <span className="text-xs text-brand-accent font-poppins">
                      ≈{calculations.capturedCallsVisits} after-hours bookings
                    </span>
                  </div>
                </div>

                {/* Result Card 3 */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-xs text-gray-300 font-semibold font-poppins tracking-wider uppercase block mb-2">
                    Admin Time Saved
                  </span>
                  <div>
                    <span className="font-poppins text-[28px] font-bold text-white block">
                      ~{calculations.adminHoursSaved}
                      <span className="text-sm font-normal text-gray-400"> hrs/mo</span>
                    </span>
                    <span className="text-xs text-brand-accent font-poppins">
                      Tasks fully automated
                    </span>
                  </div>
                </div>
              </div>

              {/* Total ROI Band */}
              <div className="bg-brand-accent text-white rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-xs text-[#061E16] font-bold tracking-widest uppercase font-poppins block">
                    Estimated monthly upside vs. Growth Plan ($329/mo)
                  </span>
                  <span className="text-[20px] sm:text-[24px] font-bold font-poppins block">
                    ${(calculations.recoveredNoShowsVal + calculations.capturedCallsVal).toLocaleString()}
                    <span className="text-sm font-normal text-[#061E16]">/mo</span>
                  </span>
                </div>
                <div className="bg-[#061E16] text-brand-accent px-4 py-2 rounded-lg font-poppins font-bold text-[20px]">
                  ≈ {calculations.roiMultiplier}x ROI
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs text-gray-400 font-poppins block">
                  Excludes recovered doctor time, clinical notes speedups, and faster collections. Figures are illustrative.
                </span>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
