import React, { useState, useEffect } from 'react';
import AdminServiceCard from '../../components/AdminServiceCard';
import { Trash2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const JoinedProviderDetails = () => {
    const navigate = useNavigate();
    const [providerData, setProviderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedProviderData = localStorage.getItem('selectedProviderData');
        if (savedProviderData) {
            const parsedData = JSON.parse(savedProviderData);
            fetchProviderDetails(parsedData.id);
        } else {
            setError('لا توجد بيانات للمزود');
            setLoading(false);
        }
    }, []);

    const fetchProviderDetails = async (providerId) => {
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
            
            // Find the specific provider by ID
            const provider = apiData.find(p => p._id === providerId);
            
            if (!provider) {
                throw new Error('Provider not found');
            }
            
            // Map API data to component format
            const mappedProvider = {
                id: provider._id,
                name: provider.name,
                email: provider.email,
                phone: provider.phone,
                joinDate: new Date(provider.createdAt).toISOString().split('T')[0],
                category: mapProfessionToCategory(provider.profession),
                services: provider.workshops ? provider.workshops.length.toString() : '0',
                avatar: provider.profilePic?.secure_url || '/images/avatar.jpg',
                address: provider.address || 'غير محدد',
                description: provider.aboutMe || 'لا توجد نبذة متاحة',
                idFront: provider.identityPic && provider.identityPic[1] ? provider.identityPic[1].secure_url : '/images/front-id.png',
                idBack: provider.identityPic && provider.identityPic[0] ? provider.identityPic[0].secure_url : '/images/back-id.png',
                portfolio: provider.portfolio || [],
                workingHours: provider.workingHours || getDefaultWorkingHours()
            };

            setProviderData(mappedProvider);
        } catch (error) {
            console.error('Error fetching provider details:', error);
            setError('فشل في تحميل بيانات المزود');
        } finally {
            setLoading(false);
        }
    };

    const mapProfessionToCategory = (professionId) => {
        const professionMap = {
            '6899edafd8e21a7315b23ad7': 'نقاشه',
            // Add more mappings as needed
        };
        return professionMap[professionId] || 'عام';
    };

    const getDefaultWorkingHours = () => [
        { day: 'الإثنين', hours: '5:00 ص الى 9:00م', isUnavailable: false },
        { day: 'الثلاثاء', hours: '5:00 ص الى 9:00م', isUnavailable: false },
        { day: 'الأربعاء', hours: 'غير متاح', isUnavailable: true },
        { day: 'الخميس', hours: '5:00 ص الى 9:00م', isUnavailable: false },
        { day: 'الجمعة', hours: '5:00 ص الى 9:00م', isUnavailable: false },
        { day: 'السبت', hours: '5:00 ص الى 9:00م', isUnavailable: false },
        { day: 'الاحد', hours: '5:00 ص الى 9:00م', isUnavailable: false },
    ];

    const handleDeleteClick = async () => {
        const confirmed = window.confirm("هل أنت متأكد من حذف هذا المزود؟");
        if (confirmed && providerData?.id) {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch(`http://localhost:3000/admin/deleteProvider/${providerData.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `admin ${token}`,
                    },
                });

                if (response.ok) {
                    // Dispatch event to update providers list
                    window.dispatchEvent(new CustomEvent('dataUpdated', { 
                        detail: { 
                            type: 'provider_deleted', 
                            providerId: providerData.id 
                        } 
                    }));
                    
                    setTimeout(() => {
                        navigate("/providers");
                    }, 1000);
                } else {
                    alert('فشل في حذف المزود');
                }
            } catch (error) {
                console.error('Error deleting provider:', error);
                alert('حدث خطأ أثناء حذف المزود');
            }
        }
    };

    if (loading) {
        return (
            <div className="p-6 text-center">
                <p>جاري تحميل البيانات...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-600">{error}</p>
                <button 
                    onClick={() => navigate("/providers")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    العودة للصفحة الرئيسية
                </button>
            </div>
        );
    }

    if (!providerData) {
        return (
            <div className="p-6 text-center">
                <p>لا توجد بيانات للمزود</p>
            </div>
        );
    }

    return (
        <>
            <div>
                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2 mr-8">
                        <h2 className="text-xl font-bold">الصنايعيه</h2>
                        <img src="images/icons/Vector.png" alt="" className='w-2 h-3 mt-2' />
                        <h2 className="text-xl font-bold">{providerData.name}</h2>
                    </div>
                    <button onClick={handleDeleteClick} className='text-left me-8 bg-white border-1 border-[#E1E1E1] p-2 rounded-lg'>
                        <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
                <div className="p-6 bg-white min-h-screen rounded-xl m-8 border-[#E1E1E1] border-1 " dir="rtl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                        <div className="flex flex-col gap-4 mt-2">
                            <div className="flex items-start mb-2 rounded-xl border-1  border-[#E1E1E1] p-4 h-[370px] ">
                                <img
                                    src={providerData.avatar}
                                    alt={providerData.name}
                                    className="w-12 h-12 rounded-full object-cover me-2"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(providerData.name)}&background=6366f1&color=ffffff&size=48`;
                                    }}
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-1">{providerData.name}</h3>

                                    <span className="inline-block text-xs text-[#0C9D61] bg-[#E6F7F0] rounded-lg px-2 py-1 mb-4">
                                        {providerData.category}
                                    </span>

                                    <div className="flex justify-between text-right text-base mb-3 mt-2">
                                        <p className="text-black">العنوان: {providerData.address}</p>
                                        <p className="text-black">البريد: {providerData.email}</p>
                                    </div>
                                    <p className="text-black mt-4">رقم الهاتف: {providerData.phone}</p>

                                    <p className="text-black mt-6 leading-relaxed">
                                        نبذه : {providerData.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 rounded-xl border border-[#E1E1E1] p-4 w-full h-[430px]">
                                <h3 className="text-lg font-bold mt-1">معرض اعمال</h3>

                                <div
                                    className="flex overflow-x-auto gap-4 py-2"
                                    style={{ scrollbarWidth: 'none' }}
                                >
                                    {providerData.portfolio && providerData.portfolio.length > 0 ? (
                                        providerData.portfolio.map((item, index) => (
                                            <img
                                                key={`portfolio-${index}`}
                                                src={item.secure_url || item}
                                                alt={`عمل ${index + 1}`}
                                                className="w-35 h-25 rounded-xl object-cover mt-1"
                                                onError={(e) => {
                                                    e.target.src = "images/avatar.jpg";
                                                }}
                                            />
                                        ))
                                    ) : (
                                        [...Array(6)].map((_, index) => (
                                            <img
                                                key={`default-portfolio-${index}`}
                                                src="images/avatar.jpg"
                                                alt={`عمل ${index + 1}`}
                                                className="w-35 h-25 rounded-xl object-cover mt-1"
                                            />
                                        ))
                                    )}
                                </div>

                                <h3 className="text-lg font-bold mt-1">مواعيد العمل</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-right">
                                    {providerData.workingHours.map((item, index) => (
                                        <div key={`working-hours-${index}`} className="text-gray-600 mt-2">
                                            <div className="font-semibold text-black mb-3">{item.day}</div>
                                            <div className={`text-xs ${item.isUnavailable ? 'text-red-600 font-base' : 'text-black'}`}>
                                                {item.hours}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4  mt-2 rounded-xl border-1 border-[#E1E1E1] p-4 h-[270px]">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-1 px-2">اثبات هويه</h3>

                                    <div className="flex gap-4 mt-4">
                                        <img
                                            src={providerData.idFront}
                                            alt="صورة الهوية الأمامية"
                                            className="w-55 h-45 object-cover rounded-lg mr-3"
                                            onError={(e) => {
                                                e.target.src = "/images/front-id.png";
                                            }}
                                        />
                                        <img
                                            src={providerData.idBack}
                                            alt="صورة الهوية الخلفية"
                                            className="w-55 h-45 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.src = "/images/back-id.png";
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="flex items-start gap-4 mb-6 rounded-xl border-1  border-[#E1E1E1] p-5 w-full">
                                <div className="flex-1">
                                    <div className="flex justify-between px-2">
                                        <h3 className="text-lg font-bold mb-1">الخدمات</h3>
                                        <span className="text-sm text-left mb-1">المزيد {providerData.services}</span>
                                    </div>

                                    <div className="space-y-4 mt-2">
                                        {/* This would be replaced with actual services from API when available */}
                                        {providerData.services > 0 ? (
                                            // You can map actual services here when they're available in the API
                                            <div className="text-center py-8">
                                                <p className="text-gray-500">عدد الخدمات: {providerData.services}</p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-gray-500">لا توجد خدمات مضافة بعد</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default JoinedProviderDetails;