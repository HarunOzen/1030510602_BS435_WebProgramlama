// src/components/GameScreen.js
import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import { FaHome, FaClock, FaPlay } from 'react-icons/fa';

// --- GÖRSEL HAVUZU OLUŞTURMA ---

// Yardımcı fonksiyon: Belirtilen sayı kadar resim yolunu diziye atar
// Örn: createPathArray('ai', 3) -> ['/assets/ai/1.jpg', '/assets/ai/2.jpg', '/assets/ai/3.jpg']
const createPathArray = (folder, count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    src: `/assets/${folder}/${i + 1}.jpg`,
    isAi: folder === 'ai' // Bu resmin AI olup olmadığını etiketliyoruz
  }));
};

// 100 tane AI, 50 tane Gerçek görsel olduğunu varsayıyoruz
const AI_IMAGES = createPathArray('ai', 100);
const REAL_IMAGES = createPathArray('real', 50);

// Tüm görselleri tek havuzda birleştiriyoruz (Şimdilik karıştırmadan)
const ALL_IMAGES = [...AI_IMAGES, ...REAL_IMAGES];

function GameScreen({ onGameEnd, onBackToMenu, mode }) {
  
  const isTimeAttack = mode === 'Zamanla Yarış';
  
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameActive, setGameActive] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [feedback, setFeedback] = useState("");
  
  // Ekranda gösterilecek 3 resim (State)
  const [currentRoundImages, setCurrentRoundImages] = useState([]);

  // --- OYUN BAŞLADIĞINDA VE TUR YENİLENDİĞİNDE ---
  useEffect(() => {
    // Eğer mod Zamanla Yarış DEĞİLSE, sayfa açılır açılmaz resimleri yükle
    if (!isTimeAttack) {
      startNewRound();
    }
    // eslint-disable-next-line
  }, [isTimeAttack]);

  // --- ZAMANLAYICI ---
  useEffect(() => {
    let interval = null;
    if (isTimeAttack && gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimeAttack) {
      clearInterval(interval);
      setGameActive(false);
      onGameEnd(stats);
    }
    return () => clearInterval(interval);
  }, [gameActive, timeLeft, isTimeAttack, onGameEnd, stats]);


  // --- YENİ TUR BAŞLATMA (Resim Seçme Mantığı) ---
  const startNewRound = () => {
    // 1. Rastgele 1 tane AI görseli seç
    const randomAi = AI_IMAGES[Math.floor(Math.random() * AI_IMAGES.length)];
    
    // 2. Rastgele 2 tane Gerçek görsel seç
    // (Aynı görselin gelmemesi için basit bir karıştırma yapıyoruz)
    const shuffledReal = [...REAL_IMAGES].sort(() => 0.5 - Math.random());
    const randomReal1 = shuffledReal[0];
    const randomReal2 = shuffledReal[1];

    // 3. Bu üçünü birleştir ve karıştır (Ki AI hep başta çıkmasın)
    const roundImages = [randomAi, randomReal1, randomReal2].sort(() => 0.5 - Math.random());
    
    setCurrentRoundImages(roundImages);
  };

  // --- OYUNU BAŞLAT (Zamanla Yarış İçin) ---
  const handleStartTimer = () => {
    setGameActive(true);
    setStats({ correct: 0, wrong: 0 });
    setFeedback("");
    startNewRound(); // İlk resimleri getir
  };

  // --- KART SEÇİMİ ---
  const handleCardClick = (selectedImage) => {
    // Zamanla yarışta oyun başlamadıysa tıklanmasın
    if (isTimeAttack && !gameActive) return;

    // --- DOĞRU/YANLIŞ KONTROLÜ ---
    // Artık 'selectedImage.isAi' özelliği sayesinde gerçeği biliyoruz!
    if (selectedImage.isAi) {
      setFeedback("✅ Doğru!");
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      
      // Tek Atış moduysa hemen bitir
      if (!isTimeAttack) {
         setTimeout(() => onGameEnd(true), 500);
         return; 
      }

    } else {
      setFeedback("❌ Yanlış!");
      setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
      
      // Tek Atış moduysa hemen bitir (Kaybettin)
      if (!isTimeAttack) {
        setTimeout(() => onGameEnd(false), 500);
        return;
      }
    }

    // Zamanla yarış modundaysak, yeni turu getir
    if (isTimeAttack) {
      setTimeout(() => {
          setFeedback("");
          startNewRound();
      }, 500);
    }
  };

  return (
    <div className="App-header">
      
      <div className="home-button" onClick={onBackToMenu}>
        <FaHome /> <span>Ana Menü</span>
      </div>

      {isTimeAttack && (
        <div className="timer-container">
            <div className={`timer-box ${timeLeft <= 5 ? 'danger' : ''}`}>
                <FaClock /> {timeLeft}s
            </div>
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

      {/* Başlık sadece oyun aktif değilse veya mod Tek Atış ise görünsün */}
      {(!isTimeAttack || !gameActive) && <h1>{mode}</h1>}
      
      <div className={`game-container ${(!gameActive && isTimeAttack) ? 'blurred' : ''}`}>
        {/* Resimler henüz yüklenmediyse boş div dönmesin diye kontrol */}
        {currentRoundImages.length > 0 && currentRoundImages.map((imgObj, index) => (
          <ImageCard 
            key={index} 
            imgSrc={imgObj.src} 
            // Tıklayınca tüm resim objesini gönderiyoruz (ki isAi kontrolü yapabilelim)
            onClick={() => handleCardClick(imgObj)} 
          />
        ))}
      </div>

      <div className="feedback-text">
        {feedback}
      </div>

    </div>
  );
}

export default GameScreen;