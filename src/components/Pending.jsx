import React from 'react'
import pending from "../assets/pending.png"
import { useNavigate } from 'react-router-dom';

function Pending() {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center text-center'>
        <div className='w-44'>
        <img className='w-full' src={pending} alt="pending" />
        </div>
        <h3 className='font-bold text-3xl mt-4'>طلبك تحت المراجعة</h3>
        <p className='text-2xl font-almarai mt-2.5'>شكراً لتسجيلك! فريقنا بيراجع بياناتك، وهنتواصل معاك قريب بعد التأكيد.</p>
        <button
        onClick={() => navigate("/")}
        className='bg-main-500 text-white rounded-xl px-4 py-3 mt-6 w-full cursor-pointer self-end'
        >
        تابع
      </button>
    </div>
  )
}

export default Pending