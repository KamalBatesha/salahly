
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import userImage from '../../assets/user-1.png';


const Navbar = () => {
  const { userInfo ,token} = useContext(UserContext);
  console.log(userInfo);
  console.log("userInfo");
  function handelLogout () {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userRole');
        navigate('/login');
    }
  
  
  const linkClasses = ({ isActive }) =>
    `transition-colors duration-200 ${isActive ? "text-[#00439D]" : "text-black"
    }`;

  return (
    <div className="bg-white px-24 shadow-lg">
      <nav
        className=" flex items-center justify-between px-5 py-5  w-full  text-sm"
        dir="rtl"
      >
        {/* Logo */}
        <div className="flex items-center  gap-10  space-x-reverse">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="salahly logo"
              className="h-10 w-36"
            />
          </Link>
          {/* Links */}

          <div className="flex items-center gap-10 space-x-reverse font-medium">
            <NavLink to="/" className={linkClasses}>
              الرئيسية
            </NavLink>
            <NavLink to="/services" className={linkClasses}>
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
          {userInfo._id && token ? (
            <>
              <button
                onClick={handelLogout}
                className="bg-main-500 text-white px-4 py-3 rounded-xl hover:bg-blue-700"
              >
                تسجيل الخروج
              </button>
              <Link to="/Talabaty" className="hover:text-main-500 text-[#4B4B4B] bg-white p-1 rounded-full border ">
                <img src={userInfo?.profilePic?.secure_url || userImage} className="w-10 h-10 rounded-full object-cover" alt="" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/join" className="hover:text-main-500 text-[#4B4B4B]">
            انضم كا صناعي
          </Link>
          <Link to="/login" className="hover:text-main-500 text-[#4B4B4B]">
            تسجيل دخول
          </Link>
          <Link
            to="/signup"
            className="bg-main-500 text-white px-4 py-3 rounded-xl hover:bg-blue-700"
          >
            انشاء حساب
          </Link>
            </>
          )
          }




        </div>
      </nav>
    </div>
  );
};

export default Navbar;
