import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  ArrowLeft,
  Zap,
} from "lucide-react";

import defaultImage from "../../assets/service1.png";
import ServicedetailsCard from "../../components/Servicedetailescard";

const ProviderProfile = () => {
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [portfolioImages, setPortfolioImages] = useState([]);

  const providerId = "6899ea2fd8e21a7315b23ab0";

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/user/getProfile/${providerId}`
        );

        setProvider(data);
        setServices(Array.isArray(data.services) ? data.services : []);

        const workshopImages =
          data.workshops?.map((w) => ({
            url: w?.mainImage?.secure_url || defaultImage,
            id: w?._id || w?.id,
          }))?.filter((x) => !!x.url) || [];

        const serviceImages =
          data.services?.map((s) => ({
            url: s?.mainImage?.secure_url || defaultImage,
            id: s?._id || s?.id,
          }))?.filter((x) => !!x.url) || [];

        setPortfolioImages([...workshopImages, ...serviceImages]);
      } catch (err) {
        console.error("Error fetching provider:", err);
        setProvider(null);
        setServices([]);
        setPortfolioImages([]);
      }
    };

    fetchProvider();
  }, []);

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جارٍ التحميل...</p>
        </div>
      </div>
    );
  }

  const handleNavigate = (url) => {
    alert(`Navigate to ${url}`);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <style>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="hover:text-blue-600 cursor-pointer">الرئيسية</span>
          <ArrowLeft size={16} className="text-gray-400" />
          <span className="hover:text-blue-600 cursor-pointer">الخدمات</span>
          <ArrowLeft size={16} className="text-gray-400" />
          <span className="text-gray-900 font-semibold">{provider?.name || "غير متوفر"}</span>
        </div>
      </div>

      {/* Provider Info */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src={provider?.profilePic?.secure_url || defaultImage}
                alt={provider?.name || "غير متوفر"}
                className="w-full h-80 lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {provider?.confirmed === "confirmed" && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Award size={16} />
                  <span>موثق</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{provider?.name || "غير متوفر"}</h1>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-700">— (0)</span>
              </div>
            </div>

            {provider?.address && (
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">{provider.address}</span>
              </div>
            )}

            {provider?.role && (
              <div className="mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full border border-blue-200">
                  {provider.role}
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">يرد خلال ساعة واحدة</span>
            </div>

            {provider?.aboutMe && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  عن مقدم الخدمة
                </h3>
                <p className="text-gray-700 leading-relaxed">{provider.aboutMe}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {provider?.phone && (
                <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                  <Phone className="text-blue-600" size={18} />
                  <span>{provider.phone}</span>
                </div>
              )}
              {provider?.email && (
                <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                  <Mail className="text-blue-600" size={18} />
                  <span>{provider.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio */}
      {portfolioImages.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h2 className="text-2xl font-bold text-black mb-6">معرض أعمال</h2>
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-4 pb-4 w-max">
              {portfolioImages.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group cursor-pointer"
                >
                  <img
                    src={item.url}
                    alt="portfolio"
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Services */}
      {services.length > 0 ? (
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            خدمات {provider?.name || ""}
          </h2>
          <div className="flex flex-wrap gap-4">
            {services.map((service) => (
              <ServicedetailsCard
                key={service._id || service.id}
                service={{
                  id: service._id || service.id,
                  title: service.title || "خدمة غير متوفرة",
                  price: service.price || 0,
                  image: service.mainImage?.secure_url || defaultImage,
                }}
                showBookButton={true}
                navigation={handleNavigate}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              لا توجد خدمات متاحة حالياً
            </h3>
            <p className="text-gray-600">
              سيتم عرض الخدمات هنا عند إضافتها من قبل مقدم الخدمة
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderProfile;