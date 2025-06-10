import { useEffect, useRef } from 'react';

export const useAutoScroll = (dependencies: any[]) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, dependencies);

  return endRef;
};