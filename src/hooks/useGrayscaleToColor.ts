/**
 * useGrayscaleToColor Hook
 * 
 * Applies grayscale filter to images by default, then transitions to full color
 * when the element scrolls into view using CSS classes.
 */

import { useRef, useEffect } from 'react';

export function useGrayscaleToColor() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('visible');
          observer.unobserve(element);
        }
      },
      {
        rootMargin: '100px',
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return ref;
}

export default useGrayscaleToColor;
