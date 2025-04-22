import { useState } from "react";
import CoinTable from "@/entities/coin-table";
import { useCoinsQuery } from "@/shared/hooks/useCoins";
import { COINS_PER_PAGE } from "@/shared/constants";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useCoinsQuery({ page: currentPage });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const hasNextPage = data?.data.length === COINS_PER_PAGE;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Market</h1>
      <CoinTable
        coins={data?.data || []}
        isLoading={isLoading}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;