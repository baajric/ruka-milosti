/**
 * ============================================================================
 *  SADRŽAJ STRANICE — jedini izvor istine
 * ============================================================================
 *  Sav tekst, kontakt podaci i cijene žive ovdje. Komponente samo prikazuju.
 *
 *  ⚠️  VRIJEDNOSTI OZNAČENE SA `TODO` SU PLACEHOLDERI IZ REFERENTNOG DIZAJNA
 *      I MORAJU SE POTVRDITI SA KLIJENTOM PRIJE OBJAVE.
 *      Kompletna lista nalazi se u README.md → „Prije objave".
 * ============================================================================
 */

export const site = {
  name: 'Ruka Milosti',
  tagline: 'Naša briga — vaš emanet',
  subtitle: 'Kućna pomoć i podrška starijim osobama',
  url: 'https://rukamilosti.ba', // TODO: potvrditi finalnu domenu
  locale: 'bs-BA',
} as const;

export const contact = {
  phone: '+387 00 000 000', // TODO: stvarni broj telefona
  phoneHref: 'tel:+38700000000', // TODO
  whatsapp: '+49 000 0000000', // TODO: stvarni WhatsApp / Viber broj
  whatsappHref: 'https://wa.me/49000000000', // TODO
  email: 'info@rukamilosti.ba', // TODO: potvrditi
  emailHref: 'mailto:info@rukamilosti.ba', // TODO
  address: 'Gradačac, Bosna i Hercegovina',
  hours: 'Pon–Sub, 08:00 – 20:00',
} as const;

export const nav = [
  { label: 'O nama', href: '#o-nama' },
  { label: 'Kako funkcioniše', href: '#kako' },
  { label: 'Paketi i cijene', href: '#paketi' },
  { label: 'Naš tim', href: '#tim' },
  { label: 'Česta pitanja', href: '#pitanja' },
] as const;

export const hero = {
  eyebrow: 'Gradačac i okolina · njega u kući',
  titleLines: ['Vaši roditelji nisu sami.', 'A vi ćete znati — *svaki put.*'],
  lead:
    'Brinemo o starijim osobama u njihovom domu, a vama koji ste daleko šaljemo izvještaj nakon svake posjete. Da znate da je mama uzela lijekove, da je tata dobro, i da neko zaista dolazi.',
  imageCaption: 'Fotografija — njegovateljica sa korisnikom, u kući',
  /**
   * TODO: PRIVREMENA stock fotografija (Unsplash, besplatna licenca) — zamijeniti
   * stvarnom fotografijom Ruka Milosti, npr. '/fotografije/hero.jpg'.
   */
  image: 'https://images.unsplash.com/photo-1702648156180-25d8be9c9527?w=1100&q=80&auto=format&fit=crop' as string | null,
  imageAlt: 'Mlađa žena i stariji gospodin razgovaraju i smiju se na kauču u dnevnoj sobi',
  primaryCta: { label: 'Zatražite razgovor', href: '#kontakt' },
  secondaryCta: { label: 'Pogledajte pakete i cijene', href: '#paketi' },
} as const;

export const trustPoints = [
  { value: '24 h', label: 'Odgovaramo na svaki upit u roku od jednog dana' },
  { value: 'Izvještaj', label: 'Nakon svake posjete, sa fotografijom ako želite' },
  { value: 'Naši ljudi', label: 'Provjereni radnici iz Gradačca, sa imenom i licem' },
  { value: 'Bez ugovora', label: 'Otkazujete kad želite, uz najavu od 15 dana' },
] as const;

