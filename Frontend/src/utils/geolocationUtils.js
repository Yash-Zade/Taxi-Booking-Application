import axios from "axios";

export const getPlaceFromCoordinates = async (lat, lon) => {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
    params: { lat, lon, format: "json" },
    });

    if (res.data.display_name) {
      return res.data.display_name; // Returns formatted place name
    } else {
      throw new Error("Place not found");
    }
  } catch (error) {
    throw new Error(`Failed to get place for coordinates: ${lat}, ${lon}`);
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