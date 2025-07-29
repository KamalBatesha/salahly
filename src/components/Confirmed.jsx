import React, { useEffect, useState } from 'react'
import rejected from "../assets/rejected.png"
import confirmed from "../assets/confirmed.png"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

function Confirmed() {
  const {token}=useParams();
  const [loader, setLoader] =useState(true);
  const [isError, setIsError] =useState(false);
  let data = jwtDecode(token);
  console.log(data);
  
  async function reSendMail() {
    await axios.post(`http://localhost:3000/auth/ResendConfirmEmail/${data.email}`).then((res) => {
      console.log(res.data);
      toast.success("تم ارسال رابط التفعيل بنجاح");
    }).catch((err) => {
      toast.error(err.response.data.message);
    })
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/confirmEmail/${token}`).then((res) => {
      console.log(res.data);
      setLoader(false);
    }).catch((err) => {
      setIsError(true);
      setLoader(false);

    })
  }, []);
  
    const navigate = useNavigate();
  return (
    <>
      {loader && <i className="fa fa-spinner fa-spin text-6xl text-main-500 block text-center" aria-hidden="true"></i>}
    <div className={`flex flex-col justify-center items-center text-center w-full ${loader && 'hidden'}`}>
        <div className='w-44'>
        <img className='w-full' src={isError ? rejected : confirmed} alt="confirmed" />
        </div>
        <h3 className='font-bold text-3xl mt-4'> {isError ? 'للأسف حدث خطاء' : 'تم تفعيل حسابك بنجاح'}</h3>
        <button
        onClick={() => isError ? reSendMail() : navigate("/login")}
        className='bg-main-500 text-white rounded-xl px-4 py-3 mt-6 w-full cursor-pointer self-end'
        >
        {isError ? 'اعاده ارسال البريد' : 'تسجيل الدخول'}
      </button>
    </div>
        </>
  )
}

export default Confirmed