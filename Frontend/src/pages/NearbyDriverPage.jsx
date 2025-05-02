import React from 'react';
import DriverCard from '../components/DriverCard';  // Import the new DriverCard component

const drivers = [
  { name: 'John Doe', car: 'Toyota Prius', rating: 4.8 },
  { name: 'Jane Smith', car: 'Honda City', rating: 4.7 },
  { name: 'Alex Johnson', car: 'Maruti Swift', rating: 4.9 },
];

const NearbyDriversPage = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 h-screen flex flex-col items-center text-white py-20">
      <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-12 p-5 animate-pulse">
        Nearby Driver
      </h2>      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {drivers.map((driver, index) => (
          <DriverCard key={index} driver={driver} index={index} />
        ))}
      </div>
    </div>
  );
};

export default NearbyDriversPage;
