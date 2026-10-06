import { cn } from '../../lib/cn';

type Props = {
  /**
   * Kad stigne stvarna fotografija, dovoljno je proslijediti `src` — placeholder
   * nestaje sam. Do tada se prikazuje jasno označen okvir sa opisom kadra.
   */
  src?: string;
  alt?: string;
  caption: string;
  className?: string;
  /** CSS aspect-ratio, npr. '4 / 5'. */
  ratio?: string;
  rounded?: string;
  priority?: boolean;
  /** `dark` za placeholder koji stoji na navy podlozi. */
  tone?: 'light' | 'dark';
};

function FrameGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="size-10 text-gold-500/55"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="9" width="38" height="30" rx="2.5" />
      <circle cx="16.5" cy="19" r="3" />
      <path d="M5 32.5 16 23l8 7 7-5.5 12 8.5" />
    </svg>
  );
}

export function ImageFrame({
  src,
  alt,
  caption,
  className,
  ratio = '4 / 5',
  rounded = 'rounded-panel',
  priority = false,
  tone = 'light',
}: Props) {
  if (src) {
    return (
      <div className={cn('overflow-hidden bg-cream-200', rounded, className)} style={{ aspectRatio: ratio }}>
        <img
          src={src}
          alt={alt ?? caption}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          className="size-full object-cover"
        />
      </div>
    );
  }

  const dark = tone === 'dark';

  return (
    <div
      role="img"
      aria-label={`Mjesto za fotografiju: ${caption}`}
      className={cn(
        'relative flex items-end overflow-hidden border p-4 sm:p-5',
        dark
          ? 'bg-weave border-cream-50/15 bg-navy-950/60'
          : 'bg-weave-light border-navy-900/10 bg-cream-200',
        rounded,
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <span className="pointer-events-none absolute inset-0 grid place-items-center">
        <FrameGlyph />
      </span>
      <span
        className={cn(
          'relative rounded-full border px-3.5 py-1.5 text-[0.6875rem] tracking-[0.1em] uppercase',
          dark
            ? 'border-cream-50/15 bg-navy-950/70 text-cream-50/70'
            : 'border-navy-900/10 bg-cream-50/90 text-ink-muted',
        )}
      >
        {caption}
      </span>
    </div>
  );
}
