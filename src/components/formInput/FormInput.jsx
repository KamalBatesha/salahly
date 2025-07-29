import { useFormik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputItem from '../InputItem';
import * as Yup from "yup";

function FormInput() {
  const navigate = useNavigate();
    let validationSchema = Yup.object().shape({
    name: Yup.string().min(5, "الاسم يجب ان يكون اكثر من 5 حروف").required("الاسم مطلوب"),
    email: Yup.string().email("البريد الالكتروني غير صحيح").required("البريد الالكتروني مطلوب"),
    phone: Yup.string()
      .matches(
        /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
        "رقم الهاتف غير صحيح"
      )
      .required("رقم الهاتف مطلوب"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "يجب ان يحتوي كلمة المرور على حرف كبير وحرف صغير ورقم و يجب ان لا يقل عن 8 حروف"
      )
      .required("كلمة المرور مطلوبة"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة")
      .required("تاكيد كلمة المرور مطلوب"),
      address: Yup.string().required("الموقع مطلوب"),
  });

  function handelFormSubmit(values) {
    console.log(values);
    localStorage.setItem("userSignUpData", JSON.stringify(values));
    navigate("/signUp/role");
  }

    let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handelFormSubmit,
  });

  return (
    <div dir='rtl' className='text-right flex flex-col w-full'>
        <h2 className='font-bold text-4xl'>انشاء حساب </h2>
        <p className='text-xl font-light mt-2'>قم بانشاء حساب للوصول لجميع مستخدمين صلحلى </p>
        <form onSubmit={formik.handleSubmit}>
            <InputItem
            handelChange={formik.handleChange}
            handelBlur={formik.handleBlur}
            errors={formik.errors.name}
            touched={formik.touched.name}
            value={formik.values.name}
             name="name" content="الاسم كامل" type="text" />
            <InputItem
            handelChange={formik.handleChange}
            handelBlur={formik.handleBlur}
            errors={formik.errors.phone}
            touched={formik.touched.phone}
            value={formik.values.phone}
             name="phone" content="رقم الهاتف" type="text" />
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
            errors={formik.errors.address}
            touched={formik.touched.address}
            value={formik.values.address}
             name="address" content="موقع جغرافي" type="text" />
            <InputItem
            handelChange={formik.handleChange}
            handelBlur={formik.handleBlur}
            errors={formik.errors.password}
            touched={formik.touched.password}
            value={formik.values.password}
             name="password" content="كلمه المرور" type="password" />
            <InputItem
            handelChange={formik.handleChange}
            handelBlur={formik.handleBlur}
            errors={formik.errors.rePassword}
            touched={formik.touched.rePassword}
            value={formik.values.rePassword}
             name="rePassword" content="تاكيد كلمه المرور" type="password" />

            <div className='flex gap-1 my-2'>
                قم بتسجيل الدخول
                <p> <Link to="/signin" className='text-main-500'>لديك حساب؟ </Link>
                 </p>
            </div>
            <button type='submit' className='bg-main-500 text-white rounded-xl px-4 py-3 mt-4 w-full cursor-pointer'>تابع</button>
        </form>
    </div>
  )
}

export default FormInput