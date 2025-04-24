import { useState } from "react";
import type { Coin } from "@/shared/types";
import { useSort } from "@/shared/hooks/useSort";
import { Pagination } from "@/features/pagination";
import { CoinSearch } from "@/features/coin-search";
import { DotsLoader } from "@/shared/ui/loader";
import { CoinHead } from "./ui/CoinHead";
import { useFilteredAndSortedCoins } from '@/shared/hooks/useFilterAndSortedCoins';
import { CoinRow } from "./ui/CoinRow";

interface CoinTableProps {
  coins: Coin[];
  isLoading: boolean;
  onPageChange: (page: number) => void;
  currentPage: number;
  hasNextPage: boolean;
}

const CoinTable = ({ coins, isLoading, onPageChange, currentPage, hasNextPage }: CoinTableProps) => {
  const { sortConfig, requestSort, getSortIndicator } = useSort("rank");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedCoins = useFilteredAndSortedCoins(coins, sortConfig, searchQuery);

  if (isLoading) {
    return <DotsLoader />
  }

  return (
    <div>
      <div className="mb-4">
				<CoinSearch onSearch={setSearchQuery} />
      </div>
      <div className="overflow-x-auto">
        <table className="coin-table w-full border-collapse">
          <CoinHead requestSort={requestSort} getSortIndicator={getSortIndicator}/>
          <tbody>
            {sortedCoins.map((coin) => (
              <CoinRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CoinTable;