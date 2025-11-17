import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts'

function useCatImage ({ fact }) {
  
  const [imageUrl, setImageUrl] = useState()
  useEffect(() => {

    if (!fact) return

    const firstWord = fact.split(' ', 3).join(' ')
    console.log({firstWord}) 
      
    fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=white&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
    
  }, [fact])
  return { imageUrl }
}

const useCatFact = () => {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact))
  }
  useEffect(refreshFact, [])

  return {fact, refreshFact}
}

function App () {
  const {fact, refreshFact} = useCatFact()
  const { imageUrl } = useCatImage({fact})
  
  
  const handleClick = async () => {
    refreshFact()
  }

  return (
    <>
      <main className='flex flex-col place-items-center gap-8 bg-gray-800 min-h-dvh text-white'>
        <h1 className='text-3xl'>App de gatitos!</h1>
        <button onClick={handleClick} className='text-black bg-white p-2 rounded-2xl'>Nueva Imagen!</button>
        {fact && <p className='text-center'>{fact}</p>}
        {imageUrl && <img
          className='max-w-96 h-auto'
          src={imageUrl} alt={`Imagen generada con las primeras tres palabras de ${fact}`
          } />}
      </main>
    </>
  )
}

export default App
