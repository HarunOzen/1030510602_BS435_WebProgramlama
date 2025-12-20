// src/components/GameScreen.js
import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import { FaHome, FaClock, FaPlay, FaLightbulb } from 'react-icons/fa';

// Örnek İpuçları
const TIPS = [
  "gölgelere dikkat et",
  "Arka plandaki yansımalara bak.",
  "yansımaların simetrisini kontrol et.",
  "aşırı pürüzsüzlük yapay olabilir.",
  "Gölgelerin ışık kaynağıyla uyumsuzluğuna bak."
];

const createPathArray = (folder, count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    src: `/assets/${folder}/${i + 1}.png`, 
    isAi: folder === 'ai',
    tip: folder === 'ai' ? TIPS[i % TIPS.length] : null 
  }));
};

const AI_IMAGES = createPathArray('ai', 9); 
const REAL_IMAGES = createPathArray('real', 24);

function GameScreen({ onGameEnd, onBackToMenu, mode }) {
  
  const isTimeAttack = mode === 'Zamanla Yarış';
  
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameActive, setGameActive] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [feedback, setFeedback] = useState("");
  const [currentRoundImages, setCurrentRoundImages] = useState([]);
  
  // --- YENİ STATE'LER ---
  const [hasSecondChance, setHasSecondChance] = useState(false); // İkinci şans kullanıldı mı?
  const [disabledCardId, setDisabledCardId] = useState(null); // Yanlış seçilen kartın ID'si
  const [currentTip, setCurrentTip] = useState(null); // Gösterilecek ipucu

  useEffect(() => {
    if (!isTimeAttack) {
      startNewRound();
    }
    // eslint-disable-next-line
  }, [isTimeAttack]);

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

  const startNewRound = () => {
    const randomAi = AI_IMAGES[Math.floor(Math.random() * AI_IMAGES.length)];
    const shuffledReal = [...REAL_IMAGES].sort(() => 0.5 - Math.random());
    const randomReal1 = shuffledReal[0];
    const randomReal2 = shuffledReal[1];
    
    // AI görseline ait ipucunu kaydet
    setCurrentTip(randomAi.tip);

    const roundImages = [randomAi, randomReal1, randomReal2].sort(() => 0.5 - Math.random());
    
    setCurrentRoundImages(roundImages);
    
    // Yeni turda her şeyi sıfırla
    setHasSecondChance(false);
    setDisabledCardId(null);
    setFeedback("");
  };

  const handleStartTimer = () => {
    setGameActive(true);
    setStats({ correct: 0, wrong: 0 });
    setFeedback("");
    startNewRound();
  };

  // --- KART SEÇİM MANTIĞI (GÜNCELLENDİ) ---
  const handleCardClick = (selectedImage) => {
    if (isTimeAttack && !gameActive) return;
    // Eğer tıklanan kart zaten devre dışıysa işlem yapma
    if (disabledCardId === selectedImage.id && !selectedImage.isAi) return;

    // --- DOĞRU CEVAP ---
    if (selectedImage.isAi) {
      setFeedback("✅ Doğru!");
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      
      // Zamanla Yarış modundaysak hemen yeni tur
      if (isTimeAttack) {
        setTimeout(() => { startNewRound(); }, 500);
      } 
      // Tek Atış modundaysak oyunu bitir (Başarılı)
      else {
        setTimeout(() => onGameEnd(true), 500);
      }
    } 
    
    // --- YANLIŞ CEVAP ---
    else {
      // Eğer bu İLK yanlışsa ve mod Tek Atış ise -> İKİNCİ ŞANS VER
      if (!hasSecondChance && !isTimeAttack) {
        setHasSecondChance(true);
        setDisabledCardId(selectedImage.id); // Bu kartı devre dışı bırak
        setFeedback("⚠️ Yanlış! İpucuna bak ve tekrar dene.");
      } 
      
      // Eğer ikinci şans da kullanıldıysa veya Zamanla Yarış modundaysak -> KAYBETTİN
      else {
        setFeedback("❌ Yanlış!");
        setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        
        if (isTimeAttack) {
          setTimeout(() => { startNewRound(); }, 500);
        } else {
          setTimeout(() => onGameEnd(false), 500);
        }
      }
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

      {(!isTimeAttack || !gameActive) && <h1>{mode}</h1>}
      
      <div className={`game-container ${(!gameActive && isTimeAttack) ? 'blurred' : ''}`}>
        {currentRoundImages.map((imgObj, index) => (
          <ImageCard 
            key={index} 
            imgSrc={imgObj.src} 
            onClick={() => handleCardClick(imgObj)}
            // Eğer bu kart devre dışı bırakılan kartsa, ona özel bir stil uygula
            isDisabled={disabledCardId === imgObj.id && !imgObj.isAi}
          />
        ))}
      </div>

      <div className="feedback-text">
        {feedback}
      </div>

      {/* --- İPUCU KUTUSU (Sadece ikinci şans aktifse görünür) --- */}
      {hasSecondChance && !isTimeAttack && (
        <div className="tip-box">
          <strong><FaLightbulb /> İpucu:</strong> {currentTip}
        </div>
      )}

    </div>
  );
}

export default GameScreen;