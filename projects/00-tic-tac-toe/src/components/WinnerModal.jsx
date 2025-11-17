import { Square } from './Square'

export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  return (
    <section className="winner">
      <div className="text">
        <h2>{winner === false ? 'Empate' : 'Ganador: '}</h2>
        <header className="win">{winner && <Square>{winner}</Square>}</header>
        <footer>
          <button className="reset-game" onClick={resetGame}>
            Empezar de nuevo
          </button>
        </footer>
      </div>
    </section>
  )
}
