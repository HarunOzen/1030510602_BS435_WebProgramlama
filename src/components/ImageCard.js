// src/components/ImageCard.js
import React from 'react';

// 'isDisabled' prop'unu ekledik
function ImageCard({ onClick, imgSrc, isDisabled }) {
  return (
    // Eğer kart disabled ise, 'disabled' CSS sınıfını ekle
    <div className={`image-card ${isDisabled ? 'disabled' : ''}`} onClick={onClick}>
      <img src={imgSrc} alt="Oyun Görseli" />

      {/* Devre dışı kalınca üzerine çarpı işareti koyalım */}
      {isDisabled && <div className="disabled-overlay">❌</div>}
    </div>
  );
}

export default ImageCard;