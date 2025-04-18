# Piction.AI

A drawing game where AI guesses what you've drawn. Draw with as few strokes as possible and see if the AI can recognize your creation!

## How to Play

1. You'll be given a prompt to draw
2. Draw the object using as few strokes as possible
3. Submit your drawing and the AI will try to guess it
4. You have 3 lives - try to get as many correct as possible!

## Project Structure

This project is set up as a monorepo containing:

- `apps/client` - React + Vite frontend
- `apps/server` - Express API backend
- `packages/shared` - Shared types and utilities

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd piction
   ```

2. Install dependencies:
   ```bash
   npm install
   cd apps/client && npm install
   cd ../server && npm install
   ```

3. Setup environment variables:
   - Create a `.env` file in `apps/server` (if not already present):
     ```
     DEMO_MODE=true
     OPENAI_API_KEY=your_openai_api_key_here
     ```
   - If you have an OpenAI API key, replace the placeholder with your actual key
   - Set `DEMO_MODE=false` to use the actual OpenAI API

### Development

1. Start both client and server in development mode:
   ```bash
   npm run dev
   ```

2. Or run them separately:
   ```bash
   npm run dev:client
   npm run dev:server
   ```

The client will be available at [http://localhost:5173](http://localhost:5173)  
The server API will be available at [http://localhost:3001](http://localhost:3001)

## API Endpoints

- `GET /api/ping` - Simple health check
- `GET /api/prompt` - Get a random drawing prompt
- `POST /api/guess` - Submit a drawing for AI to guess
- `GET /api/leaderboard` - Get high scores
- `POST /api/leaderboard` - Submit a score

## Technology Stack

- **Frontend**: React, TypeScript, Vite, react-sketch-canvas
- **Backend**: Express, TypeScript, SQLite (via better-sqlite3)
- **AI**: OpenAI Vision API

## License

MIT 