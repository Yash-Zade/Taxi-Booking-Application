import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContext, AuthProvider } from './contexts/AuthContext.jsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import { UserProvider } from './contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
