import { useState, useMemo } from "react";

export const useSort = <T>(data: T[], defaultKey: keyof T) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" }>({
    key: defaultKey,
    direction: "asc",
  });

  const sortedData = useMemo(() => {
    if (!data) return [];
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      const aNumber = typeof aValue === "string" && !isNaN(Number(aValue)) ? Number(aValue) : aValue;
      const bNumber = typeof bValue === "string" && !isNaN(Number(bValue)) ? Number(bValue) : bValue;

      if (aNumber < bNumber) return sortConfig.direction === "asc" ? -1 : 1;
      if (aNumber > bNumber) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return { sortedData, requestSort, sortConfig };
};