import React from "react";

export function Card({ children, className, ...props }) {
  return (
    <div className={`bg-white shadow-lg rounded-xl overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={`p4 ${className}`} {...props}>
      {children}
    </div>
  );
}
