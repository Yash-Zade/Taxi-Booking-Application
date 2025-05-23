import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const { accessToken } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalRides: 0,
    totalDrivers: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ridesRes, driversRes, requestsRes] = await Promise.all([
          axios.get(`${base_url}/admin/count/rider`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axios.get(`${base_url}/admin/count/driver`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axios.get(`${base_url}/admin/count/allRequests`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        setStats({
          totalRides: ridesRes.data.data,
          totalDrivers: driversRes.data.data,
          pendingRequests: requestsRes.data.data,
        });
      } catch (error) {
        toast.error('Error fetching admin dashboard stats:', error);
      }
    };

    fetchStats();
  }, [base_url, accessToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-8 flex flex-col items-center relative">
      <h2 className="text-5xl font-extrabold text-yellow-700 mb-12 text-center drop-shadow-md mt-15">
        Admin Dashboard
      </h2>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl">
        {[
          { title: 'Total Rides', value: stats.totalRides },
          { title: 'Active Drivers', value: stats.totalDrivers },
          { title: 'Pending Requests', value: stats.pendingRequests },
        ].map(({ title, value }) => (
          <div
            key={title}
            className="bg-white border border-yellow-300 p-8 rounded-3xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out text-center"
          >
            <h3 className="text-xl font-semibold text-yellow-600 mb-3">{title}</h3>
            <p className="text-4xl font-bold text-yellow-800">{value}</p>
          </div>
        ))}
      </div>

      {/* Admin Actions Section */}
      <div className="w-full max-w-5xl text-center">
        <h3 className="text-3xl font-semibold text-yellow-700 mb-8">Admin Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { label: 'Manage Request', to: '/manage-request' },
            { label: 'Manage Request', to: '/manage-request' },
            { label: 'Manage Request', to: '/manage-request' },
          ].map(({ label, to }) => (
            <div
              key={label}
              className="bg-white border border-yellow-300 p-6 rounded-3xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <h4 className="text-lg font-medium text-yellow-600 mb-4">{label}</h4>
              <Link
                to={to}
                className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 transition ease-in-out duration-200 inline-block"
              >
                Go to {label.split(' ')[1]}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 text-yellow-600 text-sm italic font-semibold drop-shadow animate-pulse">
        Manage your platform with ease and efficiency!
      </div>
    </div>
  );
};

export default AdminDashboard;
