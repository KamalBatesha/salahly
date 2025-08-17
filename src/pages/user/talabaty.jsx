import React, { useState } from "react";
import TalabatyDetailsModal from "../../components/TalabatyDetailsModal";
import Messagesuser from "./messages_user"; // Make sure path is correct
import FavoritesList from "./FavoritesList";
import SettingsPanel from "./SettingsPanel";
import {
  Search,
  Settings,
  Heart,
  MessageSquare,
  FolderCheck,
  Hammer,
} from "lucide-react";
import cardImg from "../../assets/card.png";
import hammer from "../../assets/hammer.png";
import filterIcon from "../../assets/filter-square.png";
import service1Img from "../../assets/service1.png";

const TalabatyScreen = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("talabaty");
  const [showBalancePopup, setShowBalancePopup] = useState(false);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState("card1");
  const [modalType, setModalType] = useState("withdraw");

  const itemsPerPage = 9;

  const services = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    name: `اسم خدمة ${i + 1}`,
    price: "ر.س(500-600)",
    status: i % 3 === 0 ? "قيد التنفيذ" : i % 3 === 1 ? "مكتملة" : "ملغي",
    image: service1Img,
    technicianName: "أحمد فني",
    clientName: `عميل رقم ${i + 1}`,
    location: "الرياض",
    phone: "0501234567",
    email: "client@example.com",
    description: "تفاصيل حول المشكلة التي حدثت أثناء تقديم الخدمة.",
    serviceName: `خدمة إصلاح وصيانة ${i + 1}`,
    date: "2025-01-15",
    time: "15:30",
  }));

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3 ml-6">
          <img
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover shadow"
          />
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-800">احمد علي</p>
            <p className="text-sm text-gray-500">محطة الظهران للكهرباء</p>
          </div>
        </div>

        <div className="w-full max-w-lg space-y-4">
          <div className="bg-[var(--color-main-200)] p-6 rounded-2xl shadow-lg border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <div className="text-right w-full">
                <p className="text-sm text-gray-600 mb-2">رصيد الآن</p>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <img
                        src={cardImg}
                        alt="Card"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-3xl font-bold text-blue-800">
                      20000
                    </span>
                    <span className="text-blue-600 font-medium">ج.م</span>
                  </div>
                  <img
                    src={hammer}
                    alt="Hammer"
                    className="w-10 h-10 object-contain ml-5"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setModalType("add");
                setShowAddCardForm(false);
                setShowBalancePopup(true);
              }}
              className="w-1/2 bg-white border-2 border-blue-300 text-blue-600 px-6 py-3 rounded-2xl text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm"
            >
              + إضافة رصيد
            </button>
            <button
              onClick={() => {
                setModalType("withdraw");
                setShowAddCardForm(false);
                setShowBalancePopup(true);
              }}
              className="w-1/2 bg-white border-2 border-blue-300 text-blue-600 px-6 py-3 rounded-2xl text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm"
            >
              - سحب رصيد
            </button>
          </div>
        </div>
      </div>
      {showBalancePopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/10 backdrop-blur-sm">
          <div className="bg-white w-[95%] sm:w-[420px] rounded-xl overflow-hidden shadow-lg border border-gray-200 text-right relative font-almarai">
            {/* الهيدر */}
            <div className="bg-gradient-to-b from-[#F4F7FB] to-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-reverse space-x-2">
                <button
                  onClick={() =>
                    showAddCardForm
                      ? setShowAddCardForm(false)
                      : setShowBalancePopup(false)
                  }
                  className="text-[#004AAD] hover:text-blue-800 cursor-pointer pl-2"
                >
                  <img
                    src="/images/icons/back-arrow.png"
                    alt="رجوع"
                    className="w-5 h-5"
                  />
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {showAddCardForm
                    ? "اضافة بطاقة"
                    : modalType === "withdraw"
                    ? "سحب رصيد"
                    : "إضافة رصيد"}
                </h2>
              </div>

              <button
                onClick={() => {
                  setShowAddCardForm(false);
                  setShowBalancePopup(false);
                }}
                className="text-gray-500 hover:text-gray-800 text-lg"
              >
                ✕
              </button>
            </div>

            {/* المحتوى */}
            <div className="p-6 space-y-5">
              {!showAddCardForm && (
                <>
                  <div>
                    <label className="block mb-2 text-sm text-gray-700">
                      ادخل المبلغ المراد{" "}
                      {modalType === "withdraw" ? "سحبه" : "إضافته"}
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: 500"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-700">
                      اختر البطاقة
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-reverse space-x-2">
                          <img
                            src="/images/icons/wallet.png"
                            alt="بطاقة"
                            className="w-4 h-4 ml-1"
                          />
                          <span className="text-sm text-gray-700">
                            **** 44 855
                          </span>
                        </div>
                        <input
                          type="radio"
                          name="card"
                          checked={selectedCard === "card1"}
                          onChange={() => setSelectedCard("card1")}
                          className="accent-blue-600"
                        />
                      </label>

                      <label className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-reverse space-x-2">
                          <img
                            src="/images/icons/wallet.png"
                            alt="بطاقة"
                            className="w-4 h-4 ml-1"
                          />
                          <span className="text-sm text-gray-700">
                            **** 98 122
                          </span>
                        </div>
                        <input
                          type="radio"
                          name="card"
                          checked={selectedCard === "card2"}
                          onChange={() => setSelectedCard("card2")}
                          className="accent-blue-600"
                        />
                      </label>
                    </div>

                    <p
                      onClick={() => setShowAddCardForm(true)}
                      className="mt-3 text-sm text-[#004AAD] flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <img
                        src="/images/icons/wallet.png"
                        alt="add card"
                        className="w-4 h-4"
                      />
                      اضافه بطاقة جديدة
                    </p>
                  </div>

                  <button className="w-full mt-3 bg-[#004AAD] text-white py-2 rounded-md text-sm hover:bg-[#003b95] transition">
                    تأكيد {modalType === "withdraw" ? "سحب" : "إضافة"}
                  </button>
                </>
              )}

              {showAddCardForm && (
                <div className="space-y-4 text-right animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-800">
                    ادخال بيانات بطاقة
                  </h3>

                  <div>
                    <label className="block mb-1 text-sm text-gray-700">
                      اسم صاحب بطاقة
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: احمد محمد"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm text-gray-700">
                      رقم بطاقة
                    </label>
                    <input
                      type="text"
                      placeholder="**** **** **** 1234"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block mb-1 text-sm text-gray-700">
                        تاريخ انتهاء
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
                      />
                    </div>

                    <div className="w-1/2">
                      <label className="block mb-1 text-sm text-gray-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                    <span>حفظ البطاقة لوقت لاحق</span>
                    <input
                      type="checkbox"
                      className="accent-[#004AAD] w-5 h-5"
                    />
                  </div>

                  <button className="w-full bg-[#004AAD] text-white py-2 rounded-md text-sm hover:bg-[#003b95] transition">
                    إضافة كارت جديد
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Tabs */}
      <div className="flex items-center gap-6 mb-4 border-b border-gray-200 pb-2 text-sm">
        <button
          onClick={() => setActiveTab("talabaty")}
          className={`flex items-center gap-1 transition-all ${
            activeTab === "talabaty"
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <FolderCheck className="w-4 h-4" /> طلباتي
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-1 transition-all ${
            activeTab === "messages"
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <MessageSquare className="w-4 h-4" /> رسائل
        </button>

        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex items-center gap-1 transition-all ${
            activeTab === "favorites"
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <Heart className="w-4 h-4" /> المفضله
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-1 transition-all ${
            activeTab === "settings"
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <Settings className="w-4 h-4" /> إعدادات
        </button>
      </div>

      {/* Search */}
      {activeTab === "talabaty" && (
        <div className="flex items-center gap-[5px] mb-6">
          <div className="flex items-center gap-1 bg-white p-3 rounded-xl shadow-sm w-full max-w-sm border border-gray-100">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="بحث"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <img src={filterIcon} alt="فلتر" className="w-6 h-6" />
        </div>
      )}

      {/* Content */}
      {activeTab === "talabaty" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedServices.map((service) => (
              <div
                key={service.id}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <span
                    className={`absolute top-3 right-3 text-white text-xs px-3 py-1 rounded-full font-medium ${
                      service.status === "مكتملة"
                        ? "bg-green-500"
                        : service.status === "قيد التنفيذ"
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm text-gray-800 font-semibold">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    التكلفة: {service.price}
                  </p>
                  <button
                    onClick={() => openModal(service)}
                    className="w-full mt-3 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                  >
                    عرض تفاصيل الطلب
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
            <div>
              عرض{" "}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredServices.length
              )}{" "}
              إلى{" "}
              {Math.min(currentPage * itemsPerPage, filteredServices.length)} من{" "}
              {filteredServices.length} إجمالي الطلبات
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-2 border rounded-lg hover:bg-gray-100 transition-colors ${
                    currentPage === i + 1
                      ? "bg-blue-100 border-blue-300 text-blue-700 font-semibold"
                      : "border-gray-300"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : activeTab === "messages" ? (
        <Messagesuser />
      ) : activeTab === "favorites" ? (
        <FavoritesList />
      ) : activeTab === "settings" ? (
        <SettingsPanel />
      ) : null}

      <TalabatyDetailsModal
        show={showModal}
        handleClose={closeModal}
        service={selectedService}
      />
    </div>
  );
};

export default TalabatyScreen;
