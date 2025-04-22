import type { Coin } from "@/shared/types";
import { formatPrice, formatMarketCap, formatPercentage } from "@/shared/lib/format";

interface CoinDetailsProps {
  coin: Coin;
}

export const CoinDetails = ({ coin }: CoinDetailsProps) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            {coin.name}
            <span className="ml-2 text-gray-500 text-xl">{coin.symbol}</span>
          </h1>
          <p className="text-gray-600">Rank #{coin.rank}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="text-3xl font-bold">{formatPrice(coin.priceUsd)}</div>
          <div className={`text-right ${Number.parseFloat(coin.changePercent24Hr) >= 0 ? "text-green-600" : "text-red-600"}`}>
            {formatPercentage(coin.changePercent24Hr)} (24h)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Market Cap</h3>
          <p className="text-2xl font-bold">{formatMarketCap(coin.marketCapUsd)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Volume (24h)</h3>
          <p className="text-2xl font-bold">{formatMarketCap(coin.volumeUsd24Hr)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Supply</h3>
          <p className="text-2xl font-bold">
            {Number.parseFloat(coin.supply).toLocaleString()} {coin.symbol}
          </p>
          {coin.maxSupply && (
            <p className="text-gray-500">
              Max: {Number.parseFloat(coin.maxSupply).toLocaleString()} {coin.symbol}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}; 