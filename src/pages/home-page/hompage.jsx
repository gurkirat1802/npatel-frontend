import React, { useEffect, useState } from 'react'
import { getAuthTokens, getUserDetail } from '../../auth/authDetail'
import { BsSearch } from 'react-icons/bs';
import GalleryHome from '../gallery/galleryHome';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom';

function HomePage({setSearchKey}) {
  const navigate = useNavigate()

  const filterHandler = () => {
    navigate('/gallery')
  }
    return (
      <>
        <div className="min-h-screen relative overflow-hidden">
          {/* Background with particle effect */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/20 to-black"></div>
          </div>
          
          {/* Navbar */}
          <Navbar/>
          
          {/* Hero Section */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-16 pb-12 px-4">
            {/* Search and Explore Section */}
            <div className="w-full max-w-3xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-center gap-4 mb-12">
              <div className="relative w-full md:flex-grow">
                <input
                  onChange={e => setSearchKey(e.target.value)}
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-white/10 backdrop-blur-sm text-white border border-purple-300/30 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-white/70"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <BsSearch className="text-white w-5 h-5" />
                </div>
              </div>
              <button onClick={e => filterHandler()} className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 whitespace-nowrap">
                EXPLORE
              </button>
            </div>
            
            {/* Text Content */}
            <div className="text-center">
              <h1 className="text-white text-3xl md:text-4xl font-normal tracking-wider mb-4 font-Inter letter-spacing-wide">
                Explore Stunning Photos
              </h1>
              <p className="text-white text-lg md:text-xl font-Inter tracking-wider">
                Find And Download Amazing Images From Our Vast Collection
              </p>
            </div>
            {/* <GalleryHome galleryTrigger = {galleryTrigger} setGalleryTrigger={setGalleryTrigger}  /> */}
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
export default HomePage