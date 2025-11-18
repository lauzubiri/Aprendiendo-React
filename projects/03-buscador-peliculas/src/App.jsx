import './App.css'
import results from './mocks/results.json'
import { Movies } from './components/renderMovies'
function App () {
  

  const movies = results.Search


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
          <Movies movies={movies}/>
        </main>
      </div>
    </>
  )
}

export default App
