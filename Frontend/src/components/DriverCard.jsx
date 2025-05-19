import React, { useState } from 'react';
import Rating from './Rating'; // Assuming this renders stars and accepts props

const DriverCard = ({ driver }) => {
  const [driverRating, setDriverRating] = useState(driver.rating);

  const handleRate = (newRating) => {
    setDriverRating(newRating);
    console.log(`User rated ${driver.name} with ${newRating} stars`);
    // Optionally send this rating to the backend
  };

  return (
    <div className="relative bg-white border border-yellow-300 p-6 rounded-3xl shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 flex flex-col justify-between space-y-6">
      
      {/* Driver Name and Car Info */}
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-bold text-yellow-600">{driver.name}</h3>
        <p className="text-md text-gray-600 italic">{driver.car}</p>
      </div>

      {/* Rating Section */}
      <div className="flex justify-center">
        <Rating initialRating={driverRating} onRate={handleRate} />
      </div>

      {/* Hover overlay (optional for visual polish) */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100 opacity-0 hover:opacity-20 rounded-3xl transition duration-300 ease-in-out pointer-events-none"></div>
    </div>
  );
};

export default DriverCard;
