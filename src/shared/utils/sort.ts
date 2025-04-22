import type { Coin, SortConfig } from "@/shared/types";

export const sortCoins = (coins: Coin[], sortConfig: SortConfig): Coin[] => {
  return [...coins].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === null) return 1;
    if (bValue === null) return -1;

    const aNum = Number.parseFloat(aValue);
    const bNum = Number.parseFloat(bValue);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    return 0;
  });
}; 