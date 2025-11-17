// src/components/GameScreen.js
import React from 'react';
import ImageCard from './ImageCard';
import { FaHome } from 'react-icons/fa'; // İkonu import ettik

// onBackToMenu prop'unu buraya ekledik
function GameScreen({ onGameEnd, onBackToMenu }) {
  
  const handleCardClick = () => {
    console.log("Bir resim seçildi!");
    onGameEnd(true); 
  };

  return (
    <div className="App-header">
      
      {/* --- Ana Menü Butonu (Sol Üst) --- */}
      <div className="home-button" onClick={onBackToMenu}>
        <FaHome /> 
        <span>Ana Menü</span>
      </div>

      <h1>Hangisi Yapay Zeka?</h1>
      <p>Görsellerden birini seç.</p>
      
      <div className="game-container">
        <ImageCard onClick={handleCardClick} />
        <ImageCard onClick={handleCardClick} />
        <ImageCard onClick={handleCardClick} />
      </div>
    </div>
  );
}

export default GameScreen;