import axios from "axios";

const BASE_URL = "https://politics-backend.onrender.com/general";

export const getAllBills = async () => {
  return await axios.get(`${BASE_URL}/bills`);
};
