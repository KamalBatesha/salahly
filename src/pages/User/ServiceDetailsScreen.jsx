import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceDetailsScreen = ({ service, onBackToServices }) => {
    const [showReservationModal, setShowReservationModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(4);
    const [selectedTime, setSelectedTime] = useState('9:00');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');

    // Suggested services data - kept in screen component  
    const suggestedServices = [
        { id: 1, title: 'صيانة مطبخ', price: '500-600 جنيه', image: 'images/avatar.jpg' },
        { id: 2, title: 'صيانة مطبخ', price: '500-600 جنيه', image: 'images/avatar.jpg' },
        { id: 3, title: 'صيانة مطبخ', price: '500-600 جنيه', image: 'images/avatar.jpg' }
    ];

    const handleOpenReservation = () => {
        setShowReservationModal(true);
    };

    const handleCloseReservation = () => {
        setShowReservationModal(false);
    };

    const handleConfirmBooking = () => {
        if (!location.trim()) {
            alert('يرجى إدخال الموقع');
            return;
        }
        alert('تم الحجز بنجاح!');
        setShowReservationModal(false);
        onBackToServices();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex items-center mb-6 text-sm text-gray-600">
                    <span>الرئيسية</span>
                    <img src="/assets/chevron-left.png" alt="arrow" className="w-4 h-4 mx-2" />
                    <span>الخدمات</span>
                    <img src="/assets/chevron-left.png" alt="arrow" className="w-4 h-4 mx-2" />
                    <span>صيانة مطبخ</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* Service Details */}
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="bg-yellow-400 text-black text-sm px-2 py-1 rounded ml-3 flex items-center">
                                    <img src="/assets/star.png" alt="star" className="w-3 h-3 mr-1" />
                                    4.5
                                </div>
                                <h1 className="text-xl font-bold">صيانة مطبخ</h1>
                            </div>

                            <p className="text-gray-600 mb-6">
                                نحن متخصصون في إصلاح صنابير المطبخ بجميع أنواعها والمشاكل المتعلقة بها مثل التسريب أو انخفاض ضغط المياه أو عدم عمل الصنبور بالشكل المطلوب. فريقنا من الفنيين المدربين يستخدم أحدث الأدوات والتقنيات لضمان إصلاح سريع وفعال.
                            </p>

                            <div className="bg-blue-600 text-white text-center py-3 rounded-lg mb-4">
                                يبدأ السعر من 500-600 جنيه
                            </div>

                            <button
                                onClick={handleOpenReservation}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                احجز الان
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg overflow-hidden">
                            <img
                                src="/api/placeholder/400/300"
                                alt="صيانة مطبخ"
                                className="w-full h-64 object-cover"
                            />
                        </div>

                        <div className="bg-white rounded-lg p-4">
                            <h3 className="font-medium mb-4">مقدم الخدمة</h3>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-300 rounded-full ml-3"></div>
                                <div>
                                    <div className="font-medium">Technician Name</div>
                                    <div className="text-sm text-gray-500">مختص معتمد . مختار منذ اشهر</div>
                                    <button className="text-blue-600 text-sm">تفاصيل</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-4">
                            <h3 className="font-medium mb-4">خدمات مقترحة</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {suggestedServices.map(suggestedService => (
                                    <div key={suggestedService.id} className="flex items-center space-x-3 border rounded-lg p-3">
                                        <img
                                            src={suggestedService.image}
                                            alt="service"
                                            className="w-16 h-12 object-cover rounded"
                                        />
                                        <div className="flex-1 text-right">
                                            <div className="font-medium text-sm">{suggestedService.title}</div>
                                            <div className="text-blue-600 text-sm">{suggestedService.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ServiceDetailsScreen;