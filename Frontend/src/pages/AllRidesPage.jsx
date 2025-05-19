import React, { useContext, useEffect, useState } from 'react';
import RideCard from '../components/RideCard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';

const AllRidesPage = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useContext(AuthContext);
  const { activeRole } = useContext(UserContext);
  const base_url = import.meta.env.VITE_BASE_URL;
  const role = activeRole ? activeRole.toLowerCase() : "rider";

  const fetchRides = async () => {
    try {
      const response = await axios.get(`${base_url}/${role}/getAllRide`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRides(response.data.data.content || []);
    } catch (err) {
      toast.error(err.response?.data?.error?.message || "Failed to load rides");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (rideId) => {
    try {
      const response = await axios.post(
        `${base_url}/${role}/cancelRide/${rideId}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 200) {
        toast.success("Ride Canceled Successfully");
        setRides((prevRides) =>
          prevRides.map((ride) =>
            ride.id === rideId ? { ...ride, rideStatus: "CANCELED" } : ride
          )
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.error?.message || "Failed to cancel ride");
    }
  };

  const handleStart = async (otp, rideId) => {
    if (!otp) return toast.warn("Enter OTP to start the ride");

    try {
      const response = await axios.post(
        `${base_url}/driver/startRide/${rideId}`,
        { otp },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.status === 200) {
        toast.success("Ride Started");
        await fetchRides();
      }
    } catch (err) {
      toast.error(err.response?.data?.error?.message || "Failed to start ride");
    }
  };

  const handleEnd = async (rideId) => {
    try {
      const response = await axios.post(
        `${base_url}/driver/endRide/${rideId}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.status === 200) {
        toast.success("Ride Ended");
        await fetchRides();
      }
    } catch (err) {
      toast.error(err.response?.data?.error?.message || "Failed to end ride");
    }
  };

  const handleRate = async (rideId, rating) => {
    if (!rating || rating < 1 || rating > 5) {
      return toast.warn("Please select a valid rating");
    }

    try {
      const response = await axios.post(
        `${base_url}/${role}/rate`,
        { rideId, rating },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 200) {
        toast.success("Rating submitted successfully");
        await fetchRides(); // Refresh to reflect hasRated true
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || "Rating failed");
    }
  };

  useEffect(() => {
    fetchRides();
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-6 flex flex-col items-center pt-24">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-4xl border border-yellow-300">
        <h1 className="text-2xl font-bold mb-6 mt-0 py-3 text-center">Your Rides</h1>
        {loading ? (
          <p>Loading...</p>
        ) : rides.length === 0 ? (
          <p className="text-gray-500 text-center">No rides found.</p>
        ) : (
          rides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              onCancel={handleCancel}
              onStart={handleStart}
              onEnd={handleEnd}
              onRate={handleRate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllRidesPage;
