import React from 'react'
import { BrowserRouter, Outlet } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <>
        <AppRoutes />
    </>
  )
}

export default App