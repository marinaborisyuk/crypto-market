import { useState, useCallback } from "react";
import type { SortConfig } from "@/shared/types";
import type { Coin } from "@/shared/types";

export const useSort = (initialKey: keyof Coin, initialDirection: "asc" | "desc" = "asc") => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: initialKey,
    direction: initialDirection,
  });

  const requestSort = useCallback((key: keyof Coin) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const getSortIndicator = useCallback(
    (key: keyof Coin) => {
      if (sortConfig.key !== key) return null;
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    },
    [sortConfig]
  );

  return { sortConfig, requestSort, getSortIndicator };
}; 