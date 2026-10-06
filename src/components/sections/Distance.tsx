import { useEffect, useState } from 'react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { useReveal } from '../../hooks/useReveal';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { cn } from '../../lib/cn';
import { distance } from '../../data/site';

/* Jednostavna ekvirektangularna projekcija dovoljna za ovaj isječak Evrope. */
const VIEW = { w: 600, h: 440 };
const LON = { min: 7, max: 20 };
const LAT = { max: 50, min: 44 };
const project = (lon: number, lat: number) => ({
  x: 40 + ((lon - LON.min) / (LON.max - LON.min)) * (VIEW.w - 80),
  y: 40 + ((LAT.max - lat) / (LAT.max - LAT.min)) * (VIEW.h - 80),
});

const home = project(distance.home.lon, distance.home.lat);
const routes = distance.cities.map((city) => {
  const from = project(city.lon, city.lat);
  // Kontrolna tačka iznad sredine linije — svi lukovi imaju isti blagi oblik.
  const cx = (from.x + home.x) / 2 - (home.y - from.y) * 0.18;
  const cy = (from.y + home.y) / 2 - Math.hypot(home.x - from.x, home.y - from.y) * 0.32;
  return { ...city, ...from, d: `M ${from.x} ${from.y} Q ${cx} ${cy} ${home.x} ${home.y}` };
});

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Apstraktna mapa: linije od gradova gdje porodica može živjeti do Gradačca.
 * Linije se iscrtaju kad mapa uđe u ekran, a tačke putuju ka porodici —
 * kao izvještaj nakon posjete.
 */
function DistanceMap() {
  const { ref, shown } = useReveal<HTMLDivElement>('-15% 0px -15% 0px');
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className="bg-dots relative overflow-hidden rounded-panel border border-navy-900/8 bg-cream-50 shadow-lifted"
    >
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Linije od Stuttgarta, Münchena, Beča i Züricha do Gradačca"
      >
        <defs>
          <radialGradient id="home-glow">
            <stop offset="0%" stopColor="var(--color-gold-500)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-gold-500)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={home.x} cy={home.y} r="90" fill="url(#home-glow)" />

        {routes.map((route, index) => (
          <path
            key={route.name}
            d={route.d}
            pathLength={1}
            fill="none"
            stroke="var(--color-gold-500)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="1"
            strokeDashoffset={shown ? 0 : 1}
            style={{
              transition: `stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 180}ms`,
            }}
          />
        ))}

        {/* Tačke putuju iz Gradačca prema porodici. */}
        {shown &&
          !reduced &&
          routes.map((route, index) => (
            <circle key={`dot-${route.name}`} r="3.5" fill="var(--color-navy-900)">
              <animateMotion
                dur={`${3.4 + index * 0.35}s`}
                begin={`${1.6 + index * 0.4}s`}
                repeatCount="indefinite"
                path={route.d}
                keyPoints="1;0"
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          ))}

        {routes.map((route) => (
          <g key={`city-${route.name}`}>
            <circle cx={route.x} cy={route.y} r="5" fill="var(--color-cream-50)" stroke="var(--color-navy-900)" strokeWidth="1.5" />
            <text
              x={route.x}
              y={route.y - 16}
              textAnchor="middle"
              className="fill-ink-soft font-sans text-[24px] sm:text-[16px] lg:text-[14px]"
            >
              {route.name}
            </text>
          </g>
        ))}

        <g>
          {!reduced && (
            <circle cx={home.x} cy={home.y} r="10" fill="none" stroke="var(--color-gold-500)" strokeWidth="1.5">
              <animate attributeName="r" values="10;30" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
          <circle cx={home.x} cy={home.y} r="9" fill="var(--color-navy-900)" />
          <circle cx={home.x} cy={home.y} r="3.5" fill="var(--color-gold-300)" />
          <text x={home.x} y={home.y + 40} textAnchor="middle" className="fill-navy-900 font-serif text-[30px] sm:text-[22px] lg:text-[19px]">
            {distance.home.name}
          </text>
        </g>
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-navy-900/8 bg-cream-50/90 px-5 py-4 text-[0.8125rem] text-ink-muted">
        <span className="flex items-center gap-2.5">
          <span className="h-px w-6 bg-gold-500" />
          Izvještaj nakon svake posjete
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-navy-900" />
          WhatsApp · Viber · e-mail
        </span>
      </div>
    </div>
  );
}

/** Rečenica koja se „upisuje" dok se skrola — riječ po riječ. */
function ScrollStatement({ text }: { text: string }) {
  const ref = useScrollProgress<HTMLParagraphElement>({ startAt: 0.92, endAt: 0.45 });
  const words = text.split(' ');
  const splitAt = text.indexOf('.') + 1;
  let offset = 0;

  return (
    <p ref={ref} className="text-statement font-serif text-navy-900" style={{ '--p': 0 } as React.CSSProperties}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => {
          const start = offset;
          offset += word.length + 1;
          const second = start >= splitAt;
          return (
            <span
              key={index}
              className={cn('inline-block pr-[0.24em]', second && 'text-gold-600 italic')}
              style={{
                opacity: `clamp(0.14, calc(var(--p) * ${words.length + 2} - ${index}), 1)`,
                transition: 'opacity 0.2s linear',
              }}
            >
              {word}
            </span>
          );
        })}
      </span>
    </p>
  );
}

export function Distance() {
  return (
    <section aria-label={distance.eyebrow} className="bg-cream-100 pt-(--spacing-section) pb-(--spacing-section)">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{distance.eyebrow}</Eyebrow>
            </Reveal>
            <div className="mt-7">
              <ScrollStatement text={distance.statement} />
            </div>
            <Reveal delay={100}>
              <p className="mt-8 max-w-[46ch] text-lead text-ink-soft">{distance.lead}</p>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:col-span-6">
            <DistanceMap />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
