import type { ElementType, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { cn } from '../../lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
  /** Kašnjenje u milisekundama — za blago kaskadno otkrivanje u mrežama. */
  delay?: number;
  as?: ElementType;
};

export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={cn('reveal', shown && 'reveal-in', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
