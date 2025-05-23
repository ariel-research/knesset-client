import axios from "axios";

//const BASE_URL = "https://csariel.xyz:8080/";
const BASE_URL = "https://knesset.csariel.xyz/general/";

export const getAllBills = async () => {
  return await axios.get(`${BASE_URL}bills`);
};

export const getAllKnessetNum = async () => {
  return await axios.get(`${BASE_URL}knessetAmounts`);
};

export const getBillsOfKnesset = async (knesset_num) => {
  return await axios.get(
    `${BASE_URL}billsByKnessetNum?knessetNum=${knesset_num}`
  );
};

export const getVotesScore = async (body) => {
  return await axios.post(` ${BASE_URL}scores`, body);
};
