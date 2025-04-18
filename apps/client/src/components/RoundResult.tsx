import React from 'react';

interface RoundResultProps {
  correct: boolean;
  prompt: string;
  aiGuess?: string;
  inkUsed: number;
  timeMs: number;
  onContinue: () => void;
}

const RoundResult: React.FC<RoundResultProps> = ({
  correct,
  prompt,
  aiGuess,
  inkUsed,
  timeMs,
  onContinue
}) => {
  // Format time as seconds with 1 decimal place
  const formattedTime = (timeMs / 1000).toFixed(1);
  
  return (
    <div className="round-result-overlay">
      <div className="round-result-modal">
        <div className={`result-header ${correct ? 'success' : 'failure'}`}>
          <h2>{correct ? 'Success!' : 'Not Quite...'}</h2>
        </div>
        
        <div className="result-content">
          <div className="result-item">
            <span className="label">You were asked to draw:</span>
            <span className="value">{prompt}</span>
          </div>
          
          {aiGuess && (
            <div className="result-item">
              <span className="label">AI guessed:</span>
              <span className="value">{aiGuess}</span>
            </div>
          )}
          
          <div className="result-stats">
            <div className="stat-item">
              <span className="stat-label">Ink used:</span>
              <span className="stat-value">{Math.round(inkUsed)} px</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Time taken:</span>
              <span className="stat-value">{formattedTime}s</span>
            </div>
          </div>
          
          <div className="result-message">
            {correct ? (
              <p>Great job! The AI recognized your drawing!</p>
            ) : (
              <p>The AI didn't recognize your drawing. Try again with a new prompt!</p>
            )}
          </div>
        </div>
        
        <button onClick={onContinue} className="continue-button">
          Continue
        </button>
      </div>
    </div>
  );
};

export default RoundResult; 