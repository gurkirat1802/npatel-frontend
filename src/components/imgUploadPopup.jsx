import React, { useState, useRef, useEffect } from 'react';
import { getUserDetail } from '../auth/authDetail';
import { uploadImage } from '../helpers/uploadImage';
import { toast } from 'react-toastify';
import { postCallSecured } from '../../heimdall-portal/connector.engine';

function ImgUploadPopup({ closeEvent }) {
  const [roam, setRoam] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

   const [userDetails, setUserDetail] = useState({
        userId: 0,
        userName: "",
        email: "",
        firstName: "",
        lastName: "",
        iat: 0,
        exp: 0
    })
  
    useEffect(() => {
        setUserDetail(getUserDetail())
    }, [])

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  // Process selected files
  const processFiles = (files) => {
    const filesArray = Array.from(files);
    const imageFiles = filesArray.filter((file) => file.type.match('image.*'));
    if (imageFiles.length === 0) return;

    // Create new image objects with empty details
    const newImagesPromises = imageFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            file,
            title: '',
            description: '',
            tags: [],
            preview: e.target.result, // Use the FileReader result directly
          });
        };
        reader.readAsDataURL(file);
      });
    });

    // Once all images are processed, update state
    Promise.all(newImagesPromises).then((newImages) => {
      setUploadedImages((prev) => [...prev, ...newImages]);
    });
  };

  // Handle drag-and-drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('highlight');
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('highlight');
  };

  // Update image title
  const updateTitle = (index, title) => {
    const updatedImages = [...uploadedImages];
    updatedImages[index].title = title;
    setUploadedImages(updatedImages);
  };

  // Update image description
  const updateDescription = (index, description) => {
    const updatedImages = [...uploadedImages];
    updatedImages[index].description = description;
    setUploadedImages(updatedImages);
  };

  // Add tag to an image
  const addTag = (index, tag) => {
    // Split by comma if multiple tags were pasted
    const tags = tag.split(',').map(t => t.trim()).filter(t => t);
    
    const updatedImages = [...uploadedImages];
    tags.forEach(tagText => {
      if (!updatedImages[index].tags.includes(tagText)) {
        updatedImages[index].tags.push(tagText);
      }
    });
    
    setUploadedImages(updatedImages);
  };

  // Remove tag from an image
  const removeTag = (imageIndex, tagIndex) => {
    const updatedImages = [...uploadedImages];
    updatedImages[imageIndex].tags.splice(tagIndex, 1);
    setUploadedImages(updatedImages);
  };

  // Remove an image
  const removeImage = (index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
    
    if (updatedImages.length === 0) {
      setCurrentImageIndex(0);
    } else if (currentImageIndex >= updatedImages.length) {
      setCurrentImageIndex(updatedImages.length - 1);
    }
  };

  // Validate form
  const validateForm = () => {
    if (uploadedImages.length === 0) return false;
    
    return uploadedImages.every(
      (image) => image.title.trim() && image.tags.length > 0
    );
  };

  // Simulate file upload
  const uploadFiles = async () => {
    if (uploadedImages.length === 0 || !validateForm()) return;

    setIsUploading(true);
    setUploadProgress(0);
    let image = uploadedImages[0]
    await postCallSecured(
      '/img/upload/url',
      {
        imageName: image.title,
        description: image.description,
        uploadedBy: getUserDetail().userId,
        tastes: image.tags
      }
    ).then( async (res) => {
      if(res.code < 2000){ //fail case
        setIsUploading(false);
        console.error(res?.bucket?.error);
      } else { //success case
        let imageId = res.bucket.imageId
        await uploadImage({
          url: res.bucket.url,
          file: uploadedImages[0].file
        }).then(async res =>{
          await imageUploadSuccessUpdater(imageId)
          .then(res => {
            setIsUploading(false)
            closeEvent(false)
          })
        }).catch(err => {
          toast(err)
          setIsUploading(false)
        })
      }
    }
  )};

  const imageUploadSuccessUpdater = async (imageId) => {
    await postCallSecured(
      '/img/upload/success',
      {
        imageId
      }
    )
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Reset when component unmounts
  useEffect(() => {
    return () => {
      uploadedImages.forEach(image => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [uploadedImages]);

  // Update validation when uploaded images change
  useEffect(() => {
    if (uploadedImages.length > 0 && currentImageIndex >= uploadedImages.length) {
      setCurrentImageIndex(uploadedImages.length - 1);
    }
  }, [uploadedImages, currentImageIndex]);

  // Render navigation buttons for images
  const renderNavigation = () => {
    if (uploadedImages.length <= 1) return null;

    return (
      <div className="images-navigation">
        <button
          className="nav-btn"
          disabled={currentImageIndex === 0}
          onClick={() => setCurrentImageIndex((prev) => prev - 1)}
        >
          ← Previous
        </button>
        <div className="nav-indicator">
          Image {currentImageIndex + 1} of {uploadedImages.length}
          <div className="nav-dots">
            {uploadedImages.map((_, i) => (
              <div 
                key={i}
                className={`nav-dot ${i === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(i)}
              />
            ))}
          </div>
        </div>
        <button
          className="nav-btn"
          disabled={currentImageIndex === uploadedImages.length - 1}
          onClick={() => setCurrentImageIndex((prev) => prev + 1)}
        >
          Next →
        </button>
      </div>
    );
  };

  // Render the current image details
  const renderImageDetails = () => {
    if (uploadedImages.length === 0) return null;

    const image = uploadedImages[currentImageIndex];
    return (
      <div className="image-item">
        <div className="image-preview">
          <img 
            src={image.preview} 
            alt="Preview" 
            className="preview-image" 
          />
          <div className="file-info">
            <div className="file-details">
              <div className="file-name">{image.file.name}</div>
              <div className="file-size">{formatFileSize(image.file.size)}</div>
            </div>
            <button className="remove-file" onClick={() => removeImage(currentImageIndex)}>
              Remove
            </button>
          </div>
        </div>
        <div className="image-details">
          <div className="form-group">
            <label htmlFor={`title-${currentImageIndex}`}>Image Title *</label>
            <input
              type="text"
              id={`title-${currentImageIndex}`}
              className="form-control"
              placeholder="Enter a descriptive title for your image"
              value={image.title}
              onChange={(e) => updateTitle(currentImageIndex, e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor={`description-${currentImageIndex}`}>Description</label>
            <textarea
              id={`description-${currentImageIndex}`}
              className="form-control"
              placeholder="Enter a description for your image"
              value={image.description}
              onChange={(e) => updateDescription(currentImageIndex, e.target.value)}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor={`tags-${currentImageIndex}`}>Tags *</label>
            <div className="tags-input-container">
              {image.tags.map((tag, tagIndex) => (
                <div key={tagIndex} className="tag">
                  {tag}
                  <span
                    className="tag-close"
                    onClick={() => removeTag(currentImageIndex, tagIndex)}
                  >
                    &times;
                  </span>
                </div>
              ))}
              <input
                type="text"
                id={`tags-${currentImageIndex}`}
                className="tags-input"
                placeholder={image.tags.length ? '' : 'Add tags separated by comma or space'}
                onKeyDown={(e) => {
                  if (e.key === ',' || e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (value) {
                      addTag(currentImageIndex, value);
                      e.target.value = '';
                    }
                  } else if (e.key === 'Backspace' && e.target.value === '' && image.tags.length > 0) {
                    // Remove the last tag when backspace is pressed and input is empty
                    removeTag(currentImageIndex, image.tags.length - 1);
                  }
                }}
              />
            </div>
            <p className="form-hint">
              Add descriptive tags to help others find your image. Example: nature, sunset, beach
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="popupContainer" onClick={() => !roam && closeEvent(false)}>
      <div
        className="popupDiv"
        onMouseOver={() => setRoam(true)}
        onMouseLeave={() => setRoam(false)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">Upload Images</h3>
          <button className="close-btn" onClick={() => closeEvent(false)}>
            &times;
          </button>
        </div>
        {userDetails?.userId ? 
          <div className="modal-body">
            {uploadedImages.length === 0 ? (
              <div
                id="uploadArea"
                className="upload-area"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current.click()}
              >
                <div className="upload-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <h4 className="upload-text">Drag & Drop your images here</h4>
                <p className="upload-hint">or click to browse files</p>
                <input
                  type="file"
                  id="fileInput"
                  className="file-input"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <button
                  className="browse-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }}
                >
                  Browse Files
                </button>
              </div>
            ) : (
              <div id="imagesContainer" className="images-container active">
                {renderImageDetails()}
                {renderNavigation()}
                
              </div>
            )}
            {isUploading && (
              <div id="progressContainer" className="progress-container active">
                <div className="progress-bar">
                  <div
                    id="progress"
                    className="progress"
                    style={{ width: `${Math.round(uploadProgress)}%` }}
                  ></div>
                </div>
                <div id="progressText" className="progress-text">
                  {Math.round(uploadProgress)}%
                </div>
              </div>
            )}
          </div>
          :
          <div className='modal-body'>
            Please login to upload
          </div>
        }
        <div className="modal-footer">
          <button 
            id="cancelBtn" 
            className="cancel-btn" 
            onClick={() => closeEvent(false)}
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            id="submitBtn"
            className="submit-btn"
            disabled={!validateForm() || isUploading}
            onClick={uploadFiles}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImgUploadPopup;