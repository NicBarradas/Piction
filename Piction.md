Piction. AI (MVP) Prompt
TLDR: The goal is to create a game where you have 3 tries to draw a random word or phrase and an AI tries to guess it. It’s scored like golf where the least amount of “ink” measured in pixels is your score. 

The flow for the game is as follows:
1. Landing Page
a. Landing page. 
Start Game / Play
Prompt Reveal (0 s)
Center modal shows the random word/phrase in top middle 
Blank canvas appears; ink‑meter (0 px) and 3 draw icons (lives) appear top‑right.
Timer starts (optional, eg 90 s hard cap).
Attempt 1
Player draws; every stroke instantly updates the live ink‑meter (total pixel count).
Submit button enabled once ≥1 stroke.
On submit → canvas snapshot sent to AI guesser (async call, <1 s).
AI Guess Result overlay:
✅ Correct → go to Step 5.
❌ Wrong → canvas wipes, one draw‑icon disappears, flow continues to Attempt 2.
Attempts 2 & 3 (only if needed)
Same draw/submit cycle; ink‑meter resets.
If all three attempts used without AI success → status = “DNF” (did not finish).
Round Results Screen
Prompt (“LIGHTNING BOLT”)
Attempts used (e.g., 2/3)
Total ink: 3,412 px (lower = better)
Real‑time leaderboard panel compares all players’ ink scores; ties broken by time‑to‑guess.
Buttons: “Next Round” (starts new prompt) or “Exit to Lobby.”
Game End (after N rounds, e.g., 10)
Podium animation: 1st, 2nd, 3rd lowest ink.
Global Leaderboard
Option to “Play Again” or “Share Score” (link + thumbnail of best drawing).

UX Notes
Ink‑Meter: tiny golf‑score icon reinforces “less is more.”
Latency Masking: while AI is guessing, show an animated magnifying‑glass icon (“AI thinking…”) to hide network delay.
Accessibility: color‑blind‑safe palette; keyboard shortcut “Enter” for submit.
Anti‑Spam: ignore strokes < 5 px to stop dot‑spamming.
