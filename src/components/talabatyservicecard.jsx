import React from 'react';
import defaultImage from '../assets/service1.jpg';
import chatImg from '../assets/chat-img.png';

const InfoBlock = ({ location, phone, email }) => (
  <div className="rounded-lg bg-gray-50 p-4 text-right text-sm text-gray-600">
    <p>مكان الخدمة: {location || 'مدينة نصر، الإسكندرية'}</p>
    <p className="mt-1">رقم الهاتف: {phone || '01222222222'}</p>
    <p className="mt-1">البريد الإلكتروني: {email || 'Sophie40@yahoo.com'}</p>
  </div>
);

const SectionHeader = ({ title }) => (
  <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 text-right">
    <span className="flex-1 h-px bg-gray-300"></span>
    <span className="whitespace-nowrap">{title}</span>
  </h3>
);

const TalabatyDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  const getImageSrc = () => {
    if (order?.image) {
      return typeof order.image === 'string'
        ? order.image
        : URL.createObjectURL(order.image);
    }
    return defaultImage;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50"
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="orderDetailsTitle"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white pb-4">
          <h2 id="orderDetailsTitle" className="text-2xl font-bold text-gray-800">تفاصيل خدمه</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-10 mt-6">
          {/* Row 1: Technician & Client */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Technician */}
            <section className="space-y-4">
              <SectionHeader title="مقدم الخدمة" />
              <div className="flex items-center gap-3">
                <img src={chatImg} alt="صورة الصنايعي" className="h-12 w-12 rounded-full object-cover" />
                <div className="text-right">
                  <p className="font-medium text-gray-800">{order?.technicianName || 'محمد علي محمد'}</p>
                  <p className="text-sm text-gray-500">فني عام - متاح</p>
                </div>
              </div>
              <button className="mt-2 w-fit rounded-full border border-blue-600 px-4 py-1 text-blue-600 hover:bg-blue-50 text-sm">تفاصيل</button>
              <InfoBlock location={order?.location} phone={order?.phone} email={order?.email} />
            </section>

            {/* Client */}
            <section className="space-y-4">
              <SectionHeader title="تفاصيل العميل" />
              <div className="flex items-center gap-3">
                <img src={chatImg} alt="صورة العميل" className="h-12 w-12 rounded-full object-cover" />
                <div className="text-right">
                  <p className="font-medium text-gray-800">{order?.clientName || 'أحمد محمود'}</p>
                  <p className="text-sm text-gray-500">عميل</p>
                </div>
              </div>
              <InfoBlock location={order?.location} phone={order?.phone} email={order?.email} />
            </section>
          </div>

          {/* Row 2: Problem & Booking */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Problem Details */}
            <section className="space-y-4">
              <SectionHeader title="تفاصيل مشكله" />
              <article className="rounded-lg border border-gray-200 p-4">
                <img
                  src={getImageSrc()}
                  alt="صورة المشكلة"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  className="mb-4 w-full aspect-video rounded-lg object-cover"
                />
                <p className="text-right text-sm text-gray-600 leading-relaxed">
                  {order?.description ||
                    'Lorem ipsum dolor sit amet consectetur. Eu praesent lorem quisque praesent dolor ultrices nam urna auctor. Habitant turpis tristique bibendum nec. Semper sed dictum duruis.'}
                </p>
              </article>
            </section>

            {/* Booking Details */}
            <section className="space-y-4">
              <SectionHeader title="الخدمة المقدمة" />
              <article className="rounded-lg border border-gray-200 p-4">
                <img
                  src={getImageSrc()}
                  alt="صورة الخدمة"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  className="mb-4 w-full aspect-video rounded-lg object-cover"
                />
                <div className="mb-2 flex items-center justify-between text-right">
                  <h4 className="font-bold text-gray-800">{order?.serviceName || 'صيانة حنفية'}</h4>
                  <p className="text-lg font-bold text-blue-600">
                    {order?.price || '٥٠٠ - ٦٠٠'} ج.م
                  </p>
                </div>
                <div className="mb-1 flex items-center justify-between text-sm text-gray-600">
                  <span>تاريخ</span>
                  <span className="font-medium text-gray-800">{order?.date || '31/3/2025'}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>الساعة</span>
                  <span className="font-medium text-gray-800">{order?.time || '22:00'}</span>
                </div>
                <button className="mt-4 w-full rounded-full border border-blue-600 px-6 py-2 text-blue-600 hover:bg-blue-50 transition">
                  تفاصيل
                </button>
              </article>
            </section>
          </div>

          {/* Footer Button */}
          <div className="pt-4 text-center">
            <button className="rounded-full border border-red-500 px-6 py-2 text-red-500 hover:bg-red-50 transition">
              الغاء خدمه
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalabatyDetailsModal;
