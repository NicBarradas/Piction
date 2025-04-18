import { useState } from 'react';
import '../App.css';

interface LandingProps {
  onStartGame: (playerName: string) => void;
}

function Landing({ onStartGame }: LandingProps) {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStartGame(playerName.trim());
    }
  };

  return (
    <div className="landing-container">
      <h1>Piction.AI</h1>
      <p>Draw an object and let AI guess what it is!</p>
      
      <div className="game-card">
        <h2>How to Play</h2>
        <ol>
          <li>You'll be given a prompt to draw</li>
          <li>Draw the object using as few strokes as possible</li>
          <li>Submit your drawing and the AI will try to guess it</li>
          <li>You have 3 lives - try to get as many correct as possible!</li>
        </ol>
        
        <form onSubmit={handleSubmit} className="start-form">
          <div className="form-group">
            <label htmlFor="playerName">Your Name:</label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <button type="submit" className="start-button">Start Game</button>
        </form>
      </div>
    </div>
  );
}

export default Landing; 