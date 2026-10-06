import { cn } from '../../lib/cn';

type Props = {
  children: string;
  tone?: 'light' | 'dark';
  /** `rule` — zlatna crta + tekst; `pill` — oznaka u tankom okviru (centrirani naslovi). */
  variant?: 'rule' | 'pill';
  className?: string;
};

/** Mala oznaka sekcije. Zlatna se koristi samo kao akcent. */
export function Eyebrow({ children, tone = 'light', variant = 'rule', className }: Props) {
  const light = tone === 'light';

  if (variant === 'pill') {
    return (
      <p
        className={cn(
          'inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5',
          'text-[0.75rem] font-medium tracking-[0.14em] uppercase',
          light
            ? 'border-navy-900/12 bg-cream-50/70 text-gold-700'
            : 'border-cream-50/15 bg-cream-50/5 text-gold-300',
          className,
        )}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-gold-500" />
        {children}
      </p>
    );
  }

  return (
    <p
      className={cn(
        'flex items-center gap-3 text-[0.8125rem] font-medium tracking-[0.14em] uppercase',
        light ? 'text-gold-700' : 'text-gold-300',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('h-px w-8 shrink-0', light ? 'bg-gold-500' : 'bg-gold-400/70')}
      />
      {children}
    </p>
  );
}
