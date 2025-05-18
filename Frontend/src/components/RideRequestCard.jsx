import React, { useEffect, useState } from "react";
import { getPlaceFromCoordinates } from "../utils/geolocationUtils";

const RideRequestCard = ({ rideRequest, onAccept, onReject }) => {
  if (!rideRequest) return null;

  const { id, pickupLocation, dropOffLocation, requestTime, rider, fare, paymentMethod, rideRequestStatus, driver } = rideRequest;

  const [pickupName, setPickupName] = useState("Loading...");
  const [dropOffName, setDropOffName] = useState("Loading...");
  
  const fetchPlaceNames = async () => {
    if (pickupLocation?.coordinates) {
      const place = await getPlaceFromCoordinates(pickupLocation.coordinates[1], pickupLocation.coordinates[0]);
      setPickupName(place);
    }
    if (dropOffLocation?.coordinates) {
      const place = await getPlaceFromCoordinates(dropOffLocation.coordinates[1], dropOffLocation.coordinates[0]);
      setDropOffName(place);
    }
  };

  useEffect(() => {
    fetchPlaceNames();
  }, [pickupLocation, dropOffLocation]);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg mb-6 max-w-xl mx-auto border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Ride Request #{id}</h2>

      <div className="space-y-2 text-gray-300">
        <p><strong>Pickup Location:</strong> {pickupName}</p>
        <p><strong>Drop-off Location:</strong> {dropOffName}</p>
        <p><strong>Request Time:</strong> {requestTime ? new Date(requestTime).toLocaleString() : "N/A"}</p>
        <p><strong>Fare:</strong> ₹{fare?.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Status:</strong> <span className="text-green-400">{rideRequestStatus}</span></p>
      </div>

      {rider && (
        <div className="mt-4">
          <h3 className="text-xl text-yellow-300 font-semibold mb-1">Rider</h3>
          <p><strong>Name:</strong> {rider.user?.name}</p>
          <p><strong>Email:</strong> {rider.user?.email}</p>
          <p><strong>Rating:</strong> {rider.rating}</p>
        </div>
      )}

      {driver && (
        <div className="mt-4">
          <h3 className="text-xl text-yellow-300 font-semibold mb-1">Driver</h3>
          <p><strong>Name:</strong> {driver.name}</p>
          <p><strong>ID:</strong> {driver.id}</p>
        </div>
      )}

      {rideRequestStatus === "PENDING" && (
        <div className="flex justify-between mt-6">
          <button
            onClick={() => onAccept(id)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Accept
          </button>
          <button
            onClick={() => onReject(id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default RideRequestCard;
