import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TimeSlots = ({ selectedTime, onTimeSelect }) => {
    const times = ['9:00', '9:30', '٠٠:١٠', '١٠:٣٠', '١١:٠٠', '١١:٣٠', '١٢:٠٠', '١٢:٣٠', '١:٠٠', '١:٣٠', '٢:٠٠', '٢:٣٠'];

    return (
        <div className="bg-white p-4 rounded-lg border mt-4">
            <h4 className="font-medium mb-3">اختر الوقت المناسب</h4>
            <div className="grid grid-cols-3 gap-2">
                {times.map((time, index) => (
                    <button
                        key={time}
                        onClick={() => onTimeSelect(time)}
                        className={`py-2 px-3 rounded border text-sm ${
                            selectedTime === time
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white border-gray-300 hover:border-blue-600'
                        }`}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimeSlots;