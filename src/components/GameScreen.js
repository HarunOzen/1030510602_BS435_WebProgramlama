// src/components/GameScreen.js
import React from 'react';
import ImageCard from './ImageCard'; // 1. Yeni ImageCard component'imizi import ediyoruz

// App.js'den gelen 'onGameEnd' fonksiyonunu prop olarak alıyoruz
function GameScreen({ onGameEnd }) {

  // Bir resim kartına tıklandığında ne olacak?
  const handleCardClick = () => {
    console.log("Bir resim seçildi!");

    // Şimdilik test amaçlı, bir karta tıklandığında
    // oyunu 'başarılı' (true) olarak bitirelim.
    // Daha sonra buraya doğru/yanlış kontrol mantığı gelecek.
    onGameEnd(true); 
  };

  return (
    <div className="App-header">
      <h1>Hangisi Yapay Zeka?</h1>
      <p>Görsellerden birini seç.</p>

      {/* 2. Üç kartı yan yana (yatayda) tutacak bir container */}
      <div className="game-container">

        [cite_start]{/* 3. ImageCard component'imizi 3 kez çağırıyoruz [cite: 62] */}
        {/* Hepsine de tıklandığında handleCardClick fonksiyonunu çalıştırmasını söylüyoruz */}
        <ImageCard onClick={handleCardClick} />
        <ImageCard onClick={handleCardClick} />
        <ImageCard onClick={handleCardClick} />

      </div>
    </div>
  );
}

export default GameScreen;