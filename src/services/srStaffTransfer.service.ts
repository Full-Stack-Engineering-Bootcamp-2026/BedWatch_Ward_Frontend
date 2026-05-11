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
export const getPendingTransfers = async () => {
  const response = await axios.get(
    `${BASE_URL}/transfers/pending`,
    getAuthHeader(),
  );
  return response.data.data;
};

export const getCompletedTransfers = async () => {
  const response = await axios.get(
    `${BASE_URL}/transfers/completed`,
    getAuthHeader(),
  );

  return response.data.data;
};
export const getRejectedTransfers = async () => {
  const response = await axios.get(
    `${BASE_URL}/transfers/rejected`,
    getAuthHeader(),
  );

  return response.data.data;
};

export const approveTransfer = async (id: number) => {
  const response = await axios.patch(
    `${BASE_URL}/transfers/${id}/approve`,
    {},
    getAuthHeader(),
  );
  return response.data.data;
};
export const rejectTransfer = async (id: number) => {
  const response = await axios.patch(
    `${BASE_URL}/transfers/${id}/reject`,
    {},
    getAuthHeader(),
  );
  return response.data.data;
};

export const getTransfers = async () => {
  const response = await axios.get(
    `${BASE_URL}/transfers/all`,
    getAuthHeader(),
  );
  return response.data.data;
};
