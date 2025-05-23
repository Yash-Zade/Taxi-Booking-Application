import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const OnboardRequestCard = ({ request, onAccept, onReject }) => {
  const { user, vehicleId } = request;

  return (
    <div className="bg-white border border-yellow-300 p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6">
      <div className="text-left flex-1">
        <h3 className="text-xl font-semibold text-yellow-700">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600 mt-1">
          Vehicle ID: <span className="font-medium">{vehicleId}</span>
        </p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onAccept(request.user.id, request)}
          className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out font-semibold"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(request)}
          className="bg-gray-300 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-400 transition duration-300 ease-in-out font-semibold"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default OnboardRequestCard;
