import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-red px-24 bg-main-500 shadow-lg">
    <footer className=" py-5 px-5">
      <div className="flex items-center justify-between">
        
        {/* Social Icons */}
        <div className="flex gap-5 space-x-reverse text-[#336EBD]">
          <a href="#" className="bg-[#E6EDF7] p-2 rounded hover:bg-blue-600">
            <FaFacebookF />
          </a>
          <a href="#" className="bg-[#E6EDF7] p-2 rounded hover:bg-blue-600">
            <FaTwitter />
          </a>
          <a href="#" className="bg-[#E6EDF7] p-2 rounded hover:bg-blue-600">
            <FaInstagram />
          </a>
          <a href="#" className="bg-[#E6EDF7] p-2 rounded hover:bg-blue-600">
            <FaLinkedinIn />
          </a>
          <a href="#" className="bg-[#E6EDF7] p-2 rounded hover:bg-blue-600">
            <FaYoutube />
          </a>
        </div>

        {/* Logo */}
        <div>
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo-light.png" alt="salahly logo" className="h-10 w-36" />
        </Link>
        </div>
      </div>
    </footer>
    </div> 

  );
};

export default Footer;
