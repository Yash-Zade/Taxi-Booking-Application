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
      toast.error('Failed to fetch rides');
    } finally {
      setLoading(false);
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
        rides.map((ride) => <RideCard key={ride.id} ride={ride} />)
      )}
    </div>
  );
};

export default AllRidesPage;
