import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDashboardSummary,
  getWardOccupancy,
  getSystemAlerts,
  getDashboardTrends,
} from "@/services/srStaff.service";

export const fetchDashboardData = createAsyncThunk(
  "seniorStaff/fetchDashboardData",

  async () => {
    const [summary, wards, alerts, trends] = await Promise.all([
      getDashboardSummary(),
      getWardOccupancy(),
      getSystemAlerts(),
      getDashboardTrends(),
    ]);
    return {
      summary,
      wards,
      alerts,
      trends,
    };
  },
);
type SeniorStaffState = {
  summary: any;
  wards: any[];
  alerts: any[];
  trends: any;

  loading: boolean;
  error: string | null;
};
const initialState: SeniorStaffState = {
  summary: null,
  wards: [],
  alerts: [],
  trends: null,
  loading: false,
  error: null,
};
const seniorStaffSlice = createSlice({
  name: "seniorStaff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;

        state.summary = action.payload.summary;

        state.wards = action.payload.wards;

        state.alerts = action.payload.alerts;

        state.trends = action.payload.trends;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message || "Failed to fetch dashboard";
      });
  },
});

export default seniorStaffSlice.reducer;
