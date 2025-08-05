import React, { useState } from "react";

const services = [
  { status: "مقبولة" },
  { status: "مرفوضة" },
  { status: "معلقة" },
  { status: "مقبولة" },
  { status: "مرفوضة" },
  { status: "معلقة" },
];

export default function AdminServices() {
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("الكل");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const clearSearch = () => setSearchTerm("");
  const filteredOrders = services.filter(() => true);

  return (
    <div
      style={{ fontFamily: "Almarai, sans-serif" }}
      className="relative p-4 bg-gray-50 min-h-screen"
    >
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1
          className="text-2xl font-bold text-right"
          style={{ color: "#1F1F1F" }}
        >
          الخدمات
        </h1>
      </div>

      {/* Tabs + Search + Filter in one row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Tabs */}
        <div className="flex gap-2 order-2 sm:order-1">
          {["الكل", "الجديدة", "مقبولة", "المعلقة", "مرفوضة"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-lg font-medium border transition ${
                activeTab === tab
                  ? "bg-[#004AAD] text-white"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Search and Filter */}
        <div className="flex items-center gap-3 order-1 sm:order-2">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث في العملاء، الخدمات، الفنيين، أو العناوين..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
            />
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            <i className="fas fa-filter"></i>
            فلتر
          </button>
        </div>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            <i className="fas fa-info-circle ml-2"></i>
            تم العثور على {filteredOrders.length} نتيجة للبحث عن "{searchTerm}"
            {filteredOrders.length === 0 && (
              <span className="block mt-1 text-blue-600">
                جرب البحث بكلمات مختلفة أو تحقق من الإملاء
              </span>
            )}
          </p>
        </div>
      )}

      {/* Services Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src="./images/avatar.jpg"
                alt="service"
                className="w-full h-40 object-cover"
              />
              <span
                className={`absolute top-2 left-2 px-3 py-1 text-sm rounded-full ${
                  service.status === "مقبولة"
                    ? "bg-[#fffdfa] text-green-700"
                    : service.status === "مرفوضة"
                    ? "bg-[#fffdfa] text-red-700"
                    : "bg-[#fffdfa] text-yellow-700"
                }`}
              >
                {service.status}
              </span>
            </div>
            <div className="p-4 text-right">
              <h3 className="font-bold mb-2" style={{ color: "#004AAD" }}>
                اسم خدمة: صيانة حنفية
              </h3>
              <p className="font-semibold mb-1" style={{ color: "#004AAD" }}>
                التكلفة: من 500 إلى 600 جنيه
              </p>
              <p className="text-gray-500 text-sm mb-4">
                صيانة الحنفية الداخلية وسرعة إصلاح التسربات، تغيير القطع التالفة
                وضمان انسياب تدفق الماء.
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className="w-full border py-2 rounded-full cursor-pointer transition text-sm bg-white text-[#004AAD] border-[#004AAD] hover:bg-[#004AAD] hover:text-white"
              >
                عرض تفاصيل الطلب
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="flex gap-1">
          {[1, 2, 3, "...", 10].map((num, i) => (
            <button
              key={i}
              className={`px-2 py-1 rounded-md ${
                num === 1 ? "bg-[#004AAD] text-white" : "bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        <p>Showing 1 to 8 of 50 entries</p>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 text-right relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 left-3 text-gray-500 cursor-pointer hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#004AAD" }}>
              تفاصيل الطلب
            </h2>
            <img
              src="./images/avatar.jpg"
              alt="service"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <p className="text-gray-700 mb-2 font-semibold">
              اسم خدمة: صيانة حنفية
            </p>
            <p className="text-gray-700 mb-2 font-semibold">
              التكلفة: من 500 إلى 600 جنيه
            </p>
            <p className="text-gray-500 text-sm mb-6">
              صيانة الحنفية الداخلية وسرعة إصلاح التسربات، تغيير القطع التالفة
              وضمان انسياب تدفق الماء.
            </p>
            <div className="flex gap-4">
              <button className="flex-1 py-2 rounded-full bg-[#004AAD] text-white hover:opacity-90">
                تأكيد الطلب
              </button>
              <button className="flex-1 py-2 rounded-full text-[#1F1F1F] cursor-pointer bg-white ">
                رفض الطلب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
