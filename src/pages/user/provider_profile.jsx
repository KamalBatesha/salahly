import React, { useState, useEffect } from 'react';
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  ArrowLeft,
  Heart,
  Zap,
  Coffee,
} from 'lucide-react';

// Mock UserServiceCard component
const UserServiceCard = ({ service, onDetails }) => (
  <div 
    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-w-[280px] flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow"
    onClick={() => onDetails(service)}
  >
    <img 
      src={service.image} 
      alt={service.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold text-blue-600">{service.price}</span>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm text-gray-600">{service.rating} ({service.reviews})</span>
        </div>
      </div>
    </div>
  </div>
);

const ProviderProfile = () => {
  const [konami, setKonami] = useState([]);
  const [showMatrix, setShowMatrix] = useState(false);

  // Konami Code Easter Egg
  useEffect(() => {
    const handleKeyDown = (e) => {
      const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
      const newKonami = [...konami, e.code].slice(-10);
      setKonami(newKonami);

      if (JSON.stringify(newKonami) === JSON.stringify(konamiCode)) {
        setShowMatrix(true);
        setTimeout(() => setShowMatrix(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);

  // Add CSS for hiding scrollbars
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const provider = {
    name: 'أحمد محمد علي',
    rating: 4.5,
    reviews: 51,
    speciality: 'فني صيانة منزلية',
    description: 'أنا متخصص في صيانة الأجهزة المنزلية وجميع أعمال السباكة وصيانة أنابيب الغاز وأنابيب المياه والمطابخ والحمامات وجميع الأعمال الكهربائية وصيانة المراوح والمصابيح وصيانة الغسالات والثلاجات والمكيفات وغيرها الكثير من خدمات الصيانة المنزلية.',
    address: 'القاهرة، مصر',
    phone: '+20 123 456 7890',
    email: 'ahmed@example.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    verified: true,
    responseTime: '٣٠ دقيقة'
  };

  const services = [
    {
      id: 1,
      name: 'صيانة مطبخ',
      price: '(500-600) ج.م',
      rating: '4.5',
      reviews: '51',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'صيانة سباكة',
      price: '(400-500) ج.م',
      rating: '4.8',
      reviews: '32',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'أعمال كهربائية',
      price: '(300-400) ج.م',
      rating: '4.6',
      reviews: '28',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        name: 'أعمال كهربائية',
        price: '(300-400) ج.م',
        rating: '4.6',
        reviews: '28',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop'
      },
      {
        id: 5,
        name: 'أعمال كهربائية',
        price: '(300-400) ج.م',
        rating: '4.6',
        reviews: '28',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop'
      },
      {
        id: 6,
        name: 'أعمال كهربائية',
        price: '(300-400) ج.م',
        rating: '4.6',
        reviews: '28',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop'
      }
  ];

  const portfolioImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
  ];

  const handleServiceClick = (service) => {
    console.log('🎉 Booking service:', service.name);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {showMatrix && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="text-green-400 font-mono text-4xl animate-pulse">
            01010111 01101111 01110111 00100001<br />
            <span className="text-2xl">~ The Matrix Easter Egg ~</span><br />
            <span className="text-xl">Try the Konami Code! ↑↑↓↓←→←→BA</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>الرئيسية</span>
            <ArrowLeft size={20} className="text-gray-600" />
            <span>الخدمات</span>
            <ArrowLeft size={20} className="text-gray-600" />
            <span>صيانة منزلية</span>
            <ArrowLeft size={20} className="text-gray-600" />
            <span className="text-gray-900 font-semibold">أحمد محمد علي</span>
          </div>
        </div>
      </div>

      {/* Provider Info */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src={provider.profileImage}
                alt={provider.name}
                className="w-full h-80 lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {provider.verified && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Award size={16} />
                  <span>موثق</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">
                    {provider.rating} ({provider.reviews})
                  </span>
                </div>
              </div>
              <button className="p-3 rounded-full hover:bg-gray-100 transition-colors group">
                <Heart className="w-6 h-6 text-gray-400 group-hover:text-red-500 group-hover:fill-current" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">{provider.address}</span>
            </div>

            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full border border-blue-200">
                {provider.speciality}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">يرد خلال {provider.responseTime}</span>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                عن الخدمة
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {provider.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                <Phone className="text-blue-600" size={18} />
                <span>{provider.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                <Mail className="text-blue-600" size={18} />
                <span>{provider.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section - Hidden scrollbar */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Coffee className="w-6 h-6 text-amber-600" />
            معرض الأعمال
          </h2>
        </div>
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
          {portfolioImages.map((image, index) => (
            <div key={index} className="relative group cursor-pointer overflow-hidden rounded-xl min-w-[300px] flex-shrink-0">
              <img src={image} alt={`عمل ${index + 1}`} className="w-full h-64 object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <div className="text-white text-center">
                  <p className="font-semibold">عمل رقم {index + 1}</p>
                  <p className="text-sm opacity-90">انقر للعرض</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section - Hidden scrollbar */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">خدمات أحمد</h2>
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
          {services.map((service) => (
            <UserServiceCard key={service.id} service={service} onDetails={handleServiceClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;