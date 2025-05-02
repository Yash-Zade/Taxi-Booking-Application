import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 h-screen flex flex-col justify-center items-center text-white text-center p-8">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-6 animate-pulse">Welcome to CabZilla 🚖</h1>
      <p className="text-xl text-gray-300 mb-8 max-w-xl opacity-90">
        Book a ride seamlessly, connect with nearby drivers instantly, and enjoy a smooth, reliable experience every time.
      </p>

      {/* Button Container */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
        <Link
          to="/book-ride"
          className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-10 py-4 rounded-full text-xl font-semibold shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Book a Ride
        </Link>
        <Link
          to="/nearby-drivers"
          className="bg-transparent border-2 border-yellow-500 text-white hover:bg-yellow-500 hover:text-gray-900 px-10 py-4 rounded-full text-xl font-semibold shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
        >
          View Nearby Drivers
        </Link>
      </div>

      {/* Subtle Effect on Hover */}
      <div className="absolute bottom-4 text-gray-400 text-sm animate-pulse">
        <p>Experience the convenience with just one click!</p>
      </div>
    </div>
  );
};

export default HomePage;
