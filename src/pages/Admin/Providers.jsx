import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Providers = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('registered');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProviders, setSelectedProviders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [providers, setProviders] = useState([]);
    const [joinRequests, setJoinRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to map API profession ID to Arabic category name
    const mapProfessionToCategory = (professionId) => {
        // You can create a mapping based on your profession IDs
        const professionMap = {
            '6899edafd8e21a7315b23ad7': 'نقاشه',
            // Add more mappings as needed
        };
        return professionMap[professionId] || 'عام';
    };

    // Function to fetch providers from API
    const fetchProviders = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('access_token'); 
            const response = await fetch('http://localhost:3000/admin/getAllProviders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `admin ${token}`,

                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiData = await response.json();
            
            // Map API data to component format
            const mappedProviders = [];
            const mappedRequests = [];

            apiData.forEach((provider, index) => {
                const mappedProvider = {
                    id: provider._id,
                    name: provider.name,
                    email: provider.email,
                    phone: provider.phone,
                    joinDate: new Date(provider.createdAt).toISOString().split('T')[0],
                    requestDate: new Date(provider.createdAt).toISOString().split('T')[0],
                    category: mapProfessionToCategory(provider.profession),
                    services: provider.workshops ? provider.workshops.length.toString() : '0',
                    avatar: provider.profilePic?.secure_url || '/images/avatar.jpg',
                    address: provider.address,
                    action: provider.confirmed === 'pending' ? 'المعلقه' : 'confirmed'
                };

                // Separate confirmed and pending providers
                if (provider.confirmed === 'confirmed') {
                    mappedProviders.push(mappedProvider);
                } else if (provider.confirmed === 'pending') {
                    mappedRequests.push(mappedProvider);
                }
            });

            setProviders(mappedProviders);
            setJoinRequests(mappedRequests);
        } catch (error) {
            console.error('Error fetching providers:', error);
            setError('فشل في تحميل البيانات');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProviders();
    }, []);

    useEffect(() => {
        const reloadData = () => {
            fetchProviders();
        };
        
        window.addEventListener('focus', reloadData);

        // Add this to listen to custom "dataUpdated" events
        const handleDataUpdated = (e) => {
            if (e.detail?.type === 'provider_rejected' || e.detail?.type === 'provider_accepted') {
                reloadData();
            }
        };
        window.addEventListener('dataUpdated', handleDataUpdated);

        return () => {
            window.removeEventListener('focus', reloadData);
            window.removeEventListener('dataUpdated', handleDataUpdated);
        };
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedProviders(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        const currentData = activeTab === 'registered' ? filteredProviders : filteredJoinRequests;
        setSelectedProviders(
            selectedProviders.length === currentData.length ? [] : currentData.map(p => p.id)
        );
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'صيانة': '/images/icons/flat.png',
            'كهرباء': '/images/icons/flashlight.png',
            'نجاره': '/images/icons/flat.png',
            'سباكه': '/images/icons/pipe-wrench.png',
            'نقاشه': '/images/icons/brush.png',
            'عام': '/images/icons/flat.png',
        };
        return <img src={icons[category] || '/images/icons/flat.png'} alt={category} className="w-6 h-6" />;
    };

    const getCategoryColor = () => 'bg-[#E6EDF7] w-18 h-8';

    const handleDelete = (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المزود؟')) {
            const updated = providers.filter(p => p.id !== id);
            setProviders(updated);
        }
    };

    const handleEdit = (id) => {
        alert(`تعديل المزود رقم ${id}`);
    };

    const handleProviderRowClick = (provider) => {
        localStorage.setItem('selectedProviderData', JSON.stringify(provider));
        console.log('Navigate to provider details:', provider);
    };

    const handleRequestRowClick = (request) => {
        localStorage.setItem('selectedRequestData', JSON.stringify(request));
        console.log('Navigate to request details:', request);
    };

    const handleProviderDetails = (provider) => {
        localStorage.setItem('selectedProviderData', JSON.stringify(provider));
        navigate(`/joinedProviderDetails`);
        setOpenDropdown(null);
    };

    const handleRequestDetails = (request) => {
        localStorage.setItem('selectedRequestData', JSON.stringify(request));
        navigate(`/providerRequestDetails`);
    };

    const toggleDropdown = (e, itemId) => {
        e.stopPropagation();
        setOpenDropdown(prev => (prev === itemId ? null : itemId));
    };

    const filteredProviders = providers.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredJoinRequests = joinRequests.filter(request =>
        request.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentData = activeTab === 'registered' ? filteredProviders : filteredJoinRequests;

    const getActionButton = (item) => {
        if (activeTab === 'requests') {
            return (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRequestDetails(item);
                    }}
                    className="border border-[#004AAD] text-[#004AAD] px-4 mb-1  font-semibold py-1 rounded-2xl text-sm hover:bg-[#004AAD] hover:text-white"
                >
                    تفاصيل طلب
                </button>
            );
        } else {
            return (
                <div className="flex gap-1 justify-center">
                    {/* More Button */}
                    <div className="relative">
                        <button
                            onClick={(e) => toggleDropdown(e, item.id)}
                            className="bg-white text-[#596375] rounded-lg shadow-xs border border-[#E0E4EE] p-2 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <img src="/images/icons/dots.png" alt="خيارات" className="w-4 h-4" />
                        </button>
                        {openDropdown === item.id && (
                            <div className="absolute left-0 mt-2 w-40 rounded-lg text-white font-semibold mb-3 bg-[#004AAD] shadow-lg z-50">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleProviderDetails(item);
                                    }}
                                    className="w-full text-center px-4 py-2 text-sm rounded-lg cursor-pointer hover:bg-[#003a8c] transition-colors"
                                >
                                    عرض التفاصيل
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Edit Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(item.id);
                        }}
                        className="bg-white text-[#596375] rounded-lg shadow-xs border border-[#E0E4EE] p-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <img src="/images/icons/Edit.png" alt="تعديل" className="w-4 h-4" />
                    </button>
                    {/* Delete Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                        }}
                        className="bg-white text-[#596375] rounded-lg shadow-xs border border-[#E0E4EE] p-2 cursor-pointer hover:bg-red-50 transition-colors"
                    >
                        <img src="/images/icons/Delete.png" alt="حذف" className="w-4 h-4" />
                    </button>
                </div>
            );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">جاري تحميل البيانات...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-red-600">{error}</div>
                <button 
                    onClick={fetchProviders}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Page Title */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 text-right mr-3">الصنايعيه</h1>
            </div>
            {/* Header Tabs and Search */}
            <div className="flex gap-1 justify-between mr-2">
                <div className="relative">
                    <button
                        onClick={() => setActiveTab('registered')}
                        className={`px-20 py-2 text-sm font-semibold transition-colors rounded-lg ${activeTab === 'registered'
                            ? 'text-white bg-[#004AAD] border border-[#004AAD]'
                            : 'text-[#B0B0B0] font-semibold hover:text-gray-700 bg-white shadow-inner'
                            }`}
                    >
                        المسجلين 
                    </button>
                    <button
                        onClick={() => setActiveTab('requests')}
                        className={`px-20 py-2 text-sm font-semibold transition-colors rounded-l-lg border-r-0 ${activeTab === 'requests'
                            ? 'text-white bg-[#004AAD] border border-[#004AAD]'
                            : 'text-[#B0B0B0] font-semibold hover:text-gray-700 bg-white shadow-inner'
                            }`}
                    >
                        طلبات انضمام 
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative bg-white rounded-xl border border-[#EBECED]">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none ">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="ابحث..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-80 pr-10 border border-gray-300 rounded-lg py-2 px-3 text-right focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#EBECED] text-gray-400 bg-white hover:bg-gray-50 transition-colors">
                        <img src="/images/icons/filter.png" alt="فلتر" className="w-4 h-4 object-contain mt-1" />
                        فلتر
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-4">
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
                                <th className="px-6 py-3 text-sm font-medium text-gray-500  tracking-wider text-right">الإجراء</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                        activeTab === 'registered'
                                            ? handleProviderRowClick(item)
                                            : handleRequestRowClick(item);
                                    }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3 justify-start">
                                            <input
                                                type="checkbox"
                                                checked={selectedProviders.includes(item.id)}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    handleCheckboxChange(item.id);
                                                }}
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black text-right">{item.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                        {activeTab === 'registered' ? item.joinDate : item.requestDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                        {activeTab === 'registered' ? (
                                            <span className="text-sm font-medium">{item.services}</span>
                                        ) : (
                                            <button className="px-4 pb-1 font-semibold text-sm border-1 bg-[#FFFDFA] border-[#FFC62B] text-[#FFC62B] rounded-3xl transition">
                                                المعلقه
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {getActionButton(item)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {currentData.length === 0 && !loading && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">
                            {searchTerm ? `لا توجد نتائج للبحث "${searchTerm}"` : 'لا توجد بيانات'}
                        </p>
                    </div>
                )}

                {currentData.length > 0 && (
                    <div className="bg-white px-6 py-3 pt-8 mb-10 flex items-center justify-between border-t border !border-b-0 border-gray-200">
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="px-1 py-1 text-sm border border-gray-300 rounded-lg hover:bg-[#E0E4EE] disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                <ChevronRight size={16} />
                            </button>
                            {[1, 2, 3, 4].map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 text-sm rounded ${currentPage === page
                                        ? 'bg-[#E0E4EE] text-[#25282D] font-semibold'
                                        : 'border-gray-300 text-[#25282D] hover:bg-gray-100'}`}
                                >
                                    {page}
                                </button>
                            ))}
                            <span className="px-2 py-1 text-sm text-[#25282D] font-semibold">...</span>
                            <button
                                onClick={() => setCurrentPage(10)}
                                className={`px-3 py-1 text-sm rounded ${currentPage === 10
                                    ? 'bg-[#E0E4EE] text-[#25282D] font-semibold'
                                    : 'border-gray-300 text-[#25282D] hover:bg-gray-100'}`}
                            >
                                10
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 10))}
                                className="px-1 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                                disabled={currentPage === 10}
                            >
                                <ChevronLeft size={16} />
                            </button>
                        </div>
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