import { useParams } from "react-router-dom";
import { useCoinDetailsQuery, useCoinHistoryQuery } from "@/shared/hooks/useCoinDetails";
import { CoinDetails } from "@/entities/coin-details";
import { CoinHistoryChart } from "@/entities/coin-history-chart";

const CoinDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: coin, isLoading: isLoadingCoin } = useCoinDetailsQuery(id || "");
  const { data: history, isLoading: isLoadingHistory } = useCoinHistoryQuery(id || "");

  if (isLoadingCoin || isLoadingHistory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {coin && <CoinDetails coin={coin} />}
      {history && <CoinHistoryChart history={history} />}
    </div>
  );
};

export default CoinDetailsPage;