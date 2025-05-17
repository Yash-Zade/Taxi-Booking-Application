import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { userProfile, activeRole, setActiveRole } = useContext(UserContext);
  const navigate = useNavigate();

  const roles = userProfile?.data?.user?.roles || [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6 flex flex-col items-center pt-24">
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-5 p-5 animate-pulse">
        My Profile
      </h2>

      <div className="mb-6">
        <label className="text-white text-lg mr-2">Select Role:</label>
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={activeRole}
          onChange={(e) => setActiveRole(e.target.value)}
        >
          <option disabled value="">-- Select --</option>
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <h3 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
          {userProfile?.data?.user?.name || "Loading..."}
        </h3>
        <p className="text-gray-300 mb-4 text-lg">{userProfile?.data?.user?.email}</p>

        <button onClick={() => navigate('/all-rides')} className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg mb-4 w-full">
          All Rides
        </button>

        {/* Show button only for DRIVER */}
        {activeRole === "DRIVER" && (
          <button onClick={() => navigate('/ride-request')} className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg mb-4 w-full">
            RideRequest
          </button>
        )}

        <div className="bg-gray-800 p-4 rounded-lg shadow-xl space-y-4">
          <p className="text-gray-300">User ID: {userProfile?.data?.user?.id || "N/A"}</p>
          <p className="text-gray-300">Roles: {roles.join(', ')}</p>
          <p className="text-gray-300">Rating: {userProfile?.data?.rating ?? "N/A"}</p>
          <p className="text-gray-300">Active Role: {activeRole || "Not selected"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
