import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  /** Validation message. Marks the field invalid and is announced by screen readers. */
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, containerClassName = "", className = "", id, error, required, ...props }, ref) => {
    const generatedId = React.useId();
    const fieldId = id ?? generatedId;
    const errorId = `${fieldId}-error`;
    const inputClasses = `border-b py-2 focus:outline-none bg-transparent text-sm text-[#1A1A1A] placeholder-gray-400 ${
      error ? "border-red-700 focus:border-red-700" : "border-gray-300 focus:border-gold-dark"
    } ${className}`;

    const input = (
      <input
        id={fieldId}
        ref={ref}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputClasses}
        {...props}
      />
    );

    const message = error ? (
      <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-700">
        {error}
      </p>
    ) : null;

    if (!label) {
      return (
        <>
          {input}
          {message}
        </>
      );
    }

    return (
      <div className={`flex flex-col ${containerClassName}`}>
        <label htmlFor={fieldId} className="text-[10px] text-gray-500 mb-2">
          {label}
          {required && (
            <span className="text-red-700" aria-hidden="true">
              {" "}*
            </span>
          )}
        </label>
        {input}
        {message}
      </div>
    );
  }
);

Input.displayName = "Input";
