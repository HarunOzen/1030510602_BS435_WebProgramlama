// src/components/StartScreen.js
import React, { useState } from 'react'; // 1. useState'i import etmeyi unutma
import { FaBook, FaBullseye, FaStopwatch, FaMountain, FaTimes } from 'react-icons/fa'; // FaTimes (X ikonu) eklendi

function StartScreen({ onStartGame }) {
  // Modalın açık olup olmadığını tutan state (Başlangıçta kapalı = false)
  const [showModal, setShowModal] = useState(false);

  const handleModeClick = (modeName) => {
    console.log(modeName + " modu seçildi.");
    onStartGame(modeName); 
  };

  // Kılavuz butonuna basınca modalı aç
  const handleGuideClick = () => {
    setShowModal(true);
  };

  // Kapat butonuna (veya arka plana) basınca modalı kapat
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App-header">
      
      {/* Kılavuz Butonu */}
      <div className="guide-button" onClick={handleGuideClick}>
        <FaBook /> 
        <span>Oyun Kılavuzu</span>
      </div>

      {/* --- MODAL (AÇILIR PENCERE) BAŞLANGICI --- */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          {/* stopPropagation: İçeriğe tıklayınca modal kapanmasın diye */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h2><FaBook /> Nasıl Oynanır?</h2>
              <button className="close-button" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <p>Yapay Zeka Görsel Bulma Oyununa hoş geldin! Amacın, sana gösterilen 3 görsel arasından <strong>Yapay Zeka (AI) tarafından üretilen</strong> görseli bulmaktır.</p>
              
              <h3>Oyun Modları</h3>
              <ul className="rules-list">
                <li>
                  <strong><FaBullseye className="icon-red" /> Tek Atış:</strong>
                  <p>Klasik mod. Süre sınırı yok. Görselleri dikkatlice incele ve doğru tahmin yap.</p>
                </li>
                <li>
                  <strong><FaStopwatch className="icon-yellow" /> Zamanla Yarış:</strong>
                  <p>Hız önemli! Belirli bir süre içinde olabildiğince çok doğru tahmin yaparak en yüksek skoru elde et.</p>
                </li>
                <li>
                  <strong><FaMountain className="icon-green" /> Sınırlarını Aş:</strong>
                  <p>En zor mod. Görseller arasındaki farkları ayırt etmek çok zor. Sadece ustalar için!</p>
                </li>
              </ul>

              <div className="tips">
                <strong>İpucu:</strong> Arka plan detaylarına, parmaklara ve ışık gölgelerine dikkat et!
              </div>
            </div>

          </div>
        </div>
      )}
      {/* --- MODAL BİTİŞİ --- */}


      {/* Mod Butonları */}
      <button className="mode-button tek-atis" onClick={() => handleModeClick('Tek Atış')}>
        <FaBullseye /> Tek Atış
      </button>
      
      <button className="mode-button zamanla-yaris" onClick={() => handleModeClick('Zamanla Yarış')}>
        <FaStopwatch /> Zamanla Yarış
      </button>
      
      <button className="mode-button sinirlarini-as" onClick={() => handleModeClick('Sınırlarını Aş')}>
        <FaMountain /> Sınırlarını Aş
      </button>

    </div>
  );
}

export default StartScreen;