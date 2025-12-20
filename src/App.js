// src/App.js
import React, { useState } from 'react';
import './App.css';

import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [gameState, setGameState] = useState('start');
  const [selectedMode, setSelectedMode] = useState(null); 
  
  // İki farklı veri türünü tutmak için state'ler
  const [gameStats, setGameStats] = useState({ correct: 0, wrong: 0 }); // Zamanla Yarış için
  const [isSuccess, setIsSuccess] = useState(false); // Tek Atış için (True/False)

  const handleStartGame = (modeName) => {
    console.log("Seçilen mod:", modeName);
    setSelectedMode(modeName); 
    setGameState('playing');
  };

  // Oyun bittiğinde gelen veriyi türüne göre ayırt et
  const handleGameEnd = (data) => {
    // Eğer gelen veri 'boolean' ise (True/False) -> Tek Atış modudur
    if (typeof data === 'boolean') {
        setIsSuccess(data);
    } 
    // Değilse (Obje ise) -> Zamanla Yarış modudur
    else {
        setGameStats(data);
    }
    setGameState('result');
  };
  
  const handleRestart = () => {
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('start'); 
    setGameStats({ correct: 0, wrong: 0 });
    setIsSuccess(false);
  };

  const renderScreen = () => {
    if (gameState === 'start') {
      return <StartScreen onStartGame={handleStartGame} />;
    } 
    else if (gameState === 'playing') {
      return <GameScreen 
               mode={selectedMode}
               onGameEnd={handleGameEnd} 
               onBackToMenu={handleBackToMenu} 
             />;
    } 
    else if (gameState === 'result') {
      // ResultScreen'e hem modu, hem başarı durumunu, hem de istatistikleri gönderiyoruz
      return <ResultScreen 
               mode={selectedMode}    // <-- Hangi modda olduğumuzu gönderdik
               success={isSuccess}    // <-- Tek Atış sonucu
               stats={gameStats}      // <-- Zamanla Yarış sonucu
               onRestart={handleRestart} 
               onBackToMenu={handleBackToMenu} 
             />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;