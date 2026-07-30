"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CalendarRange,
  Clock,
  Video,
  MapPin,
  FileText,
  AlertCircle,
  Plus
} from "lucide-react";
import { getAppointments, cancelAppointment, updateAppointment } from "@/lib/api";
import { H2, H3, H4, Body } from "@/components/common/Typography";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Modal } from "@/components/common/Modal";
import { TableSkeleton } from "@/components/common/Skeleton";
import { Loader } from "@/components/common/Loader";

// Lazy load the heavy multi-step booking form
const BookAppointmentForm = React.lazy(() => import("@/components/patient/BookAppointmentForm"));

function AppointmentsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Booking modal state
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  
  // Reschedule state
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  const loadAppointments = async (tab) => {
    setLoading(true);
    try {
      const data = await getAppointments(tab);
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch appointments. Please reload page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments(activeTab);
  }, [activeTab]);

  // Handle URL query trigger for quick book (e.g. from Dashboard click)
  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "book") {
      setIsBookModalOpen(true);
    }
  }, [searchParams]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    setActionLoading(true);
    try {
      const res = await cancelAppointment(id);
      if (res.success) {
        alert("Appointment successfully cancelled.");
        loadAppointments(activeTab);
      }
    } catch (err) {
      alert("Failed to cancel appointment.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenReschedule = (apt) => {
    setRescheduleAppointment(apt);
    setRescheduleDate(apt.date);
    setRescheduleTime(apt.time);
  };

  const handleConfirmReschedule = async () => {
    if (!rescheduleDate || !rescheduleTime) {
      alert("Please select a new date and time.");
      return;
    }
    setActionLoading(true);
    try {
      const res = await updateAppointment(rescheduleAppointment.id, {
        date: rescheduleDate,
        time: rescheduleTime
      });
      if (res.success) {
        alert("Appointment successfully rescheduled.");
        setRescheduleAppointment(null);
        loadAppointments(activeTab);
      }
    } catch (err) {
      alert("Failed to reschedule appointment.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-poppins">
      {/* Header and Booking CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <H2 className="text-brand-primary !mb-1">Appointment Calendar</H2>
          <Body variant="secondary">
            Manage upcoming consultations, schedule new slots, or check clinical history.
          </Body>
        </div>
        <Button
          variant="accent"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsBookModalOpen(true)}
        >
          <Plus size={18} /> Book Appointment
        </Button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-brand-primary/10 gap-4">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`py-3 text-[16px] font-semibold font-poppins relative cursor-pointer ${
            activeTab === "upcoming" ? "text-brand-accent" : "text-brand-secondary hover:text-brand-primary"
          }`}
        >
          Upcoming Appointments
          {activeTab === "upcoming" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`py-3 text-[16px] font-semibold font-poppins relative cursor-pointer ${
            activeTab === "past" ? "text-brand-accent" : "text-brand-secondary hover:text-brand-primary"
          }`}
        >
          Past & Cancelled
          {activeTab === "past" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent" />
          )}
        </button>
      </div>

      {/* Main List */}
      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <div className="bg-red-50 border border-brand-error/20 p-6 rounded-xl flex gap-3 items-center">
          <AlertCircle className="text-brand-error" />
          <Body className="text-brand-error">{error}</Body>
        </div>
      ) : appointments.length === 0 ? (
        <Card className="text-center p-12 border border-dashed border-brand-primary/15">
          <CalendarRange size={48} className="text-brand-secondary/35 mx-auto mb-4" />
          <H4 className="text-brand-dark font-bold mb-1">No appointments found</H4>
          <Body variant="secondary">
            You do not have any scheduled appointments listed in this category.
          </Body>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((apt) => (
            <Card key={apt.id} className="p-6 border border-brand-primary/10 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-brand-accent font-bold uppercase tracking-wider block">
                      {apt.specialty}
                    </span>
                    <H4 className="text-brand-dark font-bold !mb-0">{apt.doctorName}</H4>
                  </div>
                  <Badge
                    variant={
                      apt.status === "confirmed" || apt.status === "completed"
                        ? "success"
                        : apt.status === "pending"
                        ? "warning"
                        : "danger"
                    }
                    className="uppercase tracking-wider text-[11px]"
                  >
                    {apt.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-brand-secondary">
                  <div className="flex gap-2 items-center text-sm">
                    <CalendarRange size={16} className="text-brand-accent shrink-0" />
                    <span className="font-poppins">{apt.date}</span>
                  </div>
                  <div className="flex gap-2 items-center text-sm">
                    <Clock size={16} className="text-brand-accent shrink-0" />
                    <span className="font-poppins">{apt.time}</span>
                  </div>
                </div>

                <div className="flex gap-2 items-center text-sm text-brand-secondary pb-3 border-b border-brand-bg-light">
                  {apt.type === "telehealth" ? (
                    <>
                      <Video size={16} className="text-brand-accent shrink-0" />
                      <span className="font-poppins font-medium">Telehealth Video Call</span>
                    </>
                  ) : (
                    <>
                      <MapPin size={16} className="text-brand-accent shrink-0" />
                      <span className="font-poppins font-medium">In-Person Consultation</span>
                    </>
                  )}
                </div>

                <div className="text-sm">
                  <span className="text-xs text-brand-primary font-bold block mb-1">Reason</span>
                  <span className="text-brand-secondary leading-snug font-poppins">{apt.reason}</span>
                </div>
              </div>

              {activeTab === "upcoming" && apt.status !== "cancelled" && (
                <div className="flex flex-wrap gap-2 pt-6 mt-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="py-2 px-4 text-xs font-semibold"
                    onClick={() => handleOpenReschedule(apt)}
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="py-2 px-4 text-xs font-semibold text-brand-error hover:bg-red-50"
                    loading={actionLoading}
                    onClick={() => handleCancel(apt.id)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* BOOKING MODAL (React.lazy loaded step form wrapped in Suspense) */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Schedule New Consultation"
      >
        <Suspense fallback={<Loader className="py-12" />}>
          <BookAppointmentForm
            onSuccess={() => {
              setIsBookModalOpen(false);
              loadAppointments(activeTab);
            }}
            onCancel={() => setIsBookModalOpen(false)}
          />
        </Suspense>
      </Modal>

      {/* RESCHEDULE MODAL */}
      <Modal
        isOpen={!!rescheduleAppointment}
        onClose={() => setRescheduleAppointment(null)}
        title="Reschedule Appointment"
      >
        {rescheduleAppointment && (
          <div className="space-y-4 font-poppins">
            <Body variant="secondary">
              Rescheduling appointment with{" "}
              <span className="font-semibold text-brand-primary">
                {rescheduleAppointment.doctorName}
              </span>
            </Body>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[16px] font-medium text-brand-dark block">New Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full p-3 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-[16px] bg-white font-poppins"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[16px] font-medium text-brand-dark block">New Time Slot</label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full p-3 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-[16px] bg-white font-poppins"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-brand-bg-light">
              <Button variant="ghost" size="sm" onClick={() => setRescheduleAppointment(null)}>
                Cancel
              </Button>
              <Button
                variant="accent"
                size="sm"
                loading={actionLoading}
                onClick={handleConfirmReschedule}
              >
                Confirm Reschedule
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function Appointments() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <AppointmentsContent />
    </Suspense>
  );
}
