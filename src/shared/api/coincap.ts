import axios from "axios";
import type { Coin, CoinHistory } from "@/shared/types";

const api = axios.create({
  baseURL: import.meta.env.VITE_COINCAP_BASE_URL,
  params: {
    apiKey: import.meta.env.VITE_COINCAP_API_KEY
  }
});

export const getCoins = async (limit = 20, offset = 0, search = ""): Promise<{ data: Coin[]; timestamp: number }> => {
  const params: Record<string, string | number> = {
    limit,
    offset,
  };

  if (search) {
    params.search = search;
  }

  const response = await api.get("/assets", { params });
	
  return {
    data: response.data.data,
    timestamp: response.data.timestamp,
  };
};

export const getCoinById = async (id: string): Promise<Coin> => {
  const response = await api.get(`/assets/${id}`);
  return response.data.data;
};

export const getCoinHistory = async (id: string, interval = "d1"): Promise<CoinHistory[]> => {
  const response = await api.get(`/assets/${id}/history`, {
    params: { interval },
  });
  return response.data.data;
};