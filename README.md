# Ruka Milosti — web stranica

Produkcijski frontend za **Ruka Milosti** — kućnu pomoć i podršku starijim
osobama u Gradačcu i okolini.

React 19 · Vite 7 · TypeScript · Tailwind CSS v4

---

## Pokretanje

```bash
npm install
npm run dev        # razvojni server
npm run build      # produkcijski build u dist/
npm run preview    # pregled produkcijskog builda
npm run lint       # provjera tipova
npm run assets     # regeneriše logo/favicon/OG iz Resursi/Logo.png
```

---

## Struktura

```
Resursi/                  originalni logotip (izvor za sve brand assete)
public/
  brand/                  generisani logotip i znak (PNG/WebP)
  favicon*.png .ico       generisane ikone
  og-image.png            slika za dijeljenje na društvenim mrežama
  robots.txt sitemap.xml site.webmanifest
scripts/
  generate-assets.mjs     generisanje svih brand assetа iz logotipa
src/
  data/site.ts            SAV SADRŽAJ STRANICE — tekst, cijene, kontakt
  index.css               design tokeni (boje, tipografija, spacing, sjene)
  lib/
    inquiry.ts            sloj za slanje upita (spoj na backend)
    validation.ts         validacija kontakt forme
    typography.ts         sitni tipografski ispravci u naslovima
    cn.ts
  hooks/
    useReveal.ts          otkrivanje elemenata pri skrolu
    useScrollProgress.ts  napredak skrola kao CSS varijabla (--p)
    useParallax.ts        blagi parallax prema mišu (samo desktop)
  components/
    ui/                   Accent, Button, Container, Eyebrow, Field,
                          ImageFrame, LightRays, Logo, ReportCard, Reveal,
                          ScrollProgress, Section, SectionHeading
    sections/             Navbar, Hero, ServiceTicker, Distance, About,
                          HowItWorks, Pricing, Team, Faq, CtaBanner,
                          Contact, ContactForm, Footer
```

---

## Brand identitet

Paleta je izvedena **mjerenjem boja iz originalnog logotipa**, ne procjenom:

| Token | Vrijednost | Uloga |
| --- | --- | --- |
| `--color-navy-900` | `#01234D` | primarna boja iz logotipa (kuća, ruke, natpis) |
| `--color-navy-950` | `#061529` | podnožje i najtamniji blokovi |
| `--color-gold-500` | `#B38630` | prosjek zlatnih površina iz logotipa — **akcent** |
| `--color-gold-700` | `#7A5413` | zlatna za sitan tekst (kontrast 6.2:1 na kremu) |
| `--color-cream-100` | `#F8F5ED` | osnovna podloga |
| `--color-ink-muted` | `#5D6570` | sekundarni tekst (kontrast 5.4:1) |

Zlatna se koristi isključivo kao akcent — crte, kvačice, brojevi, jedan naslov
u herou. Nikad kao površina.

Sve boje, radijusi, sjene, spacing i tipografija definisani su na jednom mjestu:
`src/index.css`, blok `@theme`. Promjena boje na tom mjestu mijenja cijelu
stranicu.

**Fontovi:** Source Serif 4 (naslovi) i DM Sans (tekst) — oba imaju pun
`latin-ext` set, pa su č, ć, š, ž, đ ispravni u svim težinama.

### Logotip

Originalni `Resursi/Logo.png` se **ne mijenja**. `npm run assets` iz njega
generiše:

- `public/brand/logo-640.png` — puni logotip (za e-mail potpis, dokumente, štampu)
- `public/brand/mark-{128,256,512}.{png,webp}` — samo znak (kuća + ruke + srce)
- `public/favicon.ico`, `favicon-{16,32,192,512}x{...}.png`, `apple-touch-icon.png`
- `public/og-image.png` (1200×630)

U navbaru i podnožju koristi se stvarni znak iz logotipa, a ime „Ruka Milosti"
je HTML tekst u serifu — tako je čitljivo za čitače ekrana i pretraživače, a
znak ostaje netaknut. Znak je tamnoplav, pa na navy podlozi stoji na svijetlom
krugu.

**Zamjena za SVG:** kada dobijemo vektorsku verziju, promijeni `SOURCE` u
`scripts/generate-assets.mjs` i `<source>`/`src` u `src/components/ui/Logo.tsx`.

---

## Animacije

Sve je CSS i nekoliko malih hookova — bez animacijskih biblioteka.

