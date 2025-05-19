import React, { useContext, useEffect, useState } from "react"; 
import { getPlaceFromCoordinates } from "../utils/geolocationUtils";
import { UserContext } from "../contexts/UserContext";

const RideCard = ({ ride, onCancel, onStart, onEnd, onRate }) => {
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
    <div className="bg-white border border-yellow-300 shadow-lg rounded-3xl p-6 mb-6 text-gray-900 hover:shadow-2xl transition-shadow duration-300 max-w-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pickup</p>
          <p className="text-lg font-semibold truncate">{pickupName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Dropoff</p>
          <p className="text-lg font-semibold truncate">{dropOffName}</p>
        </div>
        <div className="text-right md:text-left">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Fare</p>
          <p className="text-base font-semibold">₹ {ride.fare.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-5 text-sm text-gray-700 space-y-1">
        <p>Status: <strong className="text-yellow-600 capitalize">{ride.rideStatus.toLowerCase()}</strong></p>
        <p>Created: {formatDate(ride.createdTime)}</p>
        {ride.startedTime && <p>Started: {formatDate(ride.startedTime)}</p>}
        {ride.endedTime && <p>Ended: {formatDate(ride.endedTime)}</p>}
      </div>

      {/* Driver OTP & Start Ride */}
      {ride.rideStatus === "CONFORMED" && isDriver && (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="flex-grow p-3 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
          />
          <button
            onClick={() => onStart(otp, ride.id)}
            className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-yellow-600 shadow-md transition"
          >
            Start Ride
          </button>
        </div>
      )}

      {/* Driver End Ride */}
      {ride.rideStatus === "ONGOING" && isDriver && (
        <div className="mt-6">
          <button
            onClick={() => onEnd(ride.id)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
          >
            End Ride
          </button>
        </div>
      )}

      {/* Rating Section */}
      {ride.rideStatus === "ENDED" && !hasRated && (
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-3">
            Rate your {activeRole === "RIDER" ? "Driver" : "Rider"}
          </p>
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((val) => (
              <span
                key={val}
                onClick={() => {
                  ride.tempRating = val;
                  setRerender((prev) => !prev);
                }}
                className={`cursor-pointer text-3xl select-none transition-colors ${
                  ride.tempRating >= val ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                }`}
                aria-label={`${val} star`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && (ride.tempRating = val) && setRerender((prev) => !prev)}
              >
                ★
              </span>
            ))}
          </div>
          <button
            onClick={() => onRate(ride.id, ride.tempRating || 0)}
            className="bg-yellow-500 text-white px-5 py-2 rounded-xl hover:bg-yellow-600 shadow-md transition"
          >
            Submit Rating
          </button>
        </div>
      )}

      {/* Cancel Ride Button */}
      {ride.rideStatus === "CONFORMED" && (
        <div className="mt-6">
          <button
            onClick={() => onCancel(ride.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
          >
            Cancel Ride
          </button>
        </div>
      )}
    </div>
  );
};

export default RideCard;
