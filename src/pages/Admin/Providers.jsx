import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const Providers = () => {
    const [activeTab, setActiveTab] = useState('registered');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProviders, setSelectedProviders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [providers, setProviders] = useState([
        {
            id: 1,
            name: 'محمد أحمد الشيخ',
            email: 'provider@email.com',
            phone: '0123456789',
            joinDate: '22-5-2025',
            category: 'صيانة',
            services: '65',
            avatar: 'images/avatar.jpg'

        },
        {
            id: 2,
            name: 'أحمد محمد الشيخ',
            email: 'provider@email.com',
            phone: '0123456789',
            joinDate: '22-5-2025',
            category: 'كهرباء',
            services: '30',
            avatar: 'images/icons/provider.jpg'

        },
        {
            id: 3,
            name: 'علي محمد الشيخ',
            email: 'provider@email.com',
            phone: '0123456789',
            joinDate: '22-5-2025',
            category: 'نقاشه',
            services: '15',
            avatar: 'images/avatar.jpg'


        },
        {
            id: 4,
            name: 'محمد علي الشيخ',
            email: 'provider@email.com',
            phone: '0123456789',
            joinDate: '22-5-2025',
            category: 'سباكه',
            services: '20',
            avatar: 'images/icons/provider.jpg'

        },
        {
            id: 5,
            name: 'أحمد علي الشيخ',
            email: 'provider@email.com',
            phone: '0123456789',
            joinDate: '22-5-2025',
            category: 'نقاشه',
            services: '10',
            avatar: 'images/avatar.jpg'

        },
    ]);

    const [joinRequests, setJoinRequests] = useState([
        {
            id: 1,
            name: 'محمد أحمد الشيخ',
            email: 'provider@email.com',
            phone: '0123456789',
            status: 'قيد المراجعة',
            requestDate: '22-5-2025',
            category: 'نقاشه',
            action: 'المعلقه',
            avatar: 'images/avatar.jpg'

        },
        {
            id: 2,
            name: 'أحمد محمد الشيخ',
            email: 'provider@email.com',
            phone: '0123456789',
            status: 'قيد المراجعة',
            requestDate: '22-5-2025',
            category: 'كهرباء',
            action: 'المعلقه',
            avatar: 'images/icons/provider.jpg'
        },
        {
            id: 3,
            name: 'علي محمد الشيخ',
            email: 'provider@email.com',
            phone: '0123456789',
            status: 'مقبول',
            requestDate: '22-5-2025',
            category: 'نقاشه',
            action: 'قبول',
            avatar: 'images/avatar.jpg'

        },
        {
            id: 4,
            name: 'محمد علي الشيخ',
            email: 'provider@email.com',
            phone: '0123456789',
            status: 'مرفوض',
            requestDate: '22-5-2025',
            category: 'نجاره',
            action: 'رفض',
            avatar: 'images/icons/provider.jpg'
        },
        {
            id: 5,
            name: 'أحمد علي الشيخ',
            email: 'provider@email.com',
            phone: '0123456789',
            status: 'قيد المراجعة',
            requestDate: '22-5-2025',
            category: 'سباكه',
            action: 'المعلقه',
            avatar: 'images/avatar.jpg'

        },
    ]);

    const handleCheckboxChange = (id) => {
        setSelectedProviders(prev =>
            prev.includes(id)
                ? prev.filter(providerId => providerId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        const currentData = activeTab === 'registered' ? filteredProviders : filteredJoinRequests;
        if (selectedProviders.length === currentData.length) {
            setSelectedProviders([]);
        } else {
            setSelectedProviders(currentData.map(item => item.id));
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'صيانة':
                return <img src="/images/icons/flat.png" alt="صيانة" className="w-6 h-6" />;
            case 'كهرباء':
                return <img src="/images/icons/flashlight.png" alt="كهرباء" className="w-6 h-6" />;
            case 'نجاره':
                return <img src="/images/icons/flat.png" alt="نجاره" className="w-6 h-6 " />;
            case 'سباكه':
                return <img src="/images/icons/pipe-wrench.png" alt="سباكه" className="w-6 h-6" />;
            case 'نقاشه':
                return <img src="/images/icons/brush.png" alt="نقاشه" className="w-6 h-6" />;
            default:
                return <img src="/images/icons/flat.png" alt="مزود" className="w-6 h-6" />;
        }
    };


    const getCategoryColor = (category) => {
        switch (category) {
            case 'نقاشه':
                return 'bg-[#E6EDF7] w-18 h-8 ';
            case 'كهرباء':
                return 'bg-[#E6EDF7] w-18 h-8';
            case 'نجاره':
                return 'bg-[#E6EDF7] w-18 h-8';
            case 'سباكه':
                return 'bg-[#E6EDF7] w-18 h-8';
            default:
                return 'bg-[#E6EDF7] w-18 h-8';
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المزود؟')) {
            setProviders(providers.filter(provider => provider.id !== id));
        }
    };

    const handleEdit = (id) => {
        alert(`تعديل المزود رقم ${id}`);
    };

    const handleAccept = (id) => {
        setJoinRequests(joinRequests.map(request =>
            request.id === id ? { ...request, status: 'مقبول', action: 'قبول' } : request
        ));
    };

    const handleReject = (id) => {
        setJoinRequests(joinRequests.map(request =>
            request.id === id ? { ...request, status: 'مرفوض', action: 'رفض' } : request
        ));
    };

    // Filter data based on search term
    const filteredProviders = providers.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredJoinRequests = joinRequests.filter(request =>
        request.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentData = activeTab === 'registered' ? filteredProviders : filteredJoinRequests;

    const getActionButton = (action, status, id) => {
        if (activeTab === 'requests') {
            if (action === 'المعلقه') {
                return (
                    <div className="flex gap-1 justify-center">
                        <button
                            onClick={() => handleAccept(id)}
                            className="border border-[#004AAD] text-white bg-[#004AAD] px-4 py-1 rounded-lg text-xs font-semibold hover:bg-[#004AAD] hover:text-white"
                        >
                            قبول
                        </button>
                        <button
                            onClick={() => handleReject(id)}
                            className="border border-[#004AAD] text-[#004AAD]  px-4 py-1 rounded-lg rounded text-xs hover:bg-[#004AAD] hover:text-white"
                        >
                            رفض
                        </button>
                    </div>
                );
            } else {
                return (
                    <button className="border border-[#004AAD] text-[#004AAD] px-10 py-1 rounded-lg text-xs hover:bg-[#004AAD] hover:text-white">
                        التفاصيل
                    </button>
                );
            }
        } else {
            return (
                <div className="flex gap-1 justify-center">
                    <button
                        className="bg-white text-[#596375] rounded-lg shadow-xs border border-[#E0E4EE] p-2 "
                    >
                        <img src="/images/icons/dots.png" alt="خيارات" className="w-4 h-4" />
                    </button>
                    {/* Edit Button */}
                    <button
                        onClick={() => handleEdit(id)}
                        className="bg-white text-[#596375] rounded-lg shadow-xs border border-[#E0E4EE] p-2 "
                    >
                        <img src="/images/icons/Edit.png" alt="تعديل" className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={() => handleDelete(id)}
                        className="bg-white text-[#596375] rounded-lg shadow-xs border border-[#E0E4EE] p-2 "
                    >
                        <img src="/images/icons/Delete.png" alt="حذف" className="w-4 h-4" />
                    </button>
                </div>

            );
        }
    };

    return (
        <div className="p-5" dir="rtl">
            <h4 className='font-bold mb-3 text-lg'>الصنايعيه</h4>
            {/* Search and Tab Section */}
            <div className="rounded-lg  p-4 mb-4">
                <div className="flex items-center justify-between">
                    {/* Tabs on the right */}
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('registered')}
                            className={`px-20 py-2 text-sm font-semibold transition-colors rounded-lg ${activeTab === 'registered'
                                ? 'text-white bg-[#004AAD] border border-[#004AAD]'
                                : 'text-[#B0B0B0] font-semibold hover:text-gray-700 bg-white shadow-sm shadow-[#f5f5f5]'
                                }`}
                        >
                            المسجلين
                        </button>
                        <button
                            onClick={() => setActiveTab('requests')}
                            className={`px-20 py-2 text-sm font-semibold transition-colors rounded-l-lg border-r-0 ${activeTab === 'requests'
                                ? 'text-white bg-[#004AAD] border border-[#004AAD]'
                                : 'text-[#B0B0B0] font-semibold hover:text-gray-700 bg-white shadow-sm shadow-[#f5f5f5]'
                                }`}
                        >
                            طلبات انضمام
                        </button>
                    </div>

                    {/* Search and Button on the left */}
                    <div className="flex items-center gap-3">


                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="ابحث..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-80 pr-10 border border-gray-300 rounded-lg py-2 px-3 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-[#8D8E8F] rounded-lg hover:bg-gray-50 transition-colors">
                            <img src="/images/icons/filter.png" alt="فلتر" className="w-4 h-4 object-contain mt-1" />
                            فلتر
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-full" dir="rtl">
                        <thead className="bg-gray-50">
                            <tr className="text-right">
                                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right">
                                    <div className="flex items-center gap-2 justify-start">
                                        <input
                                            type="checkbox"
                                            checked={currentData.length > 0 && selectedProviders.length === currentData.length}
                                            onChange={handleSelectAll}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span>اسم الصنايعى</span>
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider text-right">التخصص</th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider text-right">رقم الهاتف</th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider text-right">البريد الإلكتروني</th>



                                <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider text-right">
                                    {activeTab === 'registered' ? 'تاريخ الانضمام' : 'تاريخ الطلب'}
                                </th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider text-right">
                                    {activeTab === 'registered' ? 'عدد الخدمات' : 'حاله الطلب'}
                                </th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-right">Action</th>
                            </tr>
                        </thead>


                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3 justify-start">
                                            <input
                                                type="checkbox"
                                                checked={selectedProviders.includes(item.id)}
                                                onChange={() => handleCheckboxChange(item.id)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-8 h-8 rounded-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=6366f1&color=ffffff&size=32`;
                                                }}
                                            />
                                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col items-start">
                                            <div className={`w-10 h-10 ${getCategoryColor(item.category)}  rounded-lg flex items-center justify-center mb-1`}>
                                                {getCategoryIcon(item.category)}
                                            </div>
                                            <span className="text-sm mr-4 font-semibold text-gray-600">{item.category}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                        {item.phone}
                                    </td>


                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black text-right">{item.email}</td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                        {activeTab === 'registered' ? item.joinDate : item.requestDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                        {activeTab === 'registered' ? (
                                            <span className="text-sm font-medium">{item.services}</span>
                                        ) : (
                                            <>
                                                {item.action === 'قبول' && (
                                                    <button className="px-3 py-1 text-sm border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition">
                                                        مقبول
                                                    </button>
                                                )}

                                                {item.action === 'المعلقه' && (
                                                    <button className="px-3 py-1 text-sm border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-50 transition">
                                                        قيد الانتظار
                                                    </button>
                                                )}

                                                {item.action === 'رفض' && (
                                                    <button className="px-3 py-1 text-sm border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition">
                                                        مرفوض
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {getActionButton(item.action, item.status, item.id)}
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>

                {/* No Results Message */}
                {currentData.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">لا توجد نتائج للبحث "{searchTerm}"</p>
                    </div>
                )}

                {/* Pagination */}
                {currentData.length > 0 && (
                    <div className="bg-white px-6 py-3 pt-8 mb-10 flex items-center justify-between border-t border !border-b-0 border-gray-200">
                        {/* Page Controls */}
                        <div className="flex items-center gap-1">
                            {/* Previous Arrow */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="px-1 py-1 text-sm border border-gray-300 rounded-lg hover:bg-[#E0E4EE] disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                <ChevronRight size={16} />
                            </button>

                            {/* Pages 1 to 4 */}
                            {[1, 2, 3, 4].map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 text-sm rounded  ${currentPage === page
                                        ? 'bg-[#E0E4EE] text-[#25282D] font-semibold'
                                        : 'border-gray-300 text-[#25282D] hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Ellipsis */}
                            <span className="px-2 py-1 text-sm text-[#25282D] font-semibold">...</span>

                            {/* Last Page (10) */}
                            <button
                                onClick={() => setCurrentPage(10)}
                                className={`px-3 py-1 text-sm rounded  ${currentPage === 10
                                    ? 'bg-[#E0E4EE] text-[#25282D] font-semibold'
                                    : 'border-gray-300 text-[#25282D] hover:bg-gray-100'
                                    }`}
                            >
                                10
                            </button>

                            {/* Next Arrow */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 10))}
                                className="px-1 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                                disabled={currentPage === 10}
                            >
                                <ChevronLeft size={16} />
                            </button>
                        </div>
                        {/* Text */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#596375]">
                                Showing 1 to {currentData.length} of {currentData.length} entries
                            </span>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
};

export default Providers;