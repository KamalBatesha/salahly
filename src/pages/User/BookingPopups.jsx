import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Camera } from 'lucide-react';

const BookingPopups = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(14);
  const [selectedTime, setSelectedTime] = useState('12:55');
  const [selectedImage, setSelectedImage] = useState(null);
  const [shareText, setShareText] = useState('');
  const fileInputRef = useRef(null);

  // Calendar data
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const times = ['12:55', '13:55', '14:55', '15:55', '16:55', '17:55', '18:55'];
  
  // Generate calendar days for September 2025
  const generateCalendarDays = () => {
    const days = [];
    // First row
    days.push([null, null, null, null, null, null, 1]);
    // Other rows
    days.push([2, 3, 4, 5, 6, 7, 8]);
    days.push([9, 10, 11, 12, 13, 14, 15]);
    days.push([16, 17, 18, 19, 20, 21, 22]);
    days.push([23, 24, 25, 26, 27, 28, 29]);
    days.push([30, null, null, null, null, null, null]);
    return days;
  };

  const calendarDays = generateCalendarDays();

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
    setShowShareModal(false);
    setSelectedImage(null);
    setShareText('');
  };

  return (
    <div className="p-8">
      {/* Trigger Button */}
      <button
        onClick={() => setShowBookingModal(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        حجز خدمة
      </button>

      {/* First Modal - Booking */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden" dir="rtl">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">حجز خدمة</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-white hover:bg-blue-700 rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Step indicator */}
              <div className="text-center mb-6">
                <p className="text-gray-600">الخطوة الأولى . تحديد الموعد</p>
              </div>

              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button className="p-1">
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
                <h3 className="font-medium">September 2025</h3>
                <button className="p-1">
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Calendar */}
              <div className="mb-6">
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
                  <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
                    {week.map((day, dayIndex) => (
                      <div key={dayIndex} className="text-center">
                        {day && (
                          <button
                            onClick={() => setSelectedDate(day)}
                            className={`w-8 h-8 rounded-full text-sm ${
                              selectedDate === day
                                ? 'bg-blue-600 text-white'
                                : day === 15 || day === 16 || day === 20 || day === 21 || day === 25 || day === 26 || day === 27 || day === 28 || day === 29 || day === 30
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

              {/* Time slots */}
              <div className="mb-6">
                <div className="space-y-2">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`w-full py-3 px-4 rounded-lg text-center border ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location and time info */}
              <div className="flex items-center justify-between mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">🌍</span>
                  <span>Africa/Egypt</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">🕐</span>
                  <span>am/pm</span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">27.5</span>
                </div>
              </div>

              {/* Submit button */}
              <button
                onClick={handleBookingSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
              >
                التالي
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal - Share Service */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden" dir="rtl">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">حجز خدمة</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-white hover:bg-blue-700 rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Step indicator */}
              <div className="text-center mb-6">
                <p className="text-gray-600">الخطوة الثانية . شارك مشكلة</p>
              </div>

              {/* Text input */}
              <div className="mb-6">
                <label className="block text-right mb-2 font-medium">شارك مشكلة</label>
                <textarea
                  value={shareText}
                  onChange={(e) => setShareText(e.target.value)}
                  placeholder="اكتب تفاصيل"
                  rows={5}
                  className="w-full p-3 border border-gray-200 rounded-lg text-right resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Image upload */}
              <div className="mb-6">
                <label className="block text-right mb-2 font-medium">صورة مشكلة</label>
                <div
                  onClick={handleImageSelect}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  {selectedImage ? (
                    <div className="space-y-2">
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="max-w-full max-h-32 mx-auto rounded"
                      />
                      <p className="text-sm text-gray-600">اضغط لتغيير الصورة</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Camera size={32} className="mx-auto text-blue-600" />
                      <p className="text-gray-600">اضغط لإضافة صورة للمشكلة</p>
                      <p className="text-sm text-gray-400">اختياري</p>
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
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
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

export default BookingPopups;