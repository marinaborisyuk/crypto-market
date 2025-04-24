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
      <div className="overflow-x-auto">
        <table className="coin-table w-full border-collapse">
          <CoinHead
            requestSort={onSortChange}
            getSortIndicator={(key) =>
              sortConfig.key === key ? (sortConfig.direction === "asc" ? "↑" : "↓") : null
            }
          />
          <tbody>
            {coins.map((coin) => (
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