export const about = {
  eyebrow: 'O nama',
  title: 'Nastali smo iz jednog razgovora koji svi *dobro poznajemo.*',
  paragraphs: [
    '„Ko će mami danas do apoteke?" Neko iz Njemačke zove komšinicu, komšinica ima svoj posao, i onda se čeka. Taj razgovor se u našim kućama ponavlja godinama, a rješenje je uvijek privremeno.',
    'Ruka Milosti je organizovana briga za starije osobe u Gradačcu i okolini. Dolazimo u dogovoreno vrijeme, radimo tačno ono što je ugovoreno, i o svakoj posjeti ostaje zapis koji porodica može pročitati — bilo da je u Tuzli ili u Stuttgartu.',
    'Nismo dom i nismo bolnica. Mi smo prisustvo u kući, kad vi ne možete biti tu.',
  ],
  imageCaption: 'Fotografija — osnivač, portret',
  /**
   * TODO: PRIVREMENA stock fotografija (Unsplash, besplatna licenca) — zamijeniti
   * portretom osnivača, npr. '/fotografije/osnivac.jpg'.
   */
  image: 'https://images.unsplash.com/photo-1567505599350-70d90e03a41b?w=900&q=80&auto=format&fit=crop' as string | null,
  imageAlt: 'Starija gospođa u svojoj kuhinji uređuje cvijeće u saksiji',
} as const;

export const steps = [
  {
    number: '01',
    title: 'Razgovor',
    text: 'Pozovete ili pošaljete upit. Pitamo kako vaš roditelj živi, šta mu treba i koliko često. Bez obaveze.',
  },
  {
    number: '02',
    title: 'Posjeta i procjena',
    text: 'Dolazimo u kuću, upoznajemo se i pravimo plan njege: šta se radi, kojim danima i u koje vrijeme.',
  },
  {
    number: '03',
    title: 'Dodjela radnika',
    text: 'Dobijate stalnu osobu, ne različitog čovjeka svaki put. Znate njeno ime, broj i radne dane.',
  },
  {
    number: '04',
    title: 'Prvi izvještaj',
    text: 'Nakon prve posjete dobijate zapis: kada smo bili, šta je urađeno i kako je vaš roditelj. Tako i dalje.',
  },
] as const;

export const howItWorks = {
  eyebrow: 'Kako funkcioniše',
  title: 'Od poziva do prvog izvještaja — *četiri koraka.*',
  note: 'Cijeli proces obično traje manje od sedmice. Ništa ne plaćate prije nego što se dogovorimo šta se tačno radi.',
} as const;

export const pricing = {
  eyebrow: 'Paketi i cijene',
  title: 'Cijene su javne. *Nemamo šta da krijemo.*',
  note: 'Plaća se mjesečno, unaprijed. Paket mijenjate kad se potrebe promijene — bez naknade.',
} as const;

/**
 * Cijene su preuzete iz referentnog dizajna kao POLAZNE vrijednosti.
 * TODO: potvrditi sve tri cijene sa klijentom prije objave.
 */
export const packages = [
  {
    id: 'pratnja',
    name: 'Pratnja',
    summary: 'Za one koji su samostalni, ali su sami.',
    price: '150', // TODO: potvrditi
    unit: 'KM / mjesečno',
    featured: false,
    badge: null,
    features: [
      '2 posjete sedmično, po sat vremena',
      'Društvo i razgovor',
      'Nabavka lijekova i osnovnih potrepština',
      'Kratak izvještaj porodici nakon posjete',
    ],
  },
  {
    id: 'redovna',
    name: 'Redovna njega',
    summary: 'Kad je potrebna pomoć u kući svaki dan.',
    price: '390', // TODO: potvrditi
    unit: 'KM / mjesečno',
    featured: true,
    badge: 'Najčešći izbor',
    features: [
      '5 posjeta sedmično, po dva sata',
      'Pomoć u kupanju, oblačenju i higijeni',
      'Kuhanje, čišćenje i pranje',
      'Kontrola lijekova i pratnja doktoru',
      'Izvještaj sa fotografijom nakon posjete',
    ],
  },
  {
    id: 'puna-briga',
    name: 'Puna briga',
    summary: 'Za osobe koje ne mogu ostati same.',
    price: '750', // TODO: potvrditi
    unit: 'KM / mjesečno',
    featured: false,
    badge: null,
    features: [
      'Svakodnevno prisustvo, 6 do 8 sati',
      'Sve iz paketa Redovna njega',
      'Njega osoba sa ograničenom pokretljivošću',
      'Dogovor sa doktorom i apotekom',
      'Dostupnost koordinatora i van radnog vremena',
    ],
  },
] as const;

