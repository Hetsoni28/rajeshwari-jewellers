import React from "react";
import { Button } from "@/components/atoms/Button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex justify-center items-center space-x-2 ${className}`}>
      <Button
        variant="custom"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border border-gray-300 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-xs font-bold tracking-widest uppercase"
      >
        Prev
      </Button>
      
      {pages.map(page => (
        <Button
          variant="custom"
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center border text-xs font-bold transition-colors ${
            currentPage === page 
              ? "bg-[#D4AF37] border-[#D4AF37] text-white shadow-sm" 
              : "border-gray-300 text-gray-500 hover:border-gray-400"
          }`}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="custom"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border border-gray-300 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-xs font-bold tracking-widest uppercase"
      >
        Next
      </Button>
    </div>
  );
};
