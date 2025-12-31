// src/components/GameScreen.js
import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import { FaHome, FaClock, FaPlay, FaLightbulb } from 'react-icons/fa';
//zorunlu commit
// --- İPUCU HAVUZU ---
const TIPS = [
  "arka plandaki detaylara dikkat et.",
  "Arka plandaki yansımaları iyi incele.",
  "gölgelerin simetrisini kontrol et.",
  "görseldeki aşırı pürüzsüzlük yapay olabilir.",
  "Gölgelerin ışık kaynağıyla uyumsuzluğuna bak.",
  "ışığın geldiği açıyla gölgelerin uyumuna dikkat et.",
  "simetriye dikkat et."
];

// --- YARDIMCI FONKSİYONLAR ---
const createPathArray = (folder, count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    // ÖNEMLİ: Uzantı .png olarak ayarlandı
    src: `/assets/${folder}/${i + 1}.png`, 
    isAi: folder === 'ai',
    // Her resme rastgele bir ipucu ata
    tip: folder === 'ai' ? TIPS[i % TIPS.length] : null 
  }));
};

// --- RESİM HAVUZLARI (Senin klasöründeki sayılara göre güncel) ---
const AI_IMAGES = createPathArray('ai', 10);   // 10 adet AI görseli
const REAL_IMAGES = createPathArray('real', 24); // 24 adet Gerçek görsel

