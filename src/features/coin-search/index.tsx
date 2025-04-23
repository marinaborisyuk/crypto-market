import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { DEBOUNCE_DELAY } from "@/shared/constants";
import SearchIcon from "@/shared/assets/icons/search.svg?react";

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
        <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"/>
      </div>
    </div>
  );
};

export default CoinSearch;