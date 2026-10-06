import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Accent } from '../ui/Accent';
import { LightRays } from '../ui/LightRays';
import { ReportCard } from '../ui/ReportCard';
import { depth, useParallax } from '../../hooks/useParallax';
import { hero, trustPoints } from '../../data/site';

/** Kašnjenje ulazne animacije po redoslijedu elementa. */
const rise = (step: number) => ({ animationDelay: `${120 + step * 110}ms` });

function FrameGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-10 text-gold-400/50" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="9" width="38" height="30" rx="2.5" />
      <circle cx="16.5" cy="19" r="3" />
      <path d="M5 32.5 16 23l8 7 7-5.5 12 8.5" />
    </svg>
  );
}

/**
 * Kompozicija desno od naslova: lučni okvir (vrata doma) za fotografiju,
 * zlatni prsten kao eho kruga iz logotipa, i plutajuće kartice koje pokazuju
 * šta porodica zaista dobija — izvještaj nakon posjete.
 *
 * Kartice namjerno stoje uz ivicu luka, ne preko njega: izvještaj zahvata
 * samo donji lijevi rub, a status lebdi pored zaobljenog vrha. Tako
 * fotografija ostaje vidljiva cijela, osim uskog ruba.
 */
function HeroVisual() {
  const ref = useParallax<HTMLDivElement>();

  return (
    <div ref={ref} className="relative mx-auto aspect-[5/8] w-full max-w-[50rem] sm:aspect-[20/21]">
      {/* Zlatni prsten — eho kruga iz logotipa. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-2%] bottom-[33%] rounded-t-full border border-gold-400/25 sm:top-[-3%] sm:right-[-3%] sm:bottom-[5%] sm:left-[16%]"
        style={depth(-10)}
      />

      {/* Luk za fotografiju. */}
      <div
        role="img"
        aria-label={hero.image ? hero.imageAlt : `Mjesto za fotografiju: ${hero.imageCaption}`}
        className="bg-weave absolute inset-x-[3%] top-0 bottom-[36%] overflow-hidden rounded-t-full rounded-b-[2rem] border border-cream-50/12 bg-navy-900/80 shadow-float sm:right-0 sm:bottom-[8%] sm:left-[20%]"
        style={depth(8)}
      >
        {hero.image ? (
          <>
            <img src={hero.image} alt="" loading="eager" fetchPriority="high" decoding="async" className="size-full object-cover" />
            {/* Blago utapanje u tamnu podlogu, da fotografija ne „iskače" iz heroja. */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-950/0 via-navy-950/0 to-navy-950/35" />
          </>
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 18%, rgb(201 160 74 / 0.16), transparent 70%)' }}
            />
            <span className="absolute inset-x-0 top-[34%] flex flex-col items-center gap-4 px-6 text-center">
              <FrameGlyph />
              <span className="max-w-[13rem] rounded-full border border-cream-50/12 bg-navy-950/70 px-3.5 py-1.5 text-[0.625rem] leading-relaxed tracking-[0.12em] text-cream-50/65 uppercase">
                {hero.imageCaption}
              </span>
            </span>
          </>
        )}
      </div>

      {/* Izvještaj — plutajuća kartica, zahvata samo donji lijevi rub luka. */}
      <div className="absolute bottom-0 left-0 origin-bottom-left scale-[0.8] max-[360px]:scale-[0.72] sm:scale-100 lg:left-[-3%] lg:scale-[0.84] xl:scale-100" style={depth(26)}>
        <div className="animate-rise" style={rise(5)}>
          <ReportCard className="animate-float" startDelay={1300} />
        </div>
      </div>

      {/* Dolazak — mali status, pored zaobljenog vrha luka. Na mobitelu nema mjesta. */}
      <div className="absolute top-[6%] left-0 hidden sm:block lg:left-[-3%]" style={depth(18)}>
        <div className="animate-rise" style={rise(6)}>
          <div className="flex animate-float-slow items-center gap-3 rounded-full border border-navy-900/6 bg-cream-50 py-2 pr-4 pl-2 text-navy-900 shadow-float">
            <span className="relative grid size-8 place-items-center rounded-full bg-navy-900">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-gold-500/60" />
              <span className="relative size-2 rounded-full bg-gold-400" />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.8125rem] font-medium">Njegovateljica je stigla</span>
              <span className="block text-[0.6875rem] text-ink-muted">09:00 · u dogovoreno vrijeme</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="vrh"
      aria-labelledby="hero-naslov"
      className="grain relative isolate overflow-hidden bg-navy-950 text-cream-50"
    >
      <LightRays />

      <Container className="relative pt-32 pb-28 sm:pt-36 sm:pb-32 lg:pt-44 lg:pb-40">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10">
          <div>
            <p
              className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-cream-50/12 bg-cream-50/[0.04] px-4 py-1.5 text-[0.75rem] font-medium tracking-[0.14em] text-gold-300 uppercase"
              style={rise(0)}
            >
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-gold-400" />
                <span className="relative size-1.5 rounded-full bg-gold-400" />
              </span>
              {hero.eyebrow}
            </p>

            <h1 id="hero-naslov" className="mt-7 text-display text-cream-50">
              <span className="block animate-rise" style={rise(1)}>
                {hero.titleLines[0]}
              </span>
              <span className="block animate-rise text-cream-50/92" style={rise(2)}>
                <Accent text={hero.titleLines[1]} tone="dark" />
              </span>
            </h1>

            <p className="mt-8 max-w-[50ch] animate-rise text-lead text-cream-50/72" style={rise(3)}>
              {hero.lead}
            </p>

            <div
              className="mt-10 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={rise(4)}
            >
              <Button href={hero.primaryCta.href} variant="onDark" size="lg" withArrow className="justify-between sm:justify-center">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="ghostDark" size="lg" withArrow arrowDirection="down" className="justify-between sm:justify-center">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="lg:-mr-6 xl:-mr-14">
            <HeroVisual />
          </div>
        </div>

        {/* Četiri obećanja — kao u dnu heroa, odvojena tankim linijama. */}
        <ul
          aria-label="Zašto Ruka Milosti"
          className="mt-20 grid animate-rise grid-cols-2 gap-x-6 gap-y-8 border-t border-cream-50/12 pt-8 lg:mt-24 lg:grid-cols-4 lg:gap-0"
          style={rise(7)}
        >
          {trustPoints.map((point) => (
            <li key={point.value} className="lg:border-l lg:border-cream-50/12 lg:px-8 lg:first:border-l-0 lg:first:pl-0">
              <p className="font-serif text-[1.5rem] leading-none text-cream-50 sm:text-[1.75rem]">{point.value}</p>
              <p className="mt-2.5 max-w-[28ch] text-[0.8125rem] leading-relaxed text-cream-50/60 sm:text-[0.875rem]">
                {point.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Blagi luk prema kremastoj sekciji ispod. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-px h-10 w-full text-cream-100 sm:h-16 lg:h-[5.5rem]"
        fill="currentColor"
      >
        <path d="M0 90 C 300 10, 1140 10, 1440 90 Z" />
      </svg>
    </section>
  );
}
