"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User, Menu, X, Activity } from "lucide-react";
import { getDashboardSummary } from "@/lib/api";

export default function Header() {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch notifications list from mock api
    async function loadNotifs() {
      try {
        const summary = await getDashboardSummary();
        setNotifications(summary.notifications);
      } catch (err) {
        console.error(err);
      }
    }
    loadNotifs();
  }, []);

  const getPageTitle = () => {
    const segment = pathname.split("/").pop();
    if (!segment || segment === "dashboard") return "Patient Dashboard";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const mobileNavs = [
    { name: "Dashboard", path: "/patient/dashboard" },
    { name: "Appointments", path: "/patient/appointments" },
    { name: "Messages", path: "/patient/messages" },
    { name: "Medical Records", path: "/patient/records" },
    { name: "Prescriptions", path: "/patient/prescriptions" },
    { name: "Billing & Payments", path: "/patient/billing" },
    { name: "Profile & Settings", path: "/patient/profile" }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-brand-bg-light px-6 py-4 flex items-center justify-between font-poppins">
      {/* Page Title / Mobile Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 rounded-md text-brand-primary hover:bg-brand-bg-light cursor-pointer"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <h1 className="text-xl font-bold text-brand-primary hidden md:block">
          {getPageTitle()}
        </h1>
        
        {/* Mobile Logo */}
        <div className="flex md:hidden items-center gap-2">
          <Activity size={20} className="text-brand-accent animate-pulse" />
          <span className="font-extrabold text-[16px] text-brand-primary">
            ClinicFlow
          </span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="p-2 rounded-full text-brand-secondary hover:bg-brand-bg-light hover:text-brand-dark transition-colors cursor-pointer relative"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-error ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-brand-primary/10 rounded-xl shadow-lg py-2 z-40">
              <div className="px-4 py-2 border-b border-brand-bg-light flex justify-between items-center">
                <span className="font-bold text-sm text-brand-primary">Notifications</span>
                <span className="text-xs text-brand-accent cursor-pointer" onClick={() => setNotifications([])}>Clear all</span>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-xs text-brand-secondary">
                    No new notifications.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="px-4 py-3 hover:bg-brand-bg-light/40 border-b border-brand-bg-light last:border-b-0 transition-colors"
                    >
                      <p className="text-xs text-brand-dark leading-snug">{notif.text}</p>
                      <span className="text-[10px] text-brand-secondary mt-1 block">{notif.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Badge */}
        <Link href="/patient/profile" className="flex items-center gap-2 group">
          <div className="h-9 w-9 bg-brand-accent/10 border border-brand-accent/25 text-brand-primary rounded-full flex items-center justify-center font-bold font-poppins transition-transform group-hover:scale-105">
            YS
          </div>
          <span className="hidden sm:inline font-medium text-sm text-brand-primary group-hover:text-brand-accent transition-colors">
            Yashasvi S.
          </span>
        </Link>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[70px] left-0 right-0 bg-white border-b border-brand-bg-light shadow-xl p-4 flex flex-col gap-2 z-30 animate-fadeIn">
          {mobileNavs.map((nav) => {
            const isActive = pathname === nav.path;
            return (
              <Link
                key={nav.path}
                href={nav.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-brand-accent text-white"
                    : "text-brand-secondary hover:bg-brand-bg-light hover:text-brand-primary"
                }`}
              >
                {nav.name}
              </Link>
            );
          })}
          <hr className="border-brand-bg-light" />
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 rounded-lg text-sm font-semibold text-brand-error hover:bg-red-50"
          >
            Sign Out
          </Link>
        </div>
      )}
    </header>
  );
}
