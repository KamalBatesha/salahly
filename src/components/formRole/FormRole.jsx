import React, { useState } from 'react'
import user from '../../assets/user-1.png'
import provider from '../../assets/provider.png'
import { useNavigate } from 'react-router-dom';
function FormRole() {
    let navigate=useNavigate();
    let [role, setRole] = useState('user');
    function handelNext() {
        let userSignUpData = JSON.parse(localStorage.getItem('userSignUpData'));
        if(!userSignUpData.name || !userSignUpData.email || !userSignUpData.phone || !userSignUpData.password || !userSignUpData.rePassword || !userSignUpData.address){
            alert('من فضلك اكمل البيانات');
            navigate('/signUp');
        }
        if (role === 'user') {
            localStorage.setItem('userSignUpData', JSON.stringify({ ...userSignUpData, role: 'user' }));
            navigate('/signUp/user');
        } else {
            localStorage.setItem('userSignUpData', JSON.stringify({ ...userSignUpData, role: 'provider' }));
            navigate('/signUp/provider');
        }
    }
  return (
        <div dir='rtl' className='text-right flex flex-col w-full'>
        <h2 className='font-bold text-4xl'>من انت </h2>
        <p className='text-xl font-light mt-2'>قم بانشاء حساب للوصول لجميع مستخدمين صلحلى </p>
        <div className="flex">
            <div className='flex flex-col w-1/2 lg:p-5 md:p-2 p-5 items-center' onClick={() => setRole('provider')}>
            <div className={`overflow-hidden bg-main-100 cursor-pointer rounded-3xl flex items-end ${role === 'user' &&'grayscale-75'}`}>
                <img src={provider} alt="user" className="userImage w-full " />
            </div>
            <h3 className='text-4xl font-bold mt-4 font-almarai'>صنايعى</h3>
            </div>
            <div className='flex flex-col w-1/2 lg:p-5 md:p-2 p-5 items-center' onClick={() => setRole('user')}>
            <div className={`overflow-hidden bg-main-100 h-full cursor-pointer rounded-3xl flex items-end ${role === 'provider' && 'grayscale-75'}`}>
                <img src={user} alt="user" className="userImage w-full " />
            </div>
            <h3 className='text-4xl font-bold mt-4 font-almarai'>مستخدم</h3>
            </div>
        </div>
            <button onClick={handelNext} className='bg-main-500 text-white rounded-xl px-4 py-3 mt-4 w-full cursor-pointer'>تابع</button>
        </div>
  )
}

export default FormRole