import React from "react";

export const H1 = ({ children, className = "", ...props }) => {
  return (
    <h1
      className={`font-poppins text-3xl md:text-4xl lg:text-[36px] font-bold leading-[1.2] text-brand-dark tracking-tight mb-4 ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
};

export const H2 = ({ children, className = "", ...props }) => {
  return (
    <h2
      className={`font-poppins text-2xl md:text-3xl lg:text-[30px] font-semibold leading-[1.2] text-brand-dark tracking-tight mb-4 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};

export const H3 = ({ children, className = "", ...props }) => {
  return (
    <h3
      className={`font-poppins text-xl md:text-2xl lg:text-[24px] font-semibold leading-[1.2] text-brand-dark tracking-tight mb-3 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const H4 = ({ children, className = "", ...props }) => {
  return (
    <h4
      className={`font-poppins text-lg md:text-xl lg:text-[20px] font-medium leading-[1.2] text-brand-dark tracking-tight mb-2 ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
};

export const Body = ({ children, className = "", variant = "primary", ...props }) => {
  const colorClass =
    variant === "secondary"
      ? "text-brand-secondary"
      : variant === "white"
      ? "text-white"
      : variant === "accent"
      ? "text-brand-accent"
      : "text-brand-dark";

  return (
    <p
      className={`font-poppins text-[16px] font-normal leading-[1.6] ${colorClass} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};
