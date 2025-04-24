import { useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import type { Coin } from "@/shared/types";
import { formatPrice, formatMarketCap, formatPercentage } from "@/shared/utils/format";
import { useSort } from "@/shared/hooks/useSort";
import { Pagination } from "@/features/pagination";
import { CoinSearch } from "@/features/coin-search";
import { DotsLoader } from "@/shared/ui/loader";
import { CoinTableHead } from "./ui/CoinTableHead";
import { useFilteredAndSortedCoins } from '../../shared/hooks/useFilterAndSortedCoins';

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
          <CoinTableHead requestSort={requestSort} getSortIndicator={getSortIndicator}/>
          <tbody>
            {sortedCoins.map((coin) => (
              <tr key={nanoid()} className="border-b hover:bg-gray-50">
                <td className="p-3">{coin.rank}</td>
                <td className="p-3">
                  <Link to={`/coins/${coin.id}`} className="flex items-center text-blue-600 hover:underline">
                    <span className="font-medium">{coin.name}</span>
                    <span className="text-gray-500 ml-2">{coin.symbol}</span>
                  </Link>
                </td>
                <td className="p-3 text-right">{formatPrice(coin.priceUsd)}</td>
                <td className="p-3 text-right">{formatMarketCap(coin.marketCapUsd)}</td>
                <td className="p-3 text-right">{formatMarketCap(coin.volumeUsd24Hr)}</td>
                <td
                  className={`p-3 text-right ${
                    Number.parseFloat(coin.changePercent24Hr) >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatPercentage(coin.changePercent24Hr)}
                </td>
              </tr>
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