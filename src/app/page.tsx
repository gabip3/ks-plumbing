import { CallBar } from '@/components/layout/CallBar';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { About } from '@/components/sections/About';
import { Areas } from '@/components/sections/Areas';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { Contact } from '@/components/sections/Contact';
import { Faq } from '@/components/sections/Faq';
import { Gallery } from '@/components/sections/Gallery';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { Reviews } from '@/components/sections/Reviews';
import { Services } from '@/components/sections/Services';
import { DropletTrail } from '@/components/ui/DropletTrail';
import { PipeDivider } from '@/components/ui/PipeDivider';
import { ScrollSpine } from '@/components/ui/ScrollSpine';
import { Ticker } from '@/components/ui/Ticker';

const tickerItems = [
  'Same-day scheduling',
  'Free estimates',
  'Licensed & insured in Idaho',
  'Serving the whole Treasure Valley',
  'Price before the work starts',
  'Workmanship warranty in writing',
];

export default function HomePage() {
  return (
    <>
      <Header />
      <ScrollSpine />
      <DropletTrail />
      <main>
        <Hero />
        <Ticker items={tickerItems} />
        <Services />
        <PipeDivider />
        <About />
        <PipeDivider />
        <Process />
        <Gallery />
        <BeforeAfter />
        <PipeDivider />
        <Reviews />
        <Faq />
        <Areas />
        <Contact />
      </main>
      <Footer />
      <CallBar />
    </>
  );
}
