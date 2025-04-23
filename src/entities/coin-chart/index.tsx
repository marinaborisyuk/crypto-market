import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { CoinHistory } from "@/shared/types";
import { formatPrice } from "@/shared/utils/format";

interface CoinChartProps {
  data: CoinHistory[];
  isLoading: boolean;
}

const CoinChart = ({ data, isLoading }: CoinChartProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Chart data is unavailable</p>
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    time: new Date(item.time).toLocaleDateString(),
    price: Number.parseFloat(item.priceUsd),
  }));

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={(time) => time} />
          <YAxis domain={["auto", "auto"]} tickFormatter={(value) => formatPrice(value).replace("$", "")} />
          <Tooltip
            formatter={(value: number) => [formatPrice(value), "Price"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoinChart;