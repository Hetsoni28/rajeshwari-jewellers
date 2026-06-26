import React from "react";
import Link from "next/link";

export interface BreadcrumbPath {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  paths: BreadcrumbPath[];
  className?: string;
}

export const Breadcrumbs = ({ paths, className = "" }: BreadcrumbsProps) => {
  return (
    <div className={`flex flex-wrap items-center text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase ${className}`}>
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;

        return (
          <React.Fragment key={path.label}>
            {path.href && !isLast ? (
              <Link href={path.href} className="hover:text-gold-dark transition-colors">
                {path.label}
              </Link>
            ) : (
              <span className="text-gold-dark">{path.label}</span>
            )}
            
            {!isLast && (
              <span className="mx-3 text-gray-300">&gt;</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
