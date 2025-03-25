import React from "react";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
      {...props}
    />
  );
};
