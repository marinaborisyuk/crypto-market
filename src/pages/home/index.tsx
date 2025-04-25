import { useEffect, useState } from "react";
import CoinTable from "@/entities/coin-table";
import { useCoinsQuery } from "@/shared/hooks/useCoins";
import { COINS_PER_PAGE } from "@/shared/constants";
import { CoinSearch } from "@/features/coin-search";
import { useSort } from "@/shared/hooks/useSort";
import { Coin } from "@/shared/types";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [allCoins, setAllCoins] = useState<Coin[]>([]);

  const { data: coins = [], isLoading } = useCoinsQuery({ 
    page: currentPage, 
    search: searchQuery 
  });

  const { sortedData: sortedCoins, requestSort, sortConfig } = useSort(allCoins, "rank");

  useEffect(() => {
    if (coins.length > 0) {
      if (currentPage === 1) {
        setAllCoins(coins);
      } else {
        setAllCoins(prev => [...prev, ...coins]);
      }
    }
  }, [coins, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setAllCoins([]);
  }, [searchQuery]);

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const hasNextPage = coins?.length === COINS_PER_PAGE;

  return (
    <div className="container mx-auto px-4 py-5">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Market</h1>
      <div className="mb-4">
        <CoinSearch onSearch={setSearchQuery} />
      </div>
      <CoinTable
        coins={sortedCoins}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        onLoadMore={handleLoadMore}
        onSortChange={requestSort}
        sortConfig={sortConfig}
      />
    </div>
  );
};

export default HomePage;