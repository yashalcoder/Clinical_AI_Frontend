"use client";

import React from "react";
import { motion } from "framer-motion";

export const Card = ({
  children,
  className = "",
  hoverable = false,
  onClick,
  ...props
}) => {
  const isInteractive = hoverable || onClick;

  const cardStyle = `bg-white border border-brand-bg-light rounded-xl p-6 shadow-sm overflow-hidden ${
    isInteractive ? "cursor-pointer" : ""
  } ${className}`;

  if (isInteractive) {
    return (
      <motion.div
        whileHover={{
          y: -4,
          boxShadow: "0 12px 24px rgba(11, 27, 23, 0.05)",
          borderColor: "rgba(20, 184, 138, 0.2)"
        }}
        onClick={onClick}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cardStyle}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardStyle} {...props}>
      {children}
    </div>
  );
};
