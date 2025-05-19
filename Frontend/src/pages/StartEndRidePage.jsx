import React, { useState } from 'react';
import axios from 'axios';

const RideCard = ({ ride }) => {
  if (!ride) return null;

  const {
    id,
    pickupLocation,
    dropOffLocation,
    paymentMethod,
    rideStatus,
    fare,
    startedTime,
    endedTime,
    otp,
    rider,
    driver
  } = ride;

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg my-4 max-w-xl mx-auto border border-gray-700">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Ride ID: {id}</h2>
      <div className="space-y-2 text-gray-300">
        <p><strong>Pickup:</strong> {pickupLocation?.coordinates?.join(', ')}</p>
        <p><strong>Drop-off:</strong> {dropOffLocation?.coordinates?.join(', ')}</p>
        <p><strong>Started:</strong> {startedTime ? new Date(startedTime).toLocaleString() : 'N/A'}</p>
        <p><strong>Ended:</strong> {endedTime ? new Date(endedTime).toLocaleString() : 'N/A'}</p>
        <p><strong>Fare:</strong> ₹{fare}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Status:</strong> {rideStatus}</p>
        <p><strong>OTP:</strong> {otp}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-yellow-300 font-semibold">Rider Info</h3>
        <p><strong>Name:</strong> {rider?.user?.name}</p>
        <p><strong>Email:</strong> {rider?.user?.email}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-yellow-300 font-semibold">Driver Info</h3>
        <p><strong>Name:</strong> {driver?.user?.name}</p>
        <p><strong>Email:</strong> {driver?.user?.email}</p>
      </div>
    </div>
  );
};

const StartEndRidePage = () => {
  const [otp, setOtp] = useState('');
  const [ride, setRide] = useState(null);
  const [rideId, setRideId] = useState('');
  const [error, setError] = useState('');
  const base_url =  import.meta.env.VITE_BASE_URL;


  const handleStartRide = async () => {
    try {
      const response = await axios.post(`${base_url}/driver/startRide/${rideId}`, { otp });
      setRide(response.data);
      setRideId(response.data.id);
      setError('');
    } catch (err) {
      setError('Failed to start ride. Please check OTP.');
    }
  };

  const handleEndRide = async () => {
    try {
      const response = await axios.post(`${base_url}/driver/endRide/${rideId}`);
      setRide(response.data);
      setError('');
    } catch (err) {
      setError('Failed to end ride.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h1 className="text-3xl font-bold text-yellow-300 mb-6 text-center">Start / End Ride</h1>

      <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-300">Enter OTP to Start Ride:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white mb-4"
          placeholder="Enter OTP"
        />
        <button
          onClick={handleStartRide}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
        >
          Start Ride
        </button>
      </div>

      {ride && (
        <button
          onClick={handleEndRide}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg mb-4"
        >
          End Ride
        </button>
      )}

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <RideCard ride={ride} />
    </div>
  );
};

export default StartEndRidePage;