import { useRef, useCallback } from 'react';
import type { Coin } from "@/shared/types";
import { DotsLoader } from "@/shared/ui/loader";
import { CoinHead } from "./ui/CoinHead";
import { CoinRow } from "./ui/CoinRow";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";

interface CoinTableProps {
  coins: Coin[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasNextPage: boolean;
  onSortChange: (key: keyof Coin) => void;
  sortConfig: { key: keyof Coin; direction: "asc" | "desc" };
}

const CoinTable = ({ 
  coins, 
  isLoading, 
  onLoadMore, 
  hasNextPage, 
  onSortChange, 
  sortConfig 
}: CoinTableProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasNextPage) {
      onLoadMore();
    }
  }, [isLoading, hasNextPage, onLoadMore]);

  useInfiniteScroll(scrollContainerRef.current, handleLoadMore);

  return (
    <div className="relative rounded-lg border border-gray-200">
      <div 
        ref={scrollContainerRef}
        className="max-h-[550px] overflow-y-auto"
      >
        <table className="w-full">
            <CoinHead
              requestSort={onSortChange}
              getSortIndicator={(key) =>
                sortConfig.key === key ? (sortConfig.direction === "asc" ? "↑" : "↓") : null
              }
            />
          <tbody className="divide-y divide-gray-200 bg-white">
            {coins.map((coin) => (
              <CoinRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="p-4 flex justify-center">
            <DotsLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinTable;