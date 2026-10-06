import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** `true` uklanja vertikalni padding kada sekcija sama nosi svoj ritam. */
  flush?: boolean;
  labelledBy?: string;
};

export function Section({ id, children, className, flush = false, labelledBy }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(!flush && 'py-(--spacing-section)', className)}
    >
      {children}
    </section>
  );
}
