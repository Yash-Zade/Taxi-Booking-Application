import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const RequestDriver = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [loading, setLoading] = useState(false);
  const { accessToken } = useContext(AuthContext);
  const { userProfile } = useContext(UserContext);
  const navigate = useNavigate();

  const base_url = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehicleId.trim()) {
      toast.warn("Please enter your vehicle ID");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${base_url}/rider/requestOnboard`,
        {
          id: 0,
          user: {
            id: userProfile?.data?.user?.id,
            name: userProfile?.data?.user?.name,
            email: userProfile?.data?.user?.email,
            roles: userProfile?.data?.user?.roles || [],
          },
          vehicleId: vehicleId.trim(),
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      toast.success("Driver onboard request sent successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(`Request failed: ${error.message || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-6 flex justify-center items-center py-20 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-xl w-full border border-yellow-300 text-gray-900">
        <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
          Request to be a Driver
        </h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-gray-700">
            Vehicle ID
          </label>
          <input
            type="text"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            placeholder="Enter your vehicle ID"
            className="w-full p-3 mb-6 bg-gray-100 text-gray-900 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-500 text-black hover:bg-yellow-600"
            }`}
          >
            {loading ? "Sending Request..." : "Send Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestDriver;
