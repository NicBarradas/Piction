import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';

// Create Express app instance
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images

// Simple health check before importing routes (for initial testing)
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Hello from Piction.AI API!' });
});

// Import routes (deferring to avoid circular dependency errors)
import guessRouter from './routes/guess';
import leaderboardRouter from './routes/leaderboard';
import promptRouter from './routes/prompt';

// Register routes
app.use('/api/guess', guessRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/prompt', promptRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Demo mode: ${process.env.DEMO_MODE === 'true' ? 'ON' : 'OFF'}`);
}); 