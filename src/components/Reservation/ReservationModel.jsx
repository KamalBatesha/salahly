import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReservationModal = ({ isOpen, onClose, onConfirm, selectedDate, selectedTime, onDateSelect, onTimeSelect, location, setLocation, notes, setNotes }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">حجز خدمة</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <img src="/assets/close.png" alt="close" className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">الخدمة المطلوب حجزها</div>
                    <div className="font-medium">صيانة مطبخ</div>
                </div>
                
                {/* Date Selection */}
                <div className="mb-6">
                    <h3 className="font-medium mb-3">اختر التاريخ</h3>
                    <Calendar 
                        selectedDate={selectedDate}
                        onDateSelect={onDateSelect}
                    />
                </div>
                
                {/* Time Selection */}
                <div className="mb-6">
                    <TimeSlots 
                        selectedTime={selectedTime}
                        onTimeSelect={onTimeSelect}
                    />
                </div>

                {/* Location and Notes */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">الموقع *</label>
                        <input 
                            type="text" 
                            placeholder="العنوان"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">ملاحظات</label>
                        <textarea 
                            placeholder="اكتب ملاحظاتك هنا"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 resize-none"
                        />
                    </div>
                </div>
                
                <button 
                    onClick={onConfirm}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    احجز الان
                </button>
            </div>
        </div>
    );
};

export default ReservationModal;