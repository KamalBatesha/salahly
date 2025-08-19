// MyServices.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';
import EditServiceModal from '../components/EditServiceModal';
import ServiceDetailsModal from '../components/ServiceDetailsModal';
import AddServiceButton from '../components/AddServiceButton';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import formImage from '../assets/formImage.jpg';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const MyServices = () => {
  const { token, userRole } = useContext(UserContext);

  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Fetch services from API
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:3000/provider/getMyServices", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
          role: userRole || "",
        },
      });

      const apiData = res.data.map(s => ({
        id: s.id,
        name: s.title || "بدون عنوان",
        title: s.title || "بدون عنوان",
        priceRange: `${s.minPrice} - ${s.maxPrice}`,
        minPrice: s.minPrice,
        maxPrice: s.maxPrice,
        description: s.description || '',
        image: s.mainImage?.secure_url || formImage,
        rating: (4 + Math.random()).toFixed(1),
        reviews: Math.floor(Math.random() * 100).toString(),
        isConfirmed: Boolean(s.isConfirmed)
      }));

      setServices(apiData);
    } catch (err) {
      console.error("Error fetching services:", err);
      toast.error(err.response?.data?.message || "فشل تحميل الخدمات");
    }
  };

  useEffect(() => {
    if (token) {
      fetchServices();
    }
  }, [token]);

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(parseInt(newItemsPerPage));
    setCurrentPage(1);
  };

  const handleDetails = (service) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowEditModal(true);
  };

  const handleAddService = () => {
    setSelectedService(null);
    setShowEditModal(true);
  };

  const handleModalSuccess = () => {
    fetchServices(); // Refresh the services list
    setShowEditModal(false);
    setSelectedService(null);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedService(null);
  };

  return (
    <div>
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-main-500">خدماتي</h2>
      </div>

      {/* Search, Filter, and Add Service */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="ابحث"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-500"
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        <button className="border-2 border-main-500 text-main-500 px-4 py-2 rounded-lg font-bold hover:bg-main-100 flex items-center gap-2">
          <i className="fas fa-filter text-sm"></i>
          فلاتر
        </button>
        <AddServiceButton onClick={handleAddService} />
      </div>

      {/* Services Grid */}
      {currentServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentServices.map(service => (
            <div
              key={service.id}
              className={`relative rounded-lg overflow-hidden shadow-md transition ${
                service.isConfirmed ? 'bg-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {!service.isConfirmed && (
                <span className="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded z-10">
                  تحت الفحص
                </span>
              )}
              <ServiceCard
                service={service}
                onDetails={handleDetails}
                onEdit={handleEdit}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <i className="fas fa-box-open text-6xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد خدمات</h3>
          <p className="text-gray-500 mb-4">لم يتم العثور على أي خدمات</p>
          <button
            onClick={handleAddService}
            className="bg-main-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-main-600 transition"
          >
            إضافة خدمة جديدة
          </button>
        </div>
      )}

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

      {/* Edit Service Modal */}
      <EditServiceModal
        show={showEditModal}
        handleClose={handleCloseModal}
        service={selectedService}
        onSuccess={handleModalSuccess}
      />

      {/* Service Details Modal */}
      <ServiceDetailsModal
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        service={selectedService}
      />
    </div>
  );
};

export default MyServices;