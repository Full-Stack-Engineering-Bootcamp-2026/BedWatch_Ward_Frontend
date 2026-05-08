import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";
const getAuthHeader = () => {
  const persistRoot = localStorage.getItem("persist:root");
  if (!persistRoot) {
    return {};
  }
  const parsedRoot = JSON.parse(persistRoot);
  const auth = JSON.parse(parsedRoot.auth);
  const token = auth.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getDashboardSummary = async () => {
  const response = await axios.get(
    `${BASE_URL}/senior-staff/dashboard/summary`,
    getAuthHeader(),
  );
  return response.data.data;
};
export const getWardOccupancy = async () => {
  const response = await axios.get(
    `${BASE_URL}/senior-staff/dashboard/ward-occupancy`,
    getAuthHeader(),
  );
  return response.data.data;
};
export const getSystemAlerts = async () => {
  const response = await axios.get(
    `${BASE_URL}/senior-staff/dashboard/alerts`,
    getAuthHeader(),
  );
  return response.data.data;
};
export const getDashboardTrends = async () => {
  const response = await axios.get(
    `${BASE_URL}/senior-staff/dashboard/trends`,
    getAuthHeader(),
  );
  return response.data.data;
};
