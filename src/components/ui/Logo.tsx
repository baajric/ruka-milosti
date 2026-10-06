import { cn } from '../../lib/cn';
import { site } from '../../data/site';

/**
 * Brand lockup: originalni znak iz logotipa (slika) + ime postavljeno tekstom.
 * Znak se NIKAD ne rekreira CSS-om — uvijek je stvarni asset iz `public/brand/`.
 * Znak je tamnoplav, pa na navy podlozi stoji na svijetlom krugu.
 * Kad dobijemo SVG verziju, mijenja se samo `<source>` / `src` ispod.
 */
export function Logo({
  className,
  tone = 'light',
  showTagline = false,
  compact = false,
}: {
  className?: string;
  tone?: 'light' | 'dark';
  showTagline?: boolean;
  /** Manja varijanta za navbar. */
  compact?: boolean;
}) {
  const dark = tone === 'dark';

  return (
    <span className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'grid shrink-0 place-items-center rounded-full transition-colors duration-500',
          compact ? 'size-10' : 'size-12',
          dark ? 'bg-cream-50 shadow-subtle' : 'bg-transparent',
        )}
      >
        <picture className="contents">
          <source srcSet="/brand/mark-128.webp 1x, /brand/mark-256.webp 2x" type="image/webp" />
          <img
            src="/brand/mark-128.png"
            srcSet="/brand/mark-128.png 1x, /brand/mark-256.png 2x"
            width={48}
            height={48}
            alt="Znak Ruke Milosti — kuća, ruke i srce"
            className={cn('object-contain', compact ? 'size-9' : 'size-11')}
            decoding="async"
          />
        </picture>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-serif tracking-[-0.01em] transition-colors duration-500',
            compact ? 'text-[1.25rem]' : 'text-[1.5rem]',
            dark ? 'text-cream-50' : 'text-navy-900',
          )}
        >
          {site.name}
        </span>
        {showTagline && (
          <span
            className={cn(
              'mt-1.5 text-[0.6875rem] tracking-[0.12em] uppercase',
              dark ? 'text-gold-300' : 'text-gold-700',
            )}
          >
            {site.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
