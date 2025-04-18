import { useState } from 'react'
import './App.css'
import Landing from './pages/Landing'
import Game from './pages/Game'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState('')

  const startGame = (name: string) => {
    setPlayerName(name)
    setGameStarted(true)
  }

  return (
    <div className="App">
      {!gameStarted ? (
        <Landing onStartGame={startGame} />
      ) : (
        <Game playerName={playerName} onGameEnd={() => setGameStarted(false)} />
      )}
    </div>
  )
}

export default App
