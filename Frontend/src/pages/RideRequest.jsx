import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RideRequestCard from '../components/RideRequestCard';

import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';

const base_url =  import.meta.env.VITE_BASE_URL;

const RideRequest = () => {
  const [rideRequests, setRideRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const { accessToken } = useContext(AuthContext);
  const { userProfile } = useContext(UserContext);

  useEffect(() => {
    async function fetchRideRequests() {
      setLoading(true);
      try {
        if (!userProfile?.data?.user?.roles.includes('DRIVER')) {
          throw new Error('Not a driver');
        }
        // Adjust this if rideRequests are nested differently
        setRideRequests(userProfile?.data?.rideRequests || []);
      } catch (error) {
        console.error(error);
        setRideRequests([]);
      } finally {
        setLoading(false);
      }
    }

    if (accessToken) {
      fetchRideRequests();
    }
  }, [accessToken, userProfile]);

  const handleAccept = async (rideId) => {
    try {
      const response = await axios.post(
        `${base_url}/drivers/acceptRide/${rideId}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 200) {
        setRideRequests((prev) =>
          prev.map((ride) =>
            ride.id === rideId
              ? { ...ride, rideRequestStatus: 'ACCEPTED' }
              : ride
          )
        );
      }
    } catch (error) {
      console.error('Accept failed:', error);
      alert('Failed to accept the ride. Please try again.');
    }
  };

  const handleReject = async (rideId) => {
    try {
      const response = await axios.post(
        `${base_url}/drivers/rejectRide/${rideId}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 200) {
        setRideRequests((prev) =>
          prev.map((ride) =>
            ride.id === rideId
              ? { ...ride, rideRequestStatus: 'REJECTED' }
              : ride
          )
        );
      }
    } catch (error) {
      console.error('Reject failed:', error);
      alert('Failed to reject the ride. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 mt-10 py-3">Your Rides</h1>

      {loading ? (
        <p>Loading...</p>
      ) : rideRequests.length === 0 ? (
        <p className="text-gray-500">No rides found.</p>
      ) : (
        rideRequests.map((ride) => (
          <RideRequestCard
            key={ride.id}
            rideRequest={ride}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))
      )}
    </div>
  );
};

export default RideRequest;
