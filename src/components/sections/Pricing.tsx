import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import { packages, pricing, pricingNote } from '../../data/site';

function Check({ featured }: { featured: boolean }) {
  return (
    <span
      className={cn(
        'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full',
        featured ? 'bg-gold-400/15 text-gold-300' : 'bg-gold-500/12 text-gold-700',
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3.5 8.5 3 3 6-7" />
      </svg>
    </span>
  );
}

export function Pricing() {
  return (
    <Section id="paketi" labelledBy="paketi-naslov" className="bg-cream-50">
      <Container>
        <SectionHeading
          id="paketi-naslov"
          align="center"
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          note={pricing.note}
        />

        <div className="mt-16 grid items-stretch gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-5">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 110} className="h-full">
              <article
                className={cn(
                  'group relative isolate flex h-full flex-col overflow-hidden rounded-panel p-6 sm:p-9',
                  'transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-out-expo)]',
                  pkg.featured
                    ? 'grain bg-navy-950 text-cream-50 shadow-float ring-1 ring-gold-500/40 lg:-my-5 lg:py-12'
                    : 'border border-navy-900/10 bg-cream-100 shadow-subtle hover:-translate-y-1.5 hover:shadow-lifted',
                )}
              >
                {pkg.featured && (
                  <div
                    aria-hidden="true"
                    className="absolute -top-40 left-1/2 -z-10 size-[28rem] -translate-x-1/2 rounded-full opacity-35 blur-3xl"
                    style={{ background: 'radial-gradient(circle, var(--color-gold-500), transparent 62%)' }}
                  />
                )}

                {pkg.badge && (
                  <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-3 py-1 text-[0.6875rem] font-medium tracking-[0.12em] text-gold-300 uppercase">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-gold-400" />
                    {pkg.badge}
                  </p>
                )}
                <div>
                  <h3
                    className={cn(
                      'font-serif text-[1.75rem] leading-tight',
                      pkg.featured ? 'text-cream-50' : 'text-navy-900',
                    )}
                  >
                    {pkg.name}
                  </h3>
                </div>
                <p className={cn('mt-2 text-[0.9375rem]', pkg.featured ? 'text-cream-50/65' : 'text-ink-muted')}>
                  {pkg.summary}
                </p>

                <p
                  className={cn(
                    'mt-8 flex items-baseline gap-2 border-b pb-8',
                    pkg.featured ? 'border-cream-50/12' : 'border-navy-900/10',
                  )}
                >
                  <span
                    className={cn(
                      'font-serif text-[3.5rem] leading-none tracking-[-0.03em]',
                      pkg.featured ? 'text-gold-300' : 'text-navy-900',
                    )}
                  >
                    {pkg.price}
                  </span>
                  <span className={cn('text-[0.9375rem]', pkg.featured ? 'text-cream-50/60' : 'text-ink-muted')}>
                    {pkg.unit}
                  </span>
                </p>

                <ul
                  className={cn(
                    'mt-8 grid gap-4 text-[0.9375rem] leading-relaxed',
                    pkg.featured ? 'text-cream-50/85' : 'text-ink-soft',
                  )}
                >
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check featured={pkg.featured} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <Button
                    href="#kontakt"
                    variant={pkg.featured ? 'onDark' : 'secondary'}
                    withArrow
                    className="w-full justify-between"
                  >
                    Zatražite ovaj paket
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-start gap-5 rounded-panel border border-dashed border-navy-900/15 px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:mt-14">
          <p className="max-w-[58ch] text-[1rem] leading-relaxed text-ink-soft">{pricingNote.text}</p>
          <Button href="#kontakt" variant="secondary" className="shrink-0" withArrow>
            {pricingNote.cta}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
