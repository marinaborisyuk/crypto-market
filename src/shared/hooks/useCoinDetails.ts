import { useQuery } from "@tanstack/react-query";
import { getCoinById, getCoinHistory } from "@/shared/api/coincap";
import type { Coin, CoinHistory } from "@/shared/types";

export const useCoinDetailsQuery = (id: string) => {
  return useQuery<Coin>({
    queryKey: ["coin", id],
    queryFn: () => getCoinById(id),
  });
};

export const useCoinHistoryQuery = (id: string) => {
  return useQuery<CoinHistory[]>({
    queryKey: ["coinHistory", id],
    queryFn: () => getCoinHistory(id),
  });
}; 