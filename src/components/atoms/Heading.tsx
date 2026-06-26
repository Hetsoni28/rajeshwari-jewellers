import React from "react";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export const Heading = ({ level = 2, className = "", children, ...props }: HeadingProps) => {
  const Component = `h${level}` as React.ElementType;
  const baseClasses = "font-cinzel text-[#1A1A1A]";
  
  return (
    <Component className={`${baseClasses} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
};
