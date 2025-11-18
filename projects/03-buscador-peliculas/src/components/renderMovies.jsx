import results from '../mocks/results.json'

function ListOfMovies ({ movies }) {
    
  return (<ul>
    {movies.map(movie => (
      <li key={movie.id}>
        <h3>{movie.title}</h3>
        <img src={movie.poster} alt={movie.Title} />
        <p>{movie.year}</p>
      </li>
    ))}
  </ul>)
}


function NoSearchResults () {
  return (
    <p>No se encontraron peliculas para esta busqueda</p>
  )
}

export function Movies ({movies}) {
  const hasMovies = results.Response
  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoSearchResults />    
        
  )
}