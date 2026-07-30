"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileCheck,
  MessageSquare,
  DollarSign,
  CalendarDays,
  Video,
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { getDashboardSummary, cancelAppointment, updateAppointment } from "@/lib/api";
import { H2, H3, Body } from "@/components/common/Typography";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { DashboardSkeleton } from "@/components/common/Skeleton";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const summary = await getDashboardSummary();
      setData(summary);
      setError(null);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    setActionLoading(true);
    try {
      const res = await cancelAppointment(id);
      if (res.success) {
        alert("Appointment cancelled successfully.");
        await fetchDashboardData();
      }
    } catch (err) {
      alert("Failed to cancel appointment.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    setActionLoading(true);
    try {
      const res = await updateAppointment(id, { status: "confirmed" });
      if (res.success) {
        alert("Appointment confirmed successfully.");
        await fetchDashboardData();
      }
    } catch (err) {
      alert("Failed to confirm appointment.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-brand-error/20 p-6 rounded-xl flex gap-3 items-center">
        <AlertCircle className="text-brand-error" />
        <Body className="text-brand-error">{error}</Body>
      </div>
    );
  }

  const { nextAppointment, stats, notifications } = data;

  return (
    <div className="space-y-8 font-poppins">
      {/* Header Banner */}
      <div>
        <H2 className="text-brand-primary !mb-1">Welcome back, Yashasvi</H2>
        <Body variant="secondary">
          Here is a quick summary of your health profile and upcoming clinical timeline.
        </Body>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat 1: Pending forms */}
        <Card className="flex items-center gap-4 border-l-4 border-l-amber-500">
          <div className="h-12 w-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
            <FileCheck size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest font-poppins">
              Pending Forms
            </span>
            <span className="block text-2xl font-extrabold text-brand-dark leading-tight mt-0.5">
              {stats.pendingForms}
            </span>
          </div>
        </Card>

        {/* Stat 2: Unread Messages */}
        <Card className="flex items-center gap-4 border-l-4 border-l-brand-accent">
          <div className="h-12 w-12 bg-brand-bg-light rounded-lg flex items-center justify-center text-brand-accent">
            <MessageSquare size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest font-poppins">
              Unread Messages
            </span>
            <span className="block text-2xl font-extrabold text-brand-dark leading-tight mt-0.5">
              {stats.unreadMessages}
            </span>
          </div>
        </Card>

        {/* Stat 3: Balance */}
        <Card className="flex items-center gap-4 border-l-4 border-l-brand-error">
          <div className="h-12 w-12 bg-red-50 rounded-lg flex items-center justify-center text-brand-error">
            <DollarSign size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest font-poppins">
              Outstanding Balance
            </span>
            <span className="block text-2xl font-extrabold text-brand-dark leading-tight mt-0.5">
              ${stats.outstandingBalance.toFixed(2)}
            </span>
          </div>
        </Card>
      </div>

      {/* Main Grid: Left is Appointment Info / Actions, Right is Notifications Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Appointment Manager & Quick Actions */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <H3 className="text-brand-primary !mb-0">Next Scheduled Visit</H3>
            <Link
              href="/patient/appointments"
              className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              All Appointments <ArrowRight size={14} />
            </Link>
          </div>

          {nextAppointment ? (
            <Card className="p-8 border border-brand-primary/10 relative overflow-hidden bg-white">
              {/* Header block */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-brand-bg-light">
                <div>
                  <span className="text-xs font-bold text-brand-accent uppercase tracking-widest block mb-1">
                    {nextAppointment.specialty}
                  </span>
                  <H4 className="text-brand-dark font-bold !mb-0">
                    {nextAppointment.doctorName}
                  </H4>
                </div>
                <Badge
                  variant={
                    nextAppointment.status === "confirmed"
                      ? "success"
                      : nextAppointment.status === "pending"
                      ? "warning"
                      : "danger"
                  }
                  className="uppercase tracking-wider text-xs"
                >
                  {nextAppointment.status}
                </Badge>
              </div>

              {/* Appointment specifics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 text-brand-secondary">
                <div className="flex gap-2.5 items-start">
                  <CalendarDays size={18} className="text-brand-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block text-brand-primary">
                      Date
                    </span>
                    <span className="text-sm font-medium text-brand-dark">
                      {new Date(nextAppointment.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <Clock size={18} className="text-brand-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block text-brand-primary">
                      Time Slot
                    </span>
                    <span className="text-sm font-medium text-brand-dark">
                      {nextAppointment.time}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  {nextAppointment.type === "telehealth" ? (
                    <>
                      <Video size={18} className="text-brand-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider block text-brand-primary">
                          Type
                        </span>
                        <span className="text-sm font-medium text-brand-dark">Telehealth Call</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <MapPin size={18} className="text-brand-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider block text-brand-primary">
                          Type
                        </span>
                        <span className="text-sm font-medium text-brand-dark">In-Person Visit</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-brand-bg-light/45 rounded-lg p-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider block text-brand-primary mb-1">
                  Reason for Visit
                </span>
                <Body variant="secondary" className="text-[15px] leading-relaxed">
                  {nextAppointment.reason}
                </Body>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {nextAppointment.status === "pending" && (
                  <Button
                    variant="accent"
                    size="sm"
                    loading={actionLoading}
                    onClick={() => handleConfirm(nextAppointment.id)}
                  >
                    Confirm Booking
                  </Button>
                )}
                <Link href={`/patient/appointments?action=reschedule&id=${nextAppointment.id}`}>
                  <Button variant="secondary" size="sm">
                    Reschedule
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-brand-error hover:bg-red-50 hover:text-brand-error"
                  loading={actionLoading}
                  onClick={() => handleCancel(nextAppointment.id)}
                >
                  Cancel Appointment
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 border border-dashed border-brand-primary/10 text-center">
              <CalendarDays className="text-brand-secondary/40 mx-auto mb-4" size={40} />
              <H4 className="text-brand-dark font-bold mb-1">No Upcoming Consultations</H4>
              <Body variant="secondary" className="mb-6">
                You have no scheduled clinical visits at this time. Need to speak to a provider?
              </Body>
              <Link href="/patient/appointments?action=book">
                <Button variant="accent" size="sm">
                  Book a Consultation
                </Button>
              </Link>
            </Card>
          )}

          {/* Quick Actions Panel */}
          <div className="space-y-4">
            <H3 className="text-brand-primary !mb-0">Quick Options</H3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/patient/appointments?action=book">
                <div className="bg-white border border-brand-primary/10 rounded-xl p-5 hover:border-brand-accent hover:shadow-md transition-all cursor-pointer">
                  <span className="font-poppins font-bold text-brand-dark block text-[16px] mb-1">
                    Book a Visit
                  </span>
                  <span className="text-xs text-brand-secondary block leading-snug">
                    Schedule an in-person or telehealth visit live.
                  </span>
                </div>
              </Link>

              <Link href="/patient/messages">
                <div className="bg-white border border-brand-primary/10 rounded-xl p-5 hover:border-brand-accent hover:shadow-md transition-all cursor-pointer">
                  <span className="font-poppins font-bold text-brand-dark block text-[16px] mb-1">
                    Message Care Team
                  </span>
                  <span className="text-xs text-brand-secondary block leading-snug">
                    Speak directly to support or doctor receptionists.
                  </span>
                </div>
              </Link>

              <Link href="/patient/billing">
                <div className="bg-white border border-brand-primary/10 rounded-xl p-5 hover:border-brand-accent hover:shadow-md transition-all cursor-pointer">
                  <span className="font-poppins font-bold text-brand-dark block text-[16px] mb-1">
                    Pay Invoice
                  </span>
                  <span className="text-xs text-brand-secondary block leading-snug">
                    Settle co-pays and check billing statements.
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Notifications Feed */}
        <div className="lg:col-span-4 space-y-6">
          <H3 className="text-brand-primary !mb-0">Recent Activity</H3>
          <div className="bg-white border border-brand-primary/10 rounded-xl p-6 divide-y divide-brand-bg-light">
            {notifications.map((notif, index) => (
              <div key={notif.id} className={`py-4 ${index === 0 ? "pt-0" : ""} last:pb-0`}>
                <div className="flex gap-2 items-start">
                  <div className="h-2 w-2 rounded-full bg-brand-accent mt-2 shrink-0 animate-ping" />
                  <div>
                    <span className="text-sm font-poppins font-medium text-brand-dark leading-snug block">
                      {notif.text}
                    </span>
                    <span className="text-xs text-brand-secondary block mt-1 font-poppins">
                      {notif.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
