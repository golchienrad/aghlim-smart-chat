import { useEffect } from 'react';

export const useTouchHover = (selector: string) => {
  useEffect(() => {
    const buttons = document.querySelectorAll(selector);
    const handleTouchStart = (e: Event) => {
      const target = e.target as HTMLElement;
      target.classList.add('touch-hover');
    };
    const handleTouchEnd = (e: Event) => {
      const target = e.target as HTMLElement;
      target.classList.remove('touch-hover');
    };

    buttons.forEach((button) => {
      button.addEventListener('touchstart', handleTouchStart);
      button.addEventListener('touchend', handleTouchEnd);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('touchstart', handleTouchStart);
        button.removeEventListener('touchend', handleTouchEnd);
      });
    };
  }, [selector]);
};