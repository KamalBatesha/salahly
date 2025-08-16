import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const ProviderRequestDetails = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const [requestData, setRequestData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedRequestData = localStorage.getItem('selectedRequestData');
        if (savedRequestData) {
            const parsedData = JSON.parse(savedRequestData);
            fetchRequestDetails(parsedData.id);
        } else {
            setError('لا توجد بيانات للطلب');
            setLoading(false);
        }
    }, []);

    const fetchRequestDetails = async (requestId) => {
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

            // Find the specific request by ID
            const request = apiData.find(p => p._id === requestId);

            if (!request) {
                throw new Error('Request not found');
            }

            // Map API data to component format
            const mappedRequest = {
                id: request._id,
                name: request.name,
                email: request.email,
                phone: request.phone,
                requestDate: new Date(request.createdAt).toISOString().split('T')[0],
                category: mapProfessionToCategory(request.profession),
                avatar: request.profilePic?.secure_url || '/images/avatar.jpg',
                address: request.address || 'غير محدد',
                description: request.aboutMe || 'لا توجد نبذة متاحة',
                idFront: request.identityPic && request.identityPic[0] ? request.identityPic[0].secure_url : '/images/front-id.png',
                idBack: request.identityPic && request.identityPic[1] ? request.identityPic[1].secure_url : '/images/back-id.png',
                portfolio: request.portfolio || [],
                workingHours: request.workingHours || getDefaultWorkingHours()
            };

            setRequestData(mappedRequest);
        } catch (error) {
            console.error('Error fetching request details:', error);
            setError('فشل في تحميل بيانات الطلب');
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

    const handleAccept = async () => {
        if (requestData) {
            try {
                setStatus('accepting');
                const token = localStorage.getItem('access_token');

                const response = await fetch(`http://localhost:3000/admin/confirmAccount/${requestData.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `admin ${token}`,
                    }
                });


                if (response.ok) {
                    const result = await response.json();
                    console.log('Provider accepted successfully:', result);

                    setStatus('accepted');

                    window.dispatchEvent(new CustomEvent('dataUpdated', {
                        detail: {
                            type: 'provider_accepted',
                            providerId: requestData.id,
                            providerName: requestData.name
                        }
                    }));

                    setTimeout(() => {
                        navigate("/providers");
                    }, 1500);
                } else {
                    const errorText = await response.text();
                    console.error('Accept request failed:', response.status, errorText);
                    throw new Error(`فشل في قبول الطلب: ${response.status}`);
                }
            } catch (error) {
                console.error('Error accepting request:', error);
                alert('حدث خطأ أثناء قبول الطلب: ' + error.message);
                setStatus(null);
            }
        }
    };


    const handleReject = async () => {
        if (requestData) {
            try {
                setStatus('rejecting');
                const token = localStorage.getItem('access_token');

                // Try different possible endpoint patterns
                let response;
                const endpoints = [
                    `http://localhost:3000/admin/providers/${requestData.id}/reject`,
                    `http://localhost:3000/admin/provider/${requestData.id}/reject`,
                    `http://localhost:3000/admin/rejectProvider/${requestData.id}`,
                    `http://localhost:3000/admin/providers/${requestData.id}/decline`,
                    `http://localhost:3000/admin/declineProvider/${requestData.id}`
                ];

                let success = false;
                for (const endpoint of endpoints) {
                    try {
                        response = await fetch(endpoint, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': `admin ${token}`,
                            },
                            body: JSON.stringify({ confirmed: 'rejected' })
                        });

                        if (response.ok) {
                            success = true;
                            break;
                        }
                    } catch (err) {
                        // Continue to next endpoint
                        continue;
                    }
                }

                if (!success) {
                    // Try PATCH method
                    response = await fetch(`http://localhost:3000/admin/providers/${requestData.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `admin ${token}`,
                        },
                        body: JSON.stringify({ confirmed: 'rejected' })
                    });
                }

                if (response && response.ok) {
                    setStatus('rejected');

                    // Dispatch events
                    window.dispatchEvent(new CustomEvent('dataUpdated', {
                        detail: {
                            type: 'provider_rejected',
                            providerId: requestData.id,
                            providerName: requestData.name
                        }
                    }));

                    // Navigate back after delay
                    setTimeout(() => {
                        navigate("/providers");
                    }, 1500);
                } else {
                    throw new Error('فشل في رفض الطلب - يرجى التحقق من صحة API endpoint');
                }
            } catch (error) {
                console.error('Error rejecting request:', error);
                alert('حدث خطأ أثناء رفض الطلب. يرجى إبلاغي بـ API endpoint الصحيح');
                setStatus(null);
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

    if (!requestData) {
        return (
            <div className="p-6 text-center">
                <p>لا توجد بيانات للطلب</p>
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

                        {(status === 'accepted' || status === 'accepting') && (
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-6 py-2 bg-green-600 text-white rounded-3xl text-sm font-semibold cursor-default"
                                >
                                    {status === 'accepting' ? 'جاري القبول...' : '✓ تم القبول'}
                                </button>
                                <span className="text-sm text-gray-600">جاري التحديث...</span>
                            </div>
                        )}

                        {(status === 'rejected' || status === 'rejecting') && (
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-6 py-2 bg-red-600 text-white rounded-3xl text-sm font-semibold cursor-default"
                                >
                                    {status === 'rejecting' ? 'جاري الرفض...' : '✗ تم الرفض'}
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
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(requestData.name)}&background=6366f1&color=ffffff&size=48`;
                                    }}
                                />
                                <div className="flex-1 text-right">
                                    <h3 className="text-lg font-bold mb-1">{requestData.name}</h3>
                                    <span className="inline-block text-xs text-[#0C9D61] bg-[#E6F7F0] rounded-lg px-2 py-1 mb-4">
                                        {requestData.category}
                                    </span>
                                    <div className="flex justify-between text-base mb-3 mt-2">
                                        <p className="text-black">العنوان: {requestData.address}</p>
                                        <p className="text-black">البريد: {requestData.email}</p>
                                    </div>
                                    <p className="text-black mt-4">رقم الهاتف: {requestData.phone}</p>
                                    <p className="text-black mt-6 leading-relaxed">
                                        نبذه : {requestData.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 rounded-xl border border-[#E1E1E1] p-4 w-full h-[430px]">
                                <h3 className="text-lg font-bold mt-1">معرض اعمال</h3>

                                <div
                                    className="flex overflow-x-auto gap-4 py-2"
                                    style={{ scrollbarWidth: 'none' }}
                                >
                                    {requestData.portfolio && requestData.portfolio.length > 0 ? (
                                        requestData.portfolio.map((item, index) => (
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
                                    {requestData.workingHours.map((item, index) => (
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
                                            src={requestData.idFront}
                                            alt="صورة الهوية الأمامية"
                                            className="w-55 h-45 object-cover rounded-lg mr-3"
                                            onError={(e) => {
                                                e.target.src = "/images/front-id.png";
                                            }}
                                        />
                                        <img
                                            src={requestData.idBack}
                                            alt="صورة الهوية الخلفية"
                                            className="w-55 h-45 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.src = "/images/back-id.png";
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="flex items-start gap-4 mb-6 rounded-xl border-1  border-[#E1E1E1] p-5 w-full h-[530px]">
                                <div className="flex-1">
                                    <div className="flex justify-between px-2">
                                        <h3 className="text-lg font-bold mb-1">الخدمات</h3>
                                    </div>
                                    <div className='text-center mt-40 px-10'>
                                        <h2 className='text-xl font-bold mb-2'>{requestData?.name || 'المزود'} ليس صنايعى حاليا</h2>
                                        <p className='text-lg font-medium'>راجع بيانات {requestData?.name || 'المزود'} المقدمه من تاريخ {requestData?.requestDate || 'غير محدد'} لكى يستطيع اضافه خدمات </p>
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