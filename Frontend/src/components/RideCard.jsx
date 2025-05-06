import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function RideCard({ ride }) {
  return (
    <Card className="shadow-md rounded-2xl w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Ride ID: {ride.id}</span>
          <Badge
            className={
              ride.rideStatus === 'COMPLETED'
                ? 'bg-green-500'
                : ride.rideStatus === 'CANCELED'
                ? 'bg-red-500'
                : 'bg-yellow-500'
            }
          >
            {ride.rideStatus}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>Pickup:</strong>{' '}
            {formatCoordinates(ride.pickupLocation?.coordinates)}
          </div>
          <div>
            <strong>Drop-off:</strong>{' '}
            {formatCoordinates(ride.dropOffLocation?.coordinates)}
          </div>
          <div>
            <strong>Date:</strong>{' '}
            {new Date(ride.createdTime).toLocaleString()}
          </div>
          <div>
            <strong>Fare:</strong> ₹{ride.fare}
          </div>
          <div>
            <strong>Driver:</strong> {ride.driver?.user?.name || 'N/A'}
          </div>
          <div>
            <strong>Payment:</strong> {ride.paymentMethod}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatCoordinates(coordinates) {
  if (!coordinates || coordinates.length < 2) return 'N/A';
  return `${coordinates[1]}, ${coordinates[0]}`; // assuming [longitude, latitude]
}

export default RideCard;
