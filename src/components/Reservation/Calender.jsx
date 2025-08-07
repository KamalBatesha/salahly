import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Calendar = ({ selectedDate, onDateSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8)); // September 2025

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = selectedDate === day;
        const isToday = day === 4; // Highlighting day 4 as shown in the image

        days.push(
            <button
                key={day}
                onClick={() => onDateSelect(day)}
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                    isSelected
                        ? 'bg-blue-600 text-white'
                        : isToday
                        ? 'bg-blue-100 text-blue-600'
                        : 'hover:bg-gray-100'
                }`}
            >
                {day}
            </button>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
                    <img src="/assets/chevron-left.png" alt="previous" className="w-5 h-5" />
                </button>
                <h3 className="font-medium">September 2025</h3>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
                    <img src="/assets/chevron-right.png" alt="next" className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="h-8 flex items-center justify-center text-sm text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days}
            </div>
        </div>
    );
};

export default Calendar;