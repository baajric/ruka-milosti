import { Fragment } from 'react';
import { cn } from '../../lib/cn';
import { tightenDashes } from '../../lib/typography';

/**
 * Prikazuje naslov u kojem je dio između *zvjezdica* naglašen italic serifom
 * u zlatnoj — isti potez kroz cijelu stranicu. Crte se vežu za prethodnu riječ.
 */
export function Accent({ text, tone = 'light' }: { text: string; tone?: 'light' | 'dark' }) {
  const parts = tightenDashes(text).split(/\*(.+?)\*/g);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <em
            key={index}
            className={cn(
              'font-serif italic',
              tone === 'light' ? 'text-gold-600' : 'text-gold-300',
            )}
          >
            {part}
          </em>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
