import type { ReactNode } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { Accent } from '../ui/Accent';
import { ContactForm } from './ContactForm';
import { contact, contactSection } from '../../data/site';

const icon = (d: ReactNode) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const rows = [
  {
    label: 'Telefon',
    value: contact.phone,
    href: contact.phoneHref,
    icon: icon(<path d="M4.5 2.5h3l1.5 4-2 1.2a9 9 0 0 0 5.3 5.3l1.2-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15 15 0 0 1 3 4.1 1.5 1.5 0 0 1 4.5 2.5Z" />),
  },
  {
    label: 'WhatsApp / Viber',
    value: contact.whatsapp,
    href: contact.whatsappHref,
    icon: icon(<path d="M3 17l1.2-3.6A7.5 7.5 0 1 1 7 16.2L3 17Z" />),
  },
  {
    label: 'E-mail',
    value: contact.email,
    href: contact.emailHref,
    icon: icon(
      <>
        <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
        <path d="m3 5.5 7 5.5 7-5.5" />
      </>,
    ),
  },
  {
    label: 'Radno vrijeme',
    value: contact.hours,
    href: null,
    icon: icon(
      <>
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 6v4l2.5 1.5" />
      </>,
    ),
  },
];

export function Contact() {
  return (
    <Section id="kontakt" labelledBy="kontakt-naslov" className="bg-cream-50">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{contactSection.eyebrow}</Eyebrow>
            <h2 id="kontakt-naslov" className="mt-6 max-w-[14ch] text-h2 text-navy-900">
              <Accent text={contactSection.title} />
            </h2>
            <p className="mt-6 max-w-[46ch] text-lead text-ink-soft">{contactSection.lead}</p>

            <ul className="mt-10 grid gap-3">
              {rows.map((row) => {
                const content = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-900 text-gold-300 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                      {row.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.6875rem] tracking-[0.14em] text-ink-muted uppercase">
                        {row.label}
                      </span>
                      <span className="block truncate text-[1.0625rem] text-navy-900">{row.value}</span>
                    </span>
                  </>
                );
                const base =
                  'group flex items-center gap-4 rounded-card border border-navy-900/8 bg-cream-100/70 p-3 pr-5';
                return (
                  <li key={row.label}>
                    {row.href ? (
                      <a
                        href={row.href}
                        className={`${base} transition-[border-color,box-shadow,background-color] duration-300 hover:border-gold-500/35 hover:bg-cream-100 hover:shadow-subtle`}
                        {...(row.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={base}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Google karta — TODO: kad bude poznata tačna adresa, upisati je u `contact.address`. */}
            <div className="relative mt-6 h-56 overflow-hidden rounded-card border border-navy-900/8 bg-cream-100">
              <iframe
                title={`Karta — ${contact.address}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.address)}&z=13&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full border-0 [filter:grayscale(0.45)_sepia(0.12)]"
              />
              <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-navy-900/10 bg-cream-50/90 px-3.5 py-1.5 text-[0.625rem] tracking-[0.12em] text-ink-muted uppercase">
                {contact.address}
              </span>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
