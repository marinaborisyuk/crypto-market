import { Link } from "react-router-dom";
import { Coin } from "@/shared/types";
import { CoinCell } from '../CoinCell';

interface CoinRowProps {
  coin: Coin;
}

export const CoinRow = ({ coin }: CoinRowProps) => (
  <tr className="border-b hover:bg-gray-50">
    <CoinCell value={coin.rank} />
    <CoinCell>
      <Link to={`/coins/${coin.id}`} className="flex items-center text-blue-600 hover:underline">
        <span className="font-medium">{coin.name}</span>
        <span className="text-gray-500 ml-2">{coin.symbol}</span>
      </Link>
    </CoinCell>
    <CoinCell 
      value={coin.priceUsd}
      formatType="price"
    />
    <CoinCell
      value={coin.marketCapUsd}
      formatType="marketCap"
    />
    <CoinCell
      value={coin.volumeUsd24Hr}
      formatType="marketCap"
    />
    <CoinCell
      value={coin.changePercent24Hr}
      formatType="percentage"
      className={Number.parseFloat(coin.changePercent24Hr) >= 0 ? 
        "text-green-600" : "text-red-600"}
    />
  </tr>
);
