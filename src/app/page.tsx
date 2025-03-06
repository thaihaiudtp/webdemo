"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import OptionModal from "@/components/OptionModal";
import Color from "@/components/color";
import Size from "@/components/size";
import CustomAdd from "@/components/customAdd";
import Chat from "@/components/Chat";
import Image from "next/image";
export default function MainContent() {
  const [text, setText] = useState("");
  const [textDes, setTextDes] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [customOptions, setCustomOptions] = useState<{ label: string; format: string; value: string}[]>([]);
  const session = useSession();
  const router = useRouter();
  console.log(session)
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  const handleAddInfo = () => setIsModalOpen(true);
  const handleAddCustomOption = (label: string, format: string) => {
    setCustomOptions([...customOptions, { label, format, value: "" }]); // Thêm value mặc định
  };
  const handleValueChange = (index: number, newValue: string) => {
    setCustomOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index].value = newValue; // Cập nhật giá trị
      return updatedOptions;
    });
  };
    
  const handleSaveOptions = (options: string[]) => {
    setSelectedOptions(options);
  };
  const handleRemoveCustomOption = (index: number) => {
    setCustomOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };
  
  const handleSave = () => {
    console.log("🚀 Data đã chọn:");
    console.log("Tên sản phẩm:", text ? text : null);
    console.log("Mô tả sản phẩm:", textDes ? textDes : null);
    console.log("Hình ảnh:", image ? image : null);
    console.log("Màu sắc:", selectedColor);
    console.log("Kích thước:", selectedSize);
    console.log("Danh sách tùy chọn đã nhập:");
    customOptions.forEach((option) => {
      console.log(`Tên: ${option.label}, Giá trị: ${option.value}`);
    });

  };
  useEffect(()=>{
    if (session.status === "loading") return;
    if(session.data === null){
      router.push("/login")
    }
  }, [session, router])
  return (
    <div>
    <form>
    <div className="p-4 sm:ml-64 bg-white">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">
            <div>
              <p className="text-gray-800">Mô tả qua về những việc cần làm cho người dùng thực hiện</p>
              <p className="mt-2 text-gray-500">..........................................................</p>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">
            <div className="p-4 rounded-md flex justify-center">
              <Link href="#" className="text-blue-600 underline">Link demo hướng dẫn</Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col h-auto p-3 rounded-sm">
            <span className="text-gray-800 font-bold text-xl">Tên sản phẩm</span>
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-24 px-4 py-3 text-lg text-gray-800"
                  placeholder="Nhập nội dung..."
                  required
                />
            </div>
          </div>
          <div className="flex flex-col h-auto p-3 rounded-sm">
            <span className="text-gray-800 font-bold text-xl">Mô tả sản phẩm</span>
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
                <input
                  type="text"
                  value={textDes}
                  onChange={(e) => setTextDes(e.target.value)}
                  className="w-full h-24 px-4 py-3 text-lg text-gray-800"
                  placeholder="Nhập nội dung..."
                  required
                />
            </div>
          </div>
        </div>
        <div className="flex flex-col h-auto p-5 rounded-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-800 font-bold text-xl mb-3">Hình ảnh sản phẩm</span>
          </div>

          <label className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded-md mt-2 cursor-pointer overflow-hidden">
            {image ? (
              <Image src={image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-black">+</span>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        {customOptions.map(({ label, format, value }, index) => (
          <div key={index} className="flex items-center gap-2">
            <CustomAdd
              label={label}
              format={format}
              value={value}
              onChangeValue={(val) => handleValueChange(index, val)}
            />
            <button
              onClick={() => handleRemoveCustomOption(index)}
              className="p-2 text-red-500 hover:text-red-700"
            >
            <svg className="w-6 h-6 text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>

            </button>
          </div>
        ))}

        {selectedOptions.includes("Màu sắc") && <Color selectedColor={selectedColor} onColorChange={setSelectedColor}/>}
        {selectedOptions.includes("Kích thước") && <Size selectedSize={selectedSize} onSizeChange={setSelectedSize}/>}
        <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50" onClick={handleAddInfo}>
         <p className="text-xl text-gray-800 p-5">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
          </p>
          <span className="text-xl text-gray-800">Thêm thông tin</span>
        </div>

        <OptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveOptions}
        onAddCustomOption={handleAddCustomOption} 
        />
        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Lưu sản phẩm
        </button>
      </div>
    </div>
    </form>
    <Chat/>
    </div>
  );
}
