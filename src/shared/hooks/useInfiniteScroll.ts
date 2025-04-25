import { useEffect, useCallback } from 'react';

export const useInfiniteScroll = (
  element: HTMLElement | null,
  callback: () => void,
  options = {
    threshold: 100,
  }
) => {
  const handleScroll = useCallback(() => {
    if (!element) return;

    const { scrollTop, scrollHeight, clientHeight } = element;
    const scrolledToBottom = scrollHeight - scrollTop - clientHeight < options.threshold;

    if (scrolledToBottom) {
      callback();
    }
  }, [element, callback, options.threshold]);

  useEffect(() => {
    if (!element) return;

    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, [element, handleScroll]);
};