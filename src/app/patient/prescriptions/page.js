"use client";

import React, { useState, useEffect } from "react";
import { Pill, Printer, Download, AlertCircle, Calendar, Info } from "lucide-react";
import { getPrescriptions } from "@/lib/api";
import { H2, H3, H4, Body } from "@/components/common/Typography";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { TableSkeleton } from "@/components/common/Skeleton";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Local print container layout
  const [activePrintRx, setActivePrintRx] = useState(null);

  useEffect(() => {
    async function loadPrescriptions() {
      try {
        const data = await getPrescriptions();
        setPrescriptions(data);
      } catch (err) {
        setError("Failed to fetch prescriptions.");
      } finally {
        setLoading(false);
      }
    }
    loadPrescriptions();
  }, []);

  const handlePrint = (rx) => {
    setActivePrintRx(rx);
    // Let the DOM update, then call print
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="space-y-6 font-poppins relative">
      {/* Printable Area - Hidden on Screen, visible only on Print */}
      {activePrintRx && (
        <div id="print-prescription-receipt" className="hidden print:block bg-white p-8 max-w-2xl mx-auto space-y-6 text-brand-dark border-2 border-brand-primary">
          <div className="flex justify-between items-start border-b-2 border-brand-primary pb-6">
            <div>
              <h1 className="text-xl font-bold text-brand-primary uppercase tracking-wider">ClinicFlow AI Care Network</h1>
              <p className="text-xs text-brand-secondary">100 Health Sciences Plaza, Suite 400</p>
              <p className="text-xs text-brand-secondary">Phone: +1 (555) 019-2834 | Fax: +1 (555) 019-2835</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-brand-primary block">OFFICIAL PRESCRIPTION (Rx)</span>
              <span className="text-xs text-brand-secondary block">Date: {activePrintRx.date}</span>
              <span className="text-xs text-brand-secondary block">Script ID: Rx-{activePrintRx.id}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pb-6 border-b border-brand-bg-light text-sm">
            <div>
              <span className="text-xs text-brand-secondary uppercase font-bold block">Patient Details</span>
              <span className="font-bold text-brand-dark block">Yashasvi Sharma</span>
              <span className="text-xs text-brand-secondary">DOB: 1994-11-12</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-brand-secondary uppercase font-bold block">Prescribing Doctor</span>
              <span className="font-bold text-brand-dark block">{activePrintRx.doctorName}</span>
              <span className="text-xs text-brand-secondary">Credentials: MD, Board Certified</span>
            </div>
          </div>

          <div className="py-6 space-y-4">
            <div className="border-l-4 border-brand-primary pl-4">
              <span className="text-[20px] font-bold text-brand-dark block">{activePrintRx.name}</span>
              <span className="text-sm text-brand-secondary block">Dosage Strength: {activePrintRx.dosage}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm bg-brand-bg-light/40 p-4 rounded-lg">
              <div>
                <span className="text-xs text-brand-secondary block">Instructions / Frequency</span>
                <span className="font-medium text-brand-dark">{activePrintRx.frequency}</span>
              </div>
              <div>
                <span className="text-xs text-brand-secondary block">Refill / Duration</span>
                <span className="font-medium text-brand-dark">{activePrintRx.duration}</span>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-brand-bg-light flex justify-between items-end">
            <div>
              <p className="text-[10px] text-brand-secondary italic">This prescription is generated electronically by ClinicFlow AI</p>
              <p className="text-[10px] text-brand-secondary italic">under direct authorization of the prescribing physician.</p>
            </div>
            <div className="text-center w-48 border-t border-brand-dark pt-2">
              <span className="text-xs font-semibold text-brand-dark block">Physician Signature</span>
              <span className="text-[10px] text-brand-secondary">Authorized Electronically</span>
            </div>
          </div>
        </div>
      )}

      {/* Screen Viewable Content */}
      <div className="print:hidden space-y-6">
        <div>
          <H2 className="text-brand-primary !mb-1">Active Prescriptions (Rx)</H2>
          <Body variant="secondary">
            View active medications prescribed by your clinic physicians and download slips for pharmacies.
          </Body>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : error ? (
          <div className="bg-red-50 border border-brand-error/20 p-6 rounded-xl flex gap-3 items-center">
            <AlertCircle className="text-brand-error" />
            <Body className="text-brand-error">{error}</Body>
          </div>
        ) : prescriptions.length === 0 ? (
          <Card className="text-center p-12 border border-dashed border-brand-primary/10">
            <Pill size={48} className="text-brand-secondary/40 mx-auto mb-4" />
            <H4 className="text-brand-dark font-bold mb-1">No active prescriptions</H4>
            <Body variant="secondary">You do not have any active medication plans registered.</Body>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prescriptions.map((rx) => (
              <Card
                key={rx.id}
                className="border border-brand-primary/10 flex flex-col justify-between hover:border-brand-accent/30 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start pb-2 border-b border-brand-bg-light">
                    <div className="flex items-center gap-2.5">
                      <div className="h-10 w-10 bg-brand-primary text-brand-accent rounded-lg flex items-center justify-center border border-brand-accent/15">
                        <Pill size={20} />
                      </div>
                      <div>
                        <H4 className="text-brand-dark font-bold !mb-0">{rx.name}</H4>
                        <span className="text-xs text-brand-accent font-semibold">{rx.dosage}</span>
                      </div>
                    </div>
                    <Badge variant={rx.status === "active" ? "success" : "danger"} className="uppercase tracking-wider text-[11px]">
                      {rx.status}
                    </Badge>
                  </div>

                  <div className="space-y-3 py-1">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-brand-secondary block font-poppins">Frequency</span>
                        <span className="font-bold text-brand-primary block">{rx.frequency}</span>
                      </div>
                      <div>
                        <span className="text-brand-secondary block font-poppins">Duration</span>
                        <span className="font-bold text-brand-primary block">{rx.duration}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div>
                        <span className="text-brand-secondary block font-poppins">Prescribed By</span>
                        <span className="font-semibold text-brand-dark block">{rx.doctorName}</span>
                      </div>
                      <div>
                        <span className="text-brand-secondary block font-poppins">Pharmacy Destination</span>
                        <span className="font-semibold text-brand-dark block truncate">{rx.pharmacy}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-6 border-t border-brand-bg-light mt-4">
                  <Button
                    variant="accent"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs"
                    onClick={() => handlePrint(rx)}
                  >
                    <Printer size={14} /> Print Rx Slip
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs"
                    onClick={() => alert(`Saving Rx PDF script details for ${rx.name}`)}
                  >
                    <Download size={14} /> Save PDF
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-xs">
          <Info size={18} className="shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Need a script renewal?</span>
            <span>You can request refills online. Send a message to Dr. Sarah Jenkins directly via the messenger or book a short consultation to renew expired medication plans.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
