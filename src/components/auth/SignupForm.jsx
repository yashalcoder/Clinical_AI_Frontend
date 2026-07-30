"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, AlertCircle } from "lucide-react";
import { signupWithEmail, loginWithGoogle } from "@/lib/api";
import GoogleAuthButton from "./GoogleAuthButton";
import RoleSelector from "./RoleSelector";
import { Button } from "../common/Button";

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) {
      tempErrors.name = "Full name is required.";
    }

    if (!email) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      tempErrors.password = "Password is required.";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    if (role !== "patient") {
      tempErrors.role = "Only patient portal is currently available.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      const response = await signupWithEmail(name, email, password);
      if (response.success) {
        router.push("/patient/dashboard");
      }
    } catch (err) {
      setErrors({ form: err.message });
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const response = await loginWithGoogle();
      if (response.success) {
        router.push("/patient/dashboard");
      }
    } catch (err) {
      setErrors({ form: err.message });
      triggerShake();
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <motion.div
      animate={{ x: shake ? [-10, 10, -10, 10, -5, 5, 0] : 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md space-y-6 font-poppins"
    >
      <div className="space-y-1">
        <h2 className="text-[30px] font-bold text-brand-primary tracking-tight">
          Create account
        </h2>
        <p className="text-[16px] text-brand-secondary">
          Register to access medical charts and manage booking schedules.
        </p>
      </div>

      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-brand-error text-sm rounded-lg p-4 flex gap-2 items-center">
          <AlertCircle size={18} />
          <span>{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selector */}
        <RoleSelector value={role} onChange={setRole} />
        {errors.role && (
          <p className="text-brand-error text-xs flex items-center gap-1 font-medium">
            <AlertCircle size={12} />
            {errors.role}
          </p>
        )}

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-[16px] font-medium text-brand-dark block">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary/50">
              <User size={18} />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Yashasvi Sharma"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-[16px] font-poppins ${
                errors.name ? "border-brand-error" : "border-brand-primary/10"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-brand-error text-xs flex items-center gap-1 mt-1 font-medium">
              <AlertCircle size={12} />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[16px] font-medium text-brand-dark block">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary/50">
              <Mail size={18} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patient.yash@gmail.com"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-[16px] font-poppins ${
                errors.email ? "border-brand-error" : "border-brand-primary/10"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-brand-error text-xs flex items-center gap-1 mt-1 font-medium">
              <AlertCircle size={12} />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[16px] font-medium text-brand-dark block">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary/50">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-[16px] font-poppins ${
                  errors.password ? "border-brand-error" : "border-brand-primary/10"
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-brand-error text-xs flex items-center gap-1 mt-1 font-medium">
                <AlertCircle size={12} />
                {errors.password}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[16px] font-medium text-brand-dark block">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary/50">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-[16px] font-poppins ${
                  errors.confirmPassword ? "border-brand-error" : "border-brand-primary/10"
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-brand-error text-xs flex items-center gap-1 mt-1 font-medium">
                <AlertCircle size={12} />
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          type="submit"
          variant="accent"
          loading={loading}
          disabled={googleLoading}
          className="w-full mt-4"
        >
          Register Patient Account
        </Button>
      </form>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-brand-primary/10 w-full" />
        <span className="absolute bg-white px-3 text-xs text-brand-secondary uppercase tracking-widest font-semibold font-poppins">
          Or register with
        </span>
      </div>

      {/* Google Sign in */}
      <GoogleAuthButton
        onClick={handleGoogleSignup}
        loading={googleLoading}
        disabled={loading}
      />

      <div className="text-center pt-2">
        <p className="text-[16px] text-brand-secondary">
          Already have an account?{" "}
          <NextLink
            href="/login"
            className="text-brand-accent font-semibold hover:underline"
          >
            Sign In
          </NextLink>
        </p>
      </div>
    </motion.div>
  );
}
