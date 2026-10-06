import { useEffect, useRef } from 'react';

/**
 * Upisuje napredak skrola kroz element (0 → 1) u CSS varijablu `--p`.
 * 0 = element tek ulazi odozdo, 1 = element je stigao do `endAt` visine ekrana.
 * Sa `through` napredak ide od ulaska vrha do izlaska dna elementa kroz `startAt`
 * liniju (za linije napretka duž liste).
 * Bez re-rendera — sve računa CSS. Uz reduced motion vrijednost je odmah 1.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>({
  startAt = 0.9,
  endAt = 0.35,
  through = false,
}: { startAt?: number; endAt?: number; through?: boolean } = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.style.setProperty('--p', '1');
      return;
    }

    let frame = 0;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * startAt;
      const end = through ? start - rect.height : vh * endAt - rect.height * 0.5;
      const progress = (start - rect.top) / (start - end);
      node.style.setProperty('--p', Math.max(0, Math.min(1, progress)).toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [startAt, endAt, through]);

  return ref;
}
