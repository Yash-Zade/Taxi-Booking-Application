import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/UserContext';
import RideCard from '../components/RideCard';

const ProfilePage = () => {
  
  const {userProfile} = useContext(UserContext)

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6 flex flex-col items-center pt-24">
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-5 p-5 animate-pulse">
        My Profile
      </h2>
      <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center transform transition duration-300 ease-in-out hover:scale-105">
        <h3 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
          {userProfile?.data?.user?.name || "Loading..."}
        </h3>
        <p className="text-gray-300 mb-4 text-lg">{userProfile?.data?.user?.email || "Email not available"}</p>

        <button onClick={<RideCard />} className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300 ease-in-out mb-4 w-full">
          All Rides
        </button>

        <div className="bg-gray-800 p-4 rounded-lg shadow-xl space-y-4">
          <p className="text-gray-300 mb-4 text-lg">{userProfile?.data?.user?.email || "Email not available"}</p>
          <p className="text-gray-300">User ID: {userProfile?.data?.user?.id || "N/A"}</p>
          <p className="text-gray-300">Roles: {userProfile?.data?.user?.roles || "No roles assigned"}</p>
          <p className="text-gray-300">Rating: {userProfile?.data?.rating || "No rating available"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
