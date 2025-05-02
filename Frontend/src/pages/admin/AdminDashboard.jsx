import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 h-screen flex flex-col justify-center items-center text-white p-8">
      <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-12 animate-pulse">
        Admin Dashboard
      </h2>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-8 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 ease-in-out text-center">
          <h3 className="text-xl font-semibold text-yellow-500 mb-3">Total Rides</h3>
          <p className="text-4xl font-bold text-white">245</p>
        </div>
        <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-8 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 ease-in-out text-center">
          <h3 className="text-xl font-semibold text-yellow-500 mb-3">Active Drivers</h3>
          <p className="text-4xl font-bold text-white">53</p>
        </div>
        <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-8 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 ease-in-out text-center">
          <h3 className="text-xl font-semibold text-yellow-500 mb-3">Pending Requests</h3>
          <p className="text-4xl font-bold text-white">8</p>
        </div>
      </div>

      {/* Admin Actions Section */}
      <div className="mt-10 text-center">
        <h3 className="text-2xl font-semibold text-yellow-500 mb-6">Admin Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 ease-in-out">
            <h4 className="text-lg font-medium text-yellow-500 mb-4">Manage Drivers</h4>
            <Link
              to="/manage-drivers"
              className="bg-yellow-500 text-gray-900 py-2 px-6 rounded-full hover:bg-yellow-600 transition ease-in-out duration-200"
            >
              Go to Drivers
            </Link>
          </div>
          <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 ease-in-out">
            <h4 className="text-lg font-medium text-yellow-500 mb-4">Manage Rides</h4>
            <Link
              to="/manage-rides"
              className="bg-yellow-500 text-gray-900 py-2 px-6 rounded-full hover:bg-yellow-600 transition ease-in-out duration-200"
            >
              Go to Rides
            </Link>
          </div>
          <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 ease-in-out">
            <h4 className="text-lg font-medium text-yellow-500 mb-4">View Reports</h4>
            <Link
              to="/view-reports"
              className="bg-yellow-500 text-gray-900 py-2 px-6 rounded-full hover:bg-yellow-600 transition ease-in-out duration-200"
            >
              View Reports
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle Effect */}
      <div className="absolute bottom-4 text-gray-400 text-sm animate-pulse">
        <p>Manage your platform with ease and efficiency!</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
