import { useQuery } from "@tanstack/react-query";
import { getCoins } from "@/shared/api/coincap";
import type { Coin } from "@/shared/types";
import { COINS_PER_PAGE, DEFAULT_SEARCH, REFETCH_INTERVAL } from "@/shared/constants";

interface UseCoinsQueryProps {
  page: number;
  search?: string;
}

export const useCoinsQuery = ({ page, search = DEFAULT_SEARCH }: UseCoinsQueryProps) => {
  const offset = (page - 1) * COINS_PER_PAGE;

  return useQuery<{ data: Coin[]; timestamp: number }>({
    queryKey: ["coins", page, search],
    queryFn: () => getCoins(COINS_PER_PAGE, offset, search),
    refetchInterval: REFETCH_INTERVAL,
  });
}; 