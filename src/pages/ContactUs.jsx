import { useFormik } from 'formik';
import React from 'react'
import InputItem from '../components/InputItem';
import * as Yup from "yup";


function ContactUs() {
    let validationSchema = Yup.object().shape({
        name: Yup.string().min(5, "الاسم يجب ان يكون اكثر من 5 حروف").required("الاسم مطلوب"),
        email: Yup.string().email("البريد الالكتروني غير صحيح").required("البريد الالكتروني مطلوب"),
        phone: Yup.string()
          .matches(
            /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
            "رقم الهاتف غير صحيح"
          )
          .required("رقم الهاتف مطلوب"),
        message: Yup.string().required("الرسالة مطلوبة"),
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
          message: "",
        },
        validationSchema: validationSchema,
        onSubmit: handelFormSubmit,
      });
  return (
     <div dir="rtl" className="xl:py-20 xl:px-30  lg:py-10 lg:px-15 p-10 overflow-hidden">

    <div  className="flex flex-col lg:flex-row items-center justify-center gap-15">
        <div className="lg:w-1/2 w-full">
        <h2 className="text-main-500 font-almarai font-bold text-4xl relative w-fit after:bg-main-500 after:w-full after:h-[2px] after:absolute after:-bottom-1 after:left-0 mb-6">تواصل معنا</h2>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
            <div className="flex gap-4 flex-col sm:flex-row">
                <InputItem
            handelChange={formik.handleChange}
            handelBlur={formik.handleBlur}
            errors={formik.errors.name}
            touched={formik.touched.name}
            value={formik.values.name}
             name="name" content="الاسم" type="text" divClass="flex-1" />
             <InputItem
            handelChange={formik.handleChange}
            handelBlur={formik.handleBlur}
            errors={formik.errors.phone}
            touched={formik.touched.phone}
            value={formik.values.phone}
             name="phone" content="رقم الهاتف" type="text" divClass="flex-1" />
            </div>
            <InputItem
            handelChange={formik.handleChange}
            handelBlur={formik.handleBlur}
            errors={formik.errors.email}
            touched={formik.touched.email}
            value={formik.values.email}
             name="email" content="البريد" type="text" divClass="flex-1" />
             <div className={`mt-2`}>
            <label name={formik.name} htmlFor={formik.name} className='font-normal text-xl'>رساله</label>
            <textarea
            
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            placeholder='em' id="message" className={`w-full rounded-xl border-2 border-[#D1D1DB] px-4 py-2 mt-1 placeholder:text-[#D1D1DB] min-h-28 `}></textarea>
            {formik.errors.message && formik.touched.message ? (
        <div
          className="flex p-0 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >          <div>
            <ul className="mt-1.5 list-disc list-inside">
              {formik.errors.message.split(",").map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
        </div>
            
        </form>
        </div>
        <div className="lg:w-1/2 w-full"></div>
        </div>
        </div>
  )
}

export default ContactUs