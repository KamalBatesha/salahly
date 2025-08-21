import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import InputItem from '../components/InputItem';
import FormImage from '../components/FormImage/FormImage';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';

function Login() {
  let {token,setToken,getUserInfo}=useContext(UserContext);
  const navigate = useNavigate();
    let validationSchema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string()
  });

  async function handelFormSubmit(values) {
    console.log(values);
    try{

      await axios.post('http://localhost:3000/auth/signIn', values).then((res) => {
        console.log(res.data);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        localStorage.setItem("access_token", res.data.access_token);
        setToken(res.data.access_token);
        getUserInfo();
        navigate('/');
      })
    }catch(err){
      console.log(err.response.data.message=="user not confirmed yet");
      if(err.response.data.message=="user not confirmed yet"){
        navigate(`/acountStatus/pending`);
      }else if(err.response.data.message=="your account is rejected"){
        navigate(`/acountStatus/rejected`);
      }else{
        toast.error("الايميل او كلمة المرور غير صحيحة");
      }
    }
    
  }

    let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handelFormSubmit,
  });

  return (

        <div className='flex justify-center items-stretch min-h-screen'>
  <div className='hidden md:flex w-1/2'>
    <FormImage />
  </div>
  <div className='w-full md:w-1/2 flex justify-center md:justify-end items-center   md:px-10 lg:px-20 px-20'>
    <div dir='rtl' className='text-right flex flex-col w-full'>
        <h2 className='font-bold text-4xl mb-4'>تسجيل الدخول</h2>
        <form onSubmit={formik.handleSubmit}>
            <InputItem
            handelChange={formik.handleChange}
            handelBlur={formik.handleBlur}
            errors={formik.errors.email}
            touched={formik.touched.email}
            value={formik.values.email}
             name="email" content="حساب شخصي" type="email" />
            <InputItem
            handelChange={formik.handleChange}
            handelBlur={formik.handleBlur}
            errors={formik.errors.password}
            touched={formik.touched.password}
            value={formik.values.password}
             name="password" content="كلمه المرور" type="password" />
            <div className='flex gap-1 my-2'>
            ليس لديك حساب
                <p> <Link to="/signUp" className='text-main-500'> انشاء حساب </Link>
                 </p>
            </div>
            <button type='submit' className='bg-main-500 text-white rounded-xl px-4 py-3 mt-4 w-full cursor-pointer'>تابع</button>
        </form>
    </div>
  </div>
</div>

    
  )
}

export default Login