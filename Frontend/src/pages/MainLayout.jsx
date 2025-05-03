import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
