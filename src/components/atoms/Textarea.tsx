import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, containerClassName = "", className = "", ...props }, ref) => {
    const textareaClasses = `border-b border-gray-300 py-2 focus:outline-none focus:border-gold-dark bg-transparent text-sm text-[#1A1A1A] resize-none placeholder-gray-400 ${className}`;

    if (!label) {
      return <textarea ref={ref} className={textareaClasses} {...props} />;
    }

    return (
      <div className={`flex flex-col ${containerClassName}`}>
        <label className="text-[10px] text-gray-500 mb-2">{label}</label>
        <textarea ref={ref} className={textareaClasses} {...props} />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
