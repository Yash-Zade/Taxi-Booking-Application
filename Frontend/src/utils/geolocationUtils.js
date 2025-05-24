import axios from "axios";
import axiosRetry from "axios-retry";
import { toast } from "react-toastify";

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export const getPlaceFromCoordinates = async (lat, lon) => {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: { lat, lon, format: "json" },
    });

    if (res.data && res.data.display_name) {
      return res.data.display_name;
    } else {
      toast.error(`No place found for coordinates: ${lat}, ${lon}`);
      return "Location not available";
    }
  } catch (error) {
    toast.error(`Failed to get place for coordinates: ${lat}, ${lon}.`, error);
    return "Location not available";
  }
};

export const getCoordinatesFromPlace = async (place) => {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: place,
        format: "json",
        limit: 1,
      },
    });

    if (res.data && res.data.length > 0) {
      const { lat, lon } = res.data[0];
      return [parseFloat(lon), parseFloat(lat)];
    } else {
      toast.error(`Place not found: ${place}`);
      return null;
    }
  } catch (error) {
    toast.error(`Failed to get coordinates for place: ${place}.`, error);
    return null;
  }
};
