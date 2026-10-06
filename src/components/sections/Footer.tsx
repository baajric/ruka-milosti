import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { contact, footer, nav, site } from '../../data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative isolate overflow-hidden bg-navy-950 pt-(--spacing-section) text-cream-50">
      <div
        aria-hidden="true"
        className="absolute -top-60 left-1/2 -z-10 size-[50rem] -translate-x-1/2 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-gold-500), transparent 62%)' }}
      />

      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Logo tone="dark" showTagline />
            <p className="mt-7 max-w-[34ch] text-[0.9375rem] leading-relaxed text-cream-50/60">
              {footer.blurb}
            </p>
          </div>

          <nav aria-label="Podnožje — stranica" className="md:col-span-3">
            <h2 className="font-sans text-[0.75rem] font-medium tracking-[0.14em] text-gold-300 uppercase">
              Stranica
            </h2>
            <ul className="mt-5 grid gap-3">
              {[...nav, { label: 'Kontakt', href: '#kontakt' }].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.9375rem] text-cream-50/70 transition-colors duration-300 hover:text-cream-50"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-sans text-[0.75rem] font-medium tracking-[0.14em] text-gold-300 uppercase">
              Kontakt
            </h2>
            <ul className="mt-5 grid gap-3 text-[0.9375rem] text-cream-50/70">
              <li>
                <a href={contact.phoneHref} className="transition-colors duration-300 hover:text-cream-50">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="transition-colors duration-300 hover:text-cream-50">
                  {contact.email}
                </a>
              </li>
              <li>{contact.address}</li>
              <li>{contact.hours}</li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Veliki natpis — tipografski završetak stranice. */}
      <p
        aria-hidden="true"
        className="mt-20 text-center font-serif text-[18vw] leading-[0.8] tracking-[-0.04em] whitespace-nowrap text-transparent select-none lg:mt-28 lg:text-[15.5vw]"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgb(255 253 248 / 0.16) 0%, rgb(255 253 248 / 0.02) 85%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        {site.name}
      </p>

      <div className="relative border-t border-cream-50/10">
        <Container>
          <div className="flex flex-col gap-4 py-7 text-[0.8125rem] text-cream-50/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.name}. Sva prava zadržana.
            </p>
            <ul className="flex flex-wrap gap-6">
              {footer.legal.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition-colors duration-300 hover:text-cream-50">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
