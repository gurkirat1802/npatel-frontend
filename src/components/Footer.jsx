import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='w-full bg-[#1A0B2D] font-inter text-white'>
      <div className='max-w-7xl mx-auto px-8 py-16'>
        <div className='flex flex-col md:flex-row justify-between'>
          {/* Left side columns */}
          <div className='flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-20 mb-10 md:mb-0'>
            {/* Company section */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Company</h3>
              <ul className="text-slate-300 font-thin text-base tracking-widest flex flex-col space-y-2">
                <li className="pt-2"><a href="#" className="hover:text-white">About Us</a></li>
                <li className="pt-2"><a href="#" className="hover:text-white">Team</a></li>
                <li className="pt-2"><a href="#" className="hover:text-white">NPATEL</a></li>
              </ul>
            </div>

            {/* Pages section */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Pages</h3>
              <ul className="text-slate-300 font-thin text-base tracking-widest flex flex-col space-y-2">
                <li className="pt-2"><a href="#" className="hover:text-white">Home</a></li>
                <li className="pt-2"><a href="#" className="hover:text-white">Gallery</a></li>
                <li className="pt-2"><a href="#" className="hover:text-white">Community</a></li>
                <li className="pt-2"><a href="#" className="hover:text-white">Newsletter</a></li>
              </ul>
            </div>

            {/* Support section */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Support</h3>
              <ul className="text-slate-300 font-thin text-base tracking-widest flex flex-col space-y-2">
                <li className="pt-2"><a href="#" className="hover:text-white">Contact Us</a></li>
                <li className="pt-2"><a href="mailto:support@npatel.co.uk" className="hover:text-white">support@npatel.co.uk</a></li>
              </ul>
              <div className="flex gap-5 pt-7 text-xl">
                <a href="#" className="text-slate-300 hover:text-white"><FaFacebook /></a>
                <a href="#" className="text-slate-300 hover:text-white"><RiTwitterXLine /></a>
                <a href="#" className="text-slate-300 hover:text-white"><FaInstagram /></a>
                <a href="#" className="text-slate-300 hover:text-white"><FaDiscord /></a>
              </div>
            </div>
          </div>

          {/* Right side - PicHub newsletter */}
          <div className="max-w-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12  rounded-full flex items-center justify-center mr-3">
                <img src="/npatel-logo.svg" alt="Pichub Logo" width="54px" height="54px"/>
              </div>
              <h3 className="text-2xl font-bold">PicHub</h3>
            </div>
            <p className="text-slate-300 font-thin mb-4">
              Subscribe to the PicHub newsletter to stay up-to-date with the latest releases
            </p>
            <form>
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 mb-3 text-white focus:outline-none focus:border-white"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-white"
              />
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] mt-14 bg-slate-100/20"></div>
        
        {/* Copyright section */}
        <div className="pt-4 flex flex-col md:flex-row justify-between">
          <p className="text-white text-lg">© Copyright 2025, All Rights Reserved by NPATEL GROUP PVT LTD</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;