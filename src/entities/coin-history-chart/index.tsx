import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { CoinHistory } from "@/shared/types";
import { formatPrice } from "@/shared/lib/format";

interface CoinHistoryChartProps {
  history: CoinHistory[];
}

export const CoinHistoryChart = ({ history }: CoinHistoryChartProps) => {
  if (!history || history.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Price chart (last 30 days)</h2>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">Chart data is unavailable</p>
        </div>
      </div>
    );
  }

  const formattedData = history.map((item) => ({
    date: new Date(item.time).toLocaleDateString(),
    price: Number.parseFloat(item.priceUsd),
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Price chart (last 30 days)</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(value) => formatPrice(value.toString())}
              domain={["auto", "auto"]}
            />
            <Tooltip
              formatter={(value: number) => formatPrice(value.toString())}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 