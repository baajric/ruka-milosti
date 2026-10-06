import { useEffect, useRef, useState } from 'react';

/**
 * Otkriva element kad uđe u vidno polje — jednom, pa se posmatranje prekida.
 * Ako korisnik traži manje animacija, element je odmah vidljiv.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(rootMargin = '-10% 0px -5% 0px') {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, shown };
}
