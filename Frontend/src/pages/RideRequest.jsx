import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RideRequestCard from '../components/RideRequestCard';

import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const base_url =  import.meta.env.VITE_BASE_URL;

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
      toast.error(err.response.data.error.message);
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
      toast.error(error.response.data.error.message);
    }
  };

  const handleReject = async (rideId) => {
    try {
      const response = await axios.post(
        `${base_url}/driver/rejectRide/${rideId}`,
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
      console.log('Reject failed:', error.data);
      toast.error(error.response.data.error.message);
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
