import { cn } from '../../lib/cn';
import { sampleReport } from '../../data/site';

function CheckDot() {
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-700">
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3.5 8.5 3 3 6-7" />
      </svg>
    </span>
  );
}

/**
 * Ilustracija izvještaja koji porodica dobija nakon posjete — ono što je
 * srž usluge, prikazano umjesto izmišljene fotografije. Jasno označeno
 * kao primjer. `animated` otkriva stavke jednu po jednu.
 */
export function ReportCard({
  className,
  animated = true,
  startDelay = 900,
  fluid = false,
}: {
  className?: string;
  animated?: boolean;
  startDelay?: number;
  /** Puna širina roditelja (do 19rem) umjesto fiksne — za uske kolone. */
  fluid?: boolean;
}) {
  const r = sampleReport;
  const tick = (index: number) =>
    animated ? { className: 'animate-tick', style: { animationDelay: `${startDelay + index * 280}ms` } } : {};

  return (
    <figure
      className={cn(
        'rounded-[1.375rem] border border-navy-900/6 bg-cream-50 p-4 text-navy-900 shadow-float sm:p-5',
        fluid ? 'w-full max-w-[19rem]' : 'w-[17rem] sm:w-[19rem]',
        className,
      )}
      aria-label={`${r.label} — ${r.title}`}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-navy-900/8 bg-cream-100">
          <img src="/brand/mark-128.webp" alt="" width={32} height={32} className="size-8 object-contain" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.9375rem] leading-snug font-medium">{r.title}</p>
          <p className="mt-1 flex items-center gap-2 text-[0.75rem] text-ink-muted">
            {r.time}
            <span className="rounded-full bg-gold-500/12 px-2 py-px text-[0.5625rem] font-medium tracking-[0.1em] text-gold-700 uppercase">
              {r.label}
            </span>
          </p>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 rounded-xl bg-cream-100 px-3 py-2 text-[0.75rem] text-ink-soft">
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 shrink-0 text-gold-600" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="8" cy="8" r="6.2" />
          <path d="M8 4.8V8l2.2 1.4" />
        </svg>
        {r.window}
      </p>

      <ul className="mt-4 grid gap-2.5">
        {r.items.map((item, index) => {
          const t = tick(index);
          return (
            <li key={item} className={cn('flex items-center gap-2.5 text-[0.875rem]', t.className)} style={t.style}>
              <CheckDot />
              {item}
            </li>
          );
        })}
      </ul>

      <blockquote
        className={cn(
          'mt-4 border-l-2 border-gold-500 pl-3 font-serif text-[1rem] leading-snug text-navy-900 italic',
          tick(r.items.length).className,
        )}
        style={tick(r.items.length).style}
      >
        „{r.note}“
      </blockquote>

      <figcaption className="mt-4 flex items-center justify-between border-t border-navy-900/8 pt-3 text-[0.75rem] text-ink-muted">
        {r.channel}
        <svg aria-hidden="true" viewBox="0 0 20 12" className="h-3 w-5 text-gold-600" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m1 6.5 3.2 3.2L11 2.5M8.5 9.2l.5.5L16.5 2.5" />
        </svg>
      </figcaption>
    </figure>
  );
}
