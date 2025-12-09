// src/components/ResultScreen.js
import React from 'react';
import { FaHome, FaCheckCircle, FaTimesCircle, FaTrophy } from 'react-icons/fa';

function ResultScreen({ stats, onRestart, onBackToMenu }) {
  // stats: { correct: 5, wrong: 2 } gibi bir obje geliyor

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
        Tekrar Oyna
      </button>
    </div>
  );
}

export default ResultScreen;