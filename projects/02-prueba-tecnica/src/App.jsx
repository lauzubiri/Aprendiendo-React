import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'



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
        <button onClick={handleClick} className='text-black bg-white p-2 rounded-2xl hover:bg-gray-950 hover:text-white transition-all cursor-pointer'>Nueva Imagen!</button>
        {fact && <p className='text-center max-w-100'>{fact}</p>}
        {imageUrl && <img
          className='max-w-96 h-auto'
          src={imageUrl} alt={`Imagen generada con las primeras tres palabras de ${fact}`
          } />}
      </main>
    </>
  )
}

export default App
