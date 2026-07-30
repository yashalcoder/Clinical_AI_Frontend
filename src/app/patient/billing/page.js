"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, DollarSign, Receipt, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { getInvoices, payInvoice } from "@/lib/api";
import { H2, H3, H4, Body } from "@/components/common/Typography";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { TableSkeleton } from "@/components/common/Skeleton";

export default function Billing() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadInvoices = async () => {
    try {
      const data = await getInvoices();
      setInvoices(data);
    } catch (err) {
      setError("Failed to load invoice records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handlePayment = async (id) => {
    setPayLoading(true);
    try {
      const res = await payInvoice(id);
      if (res.success) {
        alert("Payment processed successfully!");
        await loadInvoices();
      }
    } catch (err) {
      alert("Failed to process payment.");
    } finally {
      setPayLoading(false);
    }
  };

  const outstandingInvoices = invoices.filter((inv) => inv.status === "unpaid");
  const paidInvoices = invoices.filter((inv) => inv.status === "paid");

  return (
    <div className="space-y-8 font-poppins">
      {/* Header */}
      <div>
        <H2 className="text-brand-primary !mb-1">Billing & Invoices</H2>
        <Body variant="secondary">
          Track outstanding medical charges, pay clinic co-pays, and view historical receipts.
        </Body>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <div className="bg-red-50 border border-brand-error/20 p-6 rounded-xl flex gap-3 items-center">
          <AlertCircle className="text-brand-error" />
          <Body className="text-brand-error">{error}</Body>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Outstanding charges row */}
          <div className="space-y-4">
            <H3 className="text-brand-primary !mb-0">Pending Charges</H3>
            {outstandingInvoices.length === 0 ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 flex gap-3 items-center">
                <CheckCircle className="shrink-0" />
                <span className="text-[16px] font-medium">Your account has no outstanding balances. All invoices settled!</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {outstandingInvoices.map((inv) => (
                  <Card key={inv.id} className="border border-brand-error/20 p-6 flex flex-col justify-between h-full bg-white">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs text-brand-secondary block">INVOICE ID</span>
                          <span className="font-bold text-brand-dark text-sm block">{inv.id}</span>
                        </div>
                        <Badge variant="danger" className="uppercase tracking-wider">
                          Unpaid
                        </Badge>
                      </div>

                      <div className="py-2">
                        <span className="text-[28px] font-extrabold text-brand-primary block leading-none">
                          ${inv.amount.toFixed(2)}
                        </span>
                        <span className="text-xs text-brand-secondary block mt-1">Due Date: {inv.date}</span>
                      </div>

                      <div className="bg-brand-bg-light/50 p-3 rounded-lg text-sm text-brand-secondary leading-snug">
                        <span className="font-semibold text-brand-primary block text-xs uppercase mb-0.5">Description</span>
                        {inv.description} ({inv.doctorName})
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-brand-bg-light">
                      <Button
                        variant="accent"
                        size="sm"
                        className="w-full flex items-center justify-center gap-1.5"
                        loading={payLoading}
                        onClick={() => handlePayment(inv.id)}
                      >
                        <CreditCard size={16} /> Pay Invoice Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Payment history table */}
          <div className="space-y-4">
            <H3 className="text-brand-primary !mb-0">Payment History Logs</H3>
            <div className="border border-brand-primary/10 rounded-xl overflow-hidden shadow-sm bg-white">
              <table className="min-w-full divide-y divide-brand-bg-light">
                <thead className="bg-brand-bg-light">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">
                      Invoice ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">
                      Date Settled
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">
                      Provider & Care Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">
                      Amount Paid
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-bg-light text-sm text-brand-secondary">
                  {paidInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-xs text-brand-secondary">
                        No past transaction records available.
                      </td>
                    </tr>
                  ) : (
                    paidInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-brand-bg-light/40 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-brand-dark font-poppins">
                          {inv.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-poppins">
                          {inv.date}
                        </td>
                        <td className="px-6 py-4 font-poppins">
                          <span className="font-medium text-brand-dark block">{inv.description}</span>
                          <span className="text-xs text-brand-secondary">{inv.doctorName}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-brand-dark font-poppins">
                          ${inv.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            <CheckCircle size={10} /> Paid
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
