import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../components/AdminLayout,jsx/SideBar';
import { TopNav } from '../components/AdminLayout,jsx/TopNav';
import chatImg from '../assets/chat-img.png';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [messageText, setMessageText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "اسم العميل",
      message: "الهلا يباشا",
      date: "31/2/2025",
      isClient: true,
      avatar: chatImg
    },
    {
      id: 2,
      sender: "Technician Name",
      message: "الهلا يباشا",
      date: "31/2/2025",
      isClient: false,
      avatar: chatImg
    },
    {
      id: 3,
      sender: "Technician Name",
      message: "اتفاقيه جديده",
      date: "31/2/2025",
      isClient: false,
      avatar: chatImg,
      isAgreement: true
    }
  ]);

  const messages = [
    {
      id: 1,
      name: "اسم عميل",
      message: "The weather will be perf...",
      date: "31/2/2025",
      unreadCount: 16,
      avatar: chatImg
    },
    {
      id: 2,
      name: "عميل آخر",
      message: "مشكلة في السباكة...",
      date: "30/2/2025",
      unreadCount: 3,
      avatar: chatImg
    },
    {
      id: 3,
      name: "عميل ثالث",
      message: "أحتاج صيانة كهرباء...",
      date: "29/2/2025",
      unreadCount: 0,
      avatar: chatImg
    }
  ];

  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when chatMessages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: "Technician Name",
        message: messageText,
        date: new Date().toLocaleDateString('ar-EG'),
        isClient: false,
        avatar: chatImg
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessageText('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-0'}`}>
        {/* Header */}
        <TopNav 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
        />

        {/* Messages Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Messages List Panel */}
          <div className="w-1/4 border-l border-gray-200 bg-white">
            <div className="p-3 border-b border-gray-200">
              <h5 className="mb-3 font-bold text-gray-900">الرسايل</h5>
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث عن صنايعي"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-500 text-right"
                />
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
            <div className="overflow-auto h-[calc(100vh-200px)]">
              {messages.map((msg, index) => (
                <div 
                  key={msg.id}
                  className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat === index ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => setSelectedChat(index)}
                >
                  <div className="flex items-center">
                    <div className="text-center ml-3 w-15">
                      <div className="text-gray-500 text-xs">{msg.date}</div>
                      {msg.unreadCount > 0 && (
                        <span className="inline-block bg-main-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                          {msg.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">{msg.name}</div>
                      <div className="text-gray-500 text-sm">{msg.message}</div>
                    </div>
                    <img 
                      src={msg.avatar} 
                      alt="Avatar" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Conversation Panel */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-3 border-b border-gray-200 flex items-center">
              <img 
                src={messages[selectedChat]?.avatar} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full object-cover ml-3"
              />
              <div className="font-bold text-gray-900">{messages[selectedChat]?.name}</div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-auto p-3 bg-white">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex mb-3 ${msg.isClient ? 'justify-start' : 'justify-end'}`}>
                  {msg.isClient && (
                    <img 
                      src={msg.avatar} 
                      alt="Avatar" 
                      className="w-10 h-10 rounded-full object-cover ml-2"
                    />
                  )}
                  <div className={`p-3 rounded-lg max-w-[70%] ${msg.isClient ? 'bg-gray-100' : 'bg-main-500 text-white'}`}>
                    <div className="font-bold mb-1">{msg.sender}</div>
                    {msg.isAgreement ? (
                      <div className="bg-main-500 text-white rounded-lg p-3">
                        <div className="flex">
                          <div className="flex-1">
                            <div className="font-bold">5000 ج.م</div>
                            <div>اتفاقيه جديده</div>
                            <div className="text-sm">تصليح الحمام</div>
                            <button className="mt-2 px-3 py-1 border border-white text-white rounded text-sm hover:bg-white hover:text-main-500 transition-colors">
                              تفاصيل
                            </button>
                          </div>
                          <img 
                            src={chatImg} 
                            alt="Service" 
                            className="w-24 h-20 object-cover rounded"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>{msg.message}</div>
                    )}
                    <div className={`text-xs mt-1 ${msg.isClient ? 'text-gray-500' : 'text-white opacity-70'}`}>
                      {msg.date}
                    </div>
                  </div>
                  {!msg.isClient && (
                    <img 
                      src={msg.avatar} 
                      alt="Avatar" 
                      className="w-10 h-10 rounded-full object-cover mr-2"
                    />
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 bg-white min-h-[90px]">
              <div className="flex items-end w-full gap-3">
                {/* Left: Add Button and Text as a column */}
                <div className="flex flex-col items-center justify-end min-w-[60px]">
                  <button
                    className="w-9 h-9 rounded-full bg-main-500 text-white flex items-center justify-center hover:bg-main-600 transition-colors mb-1"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <span className="text-main-500 font-semibold text-sm">عرض جديد</span>
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  placeholder="اكتب رساله"
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-main-500 max-w-[300px]"
                />

                {/* Right: Send Icon */}
                <button
                  onClick={handleSendMessage}
                  className="w-9 h-9 p-0 bg-transparent border-none"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="rotate-180"
                  >
                    <path d="M3 20L21 12L3 4V10L17 12L3 14V20Z" fill="#A3B8D8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;