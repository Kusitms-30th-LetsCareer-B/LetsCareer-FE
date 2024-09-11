import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const useFavorite = (recruitmentId: number) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/recruitments/${recruitmentId}`);
        const { isFavorite } = response.data.data;
        setIsFavorite(isFavorite);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    if (recruitmentId) {
      fetchFavoriteStatus();
    }
  }, [recruitmentId]);

  const toggleFavorite = async () => {
    try {
      await axios.patch(`${BASE_URL}/recruitments/${recruitmentId}/favorite`);
      setIsFavorite((prev) => !prev); 
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return { isFavorite, toggleFavorite };
};