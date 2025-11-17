import '../index.css'
export function History ({
  valorX,
  valorO,
  valorEmpate,
  setValorX,
  setValorO,
  setValorEmpate,
}) {
  return (
    <div className="history">
      <h3>HISTORIAL</h3>
      <div>
        <p>X: {valorX}</p>
        <p>O: {valorO}</p>
        <p>Empates: {valorEmpate}</p>
      </div>
      <button
        id="reset-history"
        onClick={() => {
          setValorX(0)
          setValorO(0)
          setValorEmpate(0)
          window.localStorage.removeItem('valorX')
          window.localStorage.removeItem('valorO')
          window.localStorage.removeItem('valorEmpate')
        }}>
        <strong>Reiniciar Historial</strong>
      </button>
    </div>
  )
}
