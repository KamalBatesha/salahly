import React, { useState } from 'react';
import TalabatyDetailsModal from '../../components/TalabatyDetailsModal';
import Messagesuser from './messages_user'; // Make sure path is correct
import { Search, Settings, Heart, MessageSquare, FolderCheck, Hammer, ChevronRight, ChevronLeft } from 'lucide-react';
import cardImg from '../../assets/card.png';
import hammer from '../../assets/hammer.png';
import filterIcon from '../../assets/filter-square.png';
import service1Img from '../../assets/service1.png';


const TalabatyScreen = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('talabaty');
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const services = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    name: `اسم خدمة ${i + 1}`,
    price: 'ر.س(500-600)',
    status: i % 3 === 0 ? 'قيد التنفيذ' : i % 3 === 1 ? 'مكتملة' : 'ملغي',
    image: service1Img,
    technicianName: 'أحمد فني',
    clientName: `عميل رقم ${i + 1}`,
    location: 'الرياض',
    phone: '0501234567',
    email: 'client@example.com',
    description: 'تفاصيل حول المشكلة التي حدثت أثناء تقديم الخدمة.',
    serviceName: `خدمة إصلاح وصيانة ${i + 1}`,
    date: '2025-01-15',
    time: '15:30',
  }));

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedServices = filteredServices.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(parseInt(newItemsPerPage));
    setCurrentPage(1);
  };

  const openModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans" dir="rtl">
      {/* Main content wrapper with navbar-matching padding */}
      <div className="px-24">
        <div className="px-5 py-6">
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
              onClick={() => setActiveTab('talabaty')}
              className={`flex items-center gap-1 transition-all ${
                activeTab === 'talabaty'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <FolderCheck className="w-4 h-4" /> طلباتي
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-1 transition-all ${
                activeTab === 'messages'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
                  : 'text-gray-500 hover:text-blue-600'
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
          {activeTab === 'talabaty' && (
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
          {activeTab === 'talabaty' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedServices.map((service) => (
                  <div key={service.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <div className="relative">
                      <img src={service.image} alt={service.name} className="w-full h-36 object-cover rounded-lg" />
                      <span
                        className={`absolute top-3 right-3 text-white text-xs px-3 py-1 rounded-full font-medium ${
                          service.status === 'مكتملة'
                            ? 'bg-green-500'
                            : service.status === 'قيد التنفيذ'
                            ? 'bg-blue-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {service.status}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <h3 className="text-sm text-gray-800 font-semibold">{service.name}</h3>
                      <p className="text-xs text-gray-500">التكلفة: {service.price}</p>
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
              {filteredServices.length > 0 && (
                <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>عرض {startIndex + 1} إلى {Math.min(endIndex, filteredServices.length)} من {filteredServices.length} إدخال</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(e.target.value)}
                      className="ml-2 border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="9">عرض 9</option>
                      <option value="18">عرض 18</option>
                      <option value="27">عرض 27</option>
                    </select>
                  </div>
                 
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                   
                    {/* Page numbers */}
                    {[...Array(Math.min(5, totalPages))].map((_, index) => {
                      const pageNumber = index + 1;
                      if (totalPages <= 5) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`w-8 h-8 rounded ${
                              currentPage === pageNumber
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                     
                      const startPage = Math.max(1, currentPage - 2);
                      const endPage = Math.min(totalPages, startPage + 4);
                      const adjustedStartPage = Math.max(1, endPage - 4);
                     
                      if (pageNumber >= adjustedStartPage && pageNumber <= endPage) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(adjustedStartPage + index)}
                            className={`w-8 h-8 rounded ${
                              currentPage === (adjustedStartPage + index)
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {adjustedStartPage + index}
                          </button>
                        );
                      }
                      return null;
                    })}
                   
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="text-gray-400">...</span>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                   
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : activeTab === 'messages' ? (
            <Messagesuser />
          ) : null}

          <TalabatyDetailsModal show={showModal} handleClose={closeModal} service={selectedService} />
        </div>
      </div>
    </div>
  );
};

export default TalabatyScreen;