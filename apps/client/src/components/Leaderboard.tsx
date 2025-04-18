import React, { useState, useEffect } from 'react';

interface LeaderboardProps {
  playerName: string;
}

interface Score {
  player: string;
  ink: number;
  timeMs: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ playerName }) => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Function to fetch leaderboard data
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        
        // For MVP, we'll use mock data instead of actual API call
        // In a real app, this would be: const response = await fetch('/api/leaderboard');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockScores: Score[] = [
          { player: 'PlayerA', ink: 350, timeMs: 8500 },
          { player: 'PlayerB', ink: 420, timeMs: 10200 },
          { player: 'PlayerC', ink: 280, timeMs: 12000 },
          { player: playerName, ink: 380, timeMs: 9000 },
          { player: 'PlayerD', ink: 510, timeMs: 7800 },
        ];
        
        // Sort scores by ink used (lower is better)
        const sortedScores = mockScores.sort((a, b) => a.ink - b.ink);
        
        setScores(sortedScores);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard data');
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [playerName]);
  
  // Format time in seconds
  const formatTime = (ms: number) => {
    return (ms / 1000).toFixed(1) + 's';
  };
  
  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      
      {loading && <div className="loading">Loading scores...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && (
        <table className="scores-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Ink Used</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr 
                key={index} 
                className={score.player === playerName ? 'current-player' : ''}
              >
                <td>{index + 1}</td>
                <td>{score.player}</td>
                <td>{score.ink}</td>
                <td>{formatTime(score.timeMs)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard; 