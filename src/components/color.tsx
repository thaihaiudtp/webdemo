interface ColorProps {
    selectedColor: string | null;
    onColorChange: (color: string | null) => void;
  }
  
  export default function Color({ selectedColor, onColorChange }: ColorProps) {
    return (
      <div className="flex flex-col h-auto mb-4 p-5 rounded-sm">
        <span className="text-gray-800 font-bold text-xl mb-3">Màu sắc</span>
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border border-gray-400"
            style={{ backgroundColor: selectedColor || "#ffffff" }}
          ></div>
          <input
            type="color"
            value={selectedColor || "#ffffff"}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-10 h-10 border-none cursor-pointer bg-transparent"
          />
        </div>
      </div>
    );
  }
  