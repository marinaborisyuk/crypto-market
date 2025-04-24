import { useState, useEffect } from "react";
import { sortCoins } from "@/shared/utils/sort";
import type { Coin, SortConfig } from "@/shared/types";

export const useFilteredAndSortedCoins = (coins: Coin[], sortConfig: SortConfig, searchQuery: string) => {
  const [filteredAndSortedCoins, setFilteredAndSortedCoins] = useState<Coin[]>(coins);

  useEffect(() => {
    const filteredCoins = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAndSortedCoins(sortCoins(filteredCoins, sortConfig));
  }, [coins, sortConfig, searchQuery]);

  return filteredAndSortedCoins;
};