// src/components/GameScreen.js
import React from 'react';

// onGameEnd: Oyun bittiğinde App.js'e haber verecek fonksiyon
function GameScreen({ onGameEnd }) {
  return (
    <div className="App-header">
      <h1>Oyun Ekranı</h1>
      <p>Burada 3 görsel gösterilecek (Biri AI, ikisi gerçek).</p>

      {/* Şimdilik oyunu bitirmek için sahte test butonları ekleyelim */}
      <button onClick={() => onGameEnd(true)}>Doğru Bildim (Test)</button>
      <button onClick={() => onGameEnd(false)}>Yanlış Bildim (Test)</button>
    </div>
  );
}

export default GameScreen;