"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className="ml-3 px-6 py-2 border-2 border-[#ff7a27] text-[#ff7a27] rounded-full font-semibold hover:bg-[#ff7a27] hover:text-white transition cursor-pointer w-50"
      onClick={() => alert(`Hello from your ${appName} app!`)}
    
    >
      {children}
    </button>
  );
};
