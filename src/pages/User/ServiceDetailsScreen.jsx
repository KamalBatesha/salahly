import React, { useState, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { ChevronLeft, ChevronRight, X, Camera } from 'lucide-react';
import ServiceDetailsCard from '../../components/serviceDetailsCard';
// import { useNavigate } from "react-router-dom";

const ServiceDetailsScreen = ({ service, onBackToServices }) => {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(14);
    const [selectedTime, setSelectedTime] = useState('12:55');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [shareText, setShareText] = useState('');
    const fileInputRef = useRef(null);
    // const navigate = useNavigate();

    const suggestedServices = [
        { id: 1, title: 'صيانة مطبخ', price: '500-600 جنيه', image: 'images/avatar.jpg' },
        { id: 2, title: 'صيانة مطبخ', price: '500-600 جنيه', image: 'images/avatar.jpg' },
        { id: 3, title: 'صيانة مطبخ', price: '500-600 جنيه', image: 'images/avatar.jpg' }
    ];

    const allServices = Array(4).fill(null).map((_, i) => ({
        id: i + 1,
        title: 'صيانة مطبخ',
        provider: 'احمد محمد',
        price: '500-600',
        rating: '4.5',
        reviews: '(123)',
        image: 'images/avatar.jpg',
        avatar: 'images/avatar.jpg'
    }));

    const [isBookmarked, setIsBookmarked] = useState(false);

    // Calendar data
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const times = ['12:55', '13:55', '14:55', '15:55', '16:55', '17:55', '18:55'];

    // Generate calendar days for September 2025
    const generateCalendarDays = () => {
        const days = [];
        days.push([null, null, null, null, null, null, 1]);
        days.push([2, 3, 4, 5, 6, 7, 8]);
        days.push([9, 10, 11, 12, 13, 14, 15]);
        days.push([16, 17, 18, 19, 20, 21, 22]);
        days.push([23, 24, 25, 26, 27, 28, 29]);
        days.push([30, null, null, null, null, null, null]);
        return days;
    };

    const calendarDays = generateCalendarDays();

    const handleOpenBooking = () => setShowBookingModal(true);

    const handleBookingSubmit = () => {
        setShowBookingModal(false);
        setShowShareModal(true);
    };

    const handleImageSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleShareSubmit = () => {
        console.log('Sharing service:', { text: shareText, image: selectedImage });
        alert('تم الحجز بنجاح!');
        setShowShareModal(false);
        setSelectedImage(null);
        setShareText('');
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <div className="flex flex-row items-center justify-end mb-6 text-base font-semibold ">
                    <span className="text-black mt-1 mr-2">صيانة مطبخ</span>
                    <img src="images/icons/Vector.png" alt="arrow" className="w-2 h-3 mt-2 " />
                    <span className="text-[#8E8E8E] mt-1 ml-3 mr-1">الخدمات</span>
                    <img src="images/icons/gray-arrow.png" alt="arrow" className="w-6 h-5 mt-2" />
                    <span className="text-[#8E8E8E] mt-1 ml-1">الرئيسية</span>
                </div>

                {/* Main layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8" dir="rtl">
                    <div className="lg:col-span-2 space-y-4 text-right">
                        {/* Main Image */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow">
                            <img
                                src="images/avatar.jpg"
                                alt="صيانة مطبخ"
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    </div>

                    {/* Image and Info - left side */}
                    <div className="lg:col-span-3 text-right">
                        <div className="bg-white px-3 h-96 flex flex-col justify-between">
                            <div>
                                {/* Title + Rating + Bookmark Image */}
                                <div className="flex flex-row items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl font-semibold">صيانة مطبخ</h1>
                                        <FaStar className="text-yellow-400 mt-1" size={12} />
                                        <span className="font-semibold text-black mt-1">4.5</span>
                                        <span className="font-semibold text-black mt-1">(51)</span>
                                    </div>
                                    <div
                                        className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer"
                                        onClick={() => setIsBookmarked(!isBookmarked)}
                                    >
                                        <img
                                            src={
                                                isBookmarked
                                                    ? "/images/icons/bookmark-filled.png"
                                                    : "/images/icons/bookmark.png"
                                            }
                                            alt="bookmark"
                                            className="w-5 h-5"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <h5 className="text-lg font-semibold mb-3">عن الخدمه</h5>
                                <p className="text-gray-600 leading-relaxed mb-1">
                                    أنا متخصص في صيانة المطابخ بجميع أنواعها، وبقدّم خدمة شاملة وسريعة تشمل:
                                </p>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span className="text-sm">🔧 فك وصيانة الحنفيات والأحواض ومعالجة أي تسريب</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span className="text-sm">🚪 تعديل أو تصليح دواليب المطبخ، المفصلات، والأدراج</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span className="text-sm">⚡ صيانة الشفاط، البوتجاز الكهربائي، والسخان</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span className="text-sm">🧱 ترميم الرخام أو السيراميك التالف</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span className="text-sm">🧽 تنظيف شامل للشفاط أو الأجهزة من الدهون المتراكمة</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span className="text-sm">بشتغل بأدوات احترافية وبأضمن إن كل حاجة تتصلح صح من أول مرة</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span className="text-sm">تقدر تطلب الخدمة في أي وقت يناسبك، وهوصلك في أقرب وقت.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-auto">
                                <div className="text-right text-base mb-5 text-black font-semibold">
                                    رينج التكلفه: (500-600)ج.م
                                </div>
                                <button
                                    onClick={handleOpenBooking}
                                    className="w-120 bg-[#004AAD] text-white pt-[2px] pb-[6px] mb-2 rounded-xl font-semibold border border-transparent hover:bg-white hover:text-[#004AAD] hover:border-[#004AAD] transition-colors cursor-pointer"
                                >
                                    احجز الان
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Provider Info Section */}
                <div className="bg-white rounded-lg px-2 py-6" dir="rtl">
                    <h3 className="font-semibold mb-2">مقدم الخدمة</h3>
                    <div className="flex flex-row items-center gap-3">
                        <img
                            src="images/avatar.jpg"
                            alt="avatar"
                            className="w-12 h-12 rounded-full ml-3 object-cover flex-shrink-0"
                        />
                        <div className="flex flex-col gap-1">
                            <div className="font-bold">Technician Name</div>
                            <div className="text-sm text-gray-500">مرسى علم , مطروح</div>
                            <p className="text-sm text-[#0C9D61] bg-[#E5F5EC] text-center py-1 px-3 rounded-xl w-fit">
                                كهربائى
                            </p>
                        </div>
                        <button className="text-[#00439D] text-sm font-semibold border border-[#00439D] rounded-3xl mr-10 px-8 py-0.5 h-fit hover:bg-[#004AAD] hover:text-white  cursor-pointer">
                            تفاصيل
                        </button>
                    </div>
                </div>

                {/* Suggested Services Cards */}
                <div className="bg-white rounded-xl p-2" dir='rtl'>
                    <h3 className="font-bold mb-4">خدمات مقترحة</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" dir='ltr'>
                        {allServices.map(service => (
                            <ServiceDetailsCard
                                key={service.id}
                                service={service}
                                cardStyle="vertical"
                                navigation={() => handleOpenBooking()}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* First Modal - Booking */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-xl mx-4 overflow-hidden max-h-[80vh] overflow-y-auto" dir="rtl">
                        {/* Header */}
                        <div className="bg-white text-black pt-8 px-2 flex items-center gap-2 mr-1">
                            <button className="p-0.5 bg-[#004AAD] rounded-full hover:bg-white hover:text-[#004AAD]">
                                <ChevronRight size={18} className="text-white" />
                            </button>

                            <h2 className="text-xl font-semibold leading-none">حجز خدمة</h2>
                        </div>



                        {/* Content */}
                        <div className="p-6">
                            {/* Step indicator */}
                            <div className="text-right font-semibold mb-4">
                                <p className="text-black">الخطوة الأولى . تحديد الموعد</p>
                            </div>

                            {/* Calendar and Time slots side by side */}
                            <div className="grid grid-cols-2 mb-6 p-3">
                                {/* Calendar Section */}
                                <div className='w-[320px]'>
                                    {/* Calendar Header */}
                                    <div className="flex items-center justify-evenly mb-4">
                                        <button className="p-1">
                                            <ChevronRight size={20} className="text-gray-600" />
                                        </button>
                                        <h3 className="font-medium">September 2025</h3>
                                        <button className="p-1">
                                            <ChevronLeft size={20} className="text-gray-600" />
                                        </button>
                                    </div>

                                    {/* Calendar */}
                                    <div>
                                        {/* Days of week */}
                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                            {daysOfWeek.map((day, index) => (
                                                <div key={index} className="text-center text-sm text-gray-500 py-2">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Calendar days */}
                                        {calendarDays.map((week, weekIndex) => (
                                            <div key={weekIndex} className="grid grid-cols-7 gap-2 mb-3">
                                                {week.map((day, dayIndex) => (
                                                    <div key={dayIndex} className="text-center">
                                                        {day && (
                                                            <button
                                                                onClick={() => setSelectedDate(day)}
                                                                className={`w-8 h-8 rounded-full text-sm ${selectedDate === day
                                                                    ? 'bg-blue-600 text-white'
                                                                    : day === 15 || day === 16 || day === 20 || day === 21 || day === 25 || day === 26 || day === 27 || day === 28 || day === 29 || day === 30 || day === 14
                                                                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                                        : 'text-gray-400 cursor-not-allowed'
                                                                    }`}
                                                                disabled={!(day === 15 || day === 16 || day === 20 || day === 21 || day === 25 || day === 26 || day === 27 || day === 28 || day === 29 || day === 30 || day === 14)}
                                                            >
                                                                {day}
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    {/* Location and time info */}
                                    <div className="flex items-center justify-between mb-6 text-sm">
                                        <div className="flex items-center">
                                            <span className=" px-1 py-1 text-xs">27/5</span>
                                            <img src="/images/icons/clock.png" alt="Clock" className="w-4 h-4" />
                                            <span className='px-1'>am/pm</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span>Africa/Egypt</span>
                                            <img src="/images/icons/earth.png" alt="Globe" className="w-4 h-4" />
                                        </div>


                                    </div>
                                </div>

                                {/* Time slots Section */}
                                <div>
                                    <div className="space-y-3 text-left">
                                        {times.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`w-40 py-2 px-4 rounded-lg text-center border ${selectedTime === time
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                    {/* Submit button */}
                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleBookingSubmit}
                                            className="w-40 bg-blue-600 text-white py-2 mt-3 rounded-lg font-medium hover:bg-[#004AAD]"
                                        >
                                            التالي
                                        </button>
                                    </div>

                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            )}

            {/* Second Modal - Share Service */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/60  flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-xl mx-4 overflow-hidden max-h-[80vh] overflow-y-auto" dir="rtl">
                        {/* Header */}
                        <div className="bg-white text-black pt-8 px-2 flex items-center gap-2 mr-4">
                            <button className="p-0.5 bg-[#004AAD] rounded-full hover:bg-white hover:text-[#004AAD]">
                                <ChevronRight size={18} className="text-white" />
                            </button>

                            <h2 className="text-xl font-semibold leading-none">حجز خدمة</h2>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            {/* Step indicator */}
                            <div className="text-right font-semibold mb-6 mt-2">
                                <p className="text-black mr-4">الخطوة الثانية . شرح مشكلة</p>
                            </div>

                            {/* Text input */}
                            <div className="mb-4 px-4">
                                <label className="block text-right mb-2 font-semibold">شرح مشكلة</label>
                                <textarea
                                    value={shareText}
                                    onChange={(e) => setShareText(e.target.value)}
                                    placeholder="اسم خدمه"
                                    rows={5}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg text-right resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Image upload */}
                            <div className="mb-6 px-4">
                                <label className="block text-right mb-2 font-medium">صورة مشكلة</label>
                                <div
                                    onClick={handleImageSelect}
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                                >
                                    {selectedImage ? (
                                        <div className="space-y-2">
                                            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto">
                                                <img
                                                    src="images/icons/image.png"
                                                    alt="Selected"
                                                    className="w-5 h-5 object-contain"
                                                />
                                            </div>
                                            <p className="text-sm text-gray-600">اضغط لتغيير الصورة</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                                                <img
                                                    src="images/icons/image.png"
                                                    alt="Upload"
                                                    className="w-6 h-6 object-contain"
                                                />
                                            </div>
                                            <p className="text-gray-600">اضغط لاضافه صوره لتخصص</p>
                                            <button
                                                onClick={handleImageSelect}
                                                className="w-40 bg-[#004AAD] text-white py-1 rounded-2xl font-medium hover:bg-[#004AAD]"
                                            >
                                                اضافه
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            {/* Submit button */}
                            <button
                                onClick={handleShareSubmit}
                                className="w-full bg-[#004AAD] text-white py-3 rounded-3xl font-medium hover:bg-[#004AAD]"
                            >
                                التالي
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetailsScreen;