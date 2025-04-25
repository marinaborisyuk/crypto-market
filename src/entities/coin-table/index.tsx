import type { Coin } from "@/shared/types";
import { Pagination } from "@/features/pagination";
import { DotsLoader } from "@/shared/ui/loader";
import { CoinHead } from "./ui/CoinHead";
import { CoinRow } from "./ui/CoinRow";

interface CoinTableProps {
  coins: Coin[];
  isLoading: boolean;
  onPageChange: (page: number) => void;
  currentPage: number;
  hasNextPage: boolean;
  onSortChange: (key: keyof Coin) => void;
  sortConfig: { key: keyof Coin; direction: "asc" | "desc" };
}

const CoinTable = ({ coins, isLoading, onPageChange, currentPage, hasNextPage, onSortChange, sortConfig }: CoinTableProps) => {
  if (isLoading) {
    return <DotsLoader />
  }

  return (
    <div>
      <div className="relative rounded-lg border border-gray-200">
        <div className="max-h-[600px] overflow-y-auto">
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
        </div>
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