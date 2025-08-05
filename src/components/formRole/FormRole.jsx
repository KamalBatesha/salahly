import React, { useState } from 'react'
import user from '../../assets/user-1.png'
import provider from '../../assets/provider.png'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import axios from 'axios';
function FormRole() {
    let navigate=useNavigate();
    let [role, setRole] = useState('user');
    let [loader, setLoader] = useState(false);
    async function handelNext() {
        let userSignUpData = JSON.parse(localStorage.getItem('userSignUpData'));
        if(!userSignUpData.name || !userSignUpData.email || !userSignUpData.phone || !userSignUpData.password || !userSignUpData.rePassword || !userSignUpData.address){
            alert('من فضلك اكمل البيانات');
            navigate('/signUp');
        }
        if (role === 'user') {
            // localStorage.setItem('userSignUpData', JSON.stringify({ ...userSignUpData, role: 'user' }));
            setLoader(true);
            let res=await signUp({ ...userSignUpData, role: 'user' });
            console.log(res.token);
            setLoader(false);
            if(!res.token){
                toast.error('خطأ في البيانات');
                return;
            } else {
                toast.success("تم انشاء الحساب بنجاح اذهب لتفعيل الحساب من البريد الالكتروني", {
                    duration: 10000
                });
                navigate('/login');
            }
        } else {
            localStorage.setItem('userSignUpData', JSON.stringify({ ...userSignUpData, role: 'provider' }));
            navigate('/signUp/provider');
        }
    }
    async function signUp(data){
    try {
      const response = await axios.post('http://localhost:3000/auth/signUp', data);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error(error);
      console.error(error.response.data);
      toast.error(error.response.data.message);
      setLoader(false);
    }
  }
  return (
    <>
          {loader && <i className="fa fa-spinner fa-spin text-6xl text-main-500 block text-center grow-1" aria-hidden="true"></i>}

        <div dir='rtl' className={`text-right flex flex-col w-full ${loader && 'hidden'}`}>
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
    </>
  )
}

export default FormRole