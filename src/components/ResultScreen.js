// src/components/ResultScreen.js
import React from 'react';
import { FaHome } from 'react-icons/fa'; // İkonu import ettik

// onBackToMenu prop'unu buraya ekledik
function ResultScreen({ success, onRestart, onBackToMenu }) {
  return (
    <div className="App-header">
      
      {/* --- Ana Menü Butonu (Sol Üst) --- */}
      <div className="home-button" onClick={onBackToMenu}>
        <FaHome /> 
        <span>Ana Menü</span>
      </div>

      {success ? (
        <h1>Tebrikler! Doğru Tahmin.</h1>
      ) : (
        <h1>Maalesef! Bu sefer olmadı.</h1>
      )}
      
      <button className="mode-button" onClick={onRestart} style={{ minWidth: '200px' }}>
        Yeni Tur
      </button>
    </div>
  );
}

export default ResultScreen;