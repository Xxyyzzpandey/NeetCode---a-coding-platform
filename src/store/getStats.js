import { create } from "zustand";
import axios from "axios";

export const useStatsStore = create((set) => ({
  stats: JSON.parse(localStorage.getItem("stats")) || null,
  loading: false,
  error: null,

  getStats: async (userId) => {
    try {
      set({ loading: true });

      const res = await axios.get(`http://localhost:3000/getProb/getStats/${userId}`, {
        withCredentials: true,
      });

      const fetchedStats = res.data.stats;

      // Save to localStorage
      localStorage.setItem("stats", JSON.stringify(fetchedStats));

      // Update store
      set({
        stats: fetchedStats,
        loading: false,
        error: null,
      });

    } catch (err) {
      console.error(err);
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to fetch stats",
      });
    }
  },

  // Clear stats (on logout or refresh)
  clearStats: () => {
    localStorage.removeItem("stats");
    set({ stats: null });
  },
}));
