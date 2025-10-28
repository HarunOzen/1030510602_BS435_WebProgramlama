// src/App.js

import React, { useState } from 'react'; // 'useState' hook'unu import ettik
import './App.css';

// Yeni oluşturduğumuz component'leri import ediyoruz
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  // Oyunun o anki durumunu (hangi ekranda olduğumuzu) tutmak için bir "state" (durum) tanımlıyoruz.
  // 3 durumumuz olacak: 'start', 'playing', 'result'
  const [gameState, setGameState] = useState('start'); // Oyun 'start' ekranıyla başlasın

  // Son oyunun sonucunu (başarılı/başarısız) tutmak için bir state
  const [gameResult, setGameResult] = useState(false);

  // 1. StartScreen'den çağrılacak ve oyunu 'playing' durumuna geçirecek fonksiyon
  const handleStartGame = () => {
    setGameState('playing');
  };

  // 2. GameScreen'den çağrılacak ve oyunu 'result' durumuna geçirecek fonksiyon
  const handleGameEnd = (success) => {
    setGameResult(success); // Başarı durumunu kaydet
    setGameState('result'); // Ekranı 'result' olarak değiştir
  };

  // 3. ResultScreen'den çağrılacak ve oyunu yeniden başlatacak fonksiyon
  const handleRestart = () => {
    setGameState('playing'); // Oyunu tekrar 'playing' ekranına al
  };

  // Hangi ekranın gösterileceğine karar veren fonksiyon
  const renderScreen = () => {
    if (gameState === 'start') {
      // 'onStartGame' prop'u olarak handleStartGame fonksiyonumuzu StartScreen'e gönderiyoruz
      return <StartScreen onStartGame={handleStartGame} />;
    } 
    else if (gameState === 'playing') {
      return <GameScreen onGameEnd={handleGameEnd} />;
    } 
    else if (gameState === 'result') {
      return <ResultScreen success={gameResult} onRestart={handleRestart} />;
    }
  };

  return (
    <div className="App">
      {/* renderScreen() fonksiyonu o anki duruma (state) göre 
        doğru component'i (StartScreen, GameScreen, veya ResultScreen) buraya yerleştirecek.
      */}
      {renderScreen()}
    </div>
  );
}

export default App;