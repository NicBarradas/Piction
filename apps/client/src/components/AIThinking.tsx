import React from 'react';

const AIThinking: React.FC = () => {
  return (
    <div className="ai-thinking-overlay">
      <div className="ai-thinking-content">
        <div className="ai-spinner"></div>
        <h3>AI is analyzing your drawing...</h3>
        <p>Just a moment while the AI tries to figure out what you've drawn!</p>
      </div>
    </div>
  );
};

export default AIThinking; 