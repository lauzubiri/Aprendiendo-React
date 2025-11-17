import { useEffect, useState } from 'react'
import './App.css'

const ENDPOINT_CAT_FACT = ('https://catfact.ninja/fact')
//const ENDPOINT_CAT_IMAGE_URL = (`zhttps://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`)


function App () {

  const [fact, setFact] = useState()

  
  useEffect(() => 
  {
    fetch(ENDPOINT_CAT_FACT)
      .then(res => res.json())
      .then(data => setFact(data.fact))
  }, []
  )
  
  return (
    <>
      <main>
        <h1>App de gatitos!</h1>
        {fact && <p>{fact}</p>}
      </main>
    </>
  )
}

export default App
