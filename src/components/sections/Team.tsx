import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { ImageFrame } from '../ui/ImageFrame';
import { team, teamCta, teamSection } from '../../data/site';

export function Team() {
  return (
    <Section id="tim" labelledBy="tim-naslov" className="bg-cream-100">
      <Container>
        <SectionHeading
          id="tim-naslov"
          eyebrow={teamSection.eyebrow}
          title={teamSection.title}
          note={teamSection.note}
        />

        <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {team.map((member, index) => (
            <Reveal as="li" key={member.id} delay={index * 100} className="group">
              <div className="overflow-hidden rounded-t-full rounded-b-card transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1.5">
                <ImageFrame
                  src={member.image ?? undefined}
                  alt={member.name ? `, ` : member.role}
                  caption={member.caption}
                  ratio="3 / 4"
                  rounded="rounded-t-full rounded-b-card"
                  className="justify-center"
                />
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-3 border-b border-navy-900/10 pb-4">
                <p className="font-serif text-[1.375rem] text-navy-900">
                  {member.name ?? <span className="text-ink-muted/80 italic">Ime i prezime</span>}
                </p>
                <span aria-hidden="true" className="font-serif text-[0.875rem] text-gold-600">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-3 text-[0.875rem] text-ink-muted">{member.role}</p>
            </Reveal>
          ))}

          <Reveal as="li" delay={team.length * 100}>
            <a
              href="#kontakt"
              className="group grain relative isolate flex h-full min-h-[18rem] flex-col justify-between overflow-hidden rounded-t-full rounded-b-card bg-navy-900 px-7 pt-20 pb-7 text-cream-50 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-1.5"
            >
              <div
                aria-hidden="true"
                className="absolute -top-24 left-1/2 -z-10 size-72 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
                style={{ background: 'radial-gradient(circle, var(--color-gold-500), transparent 62%)' }}
              />
              <p className="text-center font-serif text-[1.5rem] leading-snug">{teamCta.text}</p>
              <span className="mt-8 flex items-center justify-between border-t border-cream-50/15 pt-5 text-[0.9375rem] font-medium">
                {teamCta.cta}
                <span className="grid size-9 place-items-center rounded-full bg-gold-500 text-navy-950 transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </ul>
      </Container>
    </Section>
  );
}
