import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import type { Coin } from "@/shared/types";
import { formatPrice, formatMarketCap, formatPercentage } from "@/shared/lib/format";
import { useSort } from "@/shared/hooks/useSort";
import { sortCoins } from "@/shared/utils/sort";
import { Pagination } from "@/features/pagination";

interface CoinTableProps {
  coins: Coin[];
  isLoading: boolean;
  onPageChange: (page: number) => void;
  currentPage: number;
  hasNextPage: boolean;
}

const CoinTable = ({ coins, isLoading, onPageChange, currentPage, hasNextPage }: CoinTableProps) => {
  const { sortConfig, requestSort, getSortIndicator } = useSort("rank");
  const [sortedCoins, setSortedCoins] = useState<Coin[]>(coins);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredCoins = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortedCoins(sortCoins(filteredCoins, sortConfig));
  }, [coins, sortConfig, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="coin-table w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left" onClick={() => requestSort("rank")}>
                Rank{getSortIndicator("rank")}
              </th>
              <th className="p-3 text-left" onClick={() => requestSort("name")}>
                Name{getSortIndicator("name")}
              </th>
              <th className="p-3 text-right" onClick={() => requestSort("priceUsd")}>
                Price{getSortIndicator("priceUsd")}
              </th>
              <th className="p-3 text-right" onClick={() => requestSort("marketCapUsd")}>
                Market Cap{getSortIndicator("marketCapUsd")}
              </th>
              <th className="p-3 text-right" onClick={() => requestSort("volumeUsd24Hr")}>
                Volume (24h){getSortIndicator("volumeUsd24Hr")}
              </th>
              <th className="p-3 text-right" onClick={() => requestSort("changePercent24Hr")}>
                Change (24h){getSortIndicator("changePercent24Hr")}
              </th>
            </tr>
          </thead>
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