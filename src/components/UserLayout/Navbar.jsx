
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-red px-24 bg-white shadow-lg"> 
    <nav className=" flex items-center justify-between px-5 py-5  w-full  text-sm" dir="rtl">
      {/* Logo */}
      <div className="flex items-center  gap-10  space-x-reverse">
        <Link to="/" className="flex items-center gap-2"> 
         <img src="/images/logo.png" alt="salahly logo" className="h-10 w-36" />
        </Link>
      {/* Links */}
      <div className="flex items-center gap-10  space-x-reverse text-black font-medium">
        <Link to="/">الرئيسية</Link>
        <Link to="/services">الخدمات</Link>
        <Link to="/about">نبذه عنا</Link>
        <Link to="/contact-us">تواصل معنا</Link>
      </div>
      </div>


      {/* Actions */}
      <div className="flex items-center gap-4  space-x-reverse ">
        <Link to="/join" className="hover:text-main-500 text-[#4B4B4B]">انضم كا صناعي</Link>
        <Link to="/login" className="hover:text-main-500 text-[#4B4B4B]">تسجيل دخول</Link>
        <Link to="/signup" className="bg-main-500 text-white px-4 py-3 rounded-xl hover:bg-blue-700">انشاء حساب</Link>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
