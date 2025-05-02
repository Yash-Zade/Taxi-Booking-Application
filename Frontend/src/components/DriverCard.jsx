import React, { useState } from 'react';
import Rating from './Rating';  // Import the Rating component

const DriverCard = ({ driver }) => {
  const [driverRating, setDriverRating] = useState(driver.rating);

  const handleRate = (newRating) => {
    // Update the rating for the driver
    setDriverRating(newRating);
    // Optionally, send this rating to the server to save it
    console.log(`User rated ${driver.name} with ${newRating} stars`);
  };

  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 flex flex-col justify-between space-y-6">
      
      {/* Driver Name and Car Info */}
      <div className="space-y-3 text-center">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
          {driver.name}
        </h3>
        <p className="text-lg text-gray-300 italic">{driver.car}</p>
      </div>

      {/* Rating Section */}
      <div className="flex justify-center">
        <Rating initialRating={driverRating} onRate={handleRate} />
      </div>

      {/* Card Hover Effect (overlay) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-0 hover:opacity-30 transition duration-300 ease-in-out rounded-xl"></div>
    </div>
  );
};

export default DriverCard;
