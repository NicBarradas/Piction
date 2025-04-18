// API URL based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Fetch a new prompt from the server
 */
export const fetchPrompt = async () => {
  try {
    const response = await fetch(`${API_URL}/prompt`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching prompt:', error);
    throw error;
  }
};

/**
 * Submit a drawing to the AI for guessing
 */
export const submitGuess = async (image: string, promptId: string) => {
  try {
    const response = await fetch(`${API_URL}/guess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image, promptId }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting guess:', error);
    throw error;
  }
};

/**
 * Fetch leaderboard data
 */
export const fetchLeaderboard = async () => {
  try {
    const response = await fetch(`${API_URL}/leaderboard`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

/**
 * Submit a score to the leaderboard
 */
export const submitScore = async (player: string, ink: number, timeMs: number) => {
  try {
    const response = await fetch(`${API_URL}/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ player, ink, timeMs }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting score:', error);
    throw error;
  }
}; 