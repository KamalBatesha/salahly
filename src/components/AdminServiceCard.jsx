// components/ServiceCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const AdminServiceCard = ({
    service,
    cardStyle = 'horizontal',
    showBookButton = true,
}) => {
    const navigate = useNavigate();
    const isHorizontal = cardStyle === 'horizontal';

    const handleBookNow = () => {
        navigate('/providerServicesScreen');
    };

    return (
        <div
            className={`bg-white rounded-[15px] shadow-md overflow-hidden mb-4 ${
                isHorizontal ? 'w-[290px] mr-2.5' : 'w-full'
            }`}
        >
            <div className="relative h-[110px] overflow-hidden">
                <img
                    src={service.image}
                    alt="service"
                    className="w-full h-full object-cover object-top"
                />

                <div className="absolute top-2 right-2 bg-white/50 rounded-[15px] px-2 py-1 flex items-center text-xs ">
                    <span className="text-black font-semibold text-[12px]">{service.reviews}</span>
                    <span className="mx-1 font-semibold text-black text-[12px]">
                        {service.rating}
                    </span>
                    <Star className="text-[#FFC107] w-3 h-3 fill-[#FFC107]" />
                </div>
            </div>

            <div className="p-3">
                {/* Avatar + Info Row */}
                <div className="flex flex-row-reverse items-center mb-2">
                        <span className="text-base font-semibold text-black">
                                ({service.priceRange})ج.م
                            </span>
                    <div className="flex-1 text-right">
                        <div className="flex justify-between items-center mb-1">
                       
                            <span className="text-base font-bold text-black flex-1 text-right">
                                {service.title}
                            </span>
                        </div>
                     
                    </div>
                </div>

                {showBookButton && (
                   <div className='flex justify-evenly'>
                     <button
                        onClick={handleBookNow}
                        className=" text-[#004AAD] font-bold text-lg border-1 border-[#004AAD] rounded-full py-1 px-38 hover:bg-[#004AAD] hover:text-white transition"
                    >
                         تفاصيل
                    </button>
                    <button className='border border-[#004AAD] rounded-3xl px-4 py-2'>
                       <img src="images/icons/edit-2.png" alt="edit"  className="w-5 h-5" />
                    </button>
                   </div>
                )}
            </div>
        </div>
    );
};

export default AdminServiceCard;
