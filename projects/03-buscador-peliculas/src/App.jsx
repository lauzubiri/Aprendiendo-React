 
 
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
import './App.css'
import { Movies } from './components/renderMovies'
import { useMovies } from './hooks/useMovies'
import { useRef, useState } from 'react'


function App () {
  const [sort, updateSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const { movies, getMovies, loading } = useMovies({search, sort})

  const debouncedGetMoviesRef = useRef(
    debounce(
      search => {
        getMovies({ search })
      }, 300)
  )
  
  const debouncedGetMovies = debouncedGetMoviesRef.current

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    updateSort(!sort)
  }


  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de peliculas</h1>
          <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={search} className={error ? 'error' : ''} name='query' placeholder='Harry Potter, Metegol, Goodfellas' />
            <input type='checkbox' onChange={handleSort} checked={sort} />
            <button >Buscar</button>
          </form>
          <p>{error}</p>
        </header>
        <main>
          {loading ? <p>Cargando...</p> : <Movies movies={movies}/>} 
        </main>
      </div>
    </>
  )
}

export default App
