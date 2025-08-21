import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import chatImg from "../../assets/chat-Img.png";
import toast from "react-hot-toast";

const Messages_user = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [orderData, setOrderData] = useState({});
  const [openNewOrderDetails, setOpenNewOrderDetails] = useState(false);
  
  const chatEndRef = useRef(null);
  const socket = useRef(null);

  const myId = localStorage.getItem("userId");
  const token = localStorage.getItem("access_token");

  // 🔌 socket connection (مره واحده بس)
  useEffect(() => {
    if (!token) return;

    socket.current = io("http://localhost:3000", {
      auth: {
        authorization: `Bearer ${token}`,
      },
    });

    // لما استقبل رسالة من الطرف التاني
    socket.current.on("receiveMessage", ({ message }) => {
      console.log(chatMessages,message);
      
      setChatMessages((prev) => [...prev, message]);
    });

    // لما السيرفر يرجع رسالتي
    socket.current.on("messageSent", ({ message }) => {
      console.log(chatMessages,message);
      
      setChatMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [token]);
    async function handelNewOffer(method) {
    if (method == "add") {
      
      axios.get(`http://localhost:3000/provider/getSpecificOrder/${orderId}`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
        setOrderData(res.data);
        // setOpenNewOrder(true);
        setOpenNewOrderDetails(false);
        console.log(res.data);
        
      })
    }else if (method == "get") {
      axios.get(`http://localhost:3000/provider/getSpecificOrder/${orderId}`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
        setOrderData(res.data);
        // setOpenNewOrder(false);
        setOpenNewOrderDetails(true);
        console.log(res.data);
      })
    }
  }

    function handelStatus(status) {
    axios
      .post(`http://localhost:3000/user/confirmOrderOrCancel/${orderId}`, { status: status?"confirmed":"canceled" }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        status?
        toast.success("تم تاكيد الطلب"):
        toast.success("تم الغاء الطلب");
        // setOpenNewOrder(false);
        setOpenNewOrderDetails(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        if(err.response.data.message=="jwt expired"){
          refreshToken();
        } else {
          console.log(err);
          
          toast.error("حدث خطاء");
          // setOpenNewOrder(false);
        setOpenNewOrderDetails(false);
        }
      })
  }

  // 📥 get my chats
  useEffect(() => {
    if (!token) return;

    const fetchChats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/chat", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
        console.log(res.data);
        
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, [token]);

  // 📥 get chat by id
  const fetchChatById = async (chatId) => {
    try {
      const res = await axios.get(`http://localhost:3000/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatMessages(res.data.messages || []);
      setOrderId(res.data.orderId);
      console.log(res.data.orderId);
      
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  // 📨 send message
  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat !== null) {
      const chat = messages[selectedChat];
      const destinationId =
        chat.userId._id.toString() === myId.toString() ? chat.providerId._id : chat.userId._id;

      // ✅ ابعت للسيرفر
      socket.current.emit("sendMessage", {
        destinationId,
        message: messageText,
      });


      setMessageText("");
    }
  };

  // 🔽 auto scroll
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div className="flex h-[calc(100vh-140px)]" dir="rtl">
      {/* Messages List Panel */}
      <div className="w-1/4 border-l border-gray-200 bg-white rounded-lg mr-2">
        <div className="p-3 border-b border-gray-200">
          <h5 className="mb-3 font-bold text-gray-900">الرسايل</h5>
        </div>
        <div className="overflow-auto h-[calc(100vh-280px)]">
          {messages.map((chat, index) => (
            <div
              key={chat._id}
              className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat === index ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                setSelectedChat(index);
                fetchChatById(chat._id);
              }}
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="font-bold text-gray-900">
                    {chat.userId._id === myId
                      ? chat.providerId.name
                      : chat.userId.name}
                  </div>
                </div>
                <img
                  src={chat.providerId?.profilePic?.secure_url || chatImg}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Conversation Panel */}
      <div className="flex-1 flex flex-col bg-white rounded-lg">
        {selectedChat !== null ? (
          <>
            {/* Chat Header */}
            <div className="p-3 border-b border-gray-200 flex items-center">
              <img
                src={
                  messages[selectedChat]?.providerId?.profilePic?.secure_url ||
                  chatImg
                }
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover ml-3"
              />
              <div className="font-bold text-gray-900">
                {messages[selectedChat].userId._id === myId
                  ? messages[selectedChat].providerId.name
                  : messages[selectedChat].userId.name}
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-auto p-3 bg-white">
              {chatMessages.map((msg, i) => {
                if (msg.content !== "newOrderDatails") {
                  
                  return (
                    <div
                    key={i}
                  className={`flex mb-3 ${msg.senderId?.toString() === myId?.toString()
                    ? "justify-end"
                      : "justify-start"
                    }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[70%] ${msg.senderId?.toString() === myId?.toString()
                      ? "bg-main-500 text-white"
                        : "bg-gray-100"
                      }`}
                  >
                      <div>{msg.content}</div>
                    <div
                      className={`text-xs mt-1 ${msg.senderId?.toString() === myId?.toString()
                        ? "text-white opacity-70"
                        : "text-gray-500"
                        }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString("ar-EG")}
                    </div>
                  </div>
                </div>
                  )
                } else {
                  return (
                    <div
                    key={i}
                  className={`flex mb-3 ${msg.senderId?.toString() === myId?.toString()
                    ? "justify-end"
                      : "justify-start"
                    }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[70%] ${msg.senderId?.toString() === myId?.toString()
                      ? "bg-main-500 text-white"
                        : "bg-gray-100"
                      }`}
                  >
                      <div>تفاصيل اتفاقيه جديده <button onClick={() => handelNewOffer("get")} className="px-3 py-1 border border-main-500 text-main-500 rounded text-sm hover:bg-white hover:text-black transition-colors">تفاصيل</button></div>
                    <div
                      className={`text-xs mt-1 ${msg.senderId?.toString() === myId?.toString()
                        ? "text-white opacity-70"
                        : "text-gray-500"
                        }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString("ar-EG")}
                    </div>
                  </div>
                </div>
                  )
                  
                }
                })}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 bg-white min-h-[90px]">
              <div className="flex items-end w-full gap-3">
                <input
                  type="text"
                  placeholder="اكتب رساله"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-main-500"
                />
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
                    <path
                      d="M3 20L21 12L3 4V10L17 12L3 14V20Z"
                      fill="#A3B8D8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            اختر محادثة لعرضها
          </div>
        )}
      </div>
      {openNewOrderDetails && (

       <div className="absolute h-screen w-screen  bg-black/10 top-0 right-0">
          
        <div className={`absolute w-1/2 min-h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-4`}>
          <div className="flex">
            <button onClick={() => setOpenNewOrderDetails(false)} className="bg-main-500 cursor-pointer  text-white p-2 rounded-full flex items-center justify-center aspect-square">{"<"}</button>
              <h1 className="font-bold text-gray-900 text-2xl mr-4">تفاصيل اتفاقيه جديده</h1>
              </div>

            <p className="text-gray-900 mb-3">{orderData?.serviceId?.title}</p>
          <img src={orderData?.serviceId?.mainImage?.secure_url} alt="service image" className="w-full rounded-md object-cover object-center h-40" />
          <div className="mt-4">
            <p>السعر النهائي : {orderData?.price}</p>
            <p>تفاصيل المشكله</p>
            <p className="p-2">{orderData?.description}</p>
            <p>معاد الخدمة : {new Date(orderData?.deliveryDate).toLocaleDateString()}</p>
            
            </div>
            
            <div className="flex gap-5 mt-5">
              <button onClick={() => handelStatus(true)} className="bg-main-500 cursor-pointer  text-white p-2 flex-1 rounded-md">تاكيد</button>
              <button onClick={() => handelStatus(false)} className="bg-red-500 cursor-pointer  text-white p-2 flex-1 rounded-md">الغاء</button>
            </div>
        
          </div>
      </div>
      )
      }
      
    </div>
  );
};

export default Messages_user;






// import React, { useState, useRef, useEffect } from 'react';
// import chatImg from '../assets/chat-img.png';

// const Messages = () => {
//   const [selectedChat, setSelectedChat] = useState(0);
//   const [messageText, setMessageText] = useState('');
//   const [chatMessages, setChatMessages] = useState([
//     {
//       id: 1,
//       sender: "اسم العميل",
//       message: "الهلا يباشا",
//       date: "31/2/2025",
//       isClient: true,
//       avatar: chatImg
//     },
//     {
//       id: 2,
//       sender: "Technician Name",
//       message: "الهلا يباشا",
//       date: "31/2/2025",
//       isClient: false,
//       avatar: chatImg
//     },
//     {
//       id: 3,
//       sender: "Technician Name",
//       message: "اتفاقيه جديده",
//       date: "31/2/2025",
//       isClient: false,
//       avatar: chatImg,
//       isAgreement: true
//     }
//   ]);

//   const messages = [
//     {
//       id: 1,
//       name: "اسم عميل",
//       message: "The weather will be perf...",
//       date: "31/2/2025",
//       unreadCount: 16,
//       avatar: chatImg
//     },
//     {
//       id: 2,
//       name: "عميل آخر",
//       message: "مشكلة في السباكة...",
//       date: "30/2/2025",
//       unreadCount: 3,
//       avatar: chatImg
//     },
//     {
//       id: 3,
//       name: "عميل ثالث",
//       message: "أحتاج صيانة كهرباء...",
//       date: "29/2/2025",
//       unreadCount: 0,
//       avatar: chatImg
//     }
//   ];

//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     // Scroll to bottom when chatMessages change
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [chatMessages]);

//   const handleSendMessage = () => {
//     if (messageText.trim()) {
//       const newMessage = {
//         id: Date.now(),
//         sender: "Technician Name",
//         message: messageText,
//         date: new Date().toLocaleDateString('ar-EG'),
//         isClient: false,
//         avatar: chatImg
//       };
//       setChatMessages([...chatMessages, newMessage]);
//       setMessageText('');
//     }
//   };

//   return (
//     <div className="flex h-[calc(100vh-140px)]" dir="rtl">
//       {/* Messages List Panel */}
//       <div className="w-1/4 border-l border-gray-200 bg-white rounded-lg mr-2">
//         <div className="p-3 border-b border-gray-200">
//           <h5 className="mb-3 font-bold text-gray-900">الرسايل</h5>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="بحث عن صنايعي"
//               className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-500 text-right"
//             />
//             <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
//           </div>
//         </div>
//         <div className="overflow-auto h-[calc(100vh-280px)]">
//           {messages.map((msg, index) => (
//             <div
//               key={msg.id}
//               className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
//                 selectedChat === index ? 'bg-gray-100' : ''
//               }`}
//               onClick={() => setSelectedChat(index)}
//             >
//               <div className="flex items-center">
//                 <div className="text-center ml-3 w-15">
//                   <div className="text-gray-500 text-xs">{msg.date}</div>
//                   {msg.unreadCount > 0 && (
//                     <span className="inline-block bg-main-500 text-white text-xs px-2 py-1 rounded-full mt-1">
//                       {msg.unreadCount}
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <div className="font-bold text-gray-900">{msg.name}</div>
//                   <div className="text-gray-500 text-sm">{msg.message}</div>
//                 </div>
//                 <img
//                   src={msg.avatar}
//                   alt="Avatar"
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Conversation Panel */}
//       <div className="flex-1 flex flex-col bg-white rounded-lg">
//         {/* Chat Header */}
//         <div className="p-3 border-b border-gray-200 flex items-center">
//           <img
//             src={messages[selectedChat]?.avatar}
//             alt="Avatar"
//             className="w-10 h-10 rounded-full object-cover ml-3"
//           />
//           <div className="font-bold text-gray-900">{messages[selectedChat]?.name}</div>
//         </div>

//         {/* Messages Area */}
//         <div className="flex-1 overflow-auto p-3 bg-white">
//           {chatMessages.map((msg) => (
//             <div key={msg.id} className={`flex mb-3 ${msg.isClient ? 'justify-start' : 'justify-end'}`}>
//               {msg.isClient && (
//                 <img
//                   src={msg.avatar}
//                   alt="Avatar"
//                   className="w-10 h-10 rounded-full object-cover ml-2"
//                 />
//               )}
//               <div className={`p-3 rounded-lg max-w-[70%] ${msg.isClient ? 'bg-gray-100' : 'bg-main-500 text-white'}`}>
//                 <div className="font-bold mb-1">{msg.sender}</div>
//                 {msg.isAgreement ? (
//                   <div className="bg-main-500 text-white rounded-lg p-3">
//                     <div className="flex">
//                       <div className="flex-1">
//                         <div className="font-bold">3000 ج.م</div>
//                         <div>اتفاقيه جديده</div>
//                         <div className="text-sm">تصليح الحمام</div>
//                         <button className="mt-2 px-3 py-1 border border-white text-white rounded text-sm hover:bg-white hover:text-main-500 transition-colors">
//                           تفاصيل
//                         </button>
//                       </div>
//                       <img
//                         src={chatImg}
//                         alt="Service"
//                         className="w-24 h-20 object-cover rounded"
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <div>{msg.message}</div>
//                 )}
//                 <div className={`text-xs mt-1 ${msg.isClient ? 'text-gray-500' : 'text-white opacity-70'}`}>
//                   {msg.date}
//                 </div>
//               </div>
//               {!msg.isClient && (
//                 <img
//                   src={msg.avatar}
//                   alt="Avatar"
//                   className="w-10 h-10 rounded-full object-cover mr-2"
//                 />
//               )}
//             </div>
//           ))}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Input Area */}
//         <div className="p-3 border-t border-gray-200 bg-white min-h-[90px]">
//           <div className="flex items-end w-full gap-3">
//             {/* Left: Add Button and Text as a column */}
//             <div className="flex flex-col items-center justify-end min-w-[60px]">
//               <button
//                 className="w-9 h-9 rounded-full bg-main-500 text-white flex items-center justify-center hover:bg-main-600 transition-colors mb-1"
//               >
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                   <path d="M12 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
//                   <path d="M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
//                 </svg>
//               </button>
//               <span className="text-main-500 font-semibold text-sm">عرض جديد</span>
//             </div>

//             {/* Input Field */}
//             <input
//               type="text"
//               placeholder="اكتب رساله"
//               value={messageText}
//               onChange={e => setMessageText(e.target.value)}
//               onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-main-500 max-w-[300px]"
//             />

//             {/* Right: Send Icon */}
//             <button
//               onClick={handleSendMessage}
//               className="w-9 h-9 p-0 bg-transparent border-none"
//             >
//               <svg
//                 width="28"
//                 height="28"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 className="rotate-180"
//               >
//                 <path d="M3 20L21 12L3 4V10L17 12L3 14V20Z" fill="#A3B8D8" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;


















// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import chatImg from "../../assets/chat-Img.png";

// const Messagesuser = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messageText, setMessageText] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const chatEndRef = useRef(null);
//   const socket = useRef(null);

//   const myId = localStorage.getItem("userId");
//   const token = localStorage.getItem("access_token");

//   // 🔌 connect to socket
//   useEffect(() => {
//     if (!token) return;

//     socket.current = io("http://localhost:3000", {
//       auth: {
//         authorization: `Bearer ${token}`,
//       },
//     });

//     // استقبال رسالة من الطرف التاني
//     socket.current.on("receiveMessage", ({ message }) => {
//       setChatMessages((prev) => [...prev, message]);
//     });

//     // استقبل تأكيد إن رسالتي اترفعت
//     socket.current.on("messageSent", ({ message }) => {
//       setChatMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       socket.current.disconnect();
//     };
//   }, [token]);

//   // 📥 get my chats
//   useEffect(() => {
//     if (!token) return;

//     const fetchChats = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/chat", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMessages(res.data);
//       } catch (error) {
//         console.error("Error fetching chats:", error);
//       }
//     };
//     fetchChats();
//   }, [token]);

//   // 📥 get chat by id
//   const fetchChatById = async (chatId) => {
//     try {
//       const res = await axios.get(`http://localhost:3000/chat/${chatId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setChatMessages(res.data.messages || []);
//     } catch (error) {
//       console.error("Error fetching chat:", error);
//     }
//   };

//   // 📨 send message
//   const handleSendMessage = () => {
//     if (messageText.trim() && selectedChat !== null) {
//       const chat = messages[selectedChat];
//       const destinationId =
//         chat.userId._id === myId ? chat.providerId._id : chat.userId._id;

//       socket.current.emit("sendMessage", {
//         destinationId,
//         message: messageText,
//       });

//       setMessageText("");
//     }
//   };

//   // 🔽 auto scroll
//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chatMessages]);

//   return (
//     <div className="flex h-[calc(100vh-140px)]" dir="rtl">
//       {/* Messages List Panel */}
//       <div className="w-1/4 border-l border-gray-200 bg-white rounded-lg mr-2">
//         <div className="p-3 border-b border-gray-200">
//           <h5 className="mb-3 font-bold text-gray-900">الرسايل</h5>
//         </div>
//         <div className="overflow-auto h-[calc(100vh-280px)]">
//           {messages.map((chat, index) => (
//             <div
//               key={chat._id}
//               className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
//                 selectedChat === index ? "bg-gray-100" : ""
//               }`}
//               onClick={() => {
//                 setSelectedChat(index);
//                 fetchChatById(chat._id);
//               }}
//             >
//               <div className="flex items-center">
//                 <div className="flex-1">
//                   <div className="font-bold text-gray-900">
//                     {chat.userId._id === myId
//                       ? chat.providerId.name
//                       : chat.userId.name}
//                   </div>
//                 </div>
//                 <img
//                   src={chat.providerId?.profilePic?.secure_url || chatImg}
//                   alt="Avatar"
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Conversation Panel */}
//       <div className="flex-1 flex flex-col bg-white rounded-lg">
//         {selectedChat !== null ? (
//           <>
//             {/* Chat Header */}
//             <div className="p-3 border-b border-gray-200 flex items-center">
//               <img
//                 src={
//                   messages[selectedChat]?.providerId?.profilePic?.secure_url ||
//                   chatImg
//                 }
//                 alt="Avatar"
//                 className="w-10 h-10 rounded-full object-cover ml-3"
//               />
//               <div className="font-bold text-gray-900">
//                 {messages[selectedChat].userId._id === myId
//                   ? messages[selectedChat].providerId.name
//                   : messages[selectedChat].userId.name}
//               </div>
//             </div>

//             {/* Messages Area */}
//             <div className="flex-1 overflow-auto p-3 bg-white">
//               {chatMessages.map((msg, i) => (
//                 <div
//                   key={i}
//                   className={`flex mb-3 ${
//                     msg.senderId === myId ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`p-3 rounded-lg max-w-[70%] ${
//                       msg.senderId === myId
//                         ? "bg-main-500 text-white"
//                         : "bg-gray-100"
//                     }`}
//                   >
//                     <div>{msg.content}</div>
//                     <div
//                       className={`text-xs mt-1 ${
//                         msg.senderId === myId
//                           ? "text-white opacity-70"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       {new Date(msg.createdAt).toLocaleTimeString("ar-EG")}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <div ref={chatEndRef} />
//             </div>

//             {/* Input Area */}
//             <div className="p-3 border-t border-gray-200 bg-white min-h-[90px]">
//               <div className="flex items-end w-full gap-3">
//                 <input
//                   type="text"
//                   placeholder="اكتب رساله"
//                   value={messageText}
//                   onChange={(e) => setMessageText(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-main-500"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="w-9 h-9 p-0 bg-transparent border-none"
//                 >
//                   <svg
//                     width="28"
//                     height="28"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     className="rotate-180"
//                   >
//                     <path
//                       d="M3 20L21 12L3 4V10L17 12L3 14V20Z"
//                       fill="#A3B8D8"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-400">
//             اختر محادثة لعرضها
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Messagesuser;


















// import React, { useState, useRef, useEffect } from 'react';
// import chatImg from '../../assets/chat-Img.png';

// const Messagesuser = () => {
//   const [selectedChat, setSelectedChat] = useState(0);
//   const [messageText, setMessageText] = useState('');
//   const [chatMessages, setChatMessages] = useState([
//     {
//       id: 1,
//       sender: "اسم العميل",
//       message: "الهلا يباشا",
//       date: "31/2/2025",
//       isClient: true,
//       avatar: chatImg
//     },
//     {
//       id: 2,
//       sender: "Technician Name",
//       message: "الهلا يباشا",
//       date: "31/2/2025",
//       isClient: false,
//       avatar: chatImg
//     },
//     {
//       id: 3,
//       sender: "Technician Name",
//       message: "اتفاقيه جديده",
//       date: "31/2/2025",
//       isClient: false,
//       avatar: chatImg,
//       isAgreement: true
//     }
//   ]);

//   const messages = [
//     {
//       id: 1,
//       name: "اسم عميل",
//       message: "The weather will be perf...",
//       date: "31/2/2025",
//       unreadCount: 16,
//       avatar: chatImg
//     },
//     {
//       id: 2,
//       name: "عميل آخر",
//       message: "مشكلة في السباكة...",
//       date: "30/2/2025",
//       unreadCount: 3,
//       avatar: chatImg
//     },
//     {
//       id: 3,
//       name: "عميل ثالث",
//       message: "أحتاج صيانة كهرباء...",
//       date: "29/2/2025",
//       unreadCount: 0,
//       avatar: chatImg
//     }
//   ];

//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     // Scroll to bottom when chatMessages change
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [chatMessages]);

//   const handleSendMessage = () => {
//     if (messageText.trim()) {
//       const newMessage = {
//         id: Date.now(),
//         sender: "Technician Name",
//         message: messageText,
//         date: new Date().toLocaleDateString('ar-EG'),
//         isClient: false,
//         avatar: chatImg
//       };
//       setChatMessages([...chatMessages, newMessage]);
//       setMessageText('');
//     }
//   };

//   return (
//     <div className="flex h-[calc(100vh-140px)]" dir="rtl">
//       {/* Messages List Panel */}
//       <div className="w-1/4 border-l border-gray-200 bg-white rounded-lg mr-2">
//         <div className="p-3 border-b border-gray-200">
//           <h5 className="mb-3 font-bold text-gray-900">الرسايل</h5>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="بحث عن صنايعي"
//               className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-500 text-right"
//             />
//             <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
//           </div>
//         </div>
//         <div className="overflow-auto h-[calc(100vh-280px)]">
//           {messages.map((msg, index) => (
//             <div 
//               key={msg.id}
//               className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
//                 selectedChat === index ? 'bg-gray-100' : ''
//               }`}
//               onClick={() => setSelectedChat(index)}
//             >
//               <div className="flex items-center">
//                 <div className="text-center ml-3 w-15">
//                   <div className="text-gray-500 text-xs">{msg.date}</div>
//                   {msg.unreadCount > 0 && (
//                     <span className="inline-block bg-main-500 text-white text-xs px-2 py-1 rounded-full mt-1">
//                       {msg.unreadCount}
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <div className="font-bold text-gray-900">{msg.name}</div>
//                   <div className="text-gray-500 text-sm">{msg.message}</div>
//                 </div>
//                 <img 
//                   src={msg.avatar} 
//                   alt="Avatar" 
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Conversation Panel */}
//       <div className="flex-1 flex flex-col bg-white rounded-lg">
//         {/* Chat Header */}
//         <div className="p-3 border-b border-gray-200 flex items-center">
//           <img 
//             src={messages[selectedChat]?.avatar} 
//             alt="Avatar" 
//             className="w-10 h-10 rounded-full object-cover ml-3"
//           />
//           <div className="font-bold text-gray-900">{messages[selectedChat]?.name}</div>
//         </div>

