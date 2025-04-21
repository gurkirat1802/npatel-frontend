import React from 'react';
import { BsSearch } from 'react-icons/bs';

function HeroSection() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen py-12 px-4">
            {/* Background with particle effect */}
            <div className="absolute inset-0 bg-black z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/20 to-black"></div>
            </div>

            {/* Search and Explore Section */}
            <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-center mb-12">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-white/10 backdrop-blur-sm text-white border border-purple-300/30 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-white/70"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <BsSearch className="text-white w-5 h-5" />
                        </div>
                    </div>
                    <button className="ml-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 whitespace-nowrap">
                        EXPLORE
                    </button>
                </div>

                {/* Text Content */}
                <div className="text-center">
                    <h1 className="text-white text-3xl md:text-4xl font-normal tracking-wider mb-4 font-['Inter'] letter-spacing-wide">
                        Explore Stunning Photos
                    </h1>
                    <p className="text-white text-lg md:text-xl font-['Inter'] tracking-wider">
                        Find And Download Amazing Images From Our Vast Collection
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;