import React from 'react';
import service1 from '../assets/service1.png';
import chatImg from '../assets/chat-img.png';

const OrderCard = ({ order, onView }) => {
  // Get status color based on order status
  const getStatusColor = (status) => {
    switch (status) {
      case 'الجديدة':
        return 'bg-green-100 text-green-700';
      case 'المعاينة':
        return 'bg-blue-100 text-blue-700';
      case 'التسليم':
        return 'bg-purple-100 text-purple-700';
      case 'المعلقة':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4" dir="rtl">
      <div className="flex items-center gap-6">
        
        {/* Column 1: Service image - far right */}
        <div className="flex-shrink-0">
          <img
            src={service1}
            alt="Service"
            className="w-28 h-20 object-cover rounded-lg"
          />
        </div>

        {/* Column 2: Service name and technician */}
        <div className="flex-1 text-right space-y-2">
          {/* Row 1: Service name */}
          <div>
            <span className="text-sm text-gray-600">اسم الخدمه: </span>
            <span className="text-sm font-bold text-gray-900">
              {order?.serviceName || 'صيانه حنفيه'}
            </span>
          </div>
          {/* Row 2: Technician name with avatar */}
          <div>
            <span className="text-sm text-gray-600">اسم صنايعي: </span>
            <img src={chatImg} alt="Technician" className="w-6 h-6 rounded-full inline-block mx-1" />
            <span className="text-sm font-medium text-gray-900">
              {order?.technicianName || 'احمد علي محمد'}
            </span>
          </div>
        </div>

        {/* Column 3: Client and address */}
        <div className="flex-1 text-right space-y-2">
          {/* Row 1: Client name with avatar */}
          <div>
            <span className="text-sm text-gray-600">اسم عميل: </span>
            <img src={chatImg} alt="Client" className="w-6 h-6 rounded-full inline-block mx-1" />
            <span className="text-sm font-medium text-gray-900">
              {order?.customer || 'احمد علي محمد'}
            </span>
          </div>
          {/* Row 2: Address */}
          <div>
            <span className="text-sm text-gray-600">العنوان: </span>
            <span className="text-sm font-medium text-gray-900">
              {order?.address || 'شارع 45، اسكندرية'}
            </span>
          </div>
        </div>

        {/* Column 4: Status and cost */}
        <div className="flex-1 text-right space-y-2">
          {/* Row 1: Status badge */}
          <div>
            <span className="text-sm text-gray-600">حالة الطلب: </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order?.status)}`}>
              {order?.status || 'الموافقة'}
            </span>
          </div>
          {/* Row 2: Cost */}
          <div>
            <span className="text-sm text-gray-600">التكلفة: </span>
            <span className="text-sm font-bold text-gray-900">
              {order?.cost || '2000'} جنيه
            </span>
          </div>
        </div>

        {/* Column 5: Actions - far left */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <button className="text-gray-400 hover:text-gray-600 p-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="8" cy="2" r="1.5"/>
              <circle cx="8" cy="8" r="1.5"/>
              <circle cx="8" cy="14" r="1.5"/>
            </svg>
          </button>
          <button
            onClick={() => {
              console.log('تفاصيل طلب button clicked for order:', order); // Add this for debugging
              if (onView) {
                onView(order);
              }
            }}
            className="bg-white border border-blue-500 text-blue-500 text-sm font-medium py-2 px-4 rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            تفاصيل طلب
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;