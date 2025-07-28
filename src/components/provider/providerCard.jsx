import React from 'react';

const ProviderCard = ({ provider, onDetailsPress }) => {
    const truncatedAddress = provider.address?.split(' ').slice(0, 2).join(' ') + '...';

    return (
        <div className="flex flex-row bg-white rounded-[15px] overflow-hidden mb-4 shadow-sm border border-gray-300 min-h-[140px] relative">

            {/* Image + Rating on top right */}
            <div className="relative w-[120px] h-[140px]">
                <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                />

                <div
                    className="absolute top-2 right-2 text-black text-xs px-1 py-0.5 rounded-full flex items-center gap-x-0.5"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }} 
                >
                    <span>({provider.reviews || '23'})</span>
                    <span>{provider.rating || '4.5'}</span>
                    <svg
                        className="w-4 h-3 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
                    </svg>
                </div>
            </div>

            {/* Info section */}
            <div className="flex flex-col justify-between p-3 flex-1 relative">

                {/* Name, avatar, and "new" badge */}
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                        <img
                            src={provider.image}
                            alt="avatar"
                            className="w-4 h-4 rounded-full object-cover mt-1"
                        />
                        <span className="text-lg font-bold text-right text-black">{provider.name}</span>
                    </div>
                    <span className="border border-[#004AAD] bg-[#F8FCFF] text-[#004AAD] text-sm font-bold px-4 pb-1 rounded-full">
                        جديد
                    </span>
                </div>

                {/* Address with image icon */}
                <div className="flex items-center justify-start gap-2 mb-2">
                    <img src="/images/icons/location.png" alt="location" className="w-3.5 h-3.5" />
                    <span className="text-xs text-[#121217] font-semibold">{truncatedAddress}</span>
                </div>

                {/* Category & Price */}
                <div className="flex justify-between items-center text-sm text-gray-800 font-medium mt-2 mb-3">
                    <span className='text-sm text-black text-base'>{provider.category || 'كهربائي'}</span>
                    <span className='font-bold text-base'>{provider.priceAverage ? ` (${provider.priceAverage})ج.م` : ''}</span>
                </div>

                {/* Bottom Button */}
                <button
                    className="w-full border border-[#004AAD] text-[#004AAD] py-0.5 pb-1 rounded-2xl text-sm font-bold hover:bg-[#004AAD]/10 transition"
                    onClick={() => onDetailsPress?.(provider)}
                >
                    تفاصيل طلب
                </button>
            </div>
        </div>
    );
};

export default ProviderCard;
