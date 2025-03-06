"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session1, status } = useSession();
  if (pathName === "/login" || pathName === "/register" || pathName==="/chat") {
    return null;
  }
  const handleClick = () => {
    setIsOpen(prevState => !prevState);
  };
  return (
    <nav className="bg-gray-100 p-4 sm:ml-64">
      <div className="flex justify-between container mx-auto">
        <div>
          <h1 className="text-2xl text-gray-800">Tên feature</h1>
        </div>

        <ul className="flex gap-x-2">
            <div className='flex items-center sm:space-x-8 space-x-6'>
            <div className="relative">
              <button
              type="button"
              onClick={handleClick}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
              >
              <Image src="https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg" alt="Avatar" className="w-full h-full object-cover" width={40} height={40}/>
              </button>
              {isOpen && (
              <div  className="absolute mt-2 bg-white shadow-lg rounded w-40  z-[1000] right-0">
                <p className="text-blue-800 text-semibold ml-4 mt-2">Hi, {session1?.user?.fullname || session1?.user?.email}</p>
                <ul>
                  <li className="py-2.5 px-5 hover:bg-blue-50 text-black text-sm cursor-pointer" onClick={() => {signOut()}}>
                    Đăng xuất
                  </li>
                </ul>
              </div>
              )}
            </div> 
            </div> 
        </ul>
      </div>
    </nav>
  );
}
