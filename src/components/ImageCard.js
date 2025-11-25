// src/components/ImageCard.js
import React from 'react';

// 'imgSrc' adında yeni bir prop alıyoruz (Resmin adresi)
function ImageCard({ onClick, imgSrc }) {
  return (
    <div className="image-card" onClick={onClick}>
      
      {/* Artık <p> yerine <img> etiketi kullanıyoruz.
         src={imgSrc}: Resmin adresi yukarıdan geliyor.
         alt="Oyun Görseli": Resim yüklenemezse görünecek yazı.
      */}
      <img src={imgSrc} alt="Oyun Görseli" />
      
    </div>
  );
}

export default ImageCard;