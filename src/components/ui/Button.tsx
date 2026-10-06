import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'onDark' | 'ghostDark';
type Size = 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-300 ' +
  '[transition-timing-function:var(--ease-out-expo)] active:scale-[0.98] ' +
  'disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-navy-900 text-cream-50 shadow-subtle hover:bg-navy-800 hover:shadow-lifted',
  secondary:
    'border border-navy-900/15 bg-cream-50/60 text-navy-900 hover:border-navy-900/35 hover:bg-cream-50',
  onDark: 'bg-cream-50 text-navy-900 shadow-float hover:bg-white',
  ghostDark:
    'border border-cream-50/20 bg-cream-50/[0.04] text-cream-50 hover:border-cream-50/45 hover:bg-cream-50/10',
};

/** Krug sa strelicom — boja je uvijek kontrastna podlozi dugmeta. */
const arrowChip: Record<Variant, string> = {
  primary: 'bg-gold-500 text-navy-950',
  secondary: 'bg-navy-900 text-cream-50',
  onDark: 'bg-navy-900 text-gold-300',
  ghostDark: 'bg-cream-50/12 text-cream-50',
};

const sizes: Record<Size, { plain: string; arrow: string; chip: string }> = {
  md: { plain: 'px-5 py-2.5 text-[0.9375rem]', arrow: 'py-1.5 pr-1.5 pl-5 text-[0.9375rem]', chip: 'size-8' },
  lg: { plain: 'px-7 py-3.5 text-base', arrow: 'py-2 pr-2 pl-6 text-base', chip: 'size-10' },
};

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Strelica u krugu — sklizne udesno na hover. */
  withArrow?: boolean;
  arrowDirection?: 'right' | 'down';
};

type LinkProps = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ActionProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function Arrow({ direction }: { direction: 'right' | 'down' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn('size-4', direction === 'down' && 'rotate-90')}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function Button(props: LinkProps | ActionProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    withArrow = false,
    arrowDirection = 'right',
    ...rest
  } = props as Common & Record<string, unknown>;

  const classes = cn(
    base,
    variants[variant],
    withArrow ? sizes[size].arrow : sizes[size].plain,
    className,
  );

  const content = (
    <>
      <span className="relative whitespace-nowrap">{children}</span>
      {withArrow && (
        <span
          className={cn(
            'relative grid shrink-0 place-items-center overflow-hidden rounded-full',
            sizes[size].chip,
            arrowChip[variant],
          )}
        >
          {/* Dvije strelice: jedna izlazi, druga ulazi — miran „klizni" efekat. */}
          <span
            className={cn(
              'absolute transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]',
              arrowDirection === 'right' ? 'group-hover:translate-x-[180%]' : 'group-hover:translate-y-[180%]',
            )}
          >
            <Arrow direction={arrowDirection} />
          </span>
          <span
            className={cn(
              'absolute transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]',
              arrowDirection === 'right'
                ? '-translate-x-[180%] group-hover:translate-x-0'
                : '-translate-y-[180%] group-hover:translate-y-0',
            )}
          >
            <Arrow direction={arrowDirection} />
          </span>
        </span>
      )}
    </>
  );

  if (typeof rest.href === 'string') {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
