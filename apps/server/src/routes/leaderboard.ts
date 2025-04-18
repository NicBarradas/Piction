import express from 'express';
import db from '../db'; // We'll implement this later

const router = express.Router();

// GET /api/leaderboard - Get scores
router.get('/', (req, res) => {
  try {
    // For MVP, we'll return a simple set of scores
    // This will be replaced with actual DB queries later
    const mockScores = [
      { player: 'Player1', ink: 450, timeMs: 12000 },
      { player: 'Player2', ink: 320, timeMs: 15000 },
      { player: 'Player3', ink: 580, timeMs: 9000 },
    ];
    
    res.json(mockScores);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

// POST /api/leaderboard - Submit a score
router.post('/', (req, res) => {
  try {
    const { player, ink, timeMs } = req.body;
    
    if (!player || ink === undefined || timeMs === undefined) {
      return res.status(400).json({ error: 'Missing required score information' });
    }
    
    // For now, we'll just acknowledge the score
    // Will be replaced with DB insert later
    console.log('Score received:', { player, ink, timeMs });
    
    res.json({ success: true, message: 'Score saved' });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

export default router; 