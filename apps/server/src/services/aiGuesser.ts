import OpenAI from 'openai';
import db from '../db';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set this environment variable
});

interface GuessResult {
  correct: boolean;
  aiGuess?: string;
  confidence?: number;
}

/**
 * Get the prompt text by ID
 */
function getPromptTextById(promptId: string): string | null {
  // For MVP, we'll just hardcode some prompt mappings
  // Later this will be retrieved from the database
  const promptMap: Record<string, string> = {};
  return promptMap[promptId] || null;
}

/**
 * Send a drawing to OpenAI Vision API and check if it matches the prompt
 */
export async function guessDrawing(
  imageBase64: string,
  promptId: string
): Promise<GuessResult> {
  try {
    // For MVP demo mode - no actual API call
    if (process.env.DEMO_MODE === 'true') {
      const randomCorrect = Math.random() > 0.3; // 70% chance of success
      return { 
        correct: randomCorrect,
        aiGuess: randomCorrect ? "correct guess" : "wrong guess",
        confidence: randomCorrect ? 0.9 : 0.3
      };
    }
    
    // Check if API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY environment variable not set');
      throw new Error('OpenAI API key not configured');
    }

    // Ensure image is properly formatted for the API
    if (!imageBase64.startsWith('data:image/')) {
      imageBase64 = `data:image/png;base64,${imageBase64}`;
    }

    // Get the expected answer (what the prompt was)
    const promptText = getPromptTextById(promptId);
    if (!promptText) {
      throw new Error('Invalid promptId');
    }

    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What is drawn in this image? Give a single word or short phrase." },
            { type: "image_url", image_url: { url: imageBase64 } }
          ],
        },
      ],
      max_tokens: 50,
    });

    // Extract the AI's guess from the response
    const aiGuess = response.choices[0]?.message?.content?.toLowerCase().trim() || '';
    
    // Compare the AI guess with the expected answer
    // Simple string match for MVP - could be improved with semantic similarity
    const correct = aiGuess.includes(promptText.toLowerCase());
    
    // Calculate a simple confidence score (placeholder for MVP)
    const confidence = correct ? 0.9 : 0.3;

    return {
      correct,
      aiGuess,
      confidence,
    };
  } catch (error) {
    console.error('Error in AI guesser service:', error);
    throw error;
  }
} 