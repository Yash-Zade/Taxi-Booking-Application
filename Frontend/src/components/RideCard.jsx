import React from 'react';
import AppButton from './AppButton';

const RideCard = ({ ride, onCancel }) => {
  const formatDate = (iso) => new Date(iso).toLocaleString();

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-2 md:mb-0">
          <p className="text-sm text-gray-500">Pickup</p>
          <p className="text-lg font-semibold">
            {ride.pickupLocation?.coordinates}
          </p>
        </div>
        <div className="mb-2 md:mb-0">
          <p className="text-sm text-gray-500">Dropoff</p>
          <p className="text-lg font-semibold">
            {ride.dropOffLocation?.coordinates}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Fare</p>
          <p className="text-lg font-semibold">₹ {ride.fare}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
        <span>Status: <strong>{ride.rideStatus}</strong></span>
        <span>Created: {formatDate(ride.createdTime)}</span>
        {ride.startedTime && <span>Started: {formatDate(ride.startedTime)}</span>}
        {ride.endedTime && <span>Ended: {formatDate(ride.endedTime)}</span>}
      </div>

      <div className="mt-4 flex justify-end gap-3">
        {ride.rideStatus === "CONFORMED" &&<button 
          onClick={() => onCancel(ride.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
          Cancle Ride
        </button>}    
      </div>
    </div>
  );
};

export default RideCard;
