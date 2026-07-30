"use client";

import React, { useState, useEffect } from "react";
import { User, Phone, Calendar, Shield, Save, CheckCircle2, Key, AlertCircle } from "lucide-react";
import { getProfile, updateProfile } from "@/lib/api";
import { H2, H3, H4, Body } from "@/components/common/Typography";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { TableSkeleton } from "@/components/common/Skeleton";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [passLoading, setPassLoading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const res = await updateProfile(profile);
      if (res.success) {
        setToastMessage("Profile changes saved successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (err) {
      alert("Failed to update profile details.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess("");

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPassError("All password fields are required.");
      return;
    }
    if (newPassword.length < 6) {
      setPassError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPassError("New passwords do not match.");
      return;
    }

    setPassLoading(true);
    // Simulate API update
    setTimeout(() => {
      setPassSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setPassLoading(false);
    }, 800);
  };

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-8 font-poppins relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#0F3D2E] text-white px-6 py-4 rounded-xl shadow-lg border border-brand-accent/20 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 size={20} className="text-brand-accent" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Title */}
      <div>
        <H2 className="text-brand-primary !mb-1">Profile & Settings</H2>
        <Body variant="secondary">
          Update your contact details, verify insurance records, and configure notifications.
        </Body>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile and Settings Form */}
        <form onSubmit={handleSaveProfile} className="lg:col-span-8 space-y-6">
          <Card className="p-8 border border-brand-primary/10 space-y-6 bg-white">
            <H3 className="text-brand-primary border-b border-brand-bg-light pb-2 !mb-0">
              Personal Information
            </H3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-brand-dark flex gap-1.5 items-center">
                  <User size={16} className="text-brand-accent" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-poppins bg-white"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-brand-dark flex gap-1.5 items-center">
                  <Phone size={16} className="text-brand-accent" /> Contact Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-poppins bg-white"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-brand-dark flex gap-1.5 items-center">
                  <Calendar size={16} className="text-brand-accent" /> Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                  className="w-full p-3 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-poppins bg-white"
                />
              </div>

              {/* Email (Readonly) */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400 flex gap-1.5 items-center">
                  Email Address (Locked)
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full p-3 border border-brand-primary/5 rounded-lg text-sm bg-gray-50 text-gray-400 font-poppins cursor-not-allowed"
                />
              </div>
            </div>

            <H3 className="text-brand-primary border-b border-brand-bg-light pb-2 !mb-0 pt-4">
              Insurance Verification
            </H3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-brand-bg-light/40 p-5 rounded-xl border border-brand-primary/5">
              {/* Provider */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-brand-dark flex gap-1.5 items-center">
                  <Shield size={16} className="text-brand-accent" /> Insurance Provider
                </label>
                <input
                  type="text"
                  name="insuranceProvider"
                  value={profile.insuranceProvider}
                  onChange={handleChange}
                  className="w-full p-3 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-poppins bg-white"
                />
              </div>

              {/* ID */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-brand-dark flex gap-1.5 items-center">
                  <Shield size={16} className="text-brand-accent" /> Policy ID Number
                </label>
                <input
                  type="text"
                  name="insuranceId"
                  value={profile.insuranceId}
                  onChange={handleChange}
                  className="w-full p-3 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-poppins bg-white"
                />
              </div>
            </div>

            <H3 className="text-brand-primary border-b border-brand-bg-light pb-2 !mb-0 pt-4">
              Notification Preferences
            </H3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={profile.emailNotifications}
                  onChange={handleChange}
                  className="h-4.5 w-4.5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent/50 cursor-pointer"
                />
                <span className="text-sm font-medium text-brand-dark font-poppins">
                  Receive email confirmations for appointments and invoice uploads
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={profile.smsNotifications}
                  onChange={handleChange}
                  className="h-4.5 w-4.5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent/50 cursor-pointer"
                />
                <span className="text-sm font-medium text-brand-dark font-poppins">
                  Receive SMS reminders for scheduled slots (24 hours and 2 hours before)
                </span>
              </label>
            </div>

            <div className="pt-6 border-t border-brand-bg-light flex justify-end">
              <Button type="submit" variant="accent" loading={saveLoading}>
                <Save size={16} className="mr-1.5" /> Save Profile Changes
              </Button>
            </div>
          </Card>
        </form>

        {/* Change Password Panel */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 border border-brand-primary/10 bg-white space-y-5">
            <H3 className="text-brand-primary border-b border-brand-bg-light pb-2 !mb-0 flex gap-2 items-center">
              <Key size={18} className="text-brand-accent" /> Password Reset
            </H3>

            {passError && (
              <div className="bg-red-50 border border-brand-error/25 p-3 rounded-lg text-brand-error text-xs flex gap-1.5 items-center">
                <AlertCircle size={14} className="shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            {passSuccess && (
              <div className="bg-emerald-50 border border-emerald-250 p-3 rounded-lg text-emerald-700 text-xs flex gap-1.5 items-center">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>{passSuccess}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4 text-sm text-brand-dark">
              <div className="space-y-1">
                <label className="font-medium text-xs text-brand-primary font-poppins block">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full p-2.5 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-poppins bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-xs text-brand-primary font-poppins block">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full p-2.5 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-poppins bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-xs text-brand-primary font-poppins block">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full p-2.5 border border-brand-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-sm font-poppins bg-white"
                />
              </div>

              <Button type="submit" variant="secondary" size="sm" className="w-full" loading={passLoading}>
                Update Password
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
