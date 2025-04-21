import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserDetail } from '../auth/authDetail';
import { deleteCall } from '../../heimdall-portal/connector.engine';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [userDetails, setUserDetail] = useState({
        userId: 0,
        userName: "",
        email: "",
        firstName: "",
        lastName: "",
        iat: 0,
        exp: 0
    });

    useEffect(() => {
        setUserDetail(getUserDetail());
    }, []);

    // Handle scroll effect for navbar background with enhanced opacity transition
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Toggle mobile menu with improved body lock
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        // Prevent scrolling when menu is open
        document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
    };

    const profileHandler = () => {
        navigate('/profile');
    };

    const logoutHandler = () => {
        setUserDetail({
            userId: 0,
            userName: "",
            email: "",
            firstName: "",
            lastName: "",
            iat: 0,
            exp: 0
        });
        localStorage.clear();
        deleteCall('/auth/refreshToken')
        navigate('/');
    };

    // Check if the current path matches the link
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Handle navigation for both desktop and mobile menu
    const handleNavigation = (path, event) => {
        event.preventDefault();
        // Close mobile menu if it's open
        if (mobileMenuOpen) {
            toggleMobileMenu();
        }
        navigate(path);
    };

    // Navigation items used in both desktop and mobile menus
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/Gallery', label: 'Gallery' },
        { path: '/about', label: 'About Us' },
        { path: '/Contact', label: 'Contact Us' }
    ];

    return (
        <>
            {/* Main Navbar */}
            <nav 
                className={`w-full fixed top-0 left-0 z-[9999] transition-all duration-300 ${
                    scrolled 
                        ? 'bg-black/85 backdrop-blur-lg shadow-lg h-16' 
                        : 'bg-gradient-to-b from-black/80 to-transparent h-20'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex items-center justify-between h-full">
                        {/* Logo with animation */}
                        <div className="flex items-center group">
                            <a 
                                href="/" 
                                className="flex items-center"
                                onClick={(e) => handleNavigation('/', e)}
                            >
                                <div className="h-10 w-10 rounded-full flex items-center justify-center mr-2 group-hover:scale-110 transition-all duration-300">
                                    <img src="/npatel-logo.svg" alt="PicHub Logo" className="h-12 w-12" />
                                </div>
                                <span className="text-white text-xl font-medium font-inter group-hover:text-purple-300 transition-colors duration-300">PicHub</span>
                            </a>
                        </div>

                        {/* Desktop Navigation with hover effects */}
                        <div className="hidden md:flex items-center space-x-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    onClick={(e) => handleNavigation(item.path, e)}
                                    className={`text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${
                                        isActive(item.path) 
                                            ? 'bg-white/15 font-semibold' 
                                            : 'hover:bg-white/10'
                                    }`}
                                >
                                    {item.label}
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transform scale-x-0 transition-transform duration-300 ${
                                        isActive(item.path) ? 'scale-x-100' : 'group-hover:scale-x-100'
                                    }`}></span>
                                </a>
                            ))}
                        </div>

                        {/* Desktop Auth Buttons with enhanced styling */}
                        <div className="hidden md:flex items-center space-x-4">
                            {userDetails?.userId ? (
                                <div className="flex items-center space-x-3">
                                    <button 
                                        className="text-white px-4 py-2 rounded-md text-sm font-medium border border-transparent hover:border-purple-400 hover:text-purple-300 transition-all duration-300" 
                                        onClick={profileHandler}
                                    >
                                        {`${userDetails.firstName} ${userDetails.lastName}`}
                                    </button>
                                    <button 
                                        className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-md hover:shadow-purple-500/30" 
                                        onClick={logoutHandler}
                                    >
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <a 
                                        href="/auth" 
                                        onClick={(e) => handleNavigation('/auth', e)}
                                        className="text-white px-6 py-2 rounded-md text-sm font-medium border border-white/30 hover:border-purple-400 hover:text-purple-300 transition-all duration-300"
                                    >
                                        Log in
                                    </a>
                                    <a 
                                        href="/auth" 
                                        onClick={(e) => handleNavigation('/auth', e)}
                                        className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-md text-sm font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-md hover:shadow-purple-500/30"
                                    >
                                        Sign up
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button with enhanced animation */}
                        <button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 transition-colors"
                            onClick={toggleMobileMenu}
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
                            <div className="relative w-6 h-6">
                                <span
                                    className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                                        mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                                    }`}
                                />
                                <span
                                    className={`absolute h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
                                        mobileMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
                                    }`}
                                />
                                <span
                                    className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                                        mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay with improved backdrop blur */}
            <div
                className={`fixed inset-0 z-[9998] bg-black/90 backdrop-blur-lg transition-all duration-500 md:hidden ${
                    mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={toggleMobileMenu}
            />

            {/* Mobile Menu Panel with enhanced animation and styling */}
            <div
                className={`fixed top-0 right-0 z-[9999] w-72 h-full bg-gradient-to-b from-purple-900 to-black transform transition-all duration-500 ease-in-out md:hidden overflow-y-auto ${
                    mobileMenuOpen ? 'translate-x-0 shadow-2xl shadow-purple-900/50' : 'translate-x-full'
                }`}
            >
                <div className="p-5 h-full flex flex-col">
                    {/* Close button with enhanced position */}
                    <div className="flex items-center justify-end mb-6">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white hover:text-purple-300 transition-colors duration-300"
                            aria-label="Close menu"
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Logo in menu with enhanced styling */}
                    <div className="flex items-center mb-10">
                        <div className="h-12 w-12 rounded-full bg-purple-600/30 flex items-center justify-center mr-3">
                            <img src="/npatel-logo.svg" alt="PicHub Logo" className="h-8 w-8" />
                        </div>
                        <span className="text-white text-2xl font-medium font-inter">PicHub</span>
                    </div>

                    {/* Navigation Links with enhanced hover effects */}
                    <div className="space-y-3 flex-1">
                        {navItems.map((item) => (
                            <a
                                key={item.path}
                                href={item.path}
                                onClick={(e) => handleNavigation(item.path, e)}
                                className={`block px-4 py-3 text-white text-lg font-medium rounded-lg transition-all duration-300 ${
                                    isActive(item.path) 
                                        ? 'bg-purple-600/30 border-l-4 border-purple-400' 
                                        : 'hover:bg-white/10 hover:border-l-4 hover:border-purple-400 hover:pl-5'
                                }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Auth Buttons with enhanced styling */}
                    {userDetails?.userId ? (
                        <div className="mt-6 space-y-4 pb-6">
                            <button 
                                className="block w-full px-4 py-3 text-center text-white border border-purple-400/30 rounded-lg text-base font-medium hover:bg-purple-600/20 transition-all duration-300"
                                onClick={profileHandler}
                            >
                                {`${userDetails.firstName} ${userDetails.lastName}`}
                            </button>
                            <button 
                                className="block w-full px-4 py-3 text-center bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg text-base font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-md"
                                onClick={logoutHandler}
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <div className="mt-6 space-y-4 pb-6">
                            <a 
                                href="/auth"
                                onClick={(e) => handleNavigation('/auth', e)}
                                className="block w-full px-4 py-3 text-center text-white border border-purple-400/30 rounded-lg text-base font-medium hover:bg-purple-600/20 transition-all duration-300"
                            >
                                Log in
                            </a>
                            <a 
                                href="/auth"
                                onClick={(e) => handleNavigation('/auth', e)}
                                className="block w-full px-4 py-3 text-center bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg text-base font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-md"
                            >
                                Sign up
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;