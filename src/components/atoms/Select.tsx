import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, containerClassName = "", className = "", ...props }, ref) => {
    const selectClasses = `border-b border-gray-300 py-2 focus:outline-none focus:border-gold-dark bg-transparent text-sm text-[#1A1A1A] cursor-pointer appearance-none ${className}`;

    const SelectElement = (
      <div className="relative w-full">
        <select ref={ref} className={`w-full ${selectClasses}`} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Custom arrow indicator */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/0000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    );

    if (!label) {
      return SelectElement;
    }

    return (
      <div className={`flex flex-col ${containerClassName}`}>
        <label className="text-[10px] text-gray-500 mb-2">{label}</label>
        {SelectElement}
      </div>
    );
  }
);

Select.displayName = "Select";
