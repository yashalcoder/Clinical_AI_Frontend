import React from "react";

export const Badge = ({ children, variant = "info", className = "" }) => {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    danger: "bg-red-50 text-brand-error border-red-100",
    info: "bg-blue-50 text-blue-700 border-blue-100",
    accent: "bg-brand-bg-light text-brand-accent border-brand-accent/20"
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
