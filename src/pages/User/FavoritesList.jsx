import React, { useState } from "react";
import { Star } from "lucide-react";

const services = [
  {
    id: 1,
    cover: "/images/avatar.jpg",
    logo: "/images/icons/bookmark-filled.png",
    title: "صيانة مطبخ",
    provider: "أحمد محمد",
    providerImage: "/images/provider-pic.png",
    rating: 4.5,
    reviews: 51,
    price: "500-600",
  },
  {
    id: 2,
    cover: "/images/avatar.jpg",
    logo: "/images/icons/bookmark-filled.png",
    title: "خدمة تنظيف المنازل",
    provider: "محمد علي",
    providerImage: "/images/provider-pic.png",
    rating: 4.8,
    reviews: 120,
    price: "200-300",
  },
  {
    id: 3,
    cover: "/images/avatar.jpg",
    logo: "/images/icons/bookmark-filled.png",
    title: "تصليح كهرباء",
    provider: "سعيد عبد الله",
    providerImage: "/images/provider-pic.png",
    rating: 4.6,
    reviews: 89,
    price: "150-250",
  },
  {
    id: 4,
    cover: "/images/avatar.jpg",
    logo: "/images/icons/bookmark-filled.png",
    title: "سباكة وصيانة",
    provider: "حسن إبراهيم",
    providerImage: "/images/provider-pic.png",
    rating: 4.7,
    reviews: 105,
    price: "300-450",
  },
  {
    id: 5,
    cover: "/images/avatar.jpg",
    logo: "/images/icons/bookmark-filled.png",
    title: "دهان وتشطيب",
    provider: "مصطفى كمال",
    providerImage: "/images/provider-pic.png",
    rating: 4.9,
    reviews: 76,
    price: "800-1200",
  },
  {
    id: 6,
    cover: "/images/avatar.jpg",
    logo: "/images/icons/bookmark-filled.png",
    title: "تنظيف سجاد",
    provider: "محمود يوسف",
    providerImage: "/images/provider-pic.png",
    rating: 4.4,
    reviews: 60,
    price: "100-200",
  },
];

const ITEMS_PER_PAGE = 3;

export default function FavoritesScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // فلترة الخدمات حسب نص البحث (في العنوان أو المزود)
  const filteredServices = services.filter(
    (service) =>
      service.title.includes(searchTerm) ||
      service.provider.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  const handleBookmarkClick = (serviceId) => {
    console.log(`Bookmark clicked for service ID: ${serviceId}`);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // لما يتغير البحث، نرجع للصفحة الأولى
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div
      className="min-h-screen bg-gray-50 p-4"
      dir="rtl"
      style={{ fontFamily: "Almarai, sans-serif" }}
    >
      {/* Search input بدل الهيدر */}
      <div className="mb-4 max-w-sm">
        <div className="mb-4 max-w-sm relative">
          <input
            type="text"
            placeholder="ابحث عن خدمة أو مزود..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main-500 pr-10"
            style={{ fontFamily: "Almarai, sans-serif" }}
          />
          <img
            src="/images/icons/search.png"
            alt="بحث"
            className="w-7 h-7 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="relative">
              <img
                src={service.cover}
                alt={service.title}
                className="w-full h-40 object-cover"
              />
              <button
                onClick={() => handleBookmarkClick(service.id)}
                className="absolute top-2 left-2 cursor-pointer bg-transparent p-1 rounded-full w-7 h-7 flex items-center justify-center hover:bg-black/20 transition"
              >
                <img
                  src={service.logo}
                  alt="bookmark"
                  className="w-4 h-4 object-contain"
                />
              </button>
              <div className="absolute top-2 right-2 bg-black/40 px-2 py-0.5 rounded-full flex items-center gap-1 text-xs text-white">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span>{service.rating}</span>
                <span className="text-gray-200">({service.reviews})</span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-bold text-gray-800">{service.title}</h2>
                <span className="text-gray-800 font-bold">
                  ({service.price}) ج.م
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={service.providerImage}
                  alt={service.provider}
                  className="w-6 h-6 rounded-full border border-gray-200"
                />
                <span className="text-sm text-gray-500">
                  {service.provider}
                </span>
              </div>
              <button
                className="w-full mt-3 py-2 cursor-pointer rounded-full transition-all duration-200 hover:scale-105 hover:text-white"
                style={{
                  border: "2px solid var(--color-main-500)",
                  color: "var(--color-main-500)",
                  backgroundColor: "transparent",
                  fontFamily: "Almarai, sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-main-500)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-main-500)";
                }}
              >
                احجز الآن
              </button>
            </div>
          </div>
        ))}

        {filteredServices.length === 0 && (
          <p className="text-center text-gray-500 w-full col-span-full">
            لا توجد نتائج مطابقة للبحث
          </p>
        )}
      </div>

      {/* Pagination */}
      {filteredServices.length > 0 && (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <p>
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredServices.length)} of{" "}
            {filteredServices.length} entries
          </p>
          <div className="flex gap-1 items-center">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
            >
              السابق
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`px-3 py-1 rounded-md ${
                  num === currentPage
                    ? "bg-main-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
            >
              التالي
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
