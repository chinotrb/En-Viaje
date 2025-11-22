import { useState, useEffect } from 'react'
import LockScreen from './pages/LockScreen'
import Main from './pages/Main'
import './main.css'

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('isUnlocked') === 'true') {
      setIsUnlocked(true)
    }
  }, [])
  
  const unlock = () => setIsUnlocked(true)
  const lock = () => {
    localStorage.removeItem('isUnlocked')
    setIsUnlocked(false)
  }

  return isUnlocked ? <Main onLock={lock} /> : <LockScreen onUnlock={unlock} />
}

export default App