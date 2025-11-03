// src/components/StartScreen.js

import React from 'react';
import { FaBook, FaBullseye, FaStopwatch, FaMountain } from 'react-icons/fa';

function StartScreen({ onStartGame }) {
  
  // --- HATA ÇÖZÜMÜ: EKSİK FONKSİYONLARI BURAYA EKLE ---
  
  // 1. Mod butonuna tıklandığında App.js'e haber veren fonksiyon
  const handleModeClick = (modeName) => {
    console.log(modeName + " modu seçildi.");
    onStartGame(modeName); 
  };

  // 2. Kılavuz butonuna tıklandığında (şimdilik) konsola yazan fonksiyon
  const handleGuideClick = () => {
    console.log("Oyun Kılavuzu tıklandı!");
    // Daha sonra buraya bir modal (açılır pencere) ekleyebiliriz.
  };
  
  // --- FONKSİYONLARIN SONU ---

  return (
    <div className="App-header">
      
      {/* Artık bu fonksiyon tanımlandığı için hata vermeyecek */}
      <div className="guide-button" onClick={handleGuideClick}>
        <FaBook /> 
        <span>Oyun Kılavuzu</span>
      </div>

      {/* Artık bu fonksiyon tanımlandığı için hata vermeyecek */}
      <button 
        className="mode-button tek-atis" 
        onClick={() => handleModeClick('Tek Atış')}
      >
        <FaBullseye /> Tek Atış
      </button>
      
      <button 
        className="mode-button zamanla-yaris" 
        onClick={() => handleModeClick('Zamanla Yarış')}
      >
        <FaStopwatch /> Zamanla Yarış
      </button>
      
      <button 
        className="mode-button sinirlarini-as" 
        onClick={() => handleModeClick('Sınırlarını Aş')}
      >
        <FaMountain /> Sınırlarını Aş
      </button>

    </div>
  );
}

export default StartScreen;