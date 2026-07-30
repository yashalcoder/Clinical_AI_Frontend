"use client";

import React from "react";
import { motion } from "framer-motion";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-poppins text-[16px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/50 rounded-lg cursor-pointer";

  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-primary/90 disabled:bg-brand-primary/50",
    accent: "bg-brand-accent text-white hover:bg-brand-accent/90 disabled:bg-brand-accent/50",
    secondary: "bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-bg-light disabled:border-brand-primary/30 disabled:text-brand-primary/30",
    outline: "bg-transparent text-brand-accent border border-brand-accent hover:bg-brand-accent/10 disabled:border-brand-accent/30 disabled:text-brand-accent/30",
    ghost: "bg-transparent text-brand-secondary hover:bg-brand-bg-light hover:text-brand-dark disabled:bg-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-[14px]",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-[18px]"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 1.02, boxShadow: "0 4px 12px rgba(20, 184, 138, 0.15)" }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};
