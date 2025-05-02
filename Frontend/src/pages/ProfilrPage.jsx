import React from 'react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6 flex flex-col items-center pt-24">
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-5 p-5 animate-pulse">
        My Profile
      </h2>
      <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center transform transition duration-300 ease-in-out hover:scale-105">
        <div className="relative mb-4">
        </div>
        <h3 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
          John Doe
        </h3>
        <p className="text-gray-300 mb-4 text-lg">john.doe@example.com</p>
        
        <button className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300 ease-in-out mb-4 w-full">
          Edit Profile
        </button>
        
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl space-y-4">
          <h4 className="text-xl font-semibold text-yellow-400">User Details</h4>
          <p className="text-gray-300">Location: New York, USA</p>
          <p className="text-gray-300">Joined: March 2022</p>
          <p className="text-gray-300">Bio: A passionate developer always looking for new challenges.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
