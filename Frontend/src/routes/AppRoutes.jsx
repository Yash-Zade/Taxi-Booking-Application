import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import SignupPage from '../pages/auth/SignupPage'
import HomePage from '../pages/HomePage'
import AdminDashboard from '../pages/admin/AdminDashboard'
import BookRidePage from '../pages/BookRidePage'
import NearbyDriversPage from '../pages/NearbyDriverPage'
import ProfilePage from '../pages/ProfilrPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/book-ride" element={<BookRidePage />} />
        <Route path="/nearby-drivers" element={<NearbyDriversPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/admin'>
            <Route path='dashboard' element={<AdminDashboard />} />
        </Route>

    </Routes>
  )
}

export default AppRoutes