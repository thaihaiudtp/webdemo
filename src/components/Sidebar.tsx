"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
export default function Sidebar(){
    const pathName = usePathname();
        
    if(pathName === "/login" || pathName === "/register" || pathName==="/chat"){
      return null;
    }
    return(
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-white">
            <Link href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-800">Flowbite</span>
            </Link>
            <ul className="space-y-2 font-medium mt-5">
                <li>
                    <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-300 group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className="ms-3">Home</span>
                    </Link>
                </li>
                <li>
                    <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-300 group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Browse</span>
                    </Link>
                </li>
            </ul>
            <div className="flex items-center ps-2.5 mb-5 mt-6">
                <span className="self-center text-xl font-bold whitespace-nowrap text-gray-800">Danh sách feature</span>
            </div>
        </div>
        </aside>
    )
}