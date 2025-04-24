import { ReactNode } from "react";
import { formatPrice, formatMarketCap, formatPercentage } from "@/shared/utils/format";

interface CoinCellProps {
  value?: string | number;
  formatType?: 'price' | 'marketCap' | 'percentage' | 'default';
  className?: string;
  children?: ReactNode;
}

export const CoinCell = ({ value, formatType = 'default', className, children }: CoinCellProps) => {
  const getFormattedValue = () => {
    if (children) return children;
    if (value === undefined) return null;

    switch (formatType) {
      case 'price': 
        return formatPrice(value.toString());
      case 'marketCap':
        return formatMarketCap(value.toString());
      case 'percentage':
        return formatPercentage(value.toString());
      default:
        return value;
    }
  };

  return (
    <td className={`p-3 text-center ${className}`}>
      {getFormattedValue()}
    </td>
  );
};