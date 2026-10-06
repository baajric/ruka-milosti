import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { ServiceTicker } from './components/sections/ServiceTicker';
import { Distance } from './components/sections/Distance';
import { About } from './components/sections/About';
import { HowItWorks } from './components/sections/HowItWorks';
import { Pricing } from './components/sections/Pricing';
import { Team } from './components/sections/Team';
import { Faq } from './components/sections/Faq';
import { CtaBanner } from './components/sections/CtaBanner';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';

export default function App() {
  return (
    <>
      <a
        href="#glavni-sadrzaj"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-cream-50"
      >
        Preskoči na sadržaj
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="glavni-sadrzaj">
        <Hero />
        <ServiceTicker />
        <Distance />
        <About />
        <HowItWorks />
        <Pricing />
        <Team />
        <Faq />
        <CtaBanner />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
