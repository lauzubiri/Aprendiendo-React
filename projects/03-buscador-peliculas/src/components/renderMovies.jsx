function ListOfMovies ({ movies }) {
    
  return (<div className='peliculas'>
    {movies?.map(movie => (
      <li className='pelicula' key={movie.id}>
        <h3>{movie.title}</h3>
        <img src={movie.poster} alt={movie.Title} />
        <p>{movie.year}</p>
      </li>
    ))}
  </div>)
}


function NoSearchResults () {
  return (
    <p>No se encontraron peliculas para esta busqueda</p>
  )
}

export function Movies ({movies}) {
  const hasMovies = movies?.length > 0
  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoSearchResults />    
        
  )
}