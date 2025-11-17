import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURNS, WINNER_COMBOS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import { History } from './components/History'

function App () {
  // Estado del tablero (un array de 9 posiciones).
  // Se inicializa con una función (lazy initial state) para leer de localStorage
  // solo la primera vez que se renderiza el componente.
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  // Estado del turno actual (X ó O).
  // También se carga desde localStorage para persistir la sesión.
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? turnFromStorage : TURNS.X
  })

  // Estado del ganador:
  // null = El juego sigue
  // false = Empate
  // 'X' o 'O' = Hay un ganador
  const [winner, setWinner] = useState(null)

  // Estados para el historial de puntajes, también persistidos.
  const [valorX, setValorX] = useState(() => {
    const valorXFromStorage = window.localStorage.getItem('valorX') 
    return valorXFromStorage ? JSON.parse(valorXFromStorage) : 0
  })
  const [valorO, setValorO] = useState(() => {
    const valorOFromStorage = window.localStorage.getItem('valorO')
    return valorOFromStorage ? JSON.parse(valorOFromStorage) : 0
  })
  const [valorEmpate, setValorEmpate] = useState(() => {
    const valorEmpateFromStorage = window.localStorage.getItem('valorEmpate')
    return valorEmpateFromStorage ? JSON.parse(valorEmpateFromStorage) : 0
  })

  // Función para revisar si hay un ganador.
  const checkWinner = (boardToCheck) => {
    // Itera sobre todas las combinaciones ganadoras definidas en constants.
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo // Desestructura los 3 índices de la combinación
      if (
        boardToCheck[a] && // Verifica que la casilla 'a' no esté vacía
        boardToCheck[a] === boardToCheck[b] && // 'a' es igual a 'b'
        boardToCheck[a] === boardToCheck[c] // 'a' es igual a 'c'
      ) {
        return boardToCheck[a] // Devuelve el ganador ('X' o 'O')
      }
    }
    // Si el bucle termina sin encontrar ganador, devuelve null.
    return null
  }

  // Función para reiniciar el juego (empezar una nueva partida).
  const resetGame = () => {
    setBoard(Array(9).fill(null)) // Resetea el tablero
    setTurn(TURNS.X) // Devuelve el turno a 'X'
    setWinner(null) // Quita el estado de ganador/empate

    // Limpia el localStorage de la partida, pero no de los puntajes.
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  // Función principal que se llama al hacer clic en una casilla.
  const updateBoard = (index) => {
    // Si la casilla ya está ocupada (board[index] no es null)
    // o si ya hay un ganador (winner no es null), no hace nada.
    if (board[index] || winner) return

    // --- Actualización del estado (inmutable) ---
    // 1. Crea una copia del tablero. NUNCA se debe modificar el estado directamente.
    const newBoard = [...board] 
    // 2. Asigna el turno actual ('X' o 'O') a la casilla clicada.
    newBoard[index] = turn 
    // 3. Actualiza el estado del tablero con la nueva copia.
    setBoard(newBoard)

    // --- Cambio de turno ---
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // --- Guardado en localStorage ---
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // --- Comprobación de fin de partida ---
    const newWinner = checkWinner(newBoard) // Revisa si el nuevo tablero tiene un ganador
    if (newWinner) {
      confetti() // ¡Lanza confeti!
      setWinner(newWinner) // Actualiza el estado del ganador
      
      // Actualiza el puntaje correspondiente
      if (newWinner === TURNS.X) {
        const newValorX = valorX + 1
        setValorX(newValorX)
        window.localStorage.setItem('valorX', JSON.stringify(newValorX))
      } else {
        const newValorO = valorO + 1
        setValorO(newValorO)
        window.localStorage.setItem('valorO', JSON.stringify(newValorO))
      }
    } else if (!newBoard.includes(null)) { 
      // Si no hay ganador Y el tablero no incluye 'null' (está lleno)
      setWinner(false) // Establece el estado de empate
      const newValorEmpate = valorEmpate + 1
      setValorEmpate(newValorEmpate)
      window.localStorage.setItem('valorEmpate', JSON.stringify(newValorEmpate))
    }
  }

  // --- Renderizado del componente ---
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button
        className='reset-game'
        onClick={resetGame}
      >
        REINICIAR
      </button>

      {/* Sección del tablero de juego */}
      <section className='game'>
        {
          /* Mapea el array 'board'. Por cada elemento ('square') y su 'index',
            renderiza un componente 'Square'.
          */
          board.map((square, index) => (
            <Square
              key={index} /* La 'key' es necesaria para listas en React */
              index={index} /* Pasa el índice (0-8) como prop */
              updateBoard={updateBoard} /* Pasa la función a llamar al hacer clic */
            >
              {/* 'children': El contenido del Square ('X', 'O' o nada) */}
              {square}
            </Square>
          ))
        }
      </section>

      {/* Sección que muestra el indicador de turno */}
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {/* Componente para mostrar el historial de puntajes */}
      <History
        valorX={valorX}
        valorO={valorO}
        valorEmpate={valorEmpate}
        setValorX={setValorX}
        setValorO={setValorO}
        setValorEmpate={setValorEmpate}
      />

      {/* Modal de ganador. 
        Este componente se renderiza siempre, pero internamente
        decidirá si mostrarse o no basándose en la prop 'winner'.
      */}
      <WinnerModal
        resetGame={resetGame}
        winner={winner}
      />
    </main>
  )
}

export default App