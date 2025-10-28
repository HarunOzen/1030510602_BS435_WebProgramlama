// src/components/ResultScreen.js
import React from 'react';

function ResultScreen({ success, onRestart }) {
  return (
    <div className="App-header">

      {/* Gelen sonuca (success) göre farklı mesaj göster */}
      {success ? (
        <h1>Tebrikler! Doğru Tahmin.</h1>
      ) : (
        <h1>Maalesef! Bu sefer olmadı.</h1>
      )}

      {/* Yeniden başlatma seçeneği sun  */}
      <button onClick={onRestart}>Yeni Tur</button>
    </div>
  );
}

export default ResultScreen;