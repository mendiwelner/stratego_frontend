import React from "react";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="border-b pb-2 mb-2">{children}</div>;
};

export const CardContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export const CardTitle: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
};
