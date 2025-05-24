import React from 'react';
import { Link } from 'react-router-dom';
import { FaTaxi, FaUserShield, FaRoute, FaClock, FaMobileAlt } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-white via-yellow-50 to-yellow-100">
      {/* Hero Section - Full Screen */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Welcome to <span className="text-yellow-500">CabZilla 🚖</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          Seamless ride booking, real-time driver tracking, and stress-free travel in just a few taps.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/book-ride"
            className="bg-yellow-500 text-white hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-medium shadow transition"
          >
            Book a Ride
          </Link>
          <Link
            to="/nearby-drivers"
            className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white px-6 py-3 rounded-full text-lg font-medium shadow transition"
          >
            Nearby Drivers
          </Link>
        </div>

        <p className="absolute bottom-5 text-sm text-gray-500 animate-pulse">
          Scroll down to explore features ↓
        </p>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <Feature icon={<FaTaxi />} title="Quick Booking" description="Book a ride instantly in a few taps." />
        <Feature icon={<FaRoute />} title="Live Tracking" description="Track drivers and routes in real-time." />
        <Feature icon={<FaClock />} title="Reliable Timings" description="Always on time, every time." />
        <Feature icon={<FaUserShield />} title="Secure Rides" description="Verified drivers and secure system." />
        <Feature icon={<FaMobileAlt />} title="Mobile-Friendly" description="Optimized for phones and tablets." />
        <Feature icon="💳" title="Multiple Payments" description="Pay online or in cash easily." />
      </section>
    </div>
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all text-center">
    <div className="text-yellow-500 text-3xl mb-3 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default HomePage;
