// src/components/ResultScreen.js
import React from 'react';
import { FaHome, FaCheckCircle, FaTimesCircle, FaTrophy, FaRedo } from 'react-icons/fa';

function ResultScreen({ mode, success, stats, onRestart, onBackToMenu }) {
  
  // --- 1. DURUM: TEK ATIŞ MODU TASARIMI ---
  if (mode === 'Tek Atış') {
    return (
        <div className="App-header">
            <div className="home-button" onClick={onBackToMenu}>
                <FaHome /> <span>Ana Menü</span>
            </div>

            {/* Büyük İkon (Doğruysa Yeşil Tik, Yanlışsa Kırmızı Çarpı) */}
            <div style={{ fontSize: '5rem', marginBottom: '20px' }}>
                {success ? 
                    <FaCheckCircle style={{ color: '#00e676' }} /> : 
                    <FaTimesCircle style={{ color: '#ff5252' }} />
                }
            </div>

            {/* Başlık */}
            <h1 style={{ fontSize: '3rem', margin: '10px 0' }}>
                {success ? "TEBRİKLER!" : "MAALESEF!"}
            </h1>

            {/* Alt Açıklama */}
            <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                {success ? "Yapay zekayı başarıyla tespit ettin." : "Yanlış görseli seçtin."}
            </p>

            {/* Tekrar Oyna Butonu */}
            <button className="mode-button" onClick={onRestart} style={{ marginTop: '40px', minWidth: '220px' }}>
                <FaRedo style={{ marginRight: '10px' }} /> Tekrar Oyna
            </button>
        </div>
    );
  }

  // --- 2. DURUM: ZAMANLA YARIŞ (veya diğerleri) TASARIMI ---
  return (
    <div className="App-header">
      
      <div className="home-button" onClick={onBackToMenu}>
        <FaHome /> <span>Ana Menü</span>
      </div>

      <FaTrophy style={{ fontSize: '4rem', color: '#ffc107', marginBottom: '20px' }} />
      
      <h1>Süre Doldu!</h1>
      
      <div className="stats-container">
        <div className="stat-box correct">
            <FaCheckCircle />
            <div>
                <h3>Doğru</h3>
                <span>{stats.correct}</span>
            </div>
        </div>

        <div className="stat-box wrong">
            <FaTimesCircle />
            <div>
                <h3>Yanlış</h3>
                <span>{stats.wrong}</span>
            </div>
        </div>
      </div>
      
      <div className="total-score">
         Toplam Skor: <strong>{stats.correct * 10 - stats.wrong * 5}</strong>
      </div>

      <button className="mode-button" onClick={onRestart} style={{ minWidth: '200px', marginTop: '30px' }}>
        <FaRedo style={{ marginRight: '10px' }} /> Yeni Tur
      </button>
    </div>
  );
}

export default ResultScreen;
