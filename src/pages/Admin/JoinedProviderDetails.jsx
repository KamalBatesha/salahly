import React, { useState, useEffect } from 'react';
import AdminServiceCard from '../../components/AdminServiceCard';
import { Trash2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const services = [
    {
        image: '/images/avatar.jpg',
        avatar: '/images/avatar.jpg',
        title: 'تنظيف المنازل',
        priceRange: '500-600',
        rating: 4.9,
        reviews: '(45)',
    },
    {
        image: '/images/avatar.jpg',
        avatar: '/images/avatar.jpg',
        title: 'صيانة كهرباء',
        priceRange: '400-700',
        rating: 4.7,
        reviews: '(51)',
    },
];

const JoinedProviderDetails = () => {
    const navigate = useNavigate();
    const [providerData, setProviderData] = useState(null);

    useEffect(() => {
        const savedProviderData = localStorage.getItem('selectedProviderData');
        if (savedProviderData) {
            setProviderData(JSON.parse(savedProviderData));
        }
    }, []);

    const handleDeleteClick = () => {
        const confirmed = window.confirm("هل أنت متأكد من حذف هذا العنصر؟");
        if (confirmed) {
            navigate("/providers");
        }
    };

    if (!providerData) {
        return (
            <div className="p-6 text-center">
                <p>جاري تحميل البيانات...</p>
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
                                        نبذه : Lorem ipsum dolor sit amet consectetur. Venenatis in urna et non e feugiat id faucibus tellus. Lectus tellus sit integer metus sit. A et arcu diam vestibulum dignissim volutpat phasellus lacus risus. Faucibus aliquam risus lectus mauris lacinia ac pellentesque eleifend vitae. Dignissim dui morbi eleifend lorem.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 rounded-xl border border-[#E1E1E1] p-4 w-full h-[430px]">
                                <h3 className="text-lg font-bold mt-1">معرض اعمال</h3>

                                <div
                                    className="flex overflow-x-auto gap-4 py-2"
                                    style={{ scrollbarWidth: 'none' }}
                                >
                                    {[...Array(6)].map((_, index) => (
                                        <img
                                            key={index}
                                            src="images/avatar.jpg"
                                            alt={`Avatar ${index + 1}`}
                                            className="w-35 h-25 rounded-xl object-cover mt-1 "
                                        />
                                    ))}
                                </div>

                                <h3 className="text-lg font-bold mt-1">مواعيد العمل</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-right">
                                    {[
                                        { day: 'الإثنين', hours: '5:00 ص الى 9:00م' },
                                        { day: 'الثلاثاء', hours: '5:00 ص الى 9:00م' },
                                        { day: 'الأربعاء', hours: 'غير متاح', isUnavailable: true },
                                        { day: 'الخميس', hours: '5:00 ص الى 9:00م' },
                                        { day: 'الجمعة', hours: '5:00 ص الى 9:00م' },
                                        { day: 'السبت', hours: '5:00 ص الى 9:00م' },
                                        { day: 'الاحد', hours: '5:00 ص الى 9:00م' },
                                    ].map((item, index) => (
                                        <div key={index} className="text-gray-600 mt-2">
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
                                            src="/images/front-id.png"
                                            alt="صورة الهوية 1"
                                            className="w-55 h-45 object-cover rounded-lg mr-3 "
                                        />
                                        <img
                                            src="/images/back-id.png"
                                            alt="صورة الهوية 2"
                                            className="w-55 h-45 object-cover rounded-lg "
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="flex items-start gap-4 mb-6 rounded-xl border-1  border-[#E1E1E1] p-5 w-full">
                                <div className="flex-1">
                                    <div className="flex justify-between px-2">
                                        <h3 className="text-lg font-bold mb-1">الخدمات</h3>
                                        <span className="text-sm text-left mb-1">المزيد {services.length}</span>
                                    </div>

                                    <div className="space-y-4 mt-2">
                                        {services.map((service, index) => (
                                            <AdminServiceCard
                                                key={index}
                                                service={service}
                                                cardStyle="vertical"
                                                // navigation={() => {
                                                //     console.log('navigate to providerServicesScreen');
                                                // }}
                                            />
                                        ))}
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