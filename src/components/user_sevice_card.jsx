import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultImage from '../assets/service1.png';

const UserServiceCard = ({ service, onDetails }) => {
  const getImageSrc = () => {
    if (service?.image) {
      return typeof service.image === 'string'
        ? service.image
        : URL.createObjectURL(service.image);
    }
    return defaultImage;
  };

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-200 w-full max-w-[300px]" dir="rtl">
      {/* Image with Rating */}
      <div className="relative">
        <img
          src={getImageSrc()}
          alt={service?.name || 'service'}
          onError={(e) => (e.target.src = defaultImage)}
          className="w-full h-[140px] object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-full flex items-center text-xs text-black font-semibold gap-1 shadow">
          <span className="text-[11px]">({service?.reviews || '51'})</span>
          <span className="text-[12px]">{service?.rating || '4.5'}</span>
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-[12px]" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Title and Price */}
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-sm truncate">
            {service?.name || 'صيانة مطبخ'}
          </h3>
          <p className="text-gray-600 text-xs font-medium whitespace-nowrap">
            {service?.priceRange || '500-600'} ج.م
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => onDetails(service)}
          className="w-full flex-1 border-2 border-main-500 text-main-500 font-bold py-2 px-4 rounded-lg hover:bg-main-100 transition-colors text-sm rounded-lg"
        >
          احجز الان
        </button>
      </div>
    </div>
  );
};

export default UserServiceCard;