export const pricingNote = {
  text: 'Potrebno vam je nešto između, ili samo nekoliko dana u mjesecu? Pravimo paket po mjeri — javite šta treba.',
  cta: 'Pitajte za paket po mjeri',
} as const;

export const teamSection = {
  eyebrow: 'Naš tim',
  title: 'Ljudi koji ulaze u vašu kuću imaju *ime i lice.*',
  note: 'Svi naši radnici su iz Gradačca i okoline, provjereni i obučeni za rad sa starijim osobama.',
} as const;

/**
 * TODO: zamijeniti stvarnim imenima i fotografijama.
 * Dok je `name` null, kartica se prikazuje kao jasno označen placeholder.
 * `image` su PRIVREMENE stock fotografije (Unsplash) — nisu stvarni radnici.
 */
export const team = [
  {
    id: 'koordinator',
    name: null as string | null,
    role: 'Koordinator njege · Gradačac',
    caption: 'Portret — koordinator',
    image: 'https://images.unsplash.com/photo-1644335326474-544fbcf8855f?w=700&q=80&auto=format&fit=crop' as string | null,
  },
  {
    id: 'njegovateljica-1',
    name: null as string | null,
    role: 'Njegovateljica · 8 godina iskustva',
    caption: 'Portret — njegovateljica',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=700&q=80&auto=format&fit=crop' as string | null,
  },
  {
    id: 'njegovateljica-2',
    name: null as string | null,
    role: 'Njegovateljica · medicinska sestra',
    caption: 'Portret — njegovateljica',
    image: 'https://images.unsplash.com/photo-1770134223774-13b735e29201?w=700&q=80&auto=format&fit=crop' as string | null,
  },
];

export const teamCta = {
  text: 'Tražimo njegovateljice i njegovatelje u Gradačcu i okolini.',
  cta: 'Prijavite se',
} as const;

export const faqSection = {
  eyebrow: 'Česta pitanja',
  title: 'Pitanja koja nam ljudi *najčešće postave.*',
  note: 'Ako nema vašeg pitanja, pozovite. Odgovaramo iskreno, i kad odgovor nije onaj koji želite čuti.',
} as const;

export const faq = [
  {
    q: 'Kako ću znati da je radnik zaista bio kod mog roditelja?',
    a: 'Nakon svake posjete dobijate izvještaj — vrijeme dolaska i odlaska, šta je urađeno i kratka bilješka o stanju. Na zahtjev dodajemo i fotografiju. Izvještaj šaljemo putem WhatsAppa, Vibera ili e-maila, kako vam odgovara.',
  },
  {
    q: 'Mogu li platiti iz Njemačke ili Austrije?',
    a: 'Možete. Uplatu radite običnim SEPA nalogom iz svoje banke, ili preko PayPala i Wisea. Ne morate nikoga slati u banku u Bosni i ne morate ništa objašnjavati na šalteru.',
  },
  {
    q: 'Da li je moj roditelj svaki put sa istom osobom?',
    a: 'Da. Svakom korisniku dodjeljujemo stalnu osobu, jer starijim ljudima je navika važnija od bilo čega drugog. Zamjena dolazi samo u slučaju bolesti ili godišnjeg odmora, i o tome vas obavijestimo unaprijed.',
  },
  {
    q: 'Šta ako mom roditelju treba medicinska njega?',
    a: 'Mi pružamo njegu i pomoć u kući — nismo zdravstvena ustanova. Za medicinske intervencije organizujemo pratnju do doktora ili dolazak medicinske sestre, a sve ostalo ostaje u dogovoru sa vašim ljekarom.',
  },
  {
    q: 'Šta ako moj roditelj ne želi stranca u kući?',
    a: 'To je najčešća reakcija i potpuno je normalna. Zato prva posjeta nije njega, nego upoznavanje — bez zadataka i bez obaveze. Većina ljudi se predomisli nakon druge ili treće sedmice, kad vide da dolazi neko poznat.',
  },
  {
    q: 'Koja mjesta pokrivate?',
    a: 'Gradačac i okolna sela. Za Modriču, Srebrenik i Gračanicu pitajte — dolazimo ako imamo slobodnog radnika u tom pravcu.',
  },
] as const;

