import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import ServiceDetailsCard from '../../components/serviceDetailsCard';
import { useNavigate } from 'react-router-dom';

const ServicesScreen = ({ onServiceSelect }) => {
    const allServices = Array(67).fill(null).map((_, i) => ({
        id: i + 1,
        title: 'صيانة مطبخ',
        provider: 'احمد محمد',
        price: '500-600',
        rating: '4.5',
        reviews: '(123)',
        image: 'images/avatar.jpg',
        avatar: 'images/avatar.jpg'
    }));
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const totalPages = Math.ceil(allServices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = allServices.slice(startIndex, endIndex);

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
                <span key={index} className="px-2 py-1 text-sm text-gray-500">...</span>
            ) : (
                <button
                    key={page}
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
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-8 py-8">

                <h1 className="text-3xl font-bold text-right text-gray-800 mb-10 mr-2">الخدمات</h1>

                <div className="flex gap-4">
                    {/* Left: Cards and Pagination */}
                    <div className="w-4/5 flex flex-col">

                        {/* Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentData.map(service => (
                                <ServiceDetailsCard
                                    key={service.id}
                                    service={service}
                                    cardStyle="vertical"
                                    navigation={() => navigate('/serviceDetails')}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {currentData.length > 0 && (
                            <div className="bg-white px-6 py-3 pt-8 mb-10 flex items-center justify-between  border-gray-200 mt-8">
                                {/* Left: Entry Count + Dropdown */}
                                <div className="relative flex items-center font-semibold gap-2 text-xs text-[#596375]">
                                    <span>
                                        Showing {startIndex + 1} to {Math.min(endIndex, allServices.length)} of {allServices.length} entries
                                    </span>

                                    {/* Dropdown */}
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
                                                        key={option}
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

                                {/* Right: Page Buttons */}
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


                        {/* Search */}
                        <input
                            type="text"
                            placeholder="البحث..."
                            className="w-full border-2 border-gray-300 rounded-lg px-2 py-2 mt-6 text-right mb-4"
                        />

                        {/* Filter Inputs */}
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { icon: '/images/icons/bib.png', label: 'ميكانيكي' },
                                { icon: '/images/icons/flashlight.png', label: 'كهرباء' },
                                { icon: '/images/icons/shovel.png', label: 'حفر' },
                                { icon: '/images/icons/wrench.png', label: 'سباكة' },
                                { icon: '/images/icons/brush.png', label: 'نقاشه' },
                                { icon: '/images/icons/tool-box.png', label: 'صيانه' },
                            ].map((filter, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 flex-row-reverse text-right px-4 py-2 border border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-100"
                                >
                                    <img src={filter.icon} alt={filter.label} className="w-5 h-7" />
                                    <span className="text-sm font-bold text-[#25282D]">{filter.label}</span>


                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ServicesScreen;
