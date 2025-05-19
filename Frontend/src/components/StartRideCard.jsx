import React, { useState } from 'react';
import axios from 'axios';

export const StartRideCard = () => {
  const [otp, setOtp] = useState('');
  const [ride, setRide] = useState(null);
  const [error, setError] = useState('');
  const base_url = import.meta.env.VITE_BASE_URL;

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
    <div className="p-6 bg-white/5 backdrop-blur-md text-white rounded-2xl w-full max-w-xl mb-6 border border-white/10 ring-1 ring-white/10 shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-400">Start Ride</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="bg-white/10 border border-white/20 placeholder-white/70 text-white px-4 py-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={handleStartRide}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold transition"
      >
        Start Ride
      </button>

      {error && <p className="text-rose-400 mt-4">{error}</p>}

      {ride && (
        <div className="mt-6 text-white/90 text-sm space-y-2">
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
