import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { userProfile, activeRole, setActiveRole } = useContext(UserContext);
  const navigate = useNavigate();

  const roles = userProfile?.data?.user?.roles || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-6 flex flex-col items-center pt-24">
      <h2 className="text-5xl font-bold text-gray-800 mb-5 p-5">
        My Profile
      </h2>

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center border border-yellow-300">
        <div className="mb-6 text-left">
          <label className="text-gray-800 text-lg font-semibold mr-2 block mb-2">
            Select Role:
          </label>
          <select
            className="w-full p-4 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value)}
          >
            <option disabled value="">
              -- Select --
            </option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <h3 className="text-3xl font-semibold text-gray-800 mb-2">
          {userProfile?.data?.user?.name || 'Loading...'}
        </h3>
        <p className="text-gray-600 mb-4 text-lg">{userProfile?.data?.user?.email}</p>

        {(activeRole === 'DRIVER' || activeRole === 'RIDER') && (
          <button
            onClick={() => navigate('/all-rides')}
            className="bg-yellow-500 text-white hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-semibold shadow-md mb-4 w-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            All Rides
          </button>
        )}

        {activeRole === 'DRIVER' && (
          <button
            onClick={() => navigate('/ride-request')}
            className="bg-yellow-500 text-white hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-semibold shadow-md mb-4 w-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            RideRequest
          </button>
        )}

        {activeRole === 'ADMIN' && (
          <button
            onClick={() => navigate('/manage-request')}
            className="bg-yellow-500 text-white hover:bg-yellow-600 px-6 py-3 rounded-full text-lg font-semibold shadow-md mb-4 w-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            OnBoarding Requests
          </button>
        )}

        <div className="bg-yellow-50 p-4 rounded-lg shadow-inner space-y-2 text-left text-gray-700">
          <p>
            <span className="font-semibold">User ID:</span> {userProfile?.data?.user?.id || 'N/A'}
          </p>
          <p>
            <span className="font-semibold">Roles:</span> {roles.join(', ')}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> {userProfile?.data?.rating ?? 'N/A'}
          </p>
          <p>
            <span className="font-semibold">Active Role:</span> {activeRole || 'Not selected'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
