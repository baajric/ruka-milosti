import { useRef, useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { cn } from '../../lib/cn';
import { Accent } from '../ui/Accent';
import { contact, faq, faqSection } from '../../data/site';

/**
 * Accordion sa punom podrškom za tastaturu:
 *  Enter / Space — otvara i zatvara
 *  ↑ / ↓         — prethodno / sljedeće pitanje
 *  Home / End    — prvo / posljednje pitanje
 * Visina se animira preko grid-template-rows (0fr → 1fr), bez mjerenja u JS-u.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const focusAt = (index: number) => {
    const count = faq.length;
    const next = ((index % count) + count) % count;
    buttons.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusAt(index + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusAt(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusAt(0);
        break;
      case 'End':
        event.preventDefault();
        focusAt(faq.length - 1);
        break;
    }
  };

  return (
    <Section id="pitanja" labelledBy="pitanja-naslov" className="bg-cream-50">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-36">
            <Eyebrow>{faqSection.eyebrow}</Eyebrow>
            <h2 id="pitanja-naslov" className="mt-6 max-w-[16ch] text-h2 text-navy-900">
              <Accent text={faqSection.title} />
            </h2>
            <p className="mt-6 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-muted">
              {faqSection.note}
            </p>

            <a
              href={contact.phoneHref}
              className="group mt-10 flex items-center gap-4 rounded-card border border-navy-900/10 bg-cream-100 p-4 pr-5 transition-[border-color,box-shadow] duration-300 hover:border-gold-500/40 hover:shadow-subtle"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-navy-900 text-gold-300">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 2.5h3l1.5 4-2 1.2a9 9 0 0 0 5.3 5.3l1.2-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15 15 0 0 1 3 4.1 1.5 1.5 0 0 1 4.5 2.5Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.8125rem] text-ink-muted">Niste našli odgovor? Pozovite.</span>
                <span className="block truncate font-serif text-[1.25rem] text-navy-900">{contact.phone}</span>
              </span>
              <span aria-hidden="true" className="text-gold-600 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="grid gap-3">
              {faq.map((item, index) => {
                const open = openIndex === index;
                return (
                  <div
                    key={item.q}
                    className={cn(
                      'rounded-card border px-5 transition-[background-color,border-color,box-shadow] duration-500 sm:px-7',
                      open
                        ? 'border-gold-500/30 bg-cream-100 shadow-subtle'
                        : 'border-navy-900/8 bg-cream-50 hover:border-navy-900/15',
                    )}
                  >
                    <h3>
                      <button
                        ref={(node) => {
                          buttons.current[index] = node;
                        }}
                        type="button"
                        aria-expanded={open}
                        aria-controls={`faq-panel-${index}`}
                        id={`faq-button-${index}`}
                        onClick={() => setOpenIndex(open ? null : index)}
                        onKeyDown={(event) => onKeyDown(event, index)}
                        className="group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                      >
                        <span className="font-serif text-[1.0625rem] leading-snug text-navy-900 transition-colors duration-200 group-hover:text-gold-700 sm:text-[1.1875rem]">
                          {item.q}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'relative grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,border-color,background-color,color] duration-500',
                            '[transition-timing-function:var(--ease-out-expo)]',
                            open
                              ? 'rotate-[135deg] border-navy-900 bg-navy-900 text-gold-300'
                              : 'border-navy-900/15 text-navy-900 group-hover:border-gold-500/60',
                          )}
                        >
                          <span className="absolute h-px w-3 bg-current" />
                          <span className="absolute h-3 w-px bg-current" />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                      className={cn(
                        'grid transition-[grid-template-rows,opacity] duration-500 [transition-timing-function:var(--ease-out-expo)]',
                        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[62ch] pr-8 pb-6 text-[0.9375rem] leading-[1.7] text-ink-muted sm:text-base">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
