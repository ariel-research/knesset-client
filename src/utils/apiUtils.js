import axios from "axios";

const BASE_URL = "http://csariel.xyz:8080/";

export const getAllBills = async () => {
  return await axios.get(`${BASE_URL}general/bills`);
};

export const getAllKnessetNum = async () => {
  return await axios.get(`${BASE_URL}general/knessetAmounts`);
};

export const getBillsOfKnesset = async (knesset_num) => {
  return await axios.get(
    `${BASE_URL}general/billsByKnessetNum?knessetNum=${knesset_num}`
  );
};

export const getVotesScore = async (body) => {
  return await axios.post(` ${BASE_URL}general/scores`, body);
};