export const ctaBanner = {
  title: 'Nazovite. Prvi razgovor *ništa ne košta* i ne obavezuje.',
  text: 'Recite nam kako vaš roditelj živi danas, a mi ćemo iskreno reći šta možemo i po kojoj cijeni.',
  cta: 'Zatražite razgovor',
} as const;

export const contactSection = {
  eyebrow: 'Kontakt',
  title: 'Javite se. Odgovaramo u roku od *24 sata.*',
  lead:
    'Nema pogrešnog pitanja i ne morate imati odluku. Ako samo želite provjeriti šta je moguće — to je dovoljan razlog za poziv.',
  formTitle: 'Pošaljite upit',
  formLead: 'Popunjavanje traje dvije minute. Zovemo vas, ne pišemo dugačke mailove.',
  privacyNote: 'Vaši podaci ostaju kod nas i ne dijelimo ih ni sa kim.',
  successTitle: 'Hvala na povjerenju.',
  successText: 'Vaš upit je zaprimljen. Javljamo se u roku od 24 sata.',
  mapCaption: 'Google karta — lokacija u Gradačcu',
} as const;

export const helpTypes = [
  'Pratnja i društvo',
  'Pomoć u kući',
  'Higijena i njega',
  'Puna briga',
  'Nisam siguran',
] as const;

export const footer = {
  blurb: 'Briga i pomoć starijim osobama u njihovom domu. Gradačac, Bosna i Hercegovina.',
  legal: [
    { label: 'Politika privatnosti', href: '#' }, // TODO: stranica u pripremi
    { label: 'Uslovi korištenja', href: '#' }, // TODO: stranica u pripremi
  ],
} as const;

/**
 * Poruka iz briefa: porodica je daleko, briga je blizu.
 * Gradovi su primjeri mjesta gdje posjetilac stranice može živjeti —
 * nisu tvrdnja o postojećim klijentima.
 */
export const distance = {
  eyebrow: 'Blizu, iako ste daleko',
  statement: 'Porodica može biti daleko. Briga za roditelja može biti blizu.',
  lead: 'Vi ste u Stuttgartu, Beču ili Zürichu. Mama je u Gradačcu. Između vas je jedan izvještaj nakon svake posjete — i neko ko zaista dolazi.',
  cities: [
    { name: 'Stuttgart', lon: 9.18, lat: 48.78 },
    { name: 'München', lon: 11.58, lat: 48.14 },
    { name: 'Beč', lon: 16.37, lat: 48.21 },
    { name: 'Zürich', lon: 8.54, lat: 47.37 },
  ],
  home: { name: 'Gradačac', lon: 18.43, lat: 44.88 },
} as const;

/** Usluge iz paketa — koriste se u traci koja klizi ispod heroa. */
export const serviceTicker = [
  'Društvo i razgovor',
  'Nabavka lijekova',
  'Kontrola lijekova',
  'Kuhanje, čišćenje i pranje',
  'Pomoć u higijeni i oblačenju',
  'Pratnja doktoru',
  'Izvještaj nakon svake posjete',
] as const;

/**
 * Ilustracija izvještaja koji porodica dobija (vidi FAQ: vrijeme dolaska
 * i odlaska, šta je urađeno, kratka bilješka). Jasno označeno kao primjer.
 */
export const sampleReport = {
  label: 'Primjer',
  title: 'Izvještaj nakon posjete',
  time: 'Danas · 11:04',
  window: 'Dolazak 09:00 · Odlazak 11:00',
  items: ['Lijekovi uzeti', 'Ručak pripremljen', 'Društvo i razgovor'],
  note: 'Mama je dobro i pozdravlja vas.',
  channel: 'Poslano putem WhatsAppa',
} as const;
