import { Coin } from "@/shared/types";
import { ReactNode } from "react";

interface CoinHeadProps {
  requestSort: (key: keyof Coin) => void;
  getSortIndicator: (key: keyof Coin) => ReactNode;
}

interface Column {
  key: keyof Coin;
  label: string;
}

const COIN_TABLE_COLUMNS: Column[] = [
  { key: "rank", label: "Rank" },
  { key: "name", label: "Name" },
  { key: "priceUsd", label: "Price" },
  { key: "marketCapUsd", label: "Market Cap" },
  { key: "volumeUsd24Hr", label: "Volume (24h)" },
  { key: "changePercent24Hr", label: "Change (24h)" },
];

export const CoinHead = ({ requestSort, getSortIndicator }: CoinHeadProps) => {
	return (
    <thead className="sticky top-0 bg-gray-100 shadow-sm">
      <tr>
      {COIN_TABLE_COLUMNS.map((column) => (
        <th
          key={column.key}
          className="p-4 font-semibold text-left cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={() => requestSort(column.key)}
        >
          <div className="flex items-center space-x-1">
            <span>{column.label}</span>
            <span>{getSortIndicator(column.key)}</span>
          </div>
        </th>
      ))}
    </tr>
    </thead>
	);
}