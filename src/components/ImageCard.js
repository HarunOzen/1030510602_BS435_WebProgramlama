// src/components/ImageCard.js
import React from 'react';

// Bu, resimlerin içine konulacağı kart component'idir.
// 'onClick' prop'u sayesinde, tıklandığında GameScreen'e haber verecek.
function ImageCard({ onClick }) {
  return (
    // Tıklandığında 'onClick' fonksiyonunu tetikle
    <div className="image-card" onClick={onClick}>

      {/* Daha sonra buraya <img /> etiketi gelecek */}
      <p>Resim Yeri</p>

    </div>
  );
}

export default ImageCard;