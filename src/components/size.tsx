import { useState } from "react";
interface SizeProps {
    selectedSize: number | null;
    onSizeChange: (size: number | null) => void;
  }
  
export default function Size({selectedSize, onSizeChange}: SizeProps) {
  return (
    <div className="flex flex-col h-auto mb-4 p-5 rounded-sm">
      <span className="text-gray-800 font-bold text-xl mb-3">Kích thước</span>
      <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
        <input
          type="number"
          value={selectedSize || 0}
          onChange={(e) => onSizeChange(e.target.value ? Number(e.target.value) : 0)}
          className="w-full px-4 py-2 text-lg text-gray-800 border border-gray-300 rounded-lg"
          placeholder="Nhập kích thước..."
          
        />
      </div>
    </div>
  );
}
