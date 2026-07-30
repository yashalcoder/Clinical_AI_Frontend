"use client";

import React, { useState, useEffect } from "react";
import { FileText, Download, ChevronDown, ChevronUp, AlertCircle, ShieldAlert } from "lucide-react";
import { getMedicalRecords } from "@/lib/api";
import { H2, H3, H4, Body } from "@/components/common/Typography";
import { Card } from "@/components/common/Card";
import { TableSkeleton } from "@/components/common/Skeleton";
import { Badge } from "@/components/common/Badge";

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRecord, setExpandedRecord] = useState(null);

  useEffect(() => {
    async function loadRecords() {
      try {
        const data = await getMedicalRecords();
        setRecords(data);
      } catch (err) {
        setError("Failed to fetch medical records.");
      } finally {
        setLoading(false);
      }
    }
    loadRecords();
  }, []);

  const toggleExpand = (id) => {
    if (expandedRecord === id) {
      setExpandedRecord(null);
    } else {
      setExpandedRecord(id);
    }
  };

  return (
    <div className="space-y-6 font-poppins">
      {/* Page Header */}
      <div>
        <H2 className="text-brand-primary !mb-1">Medical Files & Chart Reports</H2>
        <Body variant="secondary">
          Securely access and download your clinical charts, SOAP notes, lab panel uploads, and history logs.
        </Body>
      </div>

      {/* Security Shield banner */}
      <div className="bg-brand-accent/5 border border-brand-accent/15 rounded-xl p-4 flex gap-3 items-center text-brand-primary">
        <ShieldAlert className="text-brand-accent shrink-0" size={20} />
        <span className="text-xs font-semibold leading-relaxed">
          Records are encrypted using AES-256 standards. Your medical information is protected by HIPAA guidelines and accessible only under verified credentials.
        </span>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <div className="bg-red-50 border border-brand-error/20 p-6 rounded-xl flex gap-3 items-center">
          <AlertCircle className="text-brand-error" />
          <Body className="text-brand-error">{error}</Body>
        </div>
      ) : records.length === 0 ? (
        <Card className="text-center p-12 border border-dashed border-brand-primary/10">
          <FileText size={48} className="text-brand-secondary/40 mx-auto mb-4" />
          <H4 className="text-brand-dark font-bold mb-1">No medical files uploaded</H4>
          <Body variant="secondary">Your provider hasn't uploaded any documents or reports yet.</Body>
        </Card>
      ) : (
        <div className="space-y-4">
          {records.map((rec) => {
            const isExpanded = expandedRecord === rec.id;
            return (
              <Card
                key={rec.id}
                className="border border-brand-primary/10 hover:border-brand-accent/30 transition-all p-0 overflow-hidden"
              >
                {/* Header Toggle */}
                <div
                  onClick={() => toggleExpand(rec.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-brand-bg-light/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center border border-brand-accent/15">
                      <FileText size={20} />
                    </div>
                    <div>
                      <span className="text-xs text-brand-accent font-bold uppercase tracking-wider block">
                        {rec.type}
                      </span>
                      <H4 className="text-brand-dark font-bold !mb-0">{rec.doctorName}</H4>
                      <span className="text-[12px] text-brand-secondary">{rec.specialty} • Uploaded on {rec.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="accent" className="hidden sm:inline-block">HIPAA Secure</Badge>
                    <button className="text-brand-primary hover:text-brand-accent">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {/* Expandable details */}
                {isExpanded && (
                  <div className="px-5 pb-6 border-t border-brand-bg-light bg-brand-bg-light/10 pt-4 space-y-4 animate-slideDown">
                    {/* Clinical summary notes */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">
                        Clinical Consultation Summary Notes
                      </span>
                      <div className="bg-white border border-brand-primary/5 p-4 rounded-lg text-sm text-brand-secondary leading-relaxed font-poppins font-light">
                        {rec.notes}
                      </div>
                    </div>

                    {/* Attachments links */}
                    {rec.attachments && rec.attachments.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">
                          Attachments & Associated Files
                        </span>
                        <div className="space-y-2">
                          {rec.attachments.map((attach, aIdx) => (
                            <div
                              key={aIdx}
                              className="flex items-center justify-between p-3 border border-brand-primary/10 rounded-lg bg-white"
                            >
                              <div className="flex items-center gap-2">
                                <FileText size={16} className="text-brand-accent" />
                                <span className="text-sm font-medium text-brand-dark">{attach.name}</span>
                                <span className="text-xs text-brand-secondary">({attach.size})</span>
                              </div>
                              <a
                                href={attach.url}
                                onClick={(e) => {
                                  e.preventDefault();
                                  alert(`Downloading file: ${attach.name}`);
                                }}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent hover:underline font-poppins"
                              >
                                <Download size={14} /> Download PDF
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
