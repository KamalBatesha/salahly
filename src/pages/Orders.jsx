import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import OrderDetailsModal from '../components/OrderDetailesModal';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const Orders = () => {
  const { token, userRole } = useContext(UserContext);

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const filterOptions = ['الكل', 'الجديدة', 'المعاينة', 'التسليم', 'المعلقة'];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          userRole === 'admin' 
            ? 'http://localhost:3000/admin/getAllOrders' 
            : 'http://localhost:3000/user/getMyOrders',
          {
            headers: {
              authorization: `${userRole === 'admin' ? 'admin' : 'bearer'} ${token}`
            }
          }
        );
        setOrders(res.data || []); // default to empty array if no data
      } catch (err) {
        console.error('❌ Error fetching orders:', err.response?.data || err.message);
        toast.error(err.response?.data?.message || 'حدث خطأ أثناء جلب الطلبات');
      }
    };

    if (token) fetchOrders();
  }, [token, userRole]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedOrder(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(parseInt(items));
    setCurrentPage(1);
  };
const statusMap = {
  pending: 'المعلقة',
  accepted: 'المعاينة', // or 'التسليم' depending on your meaning
  new: 'الجديدة',
  delivery: 'التسليم'
};
  // Map API data into UI-friendly objects with default values
  const mappedOrders = orders.map((order, index) => ({
    id: order.id || order._id || index,
    customer: order.userId?.name || 'مستخدم مجهول',
    clientName: order.userId?.name || 'مستخدم مجهول',
    date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'غير محدد',
    time: order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : 'غير محدد',
    total: order.serviceId ? `تكلفة ${order.serviceId.minPrice || 0} - ${order.serviceId.maxPrice || 0}` : 'غير محدد',
    price: order.serviceId?.minPrice || 0,
    status: statusMap[order.status] || 'معلقة',    serviceName: order.serviceId?.title || 'خدمة غير محددة',
    technicianName: order.providerId?.name || 'فني غير معروف',
    address: order.userId?.address || 'غير محدد',
    location: order.userId?.address || 'غير محدد',
    cost: order.serviceId?.minPrice || 0,
    email: order.userId?.email || 'غير محدد',
    phone: order.userId?.phone || 'غير محدد',
    description: order.description || 'لا يوجد وصف',
    image: order.image?.secure_url || '',
    serviceImage: order.serviceId?.mainImage?.secure_url || '',
    providerProfile: order.providerId?.profilePic?.secure_url || '',
    deliveryDate: order.deliveryDate || null
  }));

  // Filter and pagination
  const filteredOrders = mappedOrders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.customer.includes(searchTerm) ||
      order.serviceName.includes(searchTerm) ||
      order.technicianName.includes(searchTerm) ||
      order.address.includes(searchTerm);
    const matchesFilter = activeFilter === 'الكل' || order.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">الطلبات</h2>
      
      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => { setActiveFilter(filter); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filter}
              {filter !== 'الكل' && (
                <span className="mr-1 text-xs bg-gray-200 text-gray-600 px-1 rounded-full">
                  {mappedOrders.filter(order => order.status === filter).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث في العملاء، الخدمات، الفنيين، أو العناوين..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
            />
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
        </div>
      )}

      {/* Modal */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;
