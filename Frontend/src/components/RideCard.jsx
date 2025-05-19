import React, { useContext, useEffect, useState } from "react";
import { getPlaceFromCoordinates } from "../utils/geolocationUtils";
import { UserContext } from "../contexts/UserContext";

const RideCard = ({ ride, onCancel, onStart, onEnd, onRate  }) => {
  const formatDate = (iso) => new Date(iso).toLocaleString();
  const [pickupName, setPickupName] = useState("Loading...");
  const [dropOffName, setDropOffName] = useState("Loading...");
  const [otp, setOtp] = useState("");
  const [rerender, setRerender] = useState(false);
  const { activeRole } = useContext(UserContext);
  const isDriver = activeRole === "DRIVER";
  const hasRated = isDriver ? ride.hasDriverRated : ride.hasRiderRated;

   const fetchPlaceNames = async () => {
      if (ride.pickupLocation?.coordinates) {
        const place = await getPlaceFromCoordinates(
          ride.pickupLocation.coordinates[1],
          ride.pickupLocation.coordinates[0]
        );
        setPickupName(place);
      }

      if (ride.dropOffLocation?.coordinates) {
        const place = await getPlaceFromCoordinates(
          ride.dropOffLocation.coordinates[1],
          ride.dropOffLocation.coordinates[0]
        );
        setDropOffName(place);
      }
    };

  useEffect(() => {
    fetchPlaceNames();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <p className="text-sm text-gray-500">Pickup</p>
          <p className="text-lg font-semibold">{pickupName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Dropoff</p>
          <p className="text-lg font-semibold">{dropOffName}</p>
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

      {ride.rideStatus === "CONFORMED" && activeRole === "DRIVER" && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border px-3 py-2 rounded-md text-sm w-full sm:w-1/3"
          />
          <button
            onClick={() => onStart(otp, ride.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Start Ride
          </button>
        </div>
      )}

      {ride.rideStatus === "ONGOING" && activeRole === "DRIVER" && (
        <div className="mt-4">
          <button
            onClick={() => onEnd(ride.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            End Ride
          </button>
        </div>
      )}

      {ride.rideStatus === "ENDED" && !hasRated && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Rate your {activeRole === "RIDER" ? "Driver" : "Rider"}
          </p>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <span
                key={val}
                onClick={() => {
                  ride.tempRating = val;
                  setRerender((prev) => !prev);
                }}
                className={`cursor-pointer text-2xl ${
                  ride.tempRating >= val ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <button
            onClick={() => onRate(ride.id, ride.tempRating || 0)}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Submit Rating
          </button>
        </div>
      )}


      {ride.rideStatus === "CONFORMED" && (
        <div className="mt-4">
          <button
            onClick={() => onCancel(ride.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Cancel Ride
          </button>
        </div>
      )}
    </div>
  );
};

export default RideCard;
