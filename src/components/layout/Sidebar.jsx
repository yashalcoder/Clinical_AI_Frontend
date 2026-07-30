"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  Pill,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Activity
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/patient/dashboard", icon: LayoutDashboard },
    { name: "Appointments", path: "/patient/appointments", icon: Calendar },
    { name: "Messages", path: "/patient/messages", icon: MessageSquare },
    { name: "Medical Records", path: "/patient/records", icon: FileText },
    { name: "Prescriptions", path: "/patient/prescriptions", icon: Pill },
    { name: "Billing & Payments", path: "/patient/billing", icon: CreditCard },
    { name: "Profile & Settings", path: "/patient/profile", icon: Settings }
  ];

  const handleLogout = () => {
    // Clear mock state if any, redirect to home
    router.push("/");
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="hidden md:flex flex-col justify-between bg-brand-primary text-white border-r border-brand-accent/10 h-screen sticky top-0 shrink-0 select-none overflow-x-hidden"
    >
      {/* Top Brand Logo */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 bg-white/10 rounded-lg flex items-center justify-center text-brand-accent shrink-0">
            <Activity size={20} />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-poppins text-lg font-bold text-white tracking-tight"
            >
              ClinicFlow <span className="text-brand-accent">AI</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link key={item.path} href={item.path}>
              <div
                className={`flex items-center gap-4 px-4 py-3 rounded-lg font-poppins text-[16px] font-medium transition-all ${
                  isActive
                    ? "bg-brand-accent text-white font-semibold"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} className="shrink-0" />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-white/5 space-y-2">
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg font-poppins text-[16px] font-medium transition-all cursor-pointer"
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Sign Out</span>}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-brand-accent border border-white/5 cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </motion.aside>
  );
}
