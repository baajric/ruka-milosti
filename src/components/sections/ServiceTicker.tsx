import { serviceTicker } from '../../data/site';

/** Malo srce kao u logotipu („♥ Naša briga — vaš emanet ♥"). */
function Heart() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 14" className="size-3.5 shrink-0 text-gold-500">
      <path
        fill="currentColor"
        d="M8 13.2 6.9 12.2C3 8.7.5 6.4.5 3.7.5 1.6 2.1 0 4.2 0 5.4 0 6.5.6 7.2 1.4L8 2.3l.8-.9C9.5.6 10.6 0 11.8 0c2.1 0 3.7 1.6 3.7 3.7 0 2.7-2.5 5-6.4 8.5L8 13.2Z"
      />
    </svg>
  );
}

/**
 * Traka usluga koja polako klizi — sadržaj je doslovno iz paketa.
 * Druga kopija liste postoji samo radi beskonačne petlje i skrivena je
 * od čitača ekrana. Zaustavlja se kad se pređe mišem.
 */
export function ServiceTicker() {
  return (
    <section aria-label="Šta radimo" className="bg-cream-100 pt-6 pb-4 sm:pt-8">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
              {serviceTicker.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-8 pr-8 font-serif text-[1.375rem] whitespace-nowrap text-navy-900/75 sm:gap-10 sm:pr-10 sm:text-[1.875rem]"
                >
                  {item}
                  <Heart />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
