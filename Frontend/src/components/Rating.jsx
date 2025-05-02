import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ initialRating, totalStars = 5, onRate }) => {
  const [rating, setRating] = useState(initialRating);

  // Handle star click event to set the rating
  const handleRating = (index) => {
    setRating(index + 1);
    if (onRate) {
      onRate(index + 1); // Call the onRate function passed from the parent
    }
  };

  // Create an array of filled and empty stars
  const stars = Array.from({ length: totalStars }, (_, index) => index < rating);

  return (
    <div className="flex items-center space-x-1">
      {/* Render the stars */}
      {stars.map((filled, index) => (
        <FaStar
          key={index}
          className={`text-2xl cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-500'} transition-all duration-300 ease-in-out`}
          onClick={() => handleRating(index)} // Allow clicking to rate
        />
      ))}
      {/* Display the rating number next to stars */}
      <span className="text-lg text-gray-300 ml-2">{rating}</span>
    </div>
  );
};

export default Rating;
