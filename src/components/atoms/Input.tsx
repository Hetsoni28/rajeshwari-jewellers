import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, containerClassName = "", className = "", ...props }, ref) => {
    const inputClasses = `border-b border-gray-300 py-2 focus:outline-none focus:border-gold-dark bg-transparent text-sm text-[#1A1A1A] placeholder-gray-400 ${className}`;

    if (!label) {
      return <input ref={ref} className={inputClasses} {...props} />;
    }

    return (
      <div className={`flex flex-col ${containerClassName}`}>
        <label className="text-[10px] text-gray-500 mb-2">{label}</label>
        <input ref={ref} className={inputClasses} {...props} />
      </div>
    );
  }
);

Input.displayName = "Input";
