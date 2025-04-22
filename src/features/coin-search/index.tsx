import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { DEBOUNCE_DELAY } from "@/shared/constants";

interface CoinSearchProps {
  onSearch: (query: string) => void;
}

const CoinSearch = ({ onSearch }: CoinSearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleSearch = (value: string) => {
    if (value) {
      setSearchParams({ search: value });
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
    onSearch(value);
  };

  useDebounce(query, DEBOUNCE_DELAY, handleSearch);

  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default CoinSearch;