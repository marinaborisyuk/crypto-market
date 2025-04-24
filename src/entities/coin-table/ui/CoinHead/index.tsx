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
    <thead>
      <tr className="bg-gray-100">
        {COIN_TABLE_COLUMNS.map((column) => (
          <th
            key={column.key}
            className='p-3 cursor-pointer'
            onClick={() => requestSort(column.key)}
          >
            {column.label}
            {getSortIndicator(column.key)}
          </th>
        ))}
      </tr>
    </thead>
	);
}