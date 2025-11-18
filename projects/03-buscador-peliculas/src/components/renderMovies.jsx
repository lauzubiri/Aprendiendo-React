import results from '../mocks/results.json'

function ListOfMovies ({ movies }) {
    
  return (<ul>
    {movies.map(movie => (
      <li key={movie.imdbID}>
        <h3>{movie.Title}</h3>
        <img src={movie.Poster} alt={movie.Title} />
        <p>{movie.Year}</p>
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