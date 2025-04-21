import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegThumbsUp, FaThumbsUp, FaSearch } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./galleryHome.css";
import { postCall } from "../../../heimdall-portal/connector.engine";
import { getUserDetail } from "../../auth/authDetail";
import ImgUploadPopup from "../../components/imgUploadPopup";
import { BsCloudUploadFill } from "react-icons/bs";

function GalleryPage({searchInput, setSearchInput}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [galleryTrigger, setGalleryTrigger] = useState({
    searchKey: searchInput,
    limit: 20,
    offset: 0
  });
  const [isGalleryMounted, setIsGalleryMounted] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  

  // Set component as mounted when it renders
  useEffect(() => {
    setIsGalleryMounted(true);
    
    // Cleanup function
    return () => {
      setIsGalleryMounted(false);
    };
  }, []);

  // Only load gallery when the component is actually mounted and gallery trigger changes
  useEffect(() => {
    if ((popupOpen == false)) {
      loadGallery(galleryTrigger);
    }
  }, [galleryTrigger, isGalleryMounted, popupOpen]);

  const loadGallery = async ({searchKey, limit, offset}) => {
    setLoading(true);
    await postCall(
      '/img/public/gallery',
      {
        searchKey,
        limit,
        offset,
      }
    ).then( async (res) => {
            if(res.code < 2000){ //fail case
              setLoading(false);
              console.error(res?.bucket?.error || "Image fetching failed!");
            } else { //success case
              setLoading(false);
              const validImages = res?.bucket?.gallery?.filter((img) => img.imageSrc);
              
              // Add liked property and random likes count to each image
              const processedImages = validImages?.map(img => ({
                ...img,
                liked: false,
                likes: Math.floor(Math.random() * 200) + 1,
                tastes: img.tastes || ["nature", "photography", "art"].slice(0, Math.floor(Math.random() * 3) + 1)
              })) || [];
              
              setImages(processedImages);
            }
        }
    )
  };

  const handleLike = (index) => {
    setImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, liked: !img.liked, likes: img.liked ? img.likes - 1 : img.likes + 1 } : img
      )
    );
  };

  const handleSearch = (e) => {
    setGalleryTrigger({
      ...galleryTrigger,
      searchKey: searchInput,
      offset: 0
    });
  };

  const handleUpload = () => {
    setPopupOpen(true)
  };

  const handleFilter = () => {
    handleSearch()
  };

  return (
    <div className="gallery-page">
      <Navbar />
      
      <div className="gallery-header">
        <div className="header-content">
          <h1>Explore and download stunning images</h1>
          <p>from our extensive collection.</p>
          
          <div className="search-controls">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Images here"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="search-input"
                />
              </div>
            </form>
            
            <button className="control-button filter-button" onClick={handleFilter}>
              Filter
            </button>
            
            <button className="control-button sort-button" onClick={handleUpload} style={{ display: getUserDetail()?.userId > 0? '': 'none'}}>
              Upload
            </button>
          </div>
        </div>
      </div>
      
      <div className="gallery-wrapper">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading amazing images...</p>
          </div>
        ) : (
          <div className="gallery-container">
            {images.length > 0 ? (
              images.map((image, index) => (
                <motion.div
                  key={index}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                >
                  <div className="image-wrapper">
                    <img
                      src={image.imageSrc}
                      alt={image.description || "Gallery image"}
                      className="gallery-image"
                      onError={(e) => {
                        // e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                      }}
                    />
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <p className="upload-info">
                          By: {image.uploadedBy || "Unknown"}
                        </p>
                        <p className="image-description">
                          {image.description || "Beautiful image"}
                        </p>
                        <div className="action-buttons">
                          <button className="download-btn">Download</button>
                          <div className="like-button" onClick={() => handleLike(index)}>
                            {image.liked ? (
                              <FaThumbsUp className="liked-icon" />
                            ) : (
                              <FaRegThumbsUp className="like-icon" />
                            )}
                            <span>{image.likes}</span>
                          </div>
                        </div>
                        <div className="tags">
                          {image.tastes && image.tastes.map((tag, i) => (
                            <motion.span 
                              key={i} 
                              className="tag"
                              whileHover={{ scale: 1.1 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="no-results">
                <h3>No images found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
        
        {images.length > 0 && (
          <div className="load-more">
            <button 
              className="load-more-btn"
              onClick={() => setGalleryTrigger({
                ...galleryTrigger,
                offset: galleryTrigger.offset + galleryTrigger.limit
              })}
            >
              Load More
            </button>
          </div>
        )}
      </div>
      
      <Footer />
      <div>
        {popupOpen &&
            <ImgUploadPopup closeEvent={setPopupOpen}/>
        }
    </div>
    </div>
  );
}

export default GalleryPage;