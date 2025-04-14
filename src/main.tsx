import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WeatherApp from './WeatherApp.tsx'
import { ToastContainer } from 'react-toastify'
import './reset.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherApp />
    <ToastContainer position="top-center" autoClose={3000} />
  </StrictMode>
)
