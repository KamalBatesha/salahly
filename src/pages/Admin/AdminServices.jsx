import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

export default function AdminServices() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("الكل");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(UserContext);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:3000/admin/getUnconfirmedServices",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `admin ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("لا يوجد طلبات جديده لقبولها");

      const data = await res.json();
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const clearSearch = () => setSearchTerm("");

  const filteredOrders = services.filter((service) => {
    const matchesSearch =
      service.title?.includes(searchTerm) ||
      service.description?.includes(searchTerm);

    const matchesTab =
      activeTab === "الكل"
        ? true
        : activeTab === "مقبولة"
        ? service.isConfirmed === true
        : activeTab === "مرفوضة"
        ? service.isConfirmed === false
        : activeTab === "الجديدة"
        ? service.isConfirmed === null || service.isConfirmed === undefined
        : activeTab === "المعلقة"
        ? service.isConfirmed === null || service.isConfirmed === undefined
        : true;

    return matchesSearch && matchesTab;
  });

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredOrders.slice(
    indexOfFirstService,
    indexOfLastService
  );
  const totalPages = Math.ceil(filteredOrders.length / servicesPerPage);

  // دوال القبول والرفض
  const handleConfirm = async (serviceId) => {
    try {
      await axios.post(
        `http://localhost:3000/admin/confirmService/${serviceId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: `admin ${token}`,
          },
        }
      );
      setServices((prev) =>
        prev.map((srv) =>
          srv._id === serviceId ? { ...srv, isConfirmed: true } : srv
        )
      );
      toast.success("تم تأكيد الطلب");
      setShowPopup(false);
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء تأكيد الطلب");
    }
  };

  // const handleReject = async (serviceId) => {
  //   try {
  //     await axios.post(
  //       `http://localhost:3000/admin/rejectService/${serviceId}`,
  //       {},
  //       {
  //         headers: {
  //           "Content-Type": "application/json",

  //           Authorization: `admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTllYjg3ZDhlMjFhNzMxNWIyM2FjNSIsImVtYWlsIjoiYmF0ZXNoYWthbWFsMkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTUwMjIzMjgsImV4cCI6MTc1NTEwODcyOH0.QJBJHRteBgqnz0umX86qgdlkNo0aZJvPDEtJdYjMq_k`,
  //         },
  //       }
  //     );
  //     setServices((prev) =>
  //       prev.map((srv) =>
  //         srv._id === serviceId ? { ...srv, isConfirmed: false } : srv
  //       )
  //     );
  //     toast.success("تم رفض الطلب");
  //     setShowPopup(false);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("حدث خطأ أثناء رفض الطلب");
  //   }
  // };

  if (loading) return <p className="p-4">جارٍ تحميل البيانات...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div
      style={{ fontFamily: "Almarai, sans-serif" }}
      className="relative p-4 bg-gray-50 min-h-screen"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1
          className="text-2xl font-bold text-right"
          style={{ color: "#1F1F1F" }}
        >
          الخدمات
        </h1>
      </div>

      {/* Tabs + Search */}
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

        {/* Search */}
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
        </div>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentServices.map((service, index) => (
          <div
            key={service._id}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src={service.mainImage?.secure_url || "./images/avatar.jpg"}
                alt="service"
                className="w-full h-40 object-cover"
              />
              <span
                className={`absolute top-2 left-2 px-3 py-1 text-sm rounded-full ${
                  service.isConfirmed
                    ? "bg-[#fffdfa] text-green-700"
                    : "bg-[#fffdfa] text-yellow-700"
                }`}
              >
                {service.isConfirmed === true
                  ? "مقبولة"
                  : service.isConfirmed === false
                  ? "مرفوضة"
                  : "معلقة"}
              </span>
            </div>
            <div className="p-4 text-right">
              {/* <img
                src={service.mainImage?.secure_url || "./images/avatar.jpg"}
                alt="service"
                className="w-full h-40 object-cover rounded-md mb-4"
              /> */}
              <p className="text-gray-700 mb-2 font-semibold">
                اسم خدمة: {service.title}
              </p>
              <p className="text-gray-700 mb-2 font-semibold">
                التكلفة: {service.minPrice} - {service.maxPrice} جنيه
              </p>

              <button
                onClick={() => {
                  setSelectedService(service);
                  setShowPopup(true);
                }}
                className="w-full border py-2 rounded-full cursor-pointer transition text-sm bg-white text-[#004AAD] border-[#004AAD] hover:bg-[#004AAD] hover:text-white"
              >
                عرض تفاصيل الطلب
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            ‹
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 ${
                currentPage === idx + 1
                  ? "bg-[#004AAD] text-white border-[#004AAD] shadow-md scale-105"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            ›
          </button>
        </div>
      )}

      {/* Popup Modal */}
      {showPopup && selectedService && (
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
              className="w-full h-40 object-cover mb-4"
              src={
                selectedService.mainImage?.secure_url || "./images/avatar.jpg"
              }
              alt="service"
            />

            <h3 className="font-bold mb-2" style={{ color: "#004AAD" }}>
              اسم خدمة: {selectedService.title}
            </h3>

            <p className="font-semibold mb-1" style={{ color: "#004AAD" }}>
              التكلفة: {selectedService.minPrice} - {selectedService.maxPrice}{" "}
              جنيه
            </p>

            <p className="text-gray-500 text-sm mb-6">
              {selectedService.description}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => handleConfirm(selectedService._id)}
                className="flex-1 py-2 rounded-full bg-[#004AAD] text-white hover:opacity-90"
              >
                تأكيد الطلب
              </button>
              <button className="flex-1 py-2 rounded-full text-[#1F1F1F] cursor-pointer bg-white border border-gray-300 hover:bg-gray-100">
                الغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
