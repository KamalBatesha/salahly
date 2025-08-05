import React from 'react'
import rejected from "../assets/rejected.png"
import { useNavigate } from 'react-router-dom';

function Rejected() {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center text-center'>
        <div className='w-44'>
        <img className='w-full' src={rejected} alt="rejected" />
        </div>
        <h3 className='font-bold text-3xl mt-4'>للأسف، تم رفض طلبك</h3>
        <p className='text-2xl font-almarai mt-2.5'>طلب إنشاء الحساب لم يتم قبوله.
راجع البيانات المرسلة أو تواصل معنا لو عند استفسار.</p>
        <button
        onClick={() => navigate("/")}
        className='bg-main-500 text-white rounded-xl px-4 py-3 mt-6 w-full cursor-pointer self-end'
        >
        تابع
      </button>
    </div>
  )
}

export default Rejected