import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const BookRidePage = () => {
  const [pickupPlace, setPickupPlace] = useState("");
  const [dropOffPlace, setDropOffPlace] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("WALLET");
  const [rideResponse, setRideResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const {accessToken} = useContext(AuthContext);
  const base_url =  import.meta.env.VITE_BASE_URL;

  const getCoordinatesFromPlace = async (place) => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: place,
          format: "json",
          limit: 1,
        },
      });

      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        return [parseFloat(lon), parseFloat(lat)];
      } else {
        throw new Error("Place not found");
      }
    } catch (error) {
      throw new Error("Failed to get coordinates for: " + place);
    }
  };

  const handleBookRide = async () => {
    try {
      const pickupCoords = await getCoordinatesFromPlace(pickupPlace);
      const dropOffCoords = await getCoordinatesFromPlace(dropOffPlace);

      const requestBody = {
        pickupLocation: {
          coordinates: pickupCoords,
        },
        dropOffLocation: {
          coordinates: dropOffCoords,
        },
        paymentMethod: paymentMethod,
      };

      const response = await axios.post(`${base_url}/rider/requestRide`,requestBody, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRideResponse(response.data.data);
      setErrorMsg("");
      toast.success("Ride Requested Successfully: wait until driver accespts the ride")
    } catch (error) {
      toast.error("Booking Error:", error.message);
      setErrorMsg(error.message || "Booking failed. Try again.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center text-white py-20 px-4">
      <div className="bg-gray-800 p-8 rounded-xl max-w-xl w-full shadow-xl">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Book Your Ride 🚕</h1>

        {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}

        <input
          type="text"
          placeholder="Enter Pickup Place (e.g. Nagpur Station)"
          value={pickupPlace}
          onChange={(e) => setPickupPlace(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter Drop-off Place"
          value={dropOffPlace}
          onChange={(e) => setDropOffPlace(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg"
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg"
        >
          <option value="WALLET">Wallet</option>
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
        </select>

        <button
          onClick={handleBookRide}
          className="w-full p-3 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600 transition"
        >
          Confirm Ride
        </button>

        {rideResponse && (
          <div className="mt-6 bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-300 mb-2">Ride Requested ✅</h2>
            <p><strong>Status:</strong> {rideResponse.rideRequestStatus}</p>
            <p><strong>Fare:</strong> ₹{rideResponse.fare.toFixed(2)}</p>
            <p><strong>Payment:</strong> {rideResponse.paymentMethod}</p>
            <p><strong>Driver Name:</strong> {rideResponse.driver.user.name}</p>
            <p><strong>Driver Rating:</strong> {rideResponse.driver.rating}</p>
            <p><strong>Requested At:</strong> {new Date(rideResponse.requestTime).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRidePage;
