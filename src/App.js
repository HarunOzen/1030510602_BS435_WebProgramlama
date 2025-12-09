// src/App.js
import React, { useState } from 'react';
import './App.css';

import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [gameState, setGameState] = useState('start');
  const [selectedMode, setSelectedMode] = useState(null); // Seçilen modu tutmak için
  const [gameStats, setGameStats] = useState({ correct: 0, wrong: 0 }); // Sonuç istatistikleri

  // Oyunu başlatan fonksiyon
  const handleStartGame = (modeName) => {
    console.log("Seçilen mod:", modeName);
    setSelectedMode(modeName); // Modu kaydet
    setGameState('playing');
  };

  // Oyun bittiğinde çağrılan fonksiyon (Artık istatistikleri de alıyor)
  const handleGameEnd = (stats) => {
    setGameStats(stats); // İstatistikleri kaydet
    setGameState('result');
  };
  
  const handleRestart = () => {
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('start'); 
    setGameStats({ correct: 0, wrong: 0 });  
  };

  const renderScreen = () => {
    if (gameState === 'start') {
      return <StartScreen onStartGame={handleStartGame} />;
    } 
    else if (gameState === 'playing') {
      // GameScreen'e seçilen modu gönderiyoruz (selectedMode)
      return <GameScreen 
               mode={selectedMode}
               onGameEnd={handleGameEnd} 
               onBackToMenu={handleBackToMenu} 
             />;
    } 
    else if (gameState === 'result') {
      // ResultScreen'e istatistikleri gönderiyoruz (stats)
      return <ResultScreen 
               stats={gameStats} 
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