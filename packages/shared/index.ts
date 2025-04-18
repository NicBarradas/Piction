export type Prompt = { id: string; text: string }
export interface GuessRequest { image: string; promptId: string }
export interface GuessResponse { correct: boolean }
export interface Score { player: string; ink: number; timeMs: number } 