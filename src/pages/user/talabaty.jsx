import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import TalabatyDetailsModal from "../../components/TalabatyDetailsModal";
import Messagesuser from "./messages_user";
import { Search, Settings, Heart, MessageSquare, FolderCheck, ChevronRight, ChevronLeft } from "lucide-react";
import cardImg from "../../assets/card.png";
import hammer from "../../assets/hammer.png";
import filterIcon from "../../assets/filter-square.png";
import service1Img from "../../assets/service1.png";
import userImage from "../../assets/user-1.png";

const TalabatyScreen = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("talabaty");
  const [itemsPerPage, setItemsPerPage] = useState(9);

      const { userInfo } = useContext(UserContext);
      console.log(userInfo);
      console.log("userInfo");

  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:3000/user/getMyOrders", {
          headers: { Authorization: `Bearer ${token}` },
        });
const statusMap = {
  pending: 'المعلقة',
  accepted: 'المعاينة',
  canceled: 'ملغية',
  confirmed: 'مؤكدة',
  rejected: 'مرفوضة'
};
        // Add defaults for missing data
        const ordersWithDefaults = response.data.map((order, i) => ({
          id: order._id || i + 1,
          name: order.serviceId?.name || `خدمة ${i + 1}`,
          price: order.price || "ر.س(500-600)",
          status: statusMap[order.status] || 'معلقة',    serviceName: order.serviceId?.title || 'خدمة غير محددة',
          image: order.serviceId?.image || service1Img,
          technicianName: order.technicianName || "أحمد فني",
          clientName: order.userId?.name || `عميل رقم ${i + 1}`,
          location: order.address || "الرياض",
          phone: order.userId?.phone || "0501234567",
          email: order.userId?.email || "client@example.com",
          description: order.description || "لا توجد تفاصيل إضافية.",
          serviceName: order.serviceId?.name || `خدمة ${i + 1}`,
          date: order.date || "2025-01-15",
          time: order.time || "15:30",
        }));

        setOrders(ordersWithDefaults);
        console.log("Orders fetched:", ordersWithDefaults);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
      }
    };

    fetchOrders();
  }, [token]);

  // Filtering & Pagination
  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans" dir="rtl">
      <div className="px-24 py-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3 ml-6">
            <img
              src={userInfo?.profilePic?.secure_url || userImage}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover shadow"
            />
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-800">{userInfo?.name}</p>
              <p className="text-sm text-gray-500">{userInfo?.address}</p>
            </div>
          </div>

          {/* Balance Card */}
          <div className="w-full max-w-lg space-y-4">
            <div className="bg-[var(--color-main-200)] p-6 rounded-2xl shadow-lg border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <div className="text-right w-full">
                  <p className="text-sm text-gray-600 mb-2">رصيد الآن</p>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <img src={cardImg} alt="Card" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-3xl font-bold text-blue-800">20000</span>
                      <span className="text-blue-600 font-medium">ج.م</span>
                    </div>
                    <img src={hammer} alt="Hammer" className="w-10 h-10 object-contain ml-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="w-1/2 bg-white border-2 border-blue-300 text-blue-600 px-6 py-3 rounded-2xl text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm">
                + إضافة رصيد
              </button>
              <button className="w-1/2 bg-white border-2 border-blue-300 text-blue-600 px-6 py-3 rounded-2xl text-sm font-medium hover:bg-blue-50 transition-colors shadow-sm">
                - سحب رصيد
              </button>
            </div>
          </div>
        </div>

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

          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors">
            <Heart className="w-4 h-4" /> المفضله
          </button>
          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors">
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
            {paginatedOrders.length === 0 ? (
              <p className="text-gray-500 mt-6">لا يوجد طلبات</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedOrders.map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <div className="relative">
                      <img src={order.image} alt={order.name} className="w-full h-36 object-cover rounded-lg" />
                      <span
                        className={`absolute top-3 right-3 text-white text-xs px-3 py-1 rounded-full font-medium ${
                          order.status === "مكتملة"
                            ? "bg-green-500"
                            : order.status === "قيد التنفيذ"
                            ? "bg-blue-500"
                            : "bg-red-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <h3 className="text-sm text-gray-800 font-semibold">{order.name}</h3>
                      <p className="text-xs text-gray-500">التكلفة: {order.price}</p>
                      <button
                        onClick={() => openModal(order)}
                        className="w-full mt-3 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                      >
                        عرض تفاصيل الطلب
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredOrders.length > 0 && (
              <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>
                    عرض {startIndex + 1} إلى {Math.min(endIndex, filteredOrders.length)} من {filteredOrders.length} إدخال
                  </span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(parseInt(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="ml-2 border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="9">عرض 9</option>
                    <option value="18">عرض 18</option>
                    <option value="27">عرض 27</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-8 h-8 rounded ${
                          currentPage === pageNumber ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : activeTab === "messages" ? (
          <Messagesuser />
        ) : null}

        <TalabatyDetailsModal show={showModal} handleClose={closeModal} service={selectedOrder} />
      </div>
    </div>
  );
};

export default TalabatyScreen;
