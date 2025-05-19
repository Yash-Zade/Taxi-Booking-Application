import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 flex flex-col justify-center items-center text-center p-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Welcome to <span className="text-yellow-500">CabZilla 🚖</span>
      </h1>
      <p className="text-lg text-gray-600 mb-10 max-w-xl">
        Book a ride seamlessly, connect with nearby drivers instantly, and enjoy a smooth, reliable experience every time.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/book-ride"
          className="bg-yellow-500 text-white hover:bg-yellow-600 px-8 py-3 rounded-full text-lg font-semibold shadow-md transition duration-300 ease-in-out"
        >
          Book a Ride
        </Link>
        <Link
          to="/nearby-drivers"
          className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition duration-300 ease-in-out"
        >
          View Nearby Drivers
        </Link>
      </div>

      {/* Footer Pulse Message */}
      <div className="absolute bottom-5 text-gray-500 text-sm animate-pulse">
        Experience the convenience with just one click!
      </div>
    </div>
  );
};

export default HomePage;
