import { useEffect, useState } from 'react'
import './App.css'

const ENDPOINT_CAT_FACT = ('https://catfact.ninja/fact')

function App () {

  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  
  useEffect(() => 
  {
    fetch(ENDPOINT_CAT_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  },
  [])
  
  useEffect(() => {

    if (!fact) return

    const firstWord = fact.split(' ', 3).join(' ')
    console.log({firstWord}) 
      
    fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=40&fontColor=white&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])
  
  return (
    <>
      <main className='flex flex-col place-items-center gap-8'>
        <h1 className='text-3xl'>App de gatitos!</h1>
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
