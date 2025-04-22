export interface Coin {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface CoinHistory {
  priceUsd: string;
  time: number;
  date: string;
}

export type SortDirection = "asc" | "desc";

export interface SortConfig {
  key: keyof Coin;
  direction: SortDirection;
}