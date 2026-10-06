import { useEffect, useRef, useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { Accent } from '../ui/Accent';
import { Button } from '../ui/Button';
import { ReportCard } from '../ui/ReportCard';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { cn } from '../../lib/cn';
import { howItWorks, steps } from '../../data/site';

/**
 * Lijeva kolona je „zaljepljena" dok se koraci skrolaju desno. Zlatna linija
 * raste sa skrolom, a korak na sredini ekrana postaje aktivan.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const items = useRef<Array<HTMLLIElement | null>>([]);
  const listRef = useScrollProgress<HTMLOListElement>({ startAt: 0.55, through: true });

  // Aktivan je posljednji korak čiji je vrh prešao sredinu ekrana.
  // Računa se iz pozicije, pa je tačan i nakon skoka na sidro.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const line = window.innerHeight * 0.55;
      let next = 0;
      items.current.forEach((node, index) => {
        if (node && node.getBoundingClientRect().top < line) next = index;
      });
      setActive(next);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Section id="kako" labelledBy="kako-naslov" className="bg-cream-100">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <Reveal className="lg:sticky lg:top-36">
              <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
              <h2 id="kako-naslov" className="mt-6 max-w-[16ch] text-h2 text-navy-900">
                <Accent text={howItWorks.title} />
              </h2>
              <p className="mt-6 max-w-[40ch] text-[1rem] leading-relaxed text-ink-muted">{howItWorks.note}</p>

              {/* Veliki broj aktivnog koraka — samo na desktopu, gdje je kolona zaljepljena. */}
              <div aria-hidden="true" className="mt-12 hidden items-end gap-3 lg:flex">
                <span className="relative block h-[6.5rem] w-[7.5rem] overflow-hidden font-serif text-[6.5rem] leading-none text-gold-500">
                  {steps.map((step, index) => (
                    <span
                      key={step.number}
                      className="absolute inset-0 transition-[transform,opacity] duration-700 [transition-timing-function:var(--ease-out-expo)]"
                      style={{
                        transform: `translateY(${(index - active) * 100}%)`,
                        opacity: index === active ? 1 : 0,
                      }}
                    >
                      {step.number}
                    </span>
                  ))}
                </span>
                <span className="pb-3 text-[0.875rem] tracking-[0.12em] text-ink-muted uppercase">
                  / 0{steps.length}
                </span>
              </div>

              <div className="mt-10">
                <Button href="#kontakt" withArrow>
                  Zatražite razgovor
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <ol ref={listRef} className="relative" style={{ '--p': 0 } as React.CSSProperties}>
              {/* Staza i zlatna linija napretka. */}
              <span aria-hidden="true" className="absolute top-6 bottom-6 left-[1.375rem] w-px bg-navy-900/12" />
              <span
                aria-hidden="true"
                className="absolute top-6 left-[1.375rem] w-px origin-top bg-gold-500"
                style={{ height: 'calc((100% - 3rem) * var(--p))' }}
              />

              {steps.map((step, index) => {
                const isActive = index === active;
                const isDone = index < active;
                const isLast = index === steps.length - 1;
                return (
                  <li
                    key={step.number}
                    ref={(node) => {
                      items.current[index] = node;
                    }}
                    className="relative pb-8 pl-14 last:pb-0 sm:pl-20"
                  >
                    <span
                      className={cn(
                        'absolute top-0 left-0 grid size-11 place-items-center rounded-full border font-serif text-[1rem] transition-colors duration-500',
                        isActive
                          ? 'border-navy-900 bg-navy-900 text-gold-300'
                          : isDone
                            ? 'border-gold-500 bg-cream-50 text-gold-700'
                            : 'border-navy-900/15 bg-cream-100 text-ink-muted',
                      )}
                    >
                      {step.number}
                    </span>

                    <div
                      className={cn(
                        'rounded-panel border p-5 transition-[background-color,border-color,box-shadow,transform] duration-500 sm:p-8',
                        '[transition-timing-function:var(--ease-out-expo)]',
                        isActive
                          ? 'border-gold-500/35 bg-cream-50 shadow-lifted lg:-translate-y-1'
                          : 'border-navy-900/8 bg-cream-50/50',
                      )}
                    >
                      <h3 className="text-h3 text-navy-900">{step.title}</h3>
                      <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-muted sm:text-base">
                        {step.text}
                      </p>

                      {isLast && (
                        <div className="mt-8 flex justify-center rounded-card bg-navy-900 bg-weave px-3 py-7 sm:justify-start sm:px-8 sm:py-8">
                          <ReportCard animated={false} fluid className="-rotate-1" />
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
