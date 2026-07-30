"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/navigation"; // Wait, in Next.js it should be 'next/link'
import NextLink from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { loginWithEmail, loginWithGoogle } from "@/lib/api";
import GoogleAuthButton from "./GoogleAuthButton";
import { Button } from "../common/Button";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const validate = () => {
    const tempErrors = {};
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
      const response = await loginWithEmail(email, password);
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

  const handleGoogleLogin = async () => {
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
          Welcome back
        </h2>
        <p className="text-[16px] text-brand-secondary">
          Enter your credentials to access your patient portal dashboard.
        </p>
      </div>

      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-brand-error text-sm rounded-lg p-4 flex gap-2 items-center">
          <AlertCircle size={18} />
          <span>{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="e.g. patient.yash@gmail.com"
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
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[16px] font-medium text-brand-dark">
              Password
            </label>
            <NextLink
              href="/login"
              className="text-xs text-brand-accent hover:underline font-semibold"
            >
              Forgot password?
            </NextLink>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary/50">
              <Lock size={18} />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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

        {/* Action Button */}
        <Button
          type="submit"
          variant="accent"
          loading={loading}
          disabled={googleLoading}
          className="w-full mt-2"
        >
          Sign In to Portal
        </Button>
      </form>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-brand-primary/10 w-full" />
        <span className="absolute bg-white px-3 text-xs text-brand-secondary uppercase tracking-widest font-semibold font-poppins">
          Or continue with
        </span>
      </div>

      {/* Google Sign in */}
      <GoogleAuthButton
        onClick={handleGoogleLogin}
        loading={googleLoading}
        disabled={loading}
      />

      <div className="text-center pt-2">
        <p className="text-[16px] text-brand-secondary">
          Don't have an account yet?{" "}
          <NextLink
            href="/signup"
            className="text-brand-accent font-semibold hover:underline"
          >
            Create account
          </NextLink>
        </p>
      </div>
    </motion.div>
  );
}
