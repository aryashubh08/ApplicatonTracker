// applicationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allApplications: [],
  singleApplication: null,
  stats: {
    totalApplied: 0,
    interviewScheduled: 0,
    rejected: 0,
    accepted: 0,
  },
};

const applicationSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllApplications: (state, action) => {
      state.allApplications = action.payload || [];
    },
    setSingleApplication: (state, action) => {
      state.singleApplication = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    removeApplication: (state, action) => {
      state.allApplications = state.allApplications.filter(
        (app) => app._id !== action.payload
      );
    },
  },
});

export const {
  setLoading,
  setAllApplications,
  setSingleApplication,
  removeApplication,
  setStats,
} = applicationSlice.actions;
export default applicationSlice.reducer;
