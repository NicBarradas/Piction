import express from 'express';
import { guessDrawing } from '../services/aiGuesser';

const router = express.Router();

// POST /api/guess
router.post('/', async (req, res) => {
  try {
    const { image, promptId } = req.body;
    
    if (!image || !promptId) {
      return res.status(400).json({ error: 'Missing image or promptId' });
    }
    
    // For MVP, we'll just pass this to the AI guesser service
    const result = await guessDrawing(image, promptId);
    
    res.json(result);
  } catch (error) {
    console.error('Error in guess route:', error);
    res.status(500).json({ error: 'An error occurred during the guessing process' });
  }
});

export default router; 