"use client";

import React, { useState, useEffect } from "react";
import {
  getDoctors,
  getAvailableSlots,
  createAppointment
} from "@/lib/api";
import { H3, H4, Body } from "../common/Typography";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { Star, Video, MapPin, CalendarDays, Clock, CheckCircle } from "lucide-react";

export default function BookAppointmentForm({ onSuccess, onCancel }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [type, setType] = useState("telehealth");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [bookingOutcome, setBookingOutcome] = useState(null);

  // Load doctors list for Step 1
  useEffect(() => {
    async function loadDoctors() {
      setLoading(true);
      try {
        const docList = await getDoctors();
        setDoctors(docList);
      } catch (err) {
        setFormError("Failed to fetch doctors list.");
      } finally {
        setLoading(false);
      }
    }
    loadDoctors();
  }, []);

  // Fetch available slots when Doctor or Date changes
  useEffect(() => {
    if (!selectedDoctor || !date) return;

    async function loadSlots() {
      setSlotsLoading(true);
      try {
        const slots = await getAvailableSlots(selectedDoctor.id, date);
        setAvailableSlots(slots);
        setSelectedSlot(""); // reset
      } catch (err) {
        setFormError("Failed to fetch available time slots.");
      } finally {
        setSlotsLoading(false);
      }
    }
    loadSlots();
  }, [selectedDoctor, date]);

  const handleNextStep = () => {
    if (step === 1 && !selectedDoctor) {
      setFormError("Please select a provider first.");
      return;
    }
    if (step === 2 && (!date || !selectedSlot)) {
      setFormError("Please choose both a date and an available slot.");
      return;
    }
    if (step === 3 && !reason.trim()) {
      setFormError("Please enter the reason for your visit.");
      return;
    }

    setFormError("");
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setFormError("");
    setStep(step - 1);
  };

  const handleConfirmSubmit = async () => {
    setLoading(true);
    setFormError("");
    try {
      const payload = {
        doctorId: selectedDoctor.id,
        date,
        time: selectedSlot,
        type,
        reason,
        notes
      };
      const response = await createAppointment(payload);
      if (response.success) {
        setBookingOutcome(response.appointment);
      }
    } catch (err) {
      setFormError("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Obtain today's date formatted to block past dates
  const todayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // SUCCESS OUTCOME SCREEN
  if (bookingOutcome) {
    return (
      <div className="text-center py-8 space-y-6 font-poppins">
        <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle size={36} />
        </div>
        <div>
          <H3 className="text-brand-primary">Appointment Requested!</H3>
          <Body variant="secondary">
            Your appointment booking flow resolved successfully. Details below:
          </Body>
        </div>

        <Card className="max-w-md mx-auto p-6 space-y-4 text-left border border-brand-primary/10">
          <div className="flex justify-between items-center pb-2 border-b border-brand-bg-light">
            <span className="text-xs text-brand-secondary font-bold font-poppins uppercase">Booking Status</span>
            <Badge variant={bookingOutcome.status === "confirmed" ? "success" : "warning"} className="uppercase tracking-wider">
              {bookingOutcome.status}
            </Badge>
          </div>
          <div>
            <span className="text-xs text-brand-secondary block font-poppins">Provider</span>
            <span className="font-poppins text-brand-dark font-semibold">{bookingOutcome.doctorName}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-brand-secondary block font-poppins">Scheduled Date</span>
              <span className="font-poppins text-brand-dark font-semibold">{bookingOutcome.date}</span>
            </div>
            <div>
              <span className="text-xs text-brand-secondary block font-poppins">Time Slot</span>
              <span className="font-poppins text-brand-dark font-semibold">{bookingOutcome.time}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center text-sm text-brand-secondary font-poppins">
            {bookingOutcome.type === "telehealth" ? <Video size={16} /> : <MapPin size={16} />}
            <span>{bookingOutcome.type === "telehealth" ? "Telehealth Consultation" : "In-Person Consultation"}</span>
          </div>
        </Card>

        {bookingOutcome.status === "pending" && (
          <div className="max-w-md mx-auto p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 text-left font-poppins">
            Notice: This booking choice is flagged for manual intake validation. A clinic staff member will review and confirm this slot soon. Check your dashboard feed for updates.
          </div>
        )}

        <div className="pt-4 flex justify-center gap-4">
          <Button variant="accent" onClick={() => onSuccess(bookingOutcome)}>
            Go to Calendar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-poppins">
      {/* Visual Stepper tracker */}
      <div className="flex justify-between items-center border-b border-brand-bg-light pb-4">
        <span className="text-xs font-bold text-brand-accent uppercase tracking-widest font-poppins">
          Step {step} of 4
        </span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 w-8 rounded-full transition-all ${
                s <= step ? "bg-brand-accent" : "bg-brand-bg-light border border-brand-primary/5"
              }`}
            />
          ))}
        </div>
      </div>

      {formError && (
        <div className="bg-red-50 border border-brand-error/20 p-3 rounded-lg text-brand-error text-sm flex gap-2 items-center">
          <Body className="text-brand-error text-sm">{formError}</Body>
        </div>
      )}

      {/* STEP 1: Select doctor/specialty */}
      {step === 1 && (
        <div className="space-y-4">
          <H4 className="text-brand-primary font-bold">Select a Clinical Provider</H4>
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {loading ? (
              <div className="text-center py-6 text-brand-secondary">Loading providers list...</div>
            ) : (
              doctors.map((doc) => {
                const isSelected = selectedDoctor?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setFormError("");
                    }}
                    className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent"
                        : "border-brand-primary/10 bg-white hover:bg-brand-bg-light"
                    }`}
                  >
                    <div className="h-12 w-12 rounded-lg bg-brand-primary/10 border border-brand-primary/15 flex items-center justify-center font-bold text-brand-primary shrink-0">
                      {doc.name.split(" ").pop().charAt(0)}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <span className="font-bold text-brand-dark text-[16px] block">
                        {doc.name}
                      </span>
                      <span className="text-xs text-brand-accent font-semibold uppercase tracking-wider block">
                        {doc.specialty}
                      </span>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="flex items-center text-amber-500 text-xs font-bold gap-0.5">
                          <Star size={12} fill="currentColor" /> {doc.rating}
                        </span>
                        <span className="text-[12px] text-brand-secondary">• Experience: {doc.experience}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Select date & slot */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <H4 className="text-brand-primary font-bold">Select Appointment Date</H4>
            <input
              type="date"
              min={todayDateString()}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setFormError("");
              }}
              className="w-full p-3 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-[16px] font-poppins bg-white"
            />
          </div>

          {date && (
            <div className="space-y-3">
              <H4 className="text-brand-primary font-bold">Available Live Slots</H4>
              {slotsLoading ? (
                <div className="text-center py-6 text-brand-secondary">Querying slots database...</div>
              ) : availableSlots.length === 0 ? (
                <div className="text-center py-6 text-brand-error text-sm font-poppins">
                  No slots available on this day. Please pick another date.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedSlot(slot);
                          setFormError("");
                        }}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg font-poppins transition-all border ${
                          isSelected
                            ? "bg-brand-accent border-brand-accent text-white shadow-sm"
                            : "bg-white border-brand-primary/10 text-brand-primary hover:bg-brand-bg-light cursor-pointer"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* STEP 3: Appointment type + notes */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="space-y-2">
            <H4 className="text-brand-primary font-bold">Consultation Format</H4>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("telehealth")}
                className={`flex flex-col items-center justify-center p-4 border rounded-xl gap-2 transition-all ${
                  type === "telehealth"
                    ? "border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent text-brand-primary"
                    : "border-brand-primary/10 bg-white hover:bg-brand-bg-light text-brand-secondary cursor-pointer"
                }`}
              >
                <Video size={24} />
                <span className="text-sm font-bold font-poppins">Telehealth Call</span>
              </button>

              <button
                type="button"
                onClick={() => setType("in-person")}
                className={`flex flex-col items-center justify-center p-4 border rounded-xl gap-2 transition-all ${
                  type === "in-person"
                    ? "border-brand-accent bg-brand-accent/5 ring-1 ring-brand-accent text-brand-primary"
                    : "border-brand-primary/10 bg-white hover:bg-brand-bg-light text-brand-secondary cursor-pointer"
                }`}
              >
                <MapPin size={24} />
                <span className="text-sm font-bold font-poppins">In-Person Visit</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[16px] font-medium text-brand-dark block">
              Reason for Visit <span className="text-brand-error">*</span>
            </label>
            <input
              type="text"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Discuss lab work panels, routine screening"
              className="w-full p-3 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-[16px] font-poppins bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[16px] font-medium text-brand-dark block">
              Additional Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Any symptoms, medication adjustments..."
              className="w-full p-3 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-[16px] font-poppins bg-white"
            />
          </div>
        </div>
      )}

      {/* STEP 4: Review & Confirm */}
      {step === 4 && (
        <div className="space-y-4">
          <H4 className="text-brand-primary font-bold">Review Consultation Details</H4>
          <div className="bg-brand-bg-light/50 border border-brand-primary/5 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start border-b border-brand-bg-light pb-2">
              <div>
                <span className="text-xs text-brand-secondary block font-poppins">Provider</span>
                <span className="font-poppins text-brand-dark font-bold text-[16px]">
                  {selectedDoctor.name}
                </span>
                <span className="text-xs text-brand-accent block font-medium">
                  {selectedDoctor.specialty}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-brand-secondary block font-poppins">Consultation format</span>
                <span className="inline-flex gap-1.5 items-center text-xs font-semibold text-brand-primary bg-brand-accent/10 border border-brand-accent/15 px-2.5 py-0.5 rounded-full mt-1">
                  {type === "telehealth" ? <Video size={12} /> : <MapPin size={12} />}
                  {type === "telehealth" ? "Telehealth" : "In-Person"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-brand-bg-light pb-2">
              <div>
                <span className="text-xs text-brand-secondary block font-poppins">Scheduled Date</span>
                <span className="font-poppins text-brand-dark font-semibold text-sm">
                  {date}
                </span>
              </div>
              <div>
                <span className="text-xs text-brand-secondary block font-poppins">Time Slot</span>
                <span className="font-poppins text-brand-dark font-semibold text-sm">
                  {selectedSlot}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-brand-secondary block font-poppins">Reason for Consultation</span>
              <span className="font-poppins text-brand-dark text-sm block">
                {reason}
              </span>
            </div>

            {notes && (
              <div>
                <span className="text-xs text-brand-secondary block font-poppins">Additional Notes</span>
                <span className="font-poppins text-brand-secondary text-sm block italic">
                  {notes}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER ACTIONS */}
      <div className="flex justify-between pt-4 border-t border-brand-bg-light">
        {step > 1 ? (
          <Button variant="secondary" size="sm" onClick={handleBackStep} disabled={loading}>
            Back
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="text-brand-secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}

        {step < 4 ? (
          <Button variant="accent" size="sm" onClick={handleNextStep}>
            Next Step
          </Button>
        ) : (
          <Button variant="accent" size="sm" loading={loading} onClick={handleConfirmSubmit}>
            Confirm & Book
          </Button>
        )}
      </div>
    </div>
  );
}
