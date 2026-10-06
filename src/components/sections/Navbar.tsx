import { useEffect, useRef, useState } from 'react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import { contact, nav } from '../../data/site';

/**
 * Plutajuća „pilula" odvojena od ivica ekrana. Preko tamnog heroa je
 * prozirna sa svijetlim tekstom; nakon skrola postaje svijetla i dobija sjenu.
 * Na mobitelu otvara karticu sa navigacijom ispod pilule.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Označi sekciju koja je trenutno na ekranu.
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!sections.length) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.id}`;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        // Prva vidljiva sekcija po redoslijedu navigacije; nijedna → ništa aktivno.
        setActive(nav.find((item) => visible.has(item.href))?.href ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const solid = scrolled || open;

  return (
    <>
      {open && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-navy-950/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            'pointer-events-auto mx-auto max-w-[80rem] rounded-[1.75rem] border',
            'transition-[background-color,border-color,box-shadow] duration-500 [transition-timing-function:var(--ease-out-soft)]',
            open
              ? 'border-navy-900/8 bg-cream-50 shadow-float'
              : solid
                ? 'border-navy-900/8 bg-cream-50/88 shadow-lifted backdrop-blur-xl'
                : 'border-cream-50/10 bg-navy-950/25 backdrop-blur-md',
          )}
        >
          <div className="flex h-16 items-center justify-between gap-4 pr-2.5 pl-3 sm:pl-4 lg:h-[4.25rem]">
            <a
              href="#vrh"
              className="shrink-0 rounded-full p-1"
              aria-label="Ruka Milosti — početna"
              onClick={() => setOpen(false)}
            >
              <Logo tone={solid ? 'light' : 'dark'} compact />
            </a>

            <nav aria-label="Glavna navigacija" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {nav.map((item) => {
                  const isActive = active === item.href;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'relative block rounded-full px-3 py-2 text-[0.9375rem] whitespace-nowrap transition-colors duration-300 xl:px-4',
                          solid
                            ? isActive
                              ? 'bg-navy-900/[0.06] text-navy-900'
                              : 'text-ink-soft hover:bg-navy-900/[0.04] hover:text-navy-900'
                            : isActive
                              ? 'bg-cream-50/10 text-cream-50'
                              : 'text-cream-50/78 hover:bg-cream-50/[0.07] hover:text-cream-50',
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <a
                href={contact.phoneHref}
                className={cn(
                  'hidden rounded-full px-3 py-2 text-[0.9375rem] whitespace-nowrap transition-colors duration-300 xl:block',
                  solid ? 'text-ink-soft hover:text-navy-900' : 'text-cream-50/80 hover:text-cream-50',
                )}
              >
                {contact.phone}
              </a>
              <Button href="#kontakt" variant={solid ? 'primary' : 'onDark'} withArrow>
                Kontaktirajte nas
              </Button>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobilni-meni"
              className={cn(
                'relative flex size-11 shrink-0 items-center justify-center rounded-full lg:hidden',
                'transition-colors duration-300',
                solid ? 'bg-navy-900 text-cream-50' : 'bg-cream-50 text-navy-900',
              )}
            >
              <span className="sr-only">{open ? 'Zatvorite meni' : 'Otvorite meni'}</span>
              <span aria-hidden="true" className="relative block h-3 w-4.5">
                <span
                  className={cn(
                    'absolute left-0 h-[1.5px] w-full rounded bg-current transition-transform duration-300',
                    open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 h-[1.5px] w-full rounded bg-current transition-transform duration-300',
                    open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0',
                  )}
                />
              </span>
            </button>
          </div>

          {/* Mobilni meni */}
          <div
            id="mobilni-meni"
            hidden={!open}
            className="max-h-[calc(100svh-6.5rem)] overflow-y-auto border-t border-navy-900/8 px-5 pt-2 pb-6 lg:hidden"
          >
            <nav aria-label="Navigacija (mobilni)">
              <ul>
                {nav.map((item, index) => (
                  <li
                    key={item.href}
                    className="animate-rise border-b border-navy-900/8"
                    style={{ animationDelay: `${60 + index * 45}ms` }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 font-serif text-[1.375rem] text-navy-900"
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-base text-gold-500">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                href="#kontakt"
                size="lg"
                onClick={() => setOpen(false)}
                withArrow
                className="justify-between"
              >
                Kontaktirajte nas
              </Button>
              <Button href={contact.phoneHref} variant="secondary" size="lg">
                {contact.phone}
              </Button>
            </div>
            <p className="mt-5 text-center text-sm text-ink-muted">{contact.hours}</p>
          </div>
        </div>
      </header>
    </>
  );
}
