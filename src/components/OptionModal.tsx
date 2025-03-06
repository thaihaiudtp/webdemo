import { useState } from "react";

interface OptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (options: string[]) => void;
  onAddCustomOption: (label: string, format: string) => void;
}

export default function OptionModal({ isOpen, onClose, onSave,  onAddCustomOption }: OptionModalProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
    const [customOption, setCustomOption] = useState("");
    const [customFormat, setCustomFormat] = useState("text");
    const addInfo = {
        color: "Màu sắc",
        size: "Kích thước",
    };
      
    const toggleOption = (option: string) => {
        setSelectedOptions((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
    };

    const handleSave = () => {
        onSave(selectedOptions);
        onClose();
    };
    const handleAddCustomOption = () => {
        if (customOption.trim()) {
          onAddCustomOption(customOption, customFormat); 
          setCustomOption("");
          setIsCustomModalOpen(false);
        }
      };  
    if (!isOpen) return null;

    return (  
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-3 text-gray-800">Chọn thông tin bổ sung</h2>
            
            <div className="flex flex-col gap-2 text-gray-800">
            {Object.values(addInfo).map((option) => (
                <label key={option} className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => toggleOption(option)}
                />
                <span>{option}</span>
                </label>
            ))}
            </div>
            <button className="text-gray-800 mt-3 hover:text-blue-500" onClick={() => setIsCustomModalOpen(true)}>
                + Tùy chọn khác
            </button>
            <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-gray-300 rounded mr-2" onClick={onClose}>
                Hủy
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
                OK
            </button>
            </div>
        </div>
        {isCustomModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-bold mb-3 text-gray-800">Thêm tùy chọn</h2>
                        
                        <input
                            type="text"
                            value={customOption}
                            onChange={(e) => setCustomOption(e.target.value)}
                            placeholder="Nhập tên loại (VD: Dung lượng)"
                            className="w-full p-2 border border-gray-300 rounded mb-3 text-gray-800"
                        />

                        <select
                            value={customFormat}
                            onChange={(e) => setCustomFormat(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-3 text-gray-800"
                        >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="date">Date</option>
                        </select>

                        <div className="flex justify-end">
                            <button className="px-4 py-2 bg-gray-300 rounded mr-2" onClick={() => setIsCustomModalOpen(false)}>
                                Hủy
                            </button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleAddCustomOption}>
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
