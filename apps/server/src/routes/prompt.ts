import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Hardcoded list of prompts for the MVP
const prompts = [
  "cat",
  "dog",
  "house",
  "tree",
  "car",
  "bicycle",
  "sun",
  "moon",
  "flower",
  "apple",
  "banana",
  "chair",
  "table",
  "book",
  "computer",
  "phone",
  "bird",
  "fish",
  "mountain",
  "ocean"
];

// GET /api/prompt - Get a random prompt
router.get('/', (req, res) => {
  try {
    // Select a random prompt from the list
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const text = prompts[randomIndex];
    
    // Generate a unique ID for this prompt instance
    const id = uuidv4();
    
    res.json({ id, text });
  } catch (error) {
    console.error('Error getting prompt:', error);
    res.status(500).json({ error: 'Failed to generate prompt' });
  }
});

export default router; 