function GameScreen({ onGameEnd, onBackToMenu, mode }) {
  
  const isTimeAttack = mode === 'Zamanla Yarış';
  
  // --- STATE TANIMLAMALARI ---
  const [timeLeft, setTimeLeft] = useState(20); // 20 saniye süre
  const [gameActive, setGameActive] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [feedback, setFeedback] = useState("");
  const [currentRoundImages, setCurrentRoundImages] = useState([]);
  
  // Oyun İçi Özellik State'leri
  const [hasSecondChance, setHasSecondChance] = useState(false); // Tek Atış: İkinci şans kullanıldı mı?
  const [disabledCardId, setDisabledCardId] = useState(null); // Yanlış seçilen kartı devre dışı bırakmak için
  const [currentTip, setCurrentTip] = useState(null); // O turdaki geçerli ipucu
  const [hintUsed, setHintUsed] = useState(false); // Zamanla Yarış: İpucu butonu kullanıldı mı?

  // --- OYUN YÜKLENDİĞİNDE ---
  useEffect(() => {
    // Eğer mod Zamanla Yarış DEĞİLSE (Tek Atış vb.), oyun hemen başlar
    if (!isTimeAttack) {
      startNewRound();
    }
    // eslint-disable-next-line
  }, [isTimeAttack]);

  // --- ZAMANLAYICI MANTIĞI ---
  useEffect(() => {
    let interval = null;
    if (isTimeAttack && gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimeAttack) {
      clearInterval(interval);
      setGameActive(false);
      onGameEnd(stats); // Süre bitti, istatistikleri gönder
    }
    return () => clearInterval(interval);
  }, [gameActive, timeLeft, isTimeAttack, onGameEnd, stats]);

  // --- YENİ TUR BAŞLATMA ---
  const startNewRound = () => {
    // 1. Rastgele 1 AI görseli seç
    const randomAi = AI_IMAGES[Math.floor(Math.random() * AI_IMAGES.length)];
    
    // 2. Rastgele 2 Gerçek görsel seç
    const shuffledReal = [...REAL_IMAGES].sort(() => 0.5 - Math.random());
    const randomReal1 = shuffledReal[0];
    const randomReal2 = shuffledReal[1];
    
    // AI görseline ait ipucunu kaydet
    setCurrentTip(randomAi.tip);

    // 3. Üçünü birleştir ve karıştır
    const roundImages = [randomAi, randomReal1, randomReal2].sort(() => 0.5 - Math.random());
    setCurrentRoundImages(roundImages);
    
    // 4. State'leri Sıfırla
    setHasSecondChance(false);
    setDisabledCardId(null);
    setFeedback("");
    setHintUsed(false); // İpucu butonunu tekrar aktif et
  };

  // --- ZAMANLA YARIŞI BAŞLAT ---
  const handleStartTimer = () => {
    setGameActive(true);
    setStats({ correct: 0, wrong: 0 });
    setFeedback("");
    startNewRound();
  };

  // --- ZAMANLA YARIŞ: İPUCU BUTONU ---
  const handleShowHint = () => {
    if (hintUsed || timeLeft <= 3) return; // Zaten kullanıldıysa veya süre azsa dur
    setHintUsed(true); // İpucunu aç
    setTimeLeft(prev => prev - 3); // Cezası: 3 saniye düş
  };

  // --- KART SEÇİM VE KONTROL MANTIĞI ---
  const handleCardClick = (selectedImage) => {
    // Zamanla yarışta oyun başlamadıysa işlem yapma
    if (isTimeAttack && !gameActive) return;
    
    // Eğer kart devre dışıysa işlem yapma
    if (disabledCardId === selectedImage.id && !selectedImage.isAi) return;

    // --- SENARYO 1: DOĞRU CEVAP (AI SEÇİLDİ) ---
    if (selectedImage.isAi) {
      setFeedback("✅ Doğru!");
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      
      // Zamanla Yarış ise -> Yeni tur
      if (isTimeAttack) {
        setTimeout(() => { startNewRound(); }, 500);
      } 
      // Tek Atış ise -> Oyunu KAZANDIN
      else {
        setTimeout(() => onGameEnd(true), 500);
      }
    } 
    
    // --- SENARYO 2: YANLIŞ CEVAP (GERÇEK SEÇİLDİ) ---
    else {
      // Eğer mod Tek Atış ise ve henüz ikinci şans kullanılmadıysa:
      if (!isTimeAttack && !hasSecondChance) {
        setHasSecondChance(true);       // İkinci şansı aktifleştir
        setDisabledCardId(selectedImage.id); // Yanlış kartı kilitle
        setFeedback("⚠️ Yanlış! İpucuna bak ve tekrar dene."); // Uyarı ver
      } 
      
      // Diğer durumlarda (Zamanla Yarış veya İkinci Şans bitmişse):
      else {
        setFeedback("❌ Yanlış!");
        setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        
        // Zamanla Yarış ise -> Yeni tur
        if (isTimeAttack) {
          setTimeout(() => { startNewRound(); }, 500);
        } 
        // Tek Atış ise -> Oyunu KAYBETTİN
        else {
          setTimeout(() => onGameEnd(false), 500);
        }
      }
    }
  };

  return (
    <div className="App-header">
      
      {/* Ana Menüye Dönüş Butonu */}
      <div className="home-button" onClick={onBackToMenu}>
        <FaHome /> <span>Ana Menü</span>
      </div>

      {/* --- ZAMANLA YARIŞ PANELİ --- */}
      {isTimeAttack && (
        <div className="timer-container">
            {/* Süre Göstergesi */}
            <div className={`timer-box ${timeLeft <= 5 ? 'danger' : ''}`}>
                <FaClock /> {timeLeft}s
            </div>

            {/* İpucu Butonu (Aktif oyun, kullanılmamışsa) */}
            {gameActive && !hintUsed && (
              <button className="hint-button" onClick={handleShowHint}>
                <FaLightbulb /> İpucu Al (-3sn)
              </button>
            )}

            {/* İpucu Metni (Butona basıldıysa) */}
            {gameActive && hintUsed && (
              <div className="hint-text-active">
                <FaLightbulb /> {currentTip}
              </div>
            )}

            {/* Başlat Butonu Overlay */}
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

      {/* Başlık (Oyun sırasında gizlenebilir) */}
      {(!isTimeAttack || !gameActive) && <h1>{mode}</h1>}
      
      {/* --- OYUN ALANI (Resim Kartları) --- */}
      <div className={`game-container ${(!gameActive && isTimeAttack) ? 'blurred' : ''}`}>
        {currentRoundImages.map((imgObj, index) => (
          <ImageCard 
            key={index} 
            imgSrc={imgObj.src} 
            onClick={() => handleCardClick(imgObj)}
            // Kart devre dışıysa prop gönder
            isDisabled={disabledCardId === imgObj.id && !imgObj.isAi}
          />
        ))}
      </div>

      {/* Geri Bildirim Metni */}
      <div className="feedback-text">
        {feedback}
      </div>

      {/* --- TEK ATIŞ İÇİN İPUCU KUTUSU (İkinci Şans) --- */}
      {hasSecondChance && !isTimeAttack && (
        <div className="tip-box">
          <strong><FaLightbulb /> İpucu:</strong> {currentTip}
        </div>
      )}

    </div>
  );
}

export default GameScreen;
