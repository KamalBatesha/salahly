import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const ServiceDetailsCard = ({
    service,
    onToggleFavorite,
    isFavorite: propIsFavorite,
    cardStyle = 'horizontal',
    showBookButton = true,
    navigation
}) => {
    const [isFavorite, setIsFavorite] = useState(propIsFavorite || false);
    const isHorizontal = cardStyle === 'horizontal';

    useEffect(() => {
        checkFavoriteStatus();
    }, []);

    useEffect(() => {
        if (propIsFavorite !== undefined) {
            setIsFavorite(propIsFavorite);
        }
    }, [propIsFavorite]);

    const checkFavoriteStatus = () => {
        const stored = localStorage.getItem('favoriteServices');
        if (stored) {
            const favorites = JSON.parse(stored);
            const isServiceFavorite = favorites.some(fav => fav.id === service.id);
            setIsFavorite(isServiceFavorite);
        }
    };

    const toggleFavoriteStatus = () => {
        let favorites = JSON.parse(localStorage.getItem('favoriteServices')) || [];
        const exists = favorites.some(fav => fav.id === service.id);

        if (exists) {
            favorites = favorites.filter(item => item.id !== service.id);
            setIsFavorite(false);
        } else {
            favorites.push(service);
            setIsFavorite(true);
        }

        localStorage.setItem('favoriteServices', JSON.stringify(favorites));
        if (onToggleFavorite) onToggleFavorite(service);
    };

    const handleBookNow = () => {
        if (navigation) {
            navigation('/serviceDetails');
        } else {
            console.error('Navigation prop not provided');
        }
    };

    return (
        <div
            className={`bg-white rounded-xl shadow-md overflow-hidden mb-4 ${isHorizontal ? 'w-[320px] ' : 'w-full'
                }`}
        >
            <div className="relative h-20 ">
                <img
                    src={service.image}
                    alt="service"
                    className="w-full h-full  object-cover"
                />

                <button
                    onClick={toggleFavoriteStatus}
                    className="absolute top-2 left-2 bg-black/40 p-2 rounded-full"
                >
                    <img
                        src={
                            isFavorite
                                ? '../images/icons/bookmark-filled.png'
                                : '../images/icons/bookmark-outline.png'
                        }
                        alt="bookmark"
                        className="w-4 h-4"
                    />
                </button>

                <div className="absolute top-2 right-2 bg-white/50 px-2 py-1 rounded-full flex items-center gap-1 text-xs text-black">
                    <FaStar className="text-yellow-400" size={12} />
                    <span className="font-semibold">{service.rating}</span>
                    <span className="font-semibold">{service.reviews}</span>
                </div>
            </div>

            <div className="p-3 text-right">
                <div className="flex items-start justify-between mb-2">
                    {/* Right Side: Avatar + Title/Provider */}
                    

                    {/* Left Side: Price */}
                    <div className="text-sm text-black font-semibold mt-2 whitespace-nowrap">
                       ج.م({service.price})
                    </div>
                    <div className="flex items-start">
                        <div className="flex flex-col items-end text-right">
                            <span className="font-semibold text-sm text-gray-800">{service.title}</span>
                            <span className="text-xs text-gray-500">{service.provider}</span>
                        </div>
                        <img
                            src={service.avatar}
                            alt="avatar"
                            className="w-7 h-7 rounded-full ml-2 mt-1"
                        />
                    </div>
                </div>
                {showBookButton && (
                    <button
                        onClick={handleBookNow}
                        className="w-full border-1 border-[#004AAD] text-[#004AAD] rounded-full py-1 font-semibold text-sm hover:bg-[#004AAD] hover:text-white transition"
                    >
                        احجز الان
                    </button>
                )}
            </div>

        </div>
    );
};

export default ServiceDetailsCard;
