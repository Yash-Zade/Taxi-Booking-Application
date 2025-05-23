import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const EndRideCard = () => {
  const [rideId, setRideId] = useState('');
  const [ride, setRide] = useState(null);
  const [error, setError] = useState('');
  const base_url = import.meta.env.VITE_BASE_URL;

  const handleEndRide = async () => {
    try {
      const response = await axios.post(`${base_url}/driver/endRide/${rideId}`);
      setRide(response.data);
      setError('');
    } catch (err) {
      setError('Failed to end ride.');
      toast.error(error);
    }
  };

  return (
    <div className="bg-white border border-yellow-300 p-8 rounded-3xl shadow-xl w-full max-w-xl text-center">
      <h2 className="text-2xl font-bold text-yellow-600 mb-6">End Ride</h2>

      <input
        type="text"
        placeholder="Enter Ride ID"
        value={rideId}
        onChange={(e) => setRideId(e.target.value)}
        className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
      />

      <button
        onClick={handleEndRide}
        className="bg-yellow-500 text-white hover:bg-yellow-600 px-6 py-3 rounded-full text-md font-semibold shadow-md transform hover:scale-105 transition duration-300 ease-in-out w-full mb-4"
      >
        End Ride
      </button>

      {error && <p className="text-red-500 font-medium mt-2">{error}</p>}

      {ride && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-gray-800 text-left space-y-2">
          <p><strong>Ride ID:</strong> {ride.id}</p>
          <p><strong>Status:</strong> {ride.rideStatus}</p>
          <p><strong>Fare:</strong> ₹{ride.fare}</p>
          <p><strong>Started:</strong> {ride.startedTime}</p>
          <p><strong>Ended:</strong> {ride.endedTime}</p>
        </div>
      )}
    </div>
  );
};
