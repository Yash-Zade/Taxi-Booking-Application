import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RideRequestCard from '../components/RideRequestCard';

import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const base_url = import.meta.env.VITE_BASE_URL;

const RideRequest = () => {
  const [rideRequests, setRideRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const { accessToken } = useContext(AuthContext);

  const fetchRideRequests = async () => {
    try {
      const response = await axios.get(`${base_url}/driver/getAllRideRequest`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRideRequests(response.data.data.content || []);
    } catch (err) {
      toast.error(err.response?.data?.error?.message || 'Failed to load rides');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRideRequests();
  }, [accessToken]);

  const handleAccept = async (rideId) => {
    try {
      const response = await axios.post(
        `${base_url}/driver/acceptRide/${rideId}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.status === 200) {
        setRideRequests((prev) =>
          prev.map((ride) =>
            ride.id === rideId ? { ...ride, rideRequestStatus: 'ACCEPTED' } : ride
          )
        );
      }
    } catch (error) {
      console.error('Accept failed:', error);
      toast.error(error.response?.data?.error?.message || 'Accept failed');
    }
  };

  const handleReject = async (rideId) => {
    try {
      const response = await axios.post(
        `${base_url}/driver/rejectRide/${rideId}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.status === 200) {
        setRideRequests((prev) =>
          prev.map((ride) =>
            ride.id === rideId ? { ...ride, rideRequestStatus: 'REJECTED' } : ride
          )
        );
      }
    } catch (error) {
      console.log('Reject failed:', error);
      toast.error(error.response?.data?.error?.message || 'Reject failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-6 flex flex-col items-center pt-24">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-4xl border border-yellow-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Rides</h1>

        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : rideRequests.length === 0 ? (
          <p className="text-gray-500 text-center">No rides found.</p>
        ) : (
          <div className="space-y-6">
            {rideRequests.map((ride) => (
              <RideRequestCard
                key={ride.id}
                rideRequest={ride}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RideRequest;
