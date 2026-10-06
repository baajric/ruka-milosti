import { cn } from '../../lib/cn';
import { Accent } from './Accent';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

type Props = {
  eyebrow: string;
  title: string;
  /** Kratka napomena — desno od naslova, ili ispod kad je naslov centriran. */
  note?: string;
  tone?: 'light' | 'dark';
  align?: 'split' | 'center';
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  note,
  tone = 'light',
  align = 'split',
  className,
  id,
}: Props) {
  const centered = align === 'center';

  return (
    <Reveal
      className={cn(
        centered
          ? 'mx-auto flex max-w-3xl flex-col items-center text-center'
          : 'flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16',
        className,
      )}
    >
      <div className={cn(centered ? 'flex flex-col items-center' : 'max-w-[40ch]')}>
        <Eyebrow tone={tone} variant={centered ? 'pill' : 'rule'}>
          {eyebrow}
        </Eyebrow>
        <h2
          id={id}
          className={cn('mt-6 text-h2', tone === 'light' ? 'text-navy-900' : 'text-cream-50')}
        >
          <Accent text={title} tone={tone} />
        </h2>
      </div>

      {note && (
        <p
          className={cn(
            'text-[0.9375rem] leading-relaxed',
            centered ? 'mt-6 max-w-[52ch]' : 'max-w-[34ch] lg:pb-2',
            tone === 'light' ? 'text-ink-muted' : 'text-cream-50/70',
          )}
        >
          {note}
        </p>
      )}
    </Reveal>
  );
}
