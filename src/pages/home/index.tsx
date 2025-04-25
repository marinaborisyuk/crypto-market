import { useState } from "react";
import CoinTable from "@/entities/coin-table";
import { useCoinsQuery } from "@/shared/hooks/useCoins";
import { COINS_PER_PAGE } from "@/shared/constants";
import { CoinSearch } from "@/features/coin-search";
import { useSort } from "@/shared/hooks/useSort";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: coins = [], isLoading } = useCoinsQuery({ page: currentPage, search: searchQuery });
  const { sortedData: sortedCoins, requestSort, sortConfig } = useSort(coins, "rank");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const hasNextPage = coins?.length === COINS_PER_PAGE;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Market</h1>
      <div className="mb-4">
				<CoinSearch onSearch={setSearchQuery} />
      </div>
      <CoinTable
        coins={sortedCoins}
        isLoading={isLoading}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageChange={handlePageChange}
        onSortChange={requestSort}
        sortConfig={sortConfig}
      />
    </div>
  );
};

export default HomePage;