import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { Accent } from '../ui/Accent';
import { ImageFrame } from '../ui/ImageFrame';
import { about, site } from '../../data/site';

export function About() {
  const [first, second, closing] = about.paragraphs;

  return (
    <Section id="o-nama" labelledBy="o-nama-naslov" className="bg-cream-50">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Portret u luku + slogan iz logotipa. */}
          {/* Kartica sa sloganom visi preko donjeg desnog ruba, ispod okvira —
              portret ostaje slobodan. `pb` rezerviše mjesto za dio koji viri. */}
          <Reveal className="relative mx-auto w-full max-w-[26rem] pb-20 lg:col-span-5 lg:max-w-none">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-t-full rounded-b-[2.25rem] border border-gold-500/30 sm:-inset-4"
              />
              <ImageFrame
                src={about.image ?? undefined}
                alt={about.imageAlt}
                caption={about.imageCaption}
                ratio="4 / 5"
                rounded="rounded-t-full rounded-b-[1.75rem]"
                className={about.image ? 'relative' : 'relative items-start! justify-center pt-[24%]!'}
              />
            </div>

            <figure className="absolute -right-2 bottom-0 w-[15.5rem] animate-float-slow rounded-card bg-navy-900 p-5 text-cream-50 shadow-float sm:-right-10 sm:w-[17rem] lg:-right-14">
              <svg aria-hidden="true" viewBox="0 0 16 14" className="size-4 text-gold-400">
                <path
                  fill="currentColor"
                  d="M8 13.2 6.9 12.2C3 8.7.5 6.4.5 3.7.5 1.6 2.1 0 4.2 0 5.4 0 6.5.6 7.2 1.4L8 2.3l.8-.9C9.5.6 10.6 0 11.8 0c2.1 0 3.7 1.6 3.7 3.7 0 2.7-2.5 5-6.4 8.5L8 13.2Z"
                />
              </svg>
              <blockquote className="mt-3 font-serif text-[1.375rem] leading-snug italic">
                {site.tagline}
              </blockquote>
              <figcaption className="mt-3 text-[0.75rem] tracking-[0.1em] text-cream-50/55 uppercase">
                {site.name} · Gradačac
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7 lg:pl-4">
            <Reveal>
              <Eyebrow>{about.eyebrow}</Eyebrow>
              <h2 id="o-nama-naslov" className="mt-6 max-w-[18ch] text-h2 text-navy-900">
                <Accent text={about.title} />
              </h2>
            </Reveal>

            <Reveal delay={100} className="mt-9 max-w-[58ch] space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
              <p className="text-[1.1875rem] leading-[1.65] text-navy-900">{first}</p>
              <p>{second}</p>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-10 max-w-[30ch] border-t border-navy-900/10 pt-8 font-serif text-[1.5rem] leading-snug text-navy-900 sm:text-[1.75rem]">
                {closing}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
