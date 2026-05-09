import axios from "axios";

const BASE_URL =
  "http://localhost:3000/api/v1";

export interface CreateTransferPayload {
  patientId: number;

  currentBedId: number;

  currentWardId: number;

  destinationWardId: number;
}

export const createTransferRequest =
  async (
    payload: CreateTransferPayload,
  ) => {
    const token =
      localStorage.getItem(
        "token",
      );

    const response =
      await axios.post(
        `${BASE_URL}/transfers/staff`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

    return response.data;
  };

export const fetchWards =
  async () => {
    const token =
      localStorage.getItem(
        "token",
      );

    const response =
      await axios.get(
        `${BASE_URL}/wards`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

    return response.data.data;
  };