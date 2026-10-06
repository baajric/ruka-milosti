import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { Accent } from '../ui/Accent';
import { LightRays } from '../ui/LightRays';
import { contact, ctaBanner } from '../../data/site';

/** Završni poziv — isti svjetlosni jezik kao hero, centriran i miran. */
export function CtaBanner() {
  return (
    <section aria-labelledby="cta-naslov" className="bg-cream-50 px-3 py-3 sm:px-5 sm:py-5">
      <div className="grain relative isolate overflow-hidden rounded-hero bg-navy-950 px-6 py-24 text-center text-cream-50 sm:py-32 lg:py-40">
        <LightRays origin="50% 0%" />

        {/* Znak iz logotipa na svijetloj podlozi — stvarni asset, ne rekreacija. */}
        <Container width="narrow" className="relative">
          <Reveal className="flex flex-col items-center">
            <span className="grid size-20 place-items-center rounded-full bg-cream-50 shadow-float ring-8 ring-cream-50/[0.06]">
              <img src="/brand/mark-256.webp" alt="" width={64} height={64} className="size-16 object-contain" />
            </span>

            <h2 id="cta-naslov" className="mt-10 max-w-[22ch] text-h2 text-cream-50">
              <Accent text={ctaBanner.title} tone="dark" />
            </h2>
            <p className="mt-6 max-w-[50ch] text-lead text-cream-50/70">{ctaBanner.text}</p>

            <div className="mt-11 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button href="#kontakt" variant="onDark" size="lg" withArrow className="justify-between sm:justify-center">
                {ctaBanner.cta}
              </Button>
              <Button href={contact.phoneHref} variant="ghostDark" size="lg">
                {contact.phone}
              </Button>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
