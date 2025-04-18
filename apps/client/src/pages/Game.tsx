import { useState, useRef, useEffect } from 'react';
import CanvasBoard from '../components/CanvasBoard';
import InkMeter from '../components/InkMeter';
import Lives from '../components/Lives';
import AIThinking from '../components/AIThinking';
import RoundResult from '../components/RoundResult';
import Leaderboard from '../components/Leaderboard';
import useInk from '../hooks/useInk';
import useTimer from '../hooks/useTimer';
import { fetchPrompt, submitGuess } from '../api';

interface Point { x: number; y: number }

interface GameProps {
  playerName: string;
  onGameEnd: () => void;
}

interface Prompt {
  id: string;
  text: string;
}

function Game({ playerName, onGameEnd }: GameProps) {
  // Game state
  const [lives, setLives] = useState(3);
  const [round, setRound] = useState(1);
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<{correct: boolean, aiGuess?: string} | null>(null);
  const [gameOver, setGameOver] = useState(false);
  
  // Refs and hooks
  const canvasRef = useRef(null);
  const { ink, setInk, addInk } = useInk();
  const { time, startTimer, stopTimer, resetTimer } = useTimer();
  
  // Fetch a new prompt when round changes
  useEffect(() => {
    const getNewPrompt = async () => {
      try {
        // In a real app, this would call fetchPrompt from the API,
        // but for now we'll use a mock
        // const newPrompt = await fetchPrompt();
        const newPrompt = { 
          id: `prompt-${round}`, 
          text: ['cat', 'house', 'tree', 'car', 'sun'][round % 5] 
        };
        
        setPrompt(newPrompt);
        setInk(0);
        resetTimer();
        startTimer();
      } catch (error) {
        console.error('Error fetching prompt:', error);
      }
    };
    
    if (!gameOver) {
      getNewPrompt();
    }
  }, [round, gameOver]);
  
  // Submit the drawing to the AI
  const handleSubmit = async () => {
    if (!canvasRef.current || !prompt) return;
    if (isThinking) return;
    
    try {
      setIsThinking(true);
      stopTimer();
      
      // Get the drawing as base64
      const canvas = canvasRef.current as any;
      const image = await canvas.exportImage('png');
      
      // In a real app, this would call the actual API
      // const result = await submitGuess(image, prompt.id);
      
      // Mock API call with random result for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = { 
        correct: Math.random() > 0.3,
        aiGuess: Math.random() > 0.3 ? prompt.text : 'something else' 
      };
      
      // Update game state based on result
      setLastResult(result);
      setIsThinking(false);
      setShowResult(true);
      
      if (!result.correct) {
        setLives(prev => prev - 1);
      }
      
      setInk(0);
    } catch (error) {
      console.error('Error submitting guess:', error);
      setIsThinking(false);
    }
  };
  
  // Handle continuing to the next round
  const handleNextRound = () => {
    setShowResult(false);
    
    if (lives <= 0) {
      setGameOver(true);
    } else {
      // Reset canvas
      if (canvasRef.current) {
        (canvasRef.current as any).resetCanvas();
      }
      
      setRound(prev => prev + 1);
    }
  };
  
  // Each stroke already arrives as its pixel length
  const handleStrokeEnd = (length: number) => {
    addInk(length);
  };
  
  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Piction.AI</h1>
        <div className="game-stats">
          <div className="player-info">
            <span className="player-name">{playerName}</span>
            <span className="round-info">Round {round}</span>
          </div>
          <Lives lives={lives} />
        </div>
      </div>
      
      <div className="game-main">
        {prompt && (
          <div className="prompt-display">
            <span>Draw: </span>
            <strong>{prompt.text}</strong>
          </div>
        )}
        
        <div className="canvas-container">
          <CanvasBoard 
            ref={canvasRef} 
            onStrokeEnd={handleStrokeEnd} 
            disabled={isThinking || showResult || gameOver}
          />
          <InkMeter ink={ink} />
          
          {isThinking && <AIThinking />}
        </div>
        
        <div className="game-controls">
          <button 
            onClick={handleSubmit} 
            disabled={isThinking || showResult || gameOver || ink === 0}
            className="submit-button"
          >
            Submit Drawing
          </button>
        </div>
      </div>
      
      {showResult && lastResult && (
        <RoundResult 
          correct={lastResult.correct}
          prompt={prompt?.text || ''}
          aiGuess={lastResult.aiGuess}
          inkUsed={ink}
          timeMs={time}
          onContinue={handleNextRound}
        />
      )}
      
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>You completed {round - 1} rounds</p>
          <Leaderboard playerName={playerName} />
          <button onClick={onGameEnd} className="play-again-button">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Game; 