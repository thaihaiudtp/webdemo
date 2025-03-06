'use client'
import React, { useState } from 'react';
import { Button } from '@/components/chatPage/button';
import { ButtonClear } from '@/components/chatPage/buttonclear';
import { Card, CardContent } from '@/components/chatPage/card';
import { Input } from '@/components/chatPage/input';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/chatPage/modal';
import { ChatApi } from '../api/chat/chatAPI';
import Image from 'next/image';
type Message = {
  sender: string;
  text: string;  
  data?: Coupon[]; 
};

type Coupon = {
  id: string;
  URL: string;
  Ma_giam_gia: string;
  Hieu_luc: string;
  Gioi_han: string;
  Chi_tieu_toi_thu: string;
  image: string;
};
export default function ChatbotUI() {
  const text = "Xin chào!"
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: text }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await ChatApi(input);
      const couponData = data.data; // Lấy danh sách mã giảm giá
  
      if (Array.isArray(couponData) && couponData.length > 0) {
        const formattedCoupons: Message = {
          sender: 'bot',
          text: 'Dưới đây là các mã giảm giá:',
          data: couponData 
        };
  
        setMessages(prev => [...prev, formattedCoupons]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: "Không tìm thấy mã giảm giá nào!" }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Không thể kết nối đến server.' }]);
    } finally {
      setIsLoading(false);
  
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  const clearMessages = () => {
    setMessages([{ sender: 'bot', text: text }]);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-800 p-4">
      <Card className="w-full max-w-md flex flex-col h-full">
        <CardContent className="flex-1 overflow-auto p-4 space-y-2 mb-6">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`p-2 rounded-lg ${
              msg.sender === 'bot' ? 'bg-gray-200 text-gray-800 text-left' : 'bg-blue-500 text-white text-right'
            }`}
          >
            <div 
              className={`text-xs font-semibold ${
                msg.sender === 'bot' ? 'text-gray-600' : 'text-white'
              }`}
            >
              {msg.sender === 'bot' ? 'Bot' : 'User'}
            </div>
            <p>{msg.text}</p>

            {msg.data && msg.data.length > 0 && (
              <div className="mt-2 space-y-2">
                {msg.data.map((coupon, i) => (
                  <div key={i} className='border rounded-md shadow-md space-x-4 bg-white p-3'>
                  <p className="text-gray-800 font-bold">{coupon.Ma_giam_gia}</p>
                  <a 
                    key={i} 
                    href={coupon.URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center"
                  >
                    {coupon.image && (
                      <div className="flex-shrink-0">
                        <Image
                          src={coupon.image} 
                          alt="Coupon" 
                          className="w-24 h-24 object-contain rounded mr-4"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Hạn: {coupon.Hieu_luc}</p>
                      <p className="text-sm text-gray-500">
                        Giới hạn: {coupon.Gioi_han?.toLowerCase() === "null" ? "Không có" : coupon.Gioi_han}
                      </p>
                      <p className="text-sm text-gray-500">Chi tiêu tối thiểu: {coupon.Chi_tieu_toi_thu}</p>
                    </div>
                  </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}


          {isLoading && (
            <div className="p-2 rounded-lg bg-gray-200 text-left italic text-gray-500">
              Đang trả lời...
            </div>
          )}
        </CardContent>
        <div className="flex p-2 border-t gap-2 text-gray-800">
          <ButtonClear onClick={() => setIsDialogOpen(true)} disabled={isLoading}>
            <p>Clear</p>
          </ButtonClear>
          <Input
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={isLoading}>
            {isLoading ? 'Đang gửi...' : 'Gửi'}
          </Button>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <p>Bạn có chắc muốn xóa tất cả tin nhắn không?</p>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Hủy</Button>
            <Button onClick={clearMessages} className="bg-red-500 text-white">Xóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
