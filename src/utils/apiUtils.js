import axios from "axios";

const BASE_URL = "https://politics-transperancy-backend.onrender.com/general/";

export const getAllBills = async () => {
  return await axios.get(`${BASE_URL}/bills`);
};

export const getAllKnessetNum = async () => {
  return await axios.get(`${BASE_URL}/knessetAmounts`);
};
