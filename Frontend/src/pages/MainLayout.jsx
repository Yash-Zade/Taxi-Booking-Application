import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default MainLayout;
