// MyServices.jsx
import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import EditServiceModal from '../components/EditServiceModal';
import ServiceDetailsModal from '../components/ServiceDetailsModal';
import AddServiceButton from '../components/AddServiceButton';
import formImage from '../assets/formImage.jpg';

const MyServices = () => {
  const [services, setServices] = useState([...Array(12)].map((_, i) => ({
    id: i + 1,
    name: `خدمة رقم ${i + 1}`,
    priceRange: `${300 + i * 10} - ${400 + i * 10}`,
    image: formImage,
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 100).toString()
  })));

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const servicesPerPage = 9;

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDetails = (service) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowEditModal(true);
  };

  const handleSaveService = (formData) => {
    const newService = {
      ...formData,
      id: selectedService?.id || Date.now(),
      priceRange: `${formData.minCost} - ${formData.maxCost}`,
      image: formData.image || formImage,
      rating: selectedService?.rating || (4 + Math.random()).toFixed(1),
      reviews: selectedService?.reviews || Math.floor(Math.random() * 100).toString(),
    };

    setServices((prev) => {
      const exists = prev.find(s => s.id === newService.id);
      if (exists) {
        return prev.map(s => s.id === newService.id ? newService : s);
      } else {
        return [newService, ...prev];
      }
    });

    setShowEditModal(false);
  };

  const handleAddService = () => {
    setSelectedService(null);
    setShowEditModal(true);
  };

  return (
    <div>
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-main-500">خدماتي</h2>
      </div>

      {/* Search, Filter, and Add Service - All in One Row */}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentServices.map(service => (
          <ServiceCard key={service.id} service={service} onDetails={handleDetails} onEdit={handleEdit} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-500">
            عرض {indexOfFirstService + 1} إلى {Math.min(indexOfLastService, filteredServices.length)} من {filteredServices.length} خدمة
          </span>
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 rounded-md border font-bold ${
                  currentPage === idx + 1
                    ? 'bg-main-500 text-white'
                    : 'text-main-500 border-main-500 hover:bg-main-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      <EditServiceModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        service={selectedService}
        handleSave={handleSaveService}
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