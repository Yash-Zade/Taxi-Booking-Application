import React, { useContext, useEffect, useState } from 'react';
import RideCard from '../components/RideCard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const AllRidesPage = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const {accessToken} = useContext(AuthContext);
  const base_url =  import.meta.env.VITE_BASE_URL;


  const fetchRides = async () => {
    try {
      const response = await axios.get(`${base_url}/rider/getAllRide`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRides(response.data.data.content || []);
    } catch (err) {
      toast.error(err.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (rideId) => {
    try {
      const response = await axios.post(
        `${base_url}/rider/cancelRide/${rideId}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 200) {
        toast.success("Ride Cancled Successfully");
        setRides((prevRides) =>
          prevRides.map((ride) =>
          ride.id === rideId ? { ...ride, rideStatus: "CANCELED" } : ride));
      }
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [accessToken]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 mt-10 py-3">Your Rides</h1>
      {loading ? (
        <p>Loading...</p>
      ) : rides.length === 0 ? (
        <p className="text-gray-500">No rides found.</p>
      ) : (
        rides.map((ride) => <RideCard key={ride.id} ride={ride} onCancel={handleCancel}/>)
      )}
    </div>
  );
};

export default AllRidesPage;
