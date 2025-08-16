import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const services = [
    {
        image: '/images/avatar.jpg',
        avatar: '/images/avatar.jpg',
        title: 'تنظيف المنازل',
        priceRange: '500-600',
        rating: 4.9,
        reviews: '(22)',
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

const ProviderRequestDetails = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const [requestData, setRequestData] = useState(null);

    useEffect(() => {
        const savedRequestData = localStorage.getItem('selectedRequestData');
        if (savedRequestData) {
            setRequestData(JSON.parse(savedRequestData));
        }
    }, []);

    const handleDeleteClick = () => {
        const confirmed = window.confirm("هل أنت متأكد من حذف هذا العنصر؟");
        if (confirmed) {
            navigate("/providers");
        }
    };

    const handleAccept = () => {
        if (requestData) {
            console.log('=== ACCEPTING REQUEST ===');
            console.log('Request data:', requestData);
            
            // First, add to providers list
            const success = addToProvidersList(requestData);
            console.log('Add to providers result:', success);
            
            if (success) {
                // Then remove from join requests
                removeFromJoinRequests(requestData.id);
                
                // Update status
                setStatus('accepted');
                
                console.log('=== DISPATCHING EVENTS ===');
                
                // Dispatch custom event for immediate UI update
                window.dispatchEvent(new CustomEvent('dataUpdated', { 
                    detail: { 
                        type: 'provider_accepted', 
                        providerId: requestData.id,
                        providerName: requestData.name 
                    } 
                }));
                
                // Navigate back after delay
                setTimeout(() => {
                    console.log('Navigating back to providers...');
                    navigate("/providers");
                }, 1500);
            } else {
                console.error('Failed to add provider to list');
            }
        }
    };

    const handleReject = () => {
        if (requestData) {
            console.log('=== REJECTING REQUEST ===');
            console.log('Request data:', requestData);
            
            // Remove from join requests
            removeFromJoinRequests(requestData.id);
            
            // Update status
            setStatus('rejected');
            
            console.log('=== DISPATCHING EVENTS ===');
            
            // Dispatch events
            window.dispatchEvent(new CustomEvent('dataUpdated', { 
                detail: { 
                    type: 'provider_rejected', 
                    providerId: requestData.id,
                    providerName: requestData.name 
                } 
            }));
            
            console.log('=== REJECTION EVENTS DISPATCHED ===');
            
            // Navigate back after delay
            setTimeout(() => {
                console.log('Navigating back to providers...');
                navigate("/providers");
            }, 1500);
        }
    };

    const addToProvidersList = (requestData) => {
        console.log('=== ADDING TO PROVIDERS LIST ===');
        console.log('Request data to add:', requestData);
        
        // Get existing providers from localStorage
        const savedProviders = localStorage.getItem('providers');
        console.log('Current saved providers:', savedProviders);
        
        let providers = [];
        
        if (savedProviders) {
            try {
                providers = JSON.parse(savedProviders);
                if (!Array.isArray(providers)) {
                    providers = [];
                }
            } catch (error) {
                console.error('Error parsing providers:', error);
                providers = [];
            }
        }

        console.log('Current providers array:', providers);

        // Check if provider already exists in providers list (not in join requests)
        // Only check email and phone since the request ID is different from provider ID
        const existingProvider = providers.find(p => 
            p.email === requestData.email || 
            p.phone === requestData.phone
        );
        
        console.log('Existing provider check result:', existingProvider);
        
        if (!existingProvider) {
            // Generate new ID for the provider (find the highest ID and add 1)
            const maxId = providers.length > 0 ? Math.max(...providers.map(p => p.id)) : 0;
            
            // Create unique name if duplicate exists
            let uniqueName = requestData.name;
            let counter = 1;
            while (providers.some(p => p.name === uniqueName)) {
                uniqueName = `${requestData.name} ${counter}`;
                counter++;
            }
            
            const newProvider = {
                id: maxId + 1,
                name: uniqueName,
                email: requestData.email,
                phone: requestData.phone,
                joinDate: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
                category: requestData.category,
                services: '0', // New provider starts with 0 services
                avatar: requestData.avatar || '/images/avatar.jpg',
                address: requestData.address || ''
            };

            providers.push(newProvider);
            
            console.log('New provider created:', newProvider);
            console.log('Updated providers array:', providers);
            
            localStorage.setItem('providers', JSON.stringify(providers));
            console.log('Providers saved to localStorage');
            
            return true;
        } else {
            console.log('Provider already exists in providers list:', existingProvider);
            console.log('Attempting to add anyway with unique identifiers...');
            
            // Even if similar provider exists, create a new one with unique email/phone
            const maxId = providers.length > 0 ? Math.max(...providers.map(p => p.id)) : 0;
            
            // Create unique identifiers
            let uniqueName = requestData.name;
            let uniqueEmail = requestData.email;
            let uniquePhone = requestData.phone;
            let counter = 1;
            
            // Make name unique
            while (providers.some(p => p.name === uniqueName)) {
                uniqueName = `${requestData.name} ${counter}`;
                counter++;
            }
            
            // Make email unique if needed
            if (providers.some(p => p.email === requestData.email)) {
                const emailParts = requestData.email.split('@');
                uniqueEmail = `${emailParts[0]}${counter}@${emailParts[1]}`;
            }
            
            // Make phone unique if needed
            if (providers.some(p => p.phone === requestData.phone)) {
                uniquePhone = requestData.phone + counter;
            }
            
            const newProvider = {
                id: maxId + 1,
                name: uniqueName,
                email: uniqueEmail,
                phone: uniquePhone,
                joinDate: new Date().toISOString().split('T')[0],
                category: requestData.category,
                services: '0',
                avatar: requestData.avatar || '/images/avatar.jpg',
                address: requestData.address || ''
            };

            providers.push(newProvider);
            
            console.log('New unique provider created:', newProvider);
            console.log('Updated providers array:', providers);
            
            localStorage.setItem('providers', JSON.stringify(providers));
            console.log('Providers saved to localStorage');
            
            return true;
        }
    };

    const removeFromJoinRequests = (requestId) => {
        console.log('=== REMOVING FROM JOIN REQUESTS ===');
        console.log('Removing request ID:', requestId);
        
        const savedRequests = localStorage.getItem('joinRequests');
        console.log('Current saved requests:', savedRequests);
        
        if (savedRequests) {
            try {
                const requests = JSON.parse(savedRequests);
                console.log('Parsed requests:', requests);
                
                if (Array.isArray(requests)) {
                    const updatedRequests = requests.filter(request => request.id !== requestId);
                    console.log('Updated requests after filter:', updatedRequests);
                    
                    localStorage.setItem('joinRequests', JSON.stringify(updatedRequests));
                    console.log('Updated requests saved to localStorage');
                } else {
                    console.error('Join requests is not an array:', requests);
                }
            } catch (error) {
                console.error('Error removing from join requests:', error);
            }
        } else {
            console.log('No join requests found in localStorage');
        }
    };

    if (!requestData) {
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
                        <img src="images/icons/Vector.png" alt="" className="w-2 h-3 mt-2" />
                        <h2 className="text-xl font-bold">{requestData.name}</h2>
                    </div>

                    <div className="flex me-10 gap-3">
                        {status === null && (
                            <>
                                <button
                                    onClick={handleAccept}
                                    className="px-6 py-2 bg-[#004AAD] text-white rounded-3xl text-sm font-semibold hover:bg-[#003a8c] transition-colors cursor-pointer"
                                >
                                    قبول الطلب
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="px-4 py-2 bg-[#FBFCFE] text-[#FF372A] border border-[#FF372A] rounded-3xl font-semibold text-sm hover:bg-[#FF372A] hover:text-white transition-colors cursor-pointer"
                                >
                                    رفض الطلب
                                </button>
                            </>
                        )}

                        {status === 'accepted' && (
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-6 py-2 bg-green-600 text-white rounded-3xl text-sm font-semibold cursor-default"
                                >
                                    ✓ تم القبول
                                </button>
                                <span className="text-sm text-gray-600">جاري التحديث...</span>
                            </div>
                        )}

                        {status === 'rejected' && (
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-6 py-2 bg-red-600 text-white rounded-3xl text-sm font-semibold cursor-default"
                                >
                                    ✗ تم الرفض
                                </button>
                                <span className="text-sm text-gray-600">جاري التحديث...</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 bg-white min-h-screen rounded-xl m-8 border-[#E1E1E1] border-1 " dir="rtl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                        <div className="flex flex-col gap-4 mt-2">
                            <div className="flex items-start mb-2 rounded-xl border-1 border-[#E1E1E1] p-4 h-[370px]">
                                <img
                                    src={requestData.avatar}
                                    alt={requestData.name}
                                    className="w-12 h-12 rounded-full object-cover me-2"
                                    onError={(e) => {
                                        e.target.src = 'images/avatar.jpg';
                                    }}
                                />
                                <div className="flex-1 text-right">
                                    <h3 className="text-lg font-bold mb-1">{requestData.name}</h3>
                                    <span className="inline-block text-xs text-[#0C9D61] bg-[#E6F7F0] rounded-lg px-2 py-1 mb-4">
                                        {requestData.category}
                                    </span>
                                    <div className="flex justify-between text-base mb-3 mt-2">
                                        <p className="text-black">العنوان: {requestData.address || 'غير محدد'}</p>
                                        <p className="text-black">البريد: {requestData.email}</p>
                                    </div>
                                    <p className="text-black mt-4">رقم الهاتف: {requestData.phone}</p>
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
                            <div className="flex items-start gap-4 mb-6 rounded-xl border-1  border-[#E1E1E1] p-5 w-full h-[530px]">
                                <div className="flex-1">
                                    <div className="flex justify-between px-2">
                                        <h3 className="text-lg font-bold mb-1">الخدمات</h3>
                                        <span className="text-sm text-left mb-1">المزيد {services.length}</span>
                                    </div>
                                    <div className='text-center mt-40 px-10'>
                                        <h2 className='text-xl font-bold mb-2'>{requestData.name} ليس صنايعى حاليا</h2>
                                        <p className='text-lg font-medium'>راجع بيانات {requestData.name} المقدمه من تاريخ {requestData.requestDate} لكى يستطيع اضافه خدمات </p>
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

export default ProviderRequestDetails;