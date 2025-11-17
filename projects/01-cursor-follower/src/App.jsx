import React from 'react'
import './App.css'
import { useEffect, useState } from 'react'


const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event
      console.log(`Mouse position: X: ${clientX}, Y: ${clientY}`)
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }
  , [enabled]
  )
  
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
  
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled]
  )

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(224, 76, 76, 0.75)',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}>
      </div>
      <button onClick={ ()=> setEnabled(!enabled) }>{enabled ? 'Desactivar' : 'Activar'} seguir puntero</button>
    </>
  )
}


function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
