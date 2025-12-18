import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/poppins'
import '@fontsource/playfair-display/700.css'
import { registerSW } from 'virtual:pwa-register'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// No registrar service worker en modo dev para evitar cachear la version de Vite
if (import.meta.env.PROD) {
  registerSW({
    immediate: true
  })
}
