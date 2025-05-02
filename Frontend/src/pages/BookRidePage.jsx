import React from 'react';
import { Link } from 'react-router-dom';

const BookRidePage = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 h-screen flex justify-center items-center text-white py-20">
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 p-8 rounded-lg max-w-lg w-full backdrop-blur-lg shadow-2xl transform transition duration-300 ease-in-out hover:scale-105">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-6 animate-pulse">
          Book Your Ride 🚖
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-lg opacity-90">
          Book a ride seamlessly with a trusted driver in your area. Select your preferences and hit the road!
        </p>

        {/* Ride Booking Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Pickup Location"
            className="w-full p-4 bg-gray-800 text-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="Enter Drop-off Location"
            className="w-full p-4 bg-gray-800 text-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <select
            className="w-full p-4 bg-gray-800 text-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option>Choose Ride Type</option>
            <option>Standard</option>
            <option>Luxury</option>
            <option>Economy</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-x-4">
          <Link
            to="/confirm-ride"
            className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-semibold shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Confirm Ride
          </Link>
          <Link
            to="/home"
            className="bg-transparent border-2 border-yellow-500 text-white hover:bg-yellow-500 hover:text-gray-900 px-6 py-3 rounded-full text-lg font-semibold shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookRidePage;
