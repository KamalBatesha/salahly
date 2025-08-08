import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import service1Img from '../assets/picProvider.png';

const TalabatyDetailsModal = ({ show, handleClose, service }) => {
  if (!show || !service) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl shadow-xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Back Arrow and Title */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-1 text-blue-600 font-semibold">
            <ArrowRight className="w-5 h-5" /> <span>تفاصيل خدمه</span>
          </div>
          <div className="text-sm text-gray-500">مقدم الخدمه</div>
          {/* Row: Avatar, Info, Button */}
          <div className="flex items-center gap-2 mt-3">
            {/* Avatar */}
            <img
              src={service1Img}
              alt="Technician"
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            {/* Info */}
            <div className="flex-1 mx-4 text-right">
              <p className="text-sm font-semibold text-gray-800">Technician Name</p>
              <p className="text-xs text-gray-500">الرياض، فني عام</p>
            </div>
            {/* Details Button */}
            <button className="border border-blue-600 text-blue-600 text-xs px-3 py-1 rounded-xl hover:bg-blue-50">
              تفاصيل
            </button>
          </div>
        </div>
        {/* Section Titles */}
        <div className="px-6 pt-4 grid grid-cols-2 text-sm font-semibold text-gray-800">
          <span className="text-right">الخدمه المقدمه</span>
          <span className="text-right">تفاصيل مشكله</span>
        </div>
        {/* Image and Content Columns */}
        <div className="p-6 grid grid-cols-2 gap-6">
          {/* Problem Details */}
          <div className="space-y-2">
            <img
              src={service.image || service1Img}
              alt="Problem"
              className="w-full h-40 object-cover rounded-xl"
            />
            <p className="text-xs text-gray-500 leading-relaxed text-right">
              Lorem ipsum dolor sit amet consectetur. Eu praesent lorem ultrices nam urna auctor.
              Habitant turpis tristique bibendum nec. Semper sed dictum duis risus.
            </p>
          </div>
          {/* Offered Service */}
          <div className="space-y-2">
            <img
              src={service.image || service1Img}
              alt="Service"
              className="w-full h-40 object-cover rounded-xl"
            />
            <div className="flex justify-between items-center text-sm text-gray-700">
              <div className="text-sm text-black">سباكة </div>
              <span className="font-semibold">{service.price}</span>
            </div>
            <button className="w-full border border-blue-600 text-blue-600 py-1.5 rounded-xl hover:bg-blue-50 text-sm">
              تفاصيل
            </button>
          </div>
        </div>
        {/* Footer */}
        <div className="px-6 pb-6">
          <button className="w-full border border-red-600 text-red-600 py-2 rounded-xl hover:bg-red-50 text-sm font-medium">
            الغاء خدمه
          </button>
        </div>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TalabatyDetailsModal;