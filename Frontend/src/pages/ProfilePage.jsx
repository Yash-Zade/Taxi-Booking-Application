import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/profile')  // replace with your actual backend endpoint
      .then(response => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load profile.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-yellow-400">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        {error}
      </div>
    );
  }

  const { user, rating, id } = profile;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6 flex flex-col items-center pt-24">
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-5 p-5 animate-pulse">
        My Profile
      </h2>
      <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center transform transition duration-300 ease-in-out hover:scale-105">
        <h3 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
          {user.name}
        </h3>
        <p className="text-gray-300 mb-4 text-lg">{user.email}</p>

        <button className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300 ease-in-out mb-4 w-full">
          Edit Profile
        </button>

        <div className="bg-gray-800 p-4 rounded-lg shadow-xl space-y-4">
          <h4 className="text-xl font-semibold text-yellow-400">User Details</h4>
          <p className="text-gray-300">Profile ID: {id}</p>
          <p className="text-gray-300">User ID: {user.id}</p>
          <p className="text-gray-300">Roles: {user.roles.join(', ')}</p>
          <p className="text-gray-300">Rating: {rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