- **Hero:** ulazna animacija po redoslijedu, spore zlatne zrake, plutajuće kartice, parallax prema mišu
- **Traka usluga:** beskonačno klizanje, zaustavlja se na hover
- **„Blizu, iako ste daleko":** rečenica se otkriva riječ po riječ dok se skrola; linije mape se iscrtaju, tačke putuju ka porodici
- **Kako funkcioniše:** lijeva kolona je zaljepljena, zlatna linija raste sa skrolom, aktivni korak se ističe
- **Sekcije:** fade + pomak + blagi blur pri ulasku u ekran
- **Navbar:** plutajuća pilula, prelazi iz tamne u svijetlu, označava sekciju na ekranu

`prefers-reduced-motion` gasi sve animacije, parallax i kretanje na mapi.

Naglašeni dio naslova piše se između zvjezdica u `src/data/site.ts`
(npr. `'Cijene su javne. *Nemamo šta da krijemo.*'`) i prikazuje se kao
zlatni italic.

## Fotografije

U projektu trenutno **nema stvarnih fotografija** i nijedna nije izmišljena.
Svako mjesto za fotografiju je komponenta `ImageFrame` (ili luk u heroju) sa
jasno označenim opisom kadra. U heroju je umjesto fotografije prikazan
**primjer izvještaja** (`sampleReport` u `site.ts`) — jasno označen kao primjer.

Zamjena je jedna linija — dodaj `src`:

```tsx
<ImageFrame src="/fotografije/hero.jpg" alt="…" caption="…" ratio="4 / 5" />
```

Placeholder tada nestaje sam.

---

## Kontakt forma

Forma ima validaciju, error, loading i success stanje. Slanje ide kroz
`src/lib/inquiry.ts`, koji je jedina tačka dodira sa backendom.

- **Bez** `VITE_CONTACT_ENDPOINT` → mock mod: forma simulira uspješno slanje
  (u razvoju se ispod forme prikazuje napomena o tome).
- **Sa** `VITE_CONTACT_ENDPOINT` → `POST` JSON na taj URL.

```bash
cp .env.example .env
# VITE_CONTACT_ENDPOINT=https://…
```

Tijelo zahtjeva:

```json
{
  "name": "…", "phone": "…", "email": "…",
  "location": "…", "helpType": "…" , "message": "…",
  "sentAt": "2026-01-01T00:00:00.000Z"
}
```

---

## Pristupačnost

- Semantični HTML, jedan `<h1>`, uredna hijerarhija naslova
- „Preskoči na sadržaj" link
- FAQ accordion: `aria-expanded` / `aria-controls`, tastatura (Enter, Space,
  ↑ ↓, Home, End)
- Forma: `<label>` za svako polje, `aria-invalid`, `role="alert"` na greškama,
  fokus skače na prvo polje sa greškom
- Vidljiv fokus prsten na cijeloj stranici
- `prefers-reduced-motion` gasi sve animacije
- Bez horizontalnog skrola na 320–1920 px

---

## ⚠️ Prije objave — šta treba potvrditi

Sve stavke ispod su **placeholderi preuzeti iz referentnog dizajna**. Nijedna
poslovna informacija nije izmišljena. Označene su sa `TODO` u kodu.

**`src/data/site.ts`**

- [ ] `contact.phone` i `contact.phoneHref` — stvarni broj telefona
- [ ] `contact.whatsapp` i `contact.whatsappHref` — WhatsApp / Viber broj
- [ ] `contact.email` / `emailHref` — potvrditi `info@rukamilosti.ba`
- [ ] `packages[].price` — cijene 150 / 390 / 750 KM
- [ ] `team[].name` — imena članova tima (dok su `null`, prikazuje se placeholder)
- [ ] `footer.legal` — stranice Politika privatnosti i Uslovi korištenja
- [ ] `site.url` — finalna domena

**Fotografije**

- [ ] Hero — njegovateljica sa korisnikom, u kući
- [ ] O nama — portret osnivača
- [ ] Tim — tri portreta
- [ ] Kontakt — Google karta (trenutno okvir)

**Domena** (`index.html`, `public/robots.txt`, `public/sitemap.xml`)

- [ ] Zamijeniti `https://rukamilosti.ba/` stvarnom domenom na sva četiri mjesta

---

## Deployment

`npm run build` pravi statički `dist/` — radi na bilo kojem statičkom hostingu
(Netlify, Vercel, Cloudflare Pages, klasični hosting).

```bash
git init
git add .
git commit -m "Ruka Milosti — web stranica"
git remote add origin <url>
git push -u origin main
```
