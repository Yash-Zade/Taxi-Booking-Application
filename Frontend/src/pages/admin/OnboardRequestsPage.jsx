import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import OnboardRequestCard from "../../components/OnboardRequestCard";

const OnboardRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useContext(AuthContext);
  const base_url = import.meta.env.VITE_BASE_URL;

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/admin/getAllRequest`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      setRequests(data);
    } catch (err) {
      toast.error(
        err.response?.data?.error?.message || "Failed to load onboard requests"
      );
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (userId, request) => {
    console.log(request)
    setLoading(true);
    try {
      const response = await axios.post(
        `${base_url}/admin/onBoardNewDriver/${userId}`, request, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.status === 201) {
        toast.success("Driver onboarded successfully");
        await fetchRequests();
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error?.message || "Failed to onboard driver"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (request) => {
    setLoading(true);
    try {
      const response = await axios.post(`${base_url}/admin/reject`, request, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.status === 200) {
        toast.success("Request rejected");
        await fetchRequests();
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error?.message || "Failed to reject request"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchRequests();
    }
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-6 flex flex-col items-center pt-24">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-4xl border border-yellow-300">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Onboard Driver Requests
        </h1>

        {loading && requests.length === 0 ? (
          <p className="text-center text-gray-600">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500">No onboard requests found.</p>
        ) : (
          requests.map((request) => (
            <OnboardRequestCard
              key={request.id || request.userId}
              request={request}
              onAccept={() => handleAccept(request.user.id, request)}
              onReject={() => handleReject(request)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OnboardRequestsPage;
