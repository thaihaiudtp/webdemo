import { useState } from "react";

interface CustomAddProps {
  label: string;
  format: string;
  value: string;
  onChangeValue: (val: string) => void;
}

export default function CustomAdd({ label, format, value, onChangeValue }: CustomAddProps) {
  return (
    <div className="flex flex-col h-auto mb-4 p-5 rounded-sm">
      <span className="text-gray-800 font-bold text-xl mb-3">{label}</span>
      <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
        <input
          type={format}
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
          className="w-full h-12 px-4 py-2 text-lg text-gray-800 border border-gray-300 rounded"
          placeholder={`Nhập ${label.toLowerCase()}...`}
        />
      </div>
    </div>
  );
}
