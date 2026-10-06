import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
  /** `narrow` za tekstualne blokove, `default` za pune sekcije. */
  width?: 'default' | 'narrow';
};

export function Container({ children, className, width = 'default' }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-(--spacing-gutter)',
        width === 'default' ? 'max-w-[78rem]' : 'max-w-[58rem]',
        className,
      )}
    >
      {children}
    </div>
  );
}
