/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    } 
    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
    setError(null)
  }, [search]
  )

  return {search, updateSearch, error}
  
}
 