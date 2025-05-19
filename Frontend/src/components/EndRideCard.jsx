import React, { useState } from 'react';
import axios from 'axios';

export const EndRideCard = () => {
  const [rideId, setRideId] = useState('');
  const [ride, setRide] = useState(null);
  const [error, setError] = useState('');      
  const base_url =  import.meta.env.VITE_BASE_URL;


  const handleEndRide = async () => {
    try {
      const response = await axios.post(`${base_url}/driver/endRide/${rideId}`);
      setRide(response.data);
      setError('');
    } catch (err) {
      setError('Failed to end ride.');
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl w-full max-w-xl mb-6">
      <h2 className="text-xl font-semibold mb-4">End Ride</h2>
      <input
        type="text"
        placeholder="Enter Ride ID"
        value={rideId}
        onChange={(e) => setRideId(e.target.value)}
        className="border px-4 py-2 rounded w-full mb-4"
      />
      <button
        onClick={handleEndRide}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        End Ride
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {ride && (
        <div className="mt-4 text-sm">
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
