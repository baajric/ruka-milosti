import { useEffect, useRef } from 'react';

/**
 * Postavlja CSS varijable `--px` i `--py` (od -0.5 do 0.5) prema poziciji
 * miša u odnosu na element. Djeca ih koriste za blagi parallax preko CSS
 * `translate` svojstva, pa se ne sudaraju sa `transform` animacijama.
 * Isključeno na dodirnim ekranima i uz `prefers-reduced-motion`.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reduced || !finePointer) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const y = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--px', Math.max(-0.5, Math.min(0.5, x)).toFixed(3));
        root.style.setProperty('--py', Math.max(-0.5, Math.min(0.5, y)).toFixed(3));
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

/** Stil za dijete parallax elementa — `depth` u pikselima. */
export function depth(px: number): React.CSSProperties {
  return {
    translate: `calc(var(--px, 0) * ${px}px) calc(var(--py, 0) * ${px}px)`,
    transition: 'translate 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  };
}
