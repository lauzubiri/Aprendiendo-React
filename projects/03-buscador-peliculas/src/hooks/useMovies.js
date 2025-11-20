/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({search, sort}) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const previousSearch = useRef({search})


  const getMovies = useCallback(async ({search}) =>{
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
    
  }, [{search}])
  
  const sortedMovies = useMemo(() => {
    if (movies)
      return sort ? [...movies].sort((a, b) => {
        const titleA = a?.title || ''
        const titleB = b?.title || ''
        return titleA.localeCompare(titleB)
      }     ) : movies
  },[movies, sort])
  return { movies: sortedMovies, getMovies, loading, error }
}
