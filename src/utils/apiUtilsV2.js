import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8088";
const v2 = axios.create({ baseURL: `${BASE_URL}/v2/` });

// GET /v2/browse?knessetNum=N&cursor=LAST_ID&limit=50
export const browseBills = (knessetNum, cursor = null, limit = 50) =>
  v2.get("browse", { params: { knessetNum, cursor: cursor ?? undefined, limit } });

// GET /v2/search?knessetNum=N&q=query&cursor=LAST_ID&limit=50
export const searchBills = (knessetNum, query, cursor = null, limit = 50) =>
  v2.get("search", { params: { knessetNum, q: query, cursor: cursor ?? undefined, limit } });

export const getAllKnessetNumV2 = () => v2.get("knessetAmounts");

export const getVotesScoreV2 = (body) => v2.post("scores", body);