//         {/* Messages Area */}
//         <div className="flex-1 overflow-auto p-3 bg-white">
//           {chatMessages.map((msg) => (
//             <div key={msg.id} className={`flex mb-3 ${msg.isClient ? 'justify-start' : 'justify-end'}`}>
//               {msg.isClient && (
//                 <img 
//                   src={msg.avatar} 
//                   alt="Avatar" 
//                   className="w-10 h-10 rounded-full object-cover ml-2"
//                 />
//               )}
//               <div className={`p-3 rounded-lg max-w-[70%] ${msg.isClient ? 'bg-gray-100' : 'bg-main-500 text-white'}`}>
//                 <div className="font-bold mb-1">{msg.sender}</div>
//                 {msg.isAgreement ? (
//                   <div className="bg-main-500 text-white rounded-lg p-3">
//                     <div className="flex">
//                       <div className="flex-1">
//                         <div className="font-bold">5000 ج.م</div>
//                         <div>اتفاقيه جديده</div>
//                         <div className="text-sm">تصليح الحمام</div>
//                         <button className="mt-2 px-3 py-1 border border-white text-white rounded text-sm hover:bg-white hover:text-main-500 transition-colors">
//                           تفاصيل
//                         </button>
//                       </div>
//                       <img 
//                         src={chatImg} 
//                         alt="Service" 
//                         className="w-24 h-20 object-cover rounded"
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <div>{msg.message}</div>
//                 )}
//                 <div className={`text-xs mt-1 ${msg.isClient ? 'text-gray-500' : 'text-white opacity-70'}`}>
//                   {msg.date}
//                 </div>
//               </div>
//               {!msg.isClient && (
//                 <img 
//                   src={msg.avatar} 
//                   alt="Avatar" 
//                   className="w-10 h-10 rounded-full object-cover mr-2"
//                 />
//               )}
//             </div>
//           ))}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Input Area */}
//         <div className="p-3 border-t border-gray-200 bg-white min-h-[90px]">
//           <div className="flex items-end w-full gap-3">
//             {/* Left: Add Button and Text as a column */}
//             <div className="flex flex-col items-center justify-end min-w-[60px]">
//               <button
//                 className="w-9 h-9 rounded-full bg-main-500 text-white flex items-center justify-center hover:bg-main-600 transition-colors mb-1"
//               >
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                   <path d="M12 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
//                   <path d="M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
//                 </svg>
//               </button>
//               <span className="text-main-500 font-semibold text-sm">عرض جديد</span>
//             </div>

//             {/* Input Field */}
//             <input
//               type="text"
//               placeholder="اكتب رساله"
//               value={messageText}
//               onChange={e => setMessageText(e.target.value)}
//               onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-main-500 max-w-[300px]"
//             />

//             {/* Right: Send Icon */}
//             <button
//               onClick={handleSendMessage}
//               className="w-9 h-9 p-0 bg-transparent border-none"
//             >
//               <svg
//                 width="28"
//                 height="28"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 className="rotate-180"
//               >
//                 <path d="M3 20L21 12L3 4V10L17 12L3 14V20Z" fill="#A3B8D8" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messagesuser;