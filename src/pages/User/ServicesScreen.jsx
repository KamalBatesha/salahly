import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import ServiceDetailsCard from '../../components/serviceDetailsCard';
import { useNavigate } from 'react-router-dom';

const ServicesScreen = ({ onServiceSelect }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
        fetchServices();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3000/category');
            const data = await response.json();
            const categoriesArray = Array.isArray(data) ? data : (data?.categories ? data.categories : []);
            setCategories(categoriesArray.map(cat => ({
                ...cat,
                categoryIcon:
                    cat.categoryIcon ||
                    cat.icon ||
                    cat.image?.secure_url ||
                    cat.image ||
                    cat.categories?.image || ''
            })));
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        }
    };

    const fetchServices = async (categoryName = '') => {
        setLoading(true);
        try {
            let url = 'http://localhost:3000/user/getServiceByName';
            if (categoryName) {
                url += `?name=${encodeURIComponent(categoryName)}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            let servicesArray = Array.isArray(data) ? data : (data?.services ? data.services : []);
            servicesArray = servicesArray.map((service, index) => ({
                id: service.id || service._id || `service-${index}`,
                title: service.title || service.name || service.serviceName,
                provider: service.description || service.providerName || service.user?.name,
                price: service.price || `${service.minPrice} - ${service.maxPrice}` || service.cost,
                rating: service.rating || service.averageRating || '4.5',
                reviews: service.reviews || service.reviewCount || '(0)',
                image: service.mainImage?.secure_url || service.images?.[0] || '/images/avatar.jpg',
                avatar: service.mainImage?.secure_url || service.providerImage || service.user?.image || '/images/avatar.jpg',
                categoryIcon: service.categories?.image || ""
            }));
            setServices(servicesArray);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error fetching services:', error);
            setServices([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim()) {
            fetchServices(value.trim());
            setSelectedCategory('');
        } else {
            fetchServices();
            setSelectedCategory('');
        }
    };

    const handleCategoryClick = (categoryTitle) => {
        setSelectedCategory(categoryTitle);
        setSearchTerm('');
        fetchServices(categoryTitle); 
    };

    const handleClearFilters = () => {
        setSelectedCategory('');
        setSearchTerm('');
        fetchServices();
    };

    const handleServiceNavigation = (serviceId) => {
        navigate(`/serviceDetails/${serviceId}`);
    };

    const totalPages = Math.ceil((services || []).length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = (services || []).slice(startIndex, endIndex);
    const pageOptions = [6, 12, 18];

    const renderPageButtons = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages.map((page, index) =>
            page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 py-1 text-sm text-gray-500">...</span>
            ) : (
                <button
                    key={`page-${page}`}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded ${currentPage === page
                        ? 'bg-[#F7F9FB] text-[#25282D] font-semibold'
                        : ' text-[#25282D] hover:bg-gray-100'}`}
                >
                    {page}
                </button>
            )
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-8 py-8">
                <h1 className="text-3xl font-bold text-right text-gray-800 mb-10 mr-2">الخدمات</h1>
                <div className="flex gap-4">
                    {/* Left: Cards and Pagination */}
                    <div className="w-4/5 flex flex-col">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="text-lg text-gray-600">جاري التحميل...</div>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-4 justify-end">
                                {currentData.map(service => (
                                    <div key={service.id} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]">
                                        <ServiceDetailsCard
                                            service={service}
                                            cardStyle="vertical"
                                            navigation={() => handleServiceNavigation(service.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {!loading && (!services || services.length === 0) && (
                            <div className="flex justify-center items-center h-64">
                                <div className="text-lg text-gray-600">لا توجد خدمات</div>
                            </div>
                        )}
                        {currentData.length > 0 && (
                            <div className="bg-white px-6 py-3 pt-8 mb-10 flex items-center justify-between  border-gray-200 mt-8">
                                <div className="relative flex items-center font-semibold gap-2 text-xs text-[#596375]">
                                    <span>
                                        Showing {startIndex + 1} to {Math.min(endIndex, (services || []).length)} of {(services || []).length} entries
                                    </span>
                                    <div className="relative">
                                        <button
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                            className="ml-2 gap-1 flex items-center px-2 py-1 text-[#25282D] font-semibold border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
                                        >
                                            <span>Show&nbsp;{itemsPerPage}</span>
                                            <ChevronUp size={16} />
                                        </button>
                                        {dropdownOpen && (
                                            <div className="absolute bottom-full mb-2 right-0 bg-white rounded-md shadow-md z-10">
                                                {pageOptions.map((option) => (
                                                    <div
                                                        key={`option-${option}`}
                                                        onClick={() => {
                                                            setItemsPerPage(option);
                                                            setCurrentPage(1);
                                                            setDropdownOpen(false);
                                                        }}
                                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                    >
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 flex-row-reverse">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        className="px-1 py-1 text-sm border border-gray-300 rounded-lg hover:bg-[#E0E4EE] disabled:opacity-50"
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                    {renderPageButtons()}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        className="px-1 py-1 text-sm border border-gray-300 rounded-lg hover:bg-[#E0E4EE] disabled:opacity-50"
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Right: Filters/Search */}
                    <div className="w-1/6 border border-gray-300 rounded-xl px-4 py-2 flex flex-col gap-3 ml-8 max-h-[500px] overflow-y-auto">
                        <input
                            type="text"
                            placeholder="البحث..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full border-2 border-gray-300 rounded-lg px-2 py-2 mt-6 text-right mb-4"
                        />
                        <div className="grid grid-cols-1 gap-3">
                            {categories.length === 0 ? (
                                <div className="text-sm text-gray-500 text-center py-4">
                                    لا توجد تصنيفات متاحة
                                </div>
                            ) : (
                                categories.map((category) => (
                                    <div
                                        key={`category-${category.id || category._id || category.title}`}
                                        onClick={() => handleCategoryClick(category.title)}
                                        className={`flex items-center gap-2 flex-row-reverse text-right px-4 py-2 border border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors ${selectedCategory === category.title ? 'bg-blue-50 border-blue-300' : ''
                                            }`}
                                    >
                                        {(category.categoryIcon) && (
                                            <img
                                                src={category.categoryIcon}
                                                alt={category.title}
                                                className="w-5 h-5 object-contain"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                        <span className={`text-sm font-bold ${selectedCategory === category.title ? 'text-blue-600' : 'text-[#25282D]'
                                            }`}>
                                            {category.title}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesScreen;
