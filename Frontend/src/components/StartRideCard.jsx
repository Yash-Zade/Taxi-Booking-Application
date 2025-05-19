import React, { useState } from 'react';
import axios from 'axios';

export const StartRideCard = () => {
  const [otp, setOtp] = useState('');
  const [ride, setRide] = useState(null);
  const [error, setError] = useState('');
  const base_url =  import.meta.env.VITE_BASE_URL;
  const handleStartRide = async () => {
    try {
      const response = await axios.post(`${base_url}/driver/startRide`, { otp });
      setRide(response.data);
      setError('');
    } catch (err) {
      setError('Failed to start ride.');
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl w-full max-w-xl mb-6">
      <h2 className="text-xl font-semibold mb-4">Start Ride</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border px-4 py-2 rounded w-full mb-4"
      />
      <button
        onClick={handleStartRide}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Start Ride
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {ride && (
        <div className="mt-4 text-sm">
          <p><strong>Ride ID:</strong> {ride.id}</p>
          <p><strong>Status:</strong> {ride.rideStatus}</p>
          <p><strong>Fare:</strong> ₹{ride.fare}</p>
          <p><strong>Pickup:</strong> {ride.pickupLocation?.type}</p>
          <p><strong>Drop-off:</strong> {ride.dropOffLocation?.type}</p>
        </div>
      )}
    </div>
  );
};
