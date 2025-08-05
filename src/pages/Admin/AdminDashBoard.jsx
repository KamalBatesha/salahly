import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

export const AdminDashBoard = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'اجمالى ارباح ', value: '20000ج.م', icon: 'wallet.png' },
        { label: 'اجمالى عملاء  ', value: '20000', icon: 'user.png' },
        { label: 'اجمالى صنايعيه', value: '20000', icon: 'totalService-provider.png' },
        { label: 'اجمالى خدمات  ', value: '20', icon: 'category-filled.png' },
    ];


    const data = [
        { name: 'مارس', profit: 20000 },
        { name: 'ابريل', profit: 15000 },
        { name: 'مايو', profit: 10000 },
        { name: 'يونيو', profit: 8000 },
        { name: 'يوليو', profit: 20000 },
    ];

    const notifications = [
        { category: 'كهربائى', user: ' محمد علي', rating: '4.5', reviews: '51' },
        { category: 'كهربائى', user: 'محمد علي', rating: '4.5', reviews: '51' },
        { category: 'كهربائى', user: 'محمد علي', rating: '4.5', reviews: '51' },
        { category: 'كهربائى', user: 'محمد علي', rating: '4.5', reviews: '51' },
        { category: 'كهربائى', user: 'محمد علي', rating: '4.5', reviews: '51' },
    ];


    const requestTypes = [
        { type: 'سباكة', count: '49%', color: '#E47B5C', bgColor: 'bg-red-400' },
        { type: 'نجارة', count: '26%', color: '#4887F6', bgColor: 'bg-blue-400' },
        { type: 'كهرباء', count: '6%', color: '#59C3CF', bgColor: 'bg-teal-400' },
        { type: 'أخرى', count: '3%', color: '#E2635E', bgColor: 'bg-orange-400' }
    ];

    // Calculate angles for each segment
    const values = [49, 26, 6, 3];
    const total = values.reduce((sum, val) => sum + val, 0);

    let cumulativePercentage = 0;
    const segments = values.map((value, index) => {
        const percentage = (value / total) * 100;
        const startAngle = cumulativePercentage * 3.6; // Convert to degrees
        const endAngle = (cumulativePercentage + percentage) * 3.6;

        const segment = {
            value,
            percentage,
            startAngle,
            endAngle,
            color: requestTypes[index].color
        };

        cumulativePercentage += percentage;
        return segment;
    });

    const createPath = (startAngle, endAngle, innerRadius = 35, outerRadius = 50) => {
        const start = (startAngle - 90) * (Math.PI / 180);
        const end = (endAngle - 90) * (Math.PI / 180);

        const x1 = 50 + outerRadius * Math.cos(start);
        const y1 = 50 + outerRadius * Math.sin(start);
        const x2 = 50 + outerRadius * Math.cos(end);
        const y2 = 50 + outerRadius * Math.sin(end);

        const x3 = 50 + innerRadius * Math.cos(end);
        const y3 = 50 + innerRadius * Math.sin(end);
        const x4 = 50 + innerRadius * Math.cos(start);
        const y4 = 50 + innerRadius * Math.sin(start);

        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
    };
    return (
        <div className="p-4 space-y-6 min-h-screen" style={{ backgroundColor: '#FBFCFE' }}>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start gap-2 flex-row">
                            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#EEEEEE]">
                                <img src={`/images/icons/${stat.icon}`} alt={stat.label} className="w-5 h-5 object-contain" />
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-black font-medium">{stat.label}</p>
                                <p className="text-xl font-bold text-gray-900 text-right mt-4">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-6">
                {/* Short boxes: Notifications & System Requests */}
                <div className="flex flex-col gap-6">
                    {/* Notifications */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-6 h-[450px]">
                        {/* Top row: title right, button left */}
                        <div className="flex flex-row-reverse items-center justify-between mb-4">
                            <button 
                                onClick={() => navigate('/students')}
                                className="text-black text-sm hover:underline cursor-pointer"
                            >
                                المزيد
                            </button>
                            <h3 className="text-xl font-semibold text-gray-900 text-right">اكثر صنايعيه تقيما</h3>

                        </div>

                        {/* Notifications list */}
                        <div className="space-y-4 overflow-y-auto h-[380px] pr-2">
                            {notifications.map((notif, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border-gray-100 pb-4"
                                >
                                    {/* Right side: avatar + name + type */}
                                    <div className="flex items-center gap-3 flex-row">
                                        <img
                                            src="/images/avatar.jpg"
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col items-end text-right">
                                            <span className="text-sm text-gray-800 font-bold">{notif.user}</span>
                                            <span className="text-xs bg-[#E5F5EC] text-[#0C9D61] rounded-full px-2 py-0.5 mt-1 text-left">
                                                {notif.category}
                                            </span>
                                        </div>

                                    </div>

                                    {/* Left side: Rating */}
                                    <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.859 1.436 8.266L12 18.896l-7.372 4.535 1.436-8.266L0 9.306l8.332-1.151z" />
                                        </svg>
                                        <span className="text-black text-sm font-semibold">{notif.rating}</span>
                                        <span className="text-sm text-black font-semibold">({notif.reviews})</span>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>


                    {/* System Requests */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-6 h-[450px]">
                        <div className="flex flex-row-reverse items-center justify-between mb-4">
                            <button
                                onClick={() => navigate('/students')}
                                className="text-black text-sm hover:underline cursor-pointer"
                            >
                                المزيد
                            </button>
                            <h3 className="text-xl font-semibold text-gray-900 text-right">طلبات انضمام</h3>

                        </div>
                        <div className="space-y-3 overflow-y-auto h-[380px] pr-2">
                            {notifications.map((notif, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border-gray-100 pb-4"
                                >
                                    {/* Right side: avatar + name + type */}
                                    <div className="flex items-center gap-3 flex-row">
                                        <img
                                            src="/images/avatar.jpg"
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col items-end text-right">
                                            <span className="text-sm text-gray-800 font-bold">{notif.user}</span>
                                            <span className="text-xs bg-[#E5F5EC] text-[#0C9D61] rounded-full px-2 py-0.5 mt-1 text-left">
                                                {notif.category}
                                            </span>
                                        </div>

                                    </div>
                                    <button className="border border-[#004AAD] text-[#004AAD] font-semibold px-8 py-1 rounded-2xl text-sm self-end hover:bg-[#004AAD]/10 transition">
                                        تفاصيل طلب
                                    </button>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Wide boxes: Chart & Requests */}
                <div className="flex flex-col gap-6">
                    {/* Chart Section */}
                    <div className="w-full h-[450px] p-4 bg-white rounded-xl shadow" dir="rtl">
                        <h2 className="text-right text-xl font-bold text-black mb-4 mt-2">ارباح الشهريه</h2>
                        <ResponsiveContainer width="100%" height="80%" className="mt-8">
                            <BarChart data={data} margin={{ top: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 4" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    reversed
                                    axisLine={{ stroke: '#000000' }}
                                    tickLine={{ stroke: '#000000' }}
                                />
                                <YAxis
                                    tickFormatter={(value) => value === 0 ? '0' : `${value}ج`}
                                    orientation="right"
                                    axisLine={{ stroke: 'white' }}
                                    tickLine={{ stroke: 'white' }}
                                    tick={{ dy: -7 }}
                                    width={80}
                                />
                                <Tooltip
                                    formatter={(value) => `${value} ج`}
                                    contentStyle={{ backgroundColor: 'white', border: 'none' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="profit" fill="#004AAD" barSize={15} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Request Types */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-[450px]">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-right">الخدمات الأعلى طلبًا</h3>

                        <div className="flex items-start justify-between mb-6">


                            <div className="flex flex-col gap-y-4 text-sm mt-4" dir="rtl">
                                {requestTypes.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full flex-shrink-0`} style={{ backgroundColor: item.color }}></div>
                                        <div className="flex flex-col items-start mt-3">
                                            <span className="text-black font-bold text-xl">{item.type}</span>
                                            <span className="text-[#718096] text-xs">{item.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="relative">
                                <svg width="350" height="250" viewBox="0 0 100 100" className='mt-10'>
                                    {segments.map((segment, index) => (
                                        <path
                                            key={index}
                                            d={createPath(segment.startAngle, segment.endAngle)}
                                            fill={segment.color}
                                            stroke="white"
                                            strokeWidth="0"
                                        />
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};
