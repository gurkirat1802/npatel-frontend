import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth-page/AuthPage';
import HomePage from './pages/home-page/hompage';
import AboutPage from './pages/about-page/aboutPage';
import GalleryHome from './pages/gallery/galleryHome';
import ContactPage from './pages/contact-page/ContactPage'

function App() {
    const [searchInput, setSearchInput] = useState("");
  
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<HomePage setSearchKey={setSearchInput}/>} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryHome searchInput={searchInput} setSearchInput={setSearchInput}/>} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;