import './App.css'
import { Movies } from './components/renderMovies'
import { useMovies } from './hooks/useMovies'



function App () {
  
  const {movies: mappedMovies} = useMovies()

  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de peliculas</h1>
          <form>
            <input placeholder='Harry Potter, Metegol, Goodfellas' />
            <button>Buscar</button>
          </form>
        </header>
        <main>
          <Movies movies={mappedMovies}/>
        </main>
      </div>
    </>
  )
}

export default App
