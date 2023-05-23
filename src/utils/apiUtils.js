import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getAllBills = async () => {
  return await axios.get(`${BASE_URL}/general/bills`);
};
