import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import ProviderCard from '../../components/provider/providerCard';

export const ProviderDashBoard = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'اجمالى الدخل ', value: '20000ج.م', icon: 'wallet.png' },
        { label: 'التقيم النهائى', value: '4.5(51)', icon: 'star.png' },
        { label: 'اجمالى خدمات', value: '20000ج.م', icon: 'totalService-provider.png' },
        { label: 'اجمالى عملاء  ', value: '20000ج.م', icon: 'category-filled.png' },
    ];


    const data = [
        { name: 'مارس', profit: 20000 },
        { name: 'ابريل', profit: 15000 },
        { name: 'مايو', profit: 10000 },
        { name: 'يونيو', profit: 8000 },
        { name: 'يوليو', profit: 20000 },
    ];

    const providers = [
        {
            id: 1,
            name: 'محمد علي',
            image: '/images/avatar.jpg',
            category: 'صيانه مطبخ',
            address: 'محطة الرمل,اسكندريه ',
            rating: 4.7,
            reviews: 32,
            priceAverage: '400-700',

        },
        {
            id: 2,
            name: 'أحمد سعيد',
            image: '/images/avatar.jpg',
            category: 'صيانه مطبخ',
            address: 'محطة الرمل,اسكندريه ',

            rating: 4.9,
            reviews: 54,
            priceAverage: '400-700',

        },
        {
            id: 3,
            name: 'أحمد سعيد',
            image: '/images/avatar.jpg',
            category: 'صيانه مطبخ',
            address: 'محطة الرمل,اسكندريه ',

            rating: 4.9,
            reviews: 54,
            priceAverage: '400-700',

        },
        {
            id: 4,
            name: 'أحمد سعيد',
            image: '/images/avatar.jpg',
            category: 'صيانه مطبخ',
            address: 'محطة الرمل,اسكندريه ',

            rating: 4.9,
            reviews: 54,
            priceAverage: '400-700',

        },
        {
            id: 5,
            name: 'أحمد سعيد',
            image: '/images/avatar.jpg',
            category: 'صيانه مطبخ',
            address: 'محطة الرمل,اسكندريه ',

            rating: 4.9,
            reviews: 54,
            priceAverage: '400-700',

        },
    ];



    const requestTypes = [
        { type: '5', count: '75 عميل', color: '#E47B5C', bgColor: 'bg-red-400' },
        { type: '4', count: '75 عميل', color: '#4887F6', bgColor: 'bg-blue-400' },
        { type: '3', count: '75 عميل', color: '#59C3CF', bgColor: 'bg-teal-400' },
        { type: '2', count: '75 عميل', color: '#E2635E', bgColor: 'bg-orange-400' },
        { type: '1', count: '75 عميل', color: '#F1CD49', bgColor: 'bg-orange-400' },
    ];

    // Calculate angles for each segment
    const values = [49, 26, 15, 6, 4];
    const total = values.reduce((sum, val) => sum + val, 0);

    let cumulativePercentage = 0;
    const segments = values.map((value, index) => {
        const percentage = (value / total) * 100;
       const startAngle = cumulativePercentage * 3.6;
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
                                <p className="text-xl font-bold text-gray-900 text-right mt-4 flex items-center justify-end ">
                                    {stat.label === 'التقيم النهائى' && (
                                        <svg
                                            className="w-3 h-4 text-yellow-400 mt-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
                                        </svg>
                                    )}
                                    {stat.value}

                                </p>

                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-6 h-[925px] flex flex-col">
                    {/* Header */}
                    <div className="flex flex-row-reverse items-center justify-between mb-4">
                        <button
                            onClick={() => navigate('/students')}
                            className="text-black text-sm hover:underline cursor-pointer"
                        >
                            المزيد
                        </button>
                        <h3 className="text-xl font-semibold text-gray-900 text-right">الطلبات الجديده</h3>
                    </div>

                    {/* Providers list */}
                    <div className="overflow-y-auto pr-2 space-y-4">
                        {providers.map((provider, index) => (
                            <ProviderCard key={index} provider={provider} onDetailsPress={() => navigate(`/provider/${provider.id}`)} />
                        ))}
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
                                    tick={{ dx: 30, dy: -9 }}
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-right">تقيمات العملاء</h3>

                        <div className="flex items-start justify-between mb-6">


                            <div className="flex flex-col gap-y-4 text-sm mt-4" dir="rtl">
                                {requestTypes.map((item, index) => (
                                    <div key={index} className="flex items-center gap-1">
                                        <div className={`w-3 h-3 rounded-full flex-shrink-0`} style={{ backgroundColor: item.color }}></div>
                                        <div className="flex flex-col items-start mt-2">
                                            <span className="text-black font-bold text-xl">{item.type}</span>
                                            <span className="text-[#718096] text-sm">{item.count}</span>
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
