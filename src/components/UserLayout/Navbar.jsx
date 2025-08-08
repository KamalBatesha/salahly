
import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
  const linkClasses = ({ isActive }) =>
    `transition-colors duration-200 ${isActive ? "text-[#00439D]" : "text-black"
    }`;

  return (
   <div className="bg-white px-20 shadow-lg">
      <nav className=" flex items-center justify-between px-5 py-5  w-full  text-sm" dir="rtl">
        {/* Logo */}
        <div className="flex items-center  gap-10  space-x-reverse">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="salahly logo" className="h-10 w-36" />
          </Link>
          {/* Links */}

          <div className="flex items-center gap-10 space-x-reverse font-semibold">
            <NavLink to="/" className={linkClasses}>
              الرئيسية
            </NavLink>
            <NavLink to="/userServices" className={linkClasses}>
              الخدمات
            </NavLink>
            <NavLink to="/about" className={linkClasses}>
              نبذه عنا
            </NavLink>
            <NavLink to="/contact-us" className={linkClasses}>
              تواصل معنا
            </NavLink>
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
