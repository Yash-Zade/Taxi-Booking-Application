import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg px-6 py-3 flex justify-between items-center">
          <div className="text-gray-100 text-2xl font-semibold">
            <Link to="/">CabZilla</Link>
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/"
              className="text-gray-200 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              Home
            </Link>
            <Link
              to="/book-ride"
              className="text-gray-200 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              Book Ride
            </Link>
            <Link
              to="/nearby-drivers"
              className="text-gray-200 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              Nearby Drivers
            </Link>
            <Link
              to="/admin/dashboard"
              className="text-gray-200 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              Admin Dashboard
            </Link>
            <Link
              to="/profile"
              className="text-gray-200 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              <UserCircleIcon className="h-6 w-6" />
            </Link>
            <Link
              to="/login"
              className="text-gray-200 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-900 bg-white hover:bg-gray-200 px-4 py-2 rounded-lg transition"
            >
              Sign Up
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-200 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
