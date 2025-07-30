import React, { useState } from 'react';
import { AdminSidebar } from '../components/AdminLayout/SideBar';
import { TopNav } from '../components/AdminLayout/TopNav';
import OrderCard from '../components/OrderCard';
import OrderDetailsModal from '../components/OrderDetailesModal'; // Make sure this path is correct

const Orders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [allOrders] = useState([...Array(50)].map((_, i) => ({
    id: i + 1,
    customer: `احمد علي محمد ${i + 1}`,
    clientName: `احمد علي محمد ${i + 1}`, // Added for modal
    date: `31/3/2025`,
    time: '22:00', // Added for modal
    total: `تكلفة 2000 جنيه`,
    price: `${2000 + (i * 100)}`, // Added for modal
    status: i % 4 === 0 ? 'المعاينة' : i % 4 === 1 ? 'التسليم' : i % 4 === 2 ? 'الجديدة' : 'المعلقة',
    serviceName: i % 3 === 0 ? 'صيانة حنفية' : i % 3 === 1 ? 'تصليح مكيف' : 'كهرباء منزلية',
    technicianName: `احمد علي محمد ${i + 1}`,
    address: `شارع ${45 + i}، اسكندرية`,
    location: `شارع ${45 + i}، اسكندرية`, // Added for modal
    cost: `${2000 + (i * 100)}`,
    email: 'Sophie40@yahoo.com', // Added for modal
    phone: '01222222222', // Added for modal
    description: 'Lorem ipsum dolor sit amet consectetur. Eu praesent lorem quisque praesent dolor ultrices nam urna auctor.' // Added for modal
  })));

  const filterOptions = ['الكل', 'الجديدة', 'المعاينة', 'التسليم', 'المعلقة'];

  // Fixed function - make sure it sets the state correctly
  const handleViewDetails = (order) => {
    console.log('handleViewDetails called with order:', order);
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  // Filter orders based on active filter and search term
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = searchTerm === '' || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.technicianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'الكل' || order.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(parseInt(items));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal called');
    setShowDetailsModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      <AdminSidebar isOpen={sidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-0'}`}>
        {/* Fixed TopNav */}
        <div className="sticky top-0 z-50">
          <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        
        {/* Scrollable Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">الطلبات</h2>
          
          {/* Filter and Search Bar */}
          <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {filter}
                  {filter !== 'الكل' && (
                    <span className="mr-1 text-xs bg-gray-200 text-gray-600 px-1 rounded-full">
                      {allOrders.filter(order => order.status === filter).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-3">
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

          {/* Orders List */}
          <div className="space-y-4 mb-6">
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onView={handleViewDetails}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج</h3>
                <p className="text-gray-500">
                  {searchTerm 
                    ? `لم يتم العثور على نتائج للبحث عن "${searchTerm}"`
                    : 'لا توجد طلبات في هذا التصنيف'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    مسح البحث
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>عرض {startIndex + 1} إلى {Math.min(endIndex, filteredOrders.length)} من {filteredOrders.length} إدخال</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(e.target.value)}
                  className="ml-2 border border-gray-300 rounded px-2 py-1"
                >
                  <option value="8">عرض 8</option>
                  <option value="16">عرض 16</option>
                  <option value="24">عرض 24</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-chevron-right"></i>
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
                  <i className="fas fa-chevron-left"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FIXED: Modal with correct props */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;