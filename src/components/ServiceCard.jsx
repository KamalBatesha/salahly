// ServiceCard.jsx
import React from 'react';
import { faStar, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultImage from '../assets/service1.jpg';

const ServiceCard = ({ service, onDetails, onEdit }) => {
  const getImageSrc = () => {
    if (service?.image) {
      return typeof service.image === 'string'
        ? service.image
        : URL.createObjectURL(service.image);
    }
    return defaultImage;
  };

  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200" dir="rtl">
      <div className="relative">
        <img
          src={getImageSrc()}
          alt={service?.name || 'service'}
          onError={(e) => (e.target.src = defaultImage)}
          className="w-full h-[120px] object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/60 backdrop-blur-sm px-2 py-[2px] rounded-full flex items-center text-xs text-black font-semibold gap-1">
          <span className="text-[10px]">({service?.reviews || '51'})</span>
          <span className="text-[12px]">{service?.rating || '4.5'}</span>
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-[12px]" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-base">{service?.name || 'صيانة مطبخ'}</h3>
          <p className="text-gray-500 text-sm font-medium">ج.م ({service?.priceRange || '500-600'})</p>
        </div>

        <div className="flex justify-between items-center gap-2">
          <button
            onClick={() => onDetails(service)}
            className="flex-1 border-2 border-main-500 text-main-500 font-bold py-2 px-4 rounded-lg hover:bg-main-100 transition-colors text-sm min-w-[240px]"
          >
            تفاصيل
          </button>

          <button
            onClick={() => onEdit(service)}
            className="w-[70px] h-[40px] border-2 border-main-500 rounded-lg flex items-center justify-center hover:bg-main-100 transition-colors"
          >
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="text-main-500 text-[14px] underline"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
