import React from 'react';
import service1 from '../assets/service1.jpg';
import picProvider from '../assets/picProvider.png';

const ServiceDetailsModal = ({ show, handleClose, service }) => {
  if (!show || !service) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50" dir="rtl">
      <div className="bg-gradient-to-b from-blue-50 to-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-main-500 text-white rounded-lg flex items-center justify-center text-sm shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900">تفاصيل الخدمه</h2>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Service Card */}
            <div className="lg:col-span-7">
              <h6 className="font-bold mb-3 text-base text-gray-900">الخدمة</h6>
              <div className="relative mb-3">
                <img
                  src={service.image || service1}
                  alt="Service"
                  className="w-full rounded-lg h-36 object-cover"
                />
                {/* Rating Overlay */}
                <div className="absolute top-2 right-2 bg-white bg-opacity-95 rounded-2xl px-2 py-1 text-xs font-bold flex items-center">
                  <span className="text-black mr-1">({service.reviews || "51"})</span>
                  <span className="text-black mr-1">{service.rating || "4.5"}</span>
                  <svg width="12" height="12" fill="#FFD700" viewBox="0 0 24 24" className="mr-1">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>

              {/* Service Info */}
              <div className="mb-3">
                <div className="font-bold text-base mb-2 text-gray-900">
                  {service.name || "اسم الخدمة"}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src={picProvider}
                      alt="Provider"
                      className="rounded-full w-8 h-8 object-cover mr-2"
                    />
                    <span className="text-gray-600">احمد محمد</span>
                  </div>
                  <div className="text-main-500 font-bold">
                    ج.م ({service.priceRange || "500-600"})
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Customer Details */}
            <div className="lg:col-span-5">
              <h6 className="font-bold mb-3 text-base text-gray-900">تفاصيل العميل</h6>
              <div className="flex items-center mb-4">
                <img
                  src={picProvider}
                  alt="Client"
                  className="rounded-full w-15 h-15 mr-3 object-cover"
                />
                <div>
                  <div className="font-bold text-base text-gray-900 mb-1">احمد على</div>
                  <div className="text-gray-600 text-sm flex items-center mb-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#666" />
                    </svg>
                    محطة الرمل
                  </div>
                  <div className="text-gray-600 text-sm flex items-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#666" />
                    </svg>
                    012279501554
                  </div>
                </div>
              </div>

              {/* Booking Time */}
              <div className="mb-4">
                <h6 className="font-bold mb-2 text-base text-gray-900">يوم الحجز</h6>
                <div className="text-right">
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-2xl text-main-500 mr-2">27</span>
                    <span className="text-gray-600">يوم</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-lg text-main-500 mr-2">1:00 pm</span>
                    <span className="text-gray-600">ساعه</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Problem Details - Full Width */}
          <div className="mt-4">
            <h6 className="font-bold mb-2 text-base text-gray-900">تفاصيل مشكله</h6>
            <div className="flex w-full">
              <img
                src={service.image || service1}
                alt="Problem Details"
                className="rounded-lg h-38 w-1/2 object-cover mr-3"
              />
              <p className="text-gray-600 text-sm leading-relaxed w-1/2 mr-3 m-0">
                {service.description || "لم يتم تقديم وصف للمشكلة"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-200" dir="ltr">
          <div className="flex gap-3">
            <button className="bg-main-500 text-white px-8 py-3 rounded-lg font-bold text-sm flex-1 max-w-[200px] hover:bg-main-600 transition-colors">
              قبول
            </button>
            <button
              onClick={handleClose}
              className="border border-main-500 text-main-500 bg-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              رفض خدمه
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;