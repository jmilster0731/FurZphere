import React from 'react';

const ImageOverlay = ({ imageUrl, onClose }) => {
  return (
    <div className="image-overlay">
      <div className="overlay-content">
        <img src={imageUrl} alt="Full Image" />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageOverlay;