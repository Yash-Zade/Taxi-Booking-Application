import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const { activeRole, userProfile } = useContext(UserContext);
  const roles = userProfile?.data?.user?.roles || [];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white/80 backdrop-blur-md border border-yellow-300 rounded-3xl shadow-xl px-6 py-3 flex justify-between items-center">

          {/* Logo */}
          <div className="text-yellow-600 text-2xl font-bold">
            <Link to="/">CabZilla</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="text-gray-800 hover:text-yellow-600 px-4 py-2 rounded-lg transition font-medium">
              Home
            </Link>

            {isLoggedIn && activeRole === 'RIDER' && (
              <>
                <Link to="/book-ride" className="text-gray-800 hover:text-yellow-600 px-4 py-2 rounded-lg transition font-medium">
                  Book Ride
                </Link>
                <Link to="/all-rides" className="text-gray-800 hover:text-yellow-600 px-4 py-2 rounded-lg transition font-medium">
                  All Rides
                </Link>
              </>
            )}

            {isLoggedIn && !roles.includes("DRIVER") && (
              <Link to="/request-driver" className="text-gray-800 hover:text-yellow-600 px-4 py-2 rounded-lg transition font-medium">
                Request to be Driver
              </Link>
            )}

            {isLoggedIn && activeRole === 'DRIVER' && (
              <>
                <Link to="/ride-request" className="text-gray-800 hover:text-yellow-600 px-4 py-2 rounded-lg transition font-medium">
                  Ride Requests
                </Link>
                <Link to="/all-rides" className="text-gray-800 hover:text-yellow-600 px-4 py-2 rounded-lg transition font-medium">
                  All Ride
                </Link>
              </>
            )}

            {isLoggedIn && activeRole === 'ADMIN' && (
              <Link to="/dashboard" className="text-gray-800 hover:text-yellow-600 px-4 py-2 rounded-lg transition font-medium">
                Admin Dashboard
              </Link>
            )}

            {isLoggedIn ? (
              <Link to="/profile" className="text-gray-800 hover:text-yellow-600 px-4 py-2 rounded-lg transition">
                <UserCircleIcon className="h-6 w-6" />
              </Link>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="text-gray-800 hover:text-yellow-600 px-4 py-2 rounded-lg transition font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full font-semibold transition shadow">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-yellow-300 shadow-lg px-6 py-4 space-y-3 mt-2 rounded-2xl">
            <Link to="/" className="block text-gray-800 hover:text-yellow-600">Home</Link>

            {isLoggedIn && activeRole === 'RIDER' && (
              <>
                <Link to="/book-ride" className="block text-gray-800 hover:text-yellow-600">Book Ride</Link>
                <Link to="/all-rides" className="block text-gray-800 hover:text-yellow-600">All Rides</Link>
              </>
            )}

            {isLoggedIn && !roles.includes("DRIVER") && (
              <Link to="/request-driver" className="block text-gray-800 hover:text-yellow-600">Request to be Driver</Link>
            )}

            {isLoggedIn && activeRole === 'DRIVER' && (
              <>
                <Link to="/ride-request" className="block text-gray-800 hover:text-yellow-600">Ride Requests</Link>
                <Link to="/all-rides" className="block text-gray-800 hover:text-yellow-600">All Ride</Link>
              </>
            )}

            {isLoggedIn && activeRole === 'ADMIN' && (
              <Link to="/dashboard" className="block text-gray-800 hover:text-yellow-600">Admin Dashboard</Link>
            )}

            {isLoggedIn ? (
              <Link to="/profile" className="block text-gray-800 hover:text-yellow-600 flex items-center">
                <UserCircleIcon className="h-5 w-5 mr-2" />
                Profile
              </Link>
            ) : (
              <>
                <Link to="/login" className="block text-gray-800 hover:text-yellow-600">Login</Link>
                <Link to="/signup" className="block text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full font-semibold text-center">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;