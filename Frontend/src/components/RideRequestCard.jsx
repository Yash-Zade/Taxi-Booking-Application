import React, { useEffect, useState } from "react";
import { getPlaceFromCoordinates } from "../utils/geolocationUtils";

const RideRequestCard = ({ rideRequest, onAccept, onReject }) => {
  if (!rideRequest) return null;

  const {
    id,
    pickupLocation,
    dropOffLocation,
    requestTime,
    rider,
    fare,
    paymentMethod,
    rideRequestStatus,
    driver,
  } = rideRequest;

  const [pickupName, setPickupName] = useState("Loading...");
  const [dropOffName, setDropOffName] = useState("Loading...");

  const fetchPlaceNames = async () => {
    if (pickupLocation?.coordinates) {
      const place = await getPlaceFromCoordinates(
        pickupLocation.coordinates[1],
        pickupLocation.coordinates[0]
      );
      setPickupName(place || "Unknown");
    }
    if (dropOffLocation?.coordinates) {
      const place = await getPlaceFromCoordinates(
        dropOffLocation.coordinates[1],
        dropOffLocation.coordinates[0]
      );
      setDropOffName(place || "Unknown");
    }
  };

  useEffect(() => {
    fetchPlaceNames();
  }, [pickupLocation, dropOffLocation]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-yellow-300 max-w-2xl mx-auto my-6 transition duration-300 ease-in-out hover:shadow-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4">
        Ride Request #{id}
      </h2>

      <div className="grid gap-3 text-sm sm:text-base text-gray-800">
        <p>
          <span className="font-semibold">Pickup:</span> {pickupName}
        </p>
        <p>
          <span className="font-semibold">Drop-off:</span> {dropOffName}
        </p>
        <p>
          <span className="font-semibold">Requested At:</span>{" "}
          {requestTime ? new Date(requestTime).toLocaleString() : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Fare:</span> ₹{Number(fare).toFixed(2)}
        </p>
        <p>
          <span className="font-semibold">Payment:</span> {paymentMethod || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`font-semibold ${
              rideRequestStatus === "PENDING"
                ? "text-yellow-600"
                : rideRequestStatus === "ACCEPTED"
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {rideRequestStatus}
          </span>
        </p>
      </div>

      {rider && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-yellow-600 mb-2">Rider Info</h3>
          <div className="grid gap-1 text-sm sm:text-base text-gray-700">
            <p>
              <strong>Name:</strong> {rider.user?.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {rider.user?.email || "N/A"}
            </p>
            <p>
              <strong>Rating:</strong> {rider.rating ?? "Not rated"}
            </p>
          </div>
        </div>
      )}

      {driver && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-yellow-600 mb-2">Driver Info</h3>
          <div className="grid gap-1 text-sm sm:text-base text-gray-700">
            <p>
              <strong>Name:</strong> {driver.name}
            </p>
            <p>
              <strong>ID:</strong> {driver.id}
            </p>
          </div>
        </div>
      )}

      {rideRequestStatus === "PENDING" && (
        <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
          <button
            onClick={() => onAccept(id)}
            className="w-full sm:w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            Accept
          </button>
          <button
            onClick={() => onReject(id)}
            className="w-full sm:w-1/2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default RideRequestCard;
