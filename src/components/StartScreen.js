// src/components/StartScreen.js
import React from 'react';

// Bu bir FOKSİYONEL COMPONENT
// App.js'den 'onStartGame' adında bir fonksiyonu prop (özellik) olarak alacak
function StartScreen({ onStartGame }) {
  return (
    <div className="App-header">
      <h1>Yapay Zeka Görseli Bulma Oyunu</h1>
      <p>Bu oyunda sana gösterilen üç görselden hangisinin yapay zeka tarafından üretildiğini bulman gerekiyor.</p>

      {/* Bu butona tıklandığında, App.js'den gelen 
        'onStartGame' fonksiyonunu çağıracak ve oyun başlayacak.
      */}
      <button onClick={onStartGame}>Başla</button>
    </div>
  );
}

export default StartScreen;