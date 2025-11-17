// src/App.js
import React, { useState } from 'react';
import './App.css';

import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [gameState, setGameState] = useState('start'); 
  const [gameResult, setGameResult] = useState(false);

  // Oyunu başlatan fonksiyon (StartScreen'den gelir)
  const handleStartGame = (modeName) => {
    console.log("Seçilen mod:", modeName);
    setGameState('playing');
  };

  // Oyun bittiğinde çağrılan fonksiyon (GameScreen'den gelir)
  const handleGameEnd = (success) => {
    setGameResult(success);
    setGameState('result');
  };
  
  // Sonuç ekranından yeniden başlatma (ResultScreen'den gelir)
  const handleRestart = () => {
    setGameState('playing');
  };

  // --- YENİ: Ana Menüye Dönüş Fonksiyonu ---
  const handleBackToMenu = () => {
    setGameState('start'); 
    setGameResult(false);  
  };

  const renderScreen = () => {
    if (gameState === 'start') {
      return <StartScreen onStartGame={handleStartGame} />;
    } 
    else if (gameState === 'playing') {
      // GameScreen'e onBackToMenu prop'unu ekledik
      return <GameScreen 
               onGameEnd={handleGameEnd} 
               onBackToMenu={handleBackToMenu} 
             />;
    } 
    else if (gameState === 'result') {
      // ResultScreen'e onBackToMenu prop'unu ekledik
      return <ResultScreen 
               success={gameResult} 
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