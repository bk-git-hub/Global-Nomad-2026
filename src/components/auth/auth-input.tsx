"use client";

import { ComponentProps } from "react";

interface AuthInputProps extends ComponentProps<"input"> {
  label: string;
  error?: string[];
}

export default function AuthInput({ label, error, ...props }: AuthInputProps) {
  const hasError = error && error.length > 0;

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="font-medium text-gray-900">{label}</label>
      <input
        {...props}
        className={`w-full rounded-[6px] border px-5 py-4 transition-colors focus:outline-0 ${
          hasError
            ? "border-red-primary"
            : "border-gray-800 focus:border-gray-600"
        }`}
      />
      {hasError && <p className="text-red-primary text-sm">{error[0]}</p>}
    </div>
  );
}
