// src/components/GameScreen.js
import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import { FaHome, FaClock, FaPlay } from 'react-icons/fa';

// Resim havuzu (Daha sonra burası genişletilebilir)
const IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
  "https://images.unsplash.com/photo-1596854703505-a10565135156?w=500&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&q=80",
  "https://images.unsplash.com/photo-1501854140884-074bf86ee91c?w=500&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80"
];

function GameScreen({ onGameEnd, onBackToMenu, mode }) {
  
  // Sadece "Zamanla Yarış" modu için gerekli state'ler
  const isTimeAttack = mode === 'Zamanla Yarış';
  
  const [timeLeft, setTimeLeft] = useState(20); // 20 Saniye
  const [gameActive, setGameActive] = useState(false); // Oyun başladı mı?
  const [stats, setStats] = useState({ correct: 0, wrong: 0 }); // Anlık skor
  const [feedback, setFeedback] = useState(""); // "Doğru!" veya "Yanlış!" yazısı
  
  // Ekranda gösterilecek 3 resim (Şimdilik rastgele seçiyoruz)
  const [currentImages, setCurrentImages] = useState(IMAGES.slice(0, 3));

  // --- ZAMANLAYICI MANTIĞI ---
  useEffect(() => {
    let interval = null;
    
    // Eğer oyun aktifse ve süre bitmediyse sayacı çalıştır
    if (isTimeAttack && gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } 
    // Süre bittiğinde
    else if (timeLeft === 0) {
      clearInterval(interval);
      setGameActive(false);
      onGameEnd(stats); // Sonuçları gönder ve bitir
    }

    return () => clearInterval(interval);
  }, [gameActive, timeLeft, isTimeAttack, onGameEnd, stats]);

  // --- OYUNU BAŞLATMA ---
  const handleStartTimer = () => {
    setGameActive(true);
    setStats({ correct: 0, wrong: 0 });
    setFeedback("");
    shuffleImages();
  };

  // --- RESİMLERİ KARIŞTIRMA (YENİ TUR) ---
  const shuffleImages = () => {
    // Basit bir karıştırma mantığı (Random 3 resim seç)
    const shuffled = [...IMAGES].sort(() => 0.5 - Math.random());
    setCurrentImages(shuffled.slice(0, 3));
  };

  // --- KART SEÇİMİ ---
  const handleCardClick = (index) => {
    // Eğer Zamanla Yarış ise ve oyun başlamadıysa tıklatmayalım
    if (isTimeAttack && !gameActive) return;

    // --- BURADA DOĞRU/YANLIŞ MANTIĞI OLACAK ---
    // Şimdilik 1. kartı (index 0) her zaman "Yapay Zeka" kabul edelim (Test için)
    // Gerçekte backend'den gelen veriyle kontrol edilecek.
    const isAi = index === 0; // Sadece örnek mantık!
    
    if (isAi) {
      setFeedback("✅ Doğru!");
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setFeedback("❌ Yanlış!");
      setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }

    // Hemen yeni görselleri getir
    setTimeout(() => {
        setFeedback(""); // Yazıyı kısa süre sonra temizle
        shuffleImages();
    }, 500); // Yarım saniye bekleyip yenisini getir (kullanıcı sonucu görsün)
  };

  return (
    <div className="App-header">
      
      <div className="home-button" onClick={onBackToMenu}>
        <FaHome /> <span>Ana Menü</span>
      </div>

      {/* --- ZAMANLA YARIŞ ÖZEL ALANI --- */}
      {isTimeAttack && (
        <div className="timer-container">
            {/* Süre Göstergesi */}
            <div className={`timer-box ${timeLeft <= 5 ? 'danger' : ''}`}>
                <FaClock /> {timeLeft}s
            </div>

            {/* Başlat Butonu (Sadece oyun başlamadıysa görünür) */}
            {!gameActive && timeLeft > 0 && (
                <div className="start-overlay">
                    <h2>Hazır mısın?</h2>
                    <button className="start-game-btn" onClick={handleStartTimer}>
                        <FaPlay /> OYUNU BAŞLAT
                    </button>
                </div>
            )}
        </div>
      )}

      {/* Başlık (Oyun sırasında gizleyebiliriz veya küçük gösterebiliriz) */}
      {!gameActive && <h1>{mode}</h1>}
      
      {/* --- OYUN ALANI --- */}
      <div className={`game-container ${!gameActive && isTimeAttack ? 'blurred' : ''}`}>
        {currentImages.map((imgUrl, index) => (
          <ImageCard 
            key={index} 
            imgSrc={imgUrl} 
            onClick={() => handleCardClick(index)} 
          />
        ))}
      </div>

      {/* --- ANLIK GERİ BİLDİRİM YAZISI --- */}
      <div className="feedback-text">
        {feedback}
      </div>

    </div>
  );
}

export default GameScreen;