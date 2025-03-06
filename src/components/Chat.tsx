"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const Chat = () => {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    if (!isDragging) {
      router.push("/chat");
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 cursor-grab active:cursor-grabbing"
      drag
      dragConstraints={{ top: -500, left: -500, right: 500, bottom: 500 }}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false);
        setPosition({ x: info.point.x, y: info.point.y });
      }}
      style={{ x: position.x, y: position.y }}
    >
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        <MessageSquare size={28} />
      </button>
    </motion.div>
  );
};

export default Chat;
