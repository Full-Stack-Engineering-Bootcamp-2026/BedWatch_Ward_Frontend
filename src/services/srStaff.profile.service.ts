import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

const getAuthHeader = () => {
  const persistRoot = localStorage.getItem("persist:root");

  if (!persistRoot) {
    return {};
  }

  const parsedRoot = JSON.parse(persistRoot);

  const auth =
    typeof parsedRoot.auth === "string"
      ? JSON.parse(parsedRoot.auth)
      : parsedRoot.auth;

  const token = auth?.token;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getLoggedInUserProfile = async () => {
  const response = await axios.get(
    `${BASE_URL}/users/me`,
    getAuthHeader(),
  );

  return response.data.data;
};