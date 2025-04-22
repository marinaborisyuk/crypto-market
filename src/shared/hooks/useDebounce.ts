import { useEffect } from "react";

export const useDebounce = <T>(value: T, delay: number, callback: (value: T) => void) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, callback]);
}; 