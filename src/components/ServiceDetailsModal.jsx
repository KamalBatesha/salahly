import React, { useState } from 'react';
import service1 from '../assets/service1.jpg';
import picProvider from '../assets/picProvider.png';

const ServiceDetailsModal = ({ show, handleClose, service }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  if (!show || !service) return null;

  // Format price range
  const formatPriceRange = () => {
    if (service.minPrice && service.maxPrice) {
      if (service.minPrice === service.maxPrice) {
        return `${service.minPrice}`;
      }
      return `${service.minPrice} - ${service.maxPrice}`;
    }
    return "غير محدد";
  };

  // Format days for display
  const formatDays = () => {
    const arabicDays = {
      'Monday': 'الاثنين',
      'Tuesday': 'الثلاثاء', 
      'Wednesday': 'الأربعاء',
      'Thursday': 'الخميس',
      'Friday': 'الجمعة',
      'Saturday': 'السبت',
      'Sunday': 'الأحد'
    };
    
    if (service.days && service.days.length > 0) {
      return service.days.map(day => arabicDays[day] || day);
    }
    return ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'];
  };

  // Get all images (main + additional)
  const getAllImages = () => {
    const images = [];
    if (service.mainImage && service.mainImage.secure_url) {
      images.push(service.mainImage.secure_url);
    }
    if (service.images && service.images.length > 0) {
      service.images.forEach(img => {
        if (img.secure_url) {
          images.push(img.secure_url);
        }
      });
    }
    return images.length > 0 ? images : [service1, service1, service1]; // Sample images
  };

  // Get provider info
  const getProviderInfo = () => {
    if (service.provider) {
      return {
        name: service.provider.name || "مقدم الخدمة",
        image: service.provider.image || picProvider,
        rating: service.provider.rating || 4.5,
        reviews: service.provider.reviews || 0
      };
    }
    return {
      name: "مقدم الخدمة المحترف",
      image: picProvider,
      rating: 4.5,
      reviews: 25
    };
  };

  const provider = getProviderInfo();
  const allImages = getAllImages();
  const availableDays = formatDays();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Professional Header */}
        <div className=" text-blue px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
           
              <div>
                <h2 className="text-xl font-bold">تفاصيل الخدمة</h2>
                <p className="text-blue-100 text-sm">إدارة وعرض الخدمة</p>
              </div>
            </div>
            <button 
              onClick={handleClose} 
              className="w-9 h-9 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors flex items-center justify-center text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Images and Basic Info */}
              <div className="lg:col-span-2 space-y-5">
                {/* Main Image */}
                <div>
                  <div className="relative">
                    <img
                      src={allImages[selectedImageIndex]}
                      alt="Service"
                      className="w-full rounded-xl h-72 object-cover shadow-lg"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-2 rounded-lg text-sm font-medium shadow-lg ${
                        service.isConfirmed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-orange-500 text-white'
                      }`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            service.isConfirmed ? 'bg-green-200' : 'bg-orange-200'
                          }`}></div>
                          {service.isConfirmed ? 'نشطة' : 'معلقة'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Images Section */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      الصور الإضافية ({allImages.length})
                    </h4>
                    {allImages.length > 4 && (
                      <button
                        onClick={() => setShowAllImages(!showAllImages)}
                        className="text-blue-600 text-sm font-medium hover:text-blue-700"
                      >
                        {showAllImages ? 'إظهار أقل' : 'عرض الكل'}
                      </button>
                    )}
                  </div>

                  <div className={`grid grid-cols-4 gap-2 ${!showAllImages ? 'max-h-20 overflow-hidden' : ''}`}>
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative rounded-lg overflow-hidden transition-all hover:scale-105 ${
                          selectedImageIndex === index 
                            ? 'ring-3 ring-blue-500 shadow-lg' 
                            : 'opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`صورة ${index + 1}`}
                          className="w-full h-16 object-cover"
                        />
                        {selectedImageIndex === index && (
                          <div className="absolute inset-0  bg-opacity-20"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Title and Basic Info */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {service.title || "خدمة مميزة"}
                      </h3>
                      <p className="text-gray-600">
                        الفئة: <span className="font-medium text-gray-900">{service.category?.name || 'عامة'}</span>
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        {formatPriceRange()}
                      </div>
                      <div className="text-gray-500 text-sm">جنيه مصري</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">وصف الخدمة</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {service.description || "هذه خدمة مميزة تقدم حلولاً احترافية وعالية الجودة. يتم تنفيذها بواسطة خبراء متخصصين لضمان الحصول على أفضل النتائج وفقاً لأعلى معايير الجودة."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Details Panel */}
              <div className="lg:col-span-1 space-y-4">
                {/* Days Availability */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span className="font-medium text-blue-900">الأيام المتاحة</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'].map((day) => (
                      <div
                        key={day}
                        className={`px-2 py-1 rounded-md text-xs font-medium text-center ${
                          availableDays.includes(day)
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Statistics */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                      <path d="M9 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-4M9 11V9a2 2 0 012-2h0a2 2 0 012 2v2M9 11h6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    إحصائيات الخدمة
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-xl font-bold text-green-600">
                        {service.isConfirmed ? '✓' : '⏳'}
                      </div>
                      <div className="text-xs text-green-700 mt-1">
                        {service.isConfirmed ? 'نشطة' : 'معلقة'}
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-xl font-bold text-purple-600">
                        {allImages.length}
                      </div>
                      <div className="text-xs text-purple-700 mt-1">صور مرفقة</div>
                    </div>

                    <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-xl font-bold text-orange-600">
                        {availableDays.length}
                      </div>
                      <div className="text-xs text-orange-700 mt-1">أيام متاحة</div>
                    </div>

                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-xl font-bold text-blue-600">4.8</div>
                      <div className="text-xs text-blue-700 mt-1">التقييم</div>
                    </div>
                  </div>
                </div>

                {/* Provider Info */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 mb-3">معلومات مقدم الخدمة</h4>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={provider.image}
                      alt="Provider"
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{provider.name}</div>
                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} width="12" height="12" fill={i < Math.floor(provider.rating) ? "#FFD700" : "#E5E5E5"} viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-500 text-xs mr-1">({provider.reviews})</span>
                      </div>
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
          <div className="flex gap-3 justify-between items-center">
            <div className="text-sm text-gray-600">
              آخر تحديث: منذ 3 ساعات
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                إغلاق
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;