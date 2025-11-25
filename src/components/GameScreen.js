// src/components/GameScreen.js
import React from 'react';
import ImageCard from './ImageCard';
import { FaHome } from 'react-icons/fa';

function GameScreen({ onGameEnd, onBackToMenu }) {
  
  // Test için 3 farklı resim URL'si
  const image1 = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80"; // Manzara
  const image2 = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"; // Ayakkabı
  const image3 = "https://images.unsplash.com/photo-1596854703505-a10565135156?w=500&q=80"; // Bina

  const handleCardClick = () => {
    console.log("Bir resim seçildi!");
    onGameEnd(true); 
  };

  return (
    <div className="App-header">
      
      <div className="home-button" onClick={onBackToMenu}>
        <FaHome /> 
        <span>Ana Menü</span>
      </div>

      <h1>Hangisi Yapay Zeka?</h1>
      <p>Görsellerden birini seç.</p>
      
      <div className="game-container">
        {/* Her karta farklı bir 'imgSrc' gönderiyoruz */}
        <ImageCard imgSrc={image1} onClick={handleCardClick} />
        <ImageCard imgSrc={image2} onClick={handleCardClick} />
        <ImageCard imgSrc={image3} onClick={handleCardClick} />
      </div>
    </div>
  );
}

export default GameScreen;