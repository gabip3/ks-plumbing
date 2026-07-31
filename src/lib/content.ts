/**
 * Editorial content. Everything the client will ever want to reword lives here,
 * so the section components stay purely about layout and motion.
 */

export type Service = {
  id: string;
  index: string;
  title: string;
  lead: string;
  body: string;
  details: string[];
  image?: string;
};

export const services: Service[] = [
  {
    id: 'emergency-plumbing',
    index: '01',
    title: 'Emergency Plumbing',
    lead: 'Burst line at 2 a.m.',
    body: 'Someone picks up the phone and someone gets in the truck. We stop the water first, contain the damage, then start the repair on the same visit.',
    details: ['24/7 dispatch', 'Water shut-off guidance by phone', 'Same-visit repair'],
    image: '/assets/services/service-emergency.webp',
  },
  {
    id: 'leak-detection',
    index: '02',
    title: 'Leak Detection',
    lead: 'Find it before you open a wall.',
    body: 'Acoustic listening gear, thermal imaging and line pressure tests tell us exactly where the water is going, so the repair stays a patch instead of a remodel.',
    details: ['Slab and underground leaks', 'Thermal imaging', 'Pressure testing'],
    image: '/assets/services/service-leak.webp',
  },
  {
    id: 'drain-cleaning',
    index: '03',
    title: 'Drain Cleaning',
    lead: 'Slow sinks and main line backups.',
    body: 'We cable the line, hydro-jet the grease and scale off the walls of the pipe, then run a camera through it so you can see what caused it.',
    details: ['Hydro-jetting', 'Camera inspection', 'Root and grease removal'],
    image: '/assets/services/service-drain.webp',
  },
  {
    id: 'water-heater',
    index: '04',
    title: 'Water Heater',
    lead: 'Hot water, sized to your house.',
    body: 'Repairs, straight swaps and tankless conversions. Gas, electric or hybrid, sized around how many showers actually run at 7 a.m. instead of a generic chart.',
    details: ['Tank and tankless', 'Same-day replacement', 'Anode and flush service'],
    image: '/assets/services/service-heater.webp',
  },
  {
    id: 'pipe-repair',
    index: '05',
    title: 'Pipe Repair & Repipe',
    lead: 'From a pinhole to the whole house.',
    body: 'Frozen splits, failing galvanized, slab leaks and pinholes in copper. We repair the section when that is honest, and repipe in PEX or copper when it is not.',
    details: ['PEX and copper repipes', 'Frozen line repair', 'Slab leak rerouting'],
    image: '/assets/services/service-pipe.webp',
  },
  {
    id: 'fixture-installation',
    index: '06',
    title: 'Fixture Installation',
    lead: 'Set level, sealed, tested.',
    body: 'Faucets, toilets, tubs, sinks, disposals, pot fillers and hose bibs. Old unit hauled away, new one pressure tested before we pack up.',
    details: ['Kitchen and bath fixtures', 'Garbage disposals', 'Haul-away included'],
    image: '/assets/services/service-fixture.webp',
  },
  {
    id: 'commercial-plumbing',
    index: '07',
    title: 'Commercial Plumbing',
    lead: 'Work that fits around your hours.',
    body: 'Restaurants, offices and multi-unit buildings across the Valley. Grease lines, backflow testing and tenant improvements, scheduled after close when the floor has to stay open.',
    details: ['Grease line service', 'Backflow testing', 'After-hours scheduling'],
    image: '/assets/services/service-commercial.webp',
  },
  {
    id: 'residential-plumbing',
    index: '08',
    title: 'Residential Plumbing',
    lead: 'Everything a house asks for.',
    body: 'New construction rough-in, remodel plumbing, water softeners, pressure regulators, and the short list of small things you keep meaning to call about.',
    details: ['New construction rough-in', 'Remodel plumbing', 'Softeners and filtration'],
    image: '/assets/services/service-residential.webp',
  },
];

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
  meta: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Call or text',
    body: 'Tell us what is happening. If it is something you can shut off yourself, we walk you through it on the phone before anyone gets billed for anything.',
    meta: 'Answered by a plumber',
  },
  {
    index: '02',
    title: 'We show up',
    body: 'A real arrival window instead of "sometime Tuesday", a text when the truck is on the way, shoe covers on and drop cloths down.',
    meta: 'Same-day across the Valley',
  },
  {
    index: '03',
    title: 'Diagnosis and price',
    body: 'We find the cause, show you what we found, and give you the number before any work starts. Free estimates, flat pricing, no invented line items.',
    meta: 'Price before work',
  },
  {
    index: '04',
    title: 'Fixed and cleaned up',
    body: 'The repair gets tested under pressure, the area gets left cleaner than we found it, and the warranty goes to you in writing.',
    meta: 'Warranty in writing',
  },
];

export type GalleryItem = {
  id: string;
  src: string;
  /** Narrow variant for phones. Derived from `src` when omitted. */
  srcSmall?: string;
  alt: string;
  caption: string;
  location: string;
  category: string;
  ratio: 'portrait' | 'square' | 'landscape' | 'tall';
};

export const galleryCategories = [
  'All work',
  'Repipes',
  'Rough-in',
  'Drains',
  'Remodels',
  'Crawlspace',
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 'project-01',
    src: '/assets/gallery/project-01.webp',
    alt: 'Full PEX repipe with new ABS drain stack on an open garage wall',
    caption: 'Whole-house repipe, PEX and ABS',
    location: 'Boise',
    category: 'Repipes',
    ratio: 'portrait',
  },
  {
    id: 'project-02',
    src: '/assets/gallery/project-02.webp',
    alt: 'Finished bathroom with a glass shower enclosure and new toilet',
    caption: 'Bathroom finished and turned over',
    location: 'Meridian',
    category: 'Remodels',
    ratio: 'landscape',
  },
  {
    id: 'project-03',
    src: '/assets/gallery/project-03.webp',
    alt: 'New ABS P-trap and drain assembly framed into a floor joist bay',
    caption: 'New trap arm and drain assembly',
    location: 'Garden City',
    category: 'Drains',
    ratio: 'square',
  },
  {
    id: 'project-04',
    src: '/assets/gallery/project-04.webp',
    alt: 'Bathroom rough-in with PEX supply lines under pressure test',
    caption: 'Bath rough-in, holding pressure',
    location: 'Eagle',
    category: 'Rough-in',
    ratio: 'tall',
  },
  {
    id: 'project-05',
    src: '/assets/gallery/project-05.webp',
    alt: 'Cast iron and ABS drain lines running through a crawlspace',
    caption: 'Main drain lines rehung',
    location: 'Boise',
    category: 'Crawlspace',
    ratio: 'landscape',
  },
  {
    id: 'project-06',
    src: '/assets/gallery/project-06.webp',
    alt: 'Copper riser and shut-off valve set into a finished wall cavity',
    caption: 'Copper riser and shut-off',
    location: 'Kuna',
    category: 'Repipes',
    ratio: 'portrait',
  },
  {
    id: 'project-07',
    src: '/assets/gallery/project-07.webp',
    alt: 'Pressure gauge on a hose bib during a whole-house pressure test',
    caption: 'Pressure test before close-up',
    location: 'Star',
    category: 'Rough-in',
    ratio: 'square',
  },
  {
    id: 'project-08',
    src: '/assets/gallery/project-08.webp',
    alt: 'ABS sanitary tee and vent branch in a crawlspace',
    caption: 'Sanitary tee and vent branch',
    location: 'Nampa',
    category: 'Drains',
    ratio: 'landscape',
  },
  {
    id: 'project-09',
    src: '/assets/gallery/project-09.webp',
    alt: 'Shower mixing valve mounted on a backer board with PEX supply lines',
    caption: 'Shower valve set and braced',
    location: 'Eagle',
    category: 'Rough-in',
    ratio: 'tall',
  },
  {
    id: 'project-10',
    src: '/assets/gallery/project-10.webp',
    alt: 'New tub and shower surround installed in a remodeled bathroom',
    caption: 'New tub and surround',
    location: 'Meridian',
    category: 'Remodels',
    ratio: 'portrait',
  },
  {
    id: 'project-11',
    src: '/assets/gallery/project-11.webp',
    alt: 'Toilet flange and supply stub set in a new subfloor',
    caption: 'Flange set, floor ready for tile',
    location: 'Middleton',
    category: 'Remodels',
    ratio: 'square',
  },
  {
    id: 'project-12',
    src: '/assets/gallery/project-12.webp',
    alt: 'Hot and cold PEX lines and an ABS stack in an opened floor',
    caption: 'Supply and waste, opened floor',
    location: 'Boise',
    category: 'Repipes',
    ratio: 'landscape',
  },
  {
    id: 'project-13',
    src: '/assets/gallery/project-13.webp',
    alt: 'Shower rough-in with PEX supply lines run through new framing',
    caption: 'Shower rough-in, new framing',
    location: 'Nampa',
    category: 'Rough-in',
    ratio: 'portrait',
  },
  {
    id: 'project-14',
    src: '/assets/gallery/project-14.webp',
    alt: 'ABS waste and vent assembly fitted between crawlspace joists',
    caption: 'Waste and vent assembly',
    location: 'Emmett',
    category: 'Crawlspace',
    ratio: 'square',
  },
  {
    id: 'project-15',
    src: '/assets/gallery/project-15.webp',
    alt: 'Shower mixing valve mounted on a brace with hot and cold PEX lines',
    caption: 'Mixing valve braced and plumbed',
    location: 'Eagle',
    category: 'Rough-in',
    ratio: 'portrait',
  },
  {
    id: 'project-16',
    src: '/assets/gallery/project-16.webp',
    alt: 'New ABS closet bend visible through an opened bathroom floor',
    caption: 'Closet bend set through the floor',
    location: 'Eagle',
    category: 'Rough-in',
    ratio: 'square',
  },
];

export type ComparisonPair = {
  id: string;
  title: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  beforeNote: string;
  afterNote: string;
  location: string;
};

/**
 * The client's own before / after photos.
 *
 * The originals arrived unsorted, so the pairs were matched by reading the
 * rooms rather than the file names. Both pairs below are the same crawlspace,
 * identified by the concrete stem wall, the foil-wrapped flex duct, the pink
 * insulation and the joist layout. See the note in scripts/prepare-images.mjs
 * for the full reasoning, and swap the file names there if a pairing needs
 * correcting, then run `npm run images`.
 */
export const comparisons: ComparisonPair[] = [
  {
    id: 'pair-01',
    title: 'Crawlspace waste line rebuilt',
    before: '/assets/before-after/pair-01-before.webp',
    after: '/assets/before-after/pair-01-after.webp',
    beforeAlt: 'Old crawlspace drain assembly held up by rusted strapping',
    afterAlt: 'Rebuilt ABS waste line, properly supported and sloped',
    beforeNote: 'Rusted strapping, sagging joints, and no consistent fall on the line.',
    afterNote: 'New ABS run with the correct fall, hung off the joists instead of the ducting.',
    location: 'Boise',
  },
  {
    id: 'pair-02',
    title: 'Corroded copper replaced',
    before: '/assets/before-after/pair-02-before.webp',
    after: '/assets/before-after/pair-02-after.webp',
    beforeAlt: 'Corroded copper supply lines and old fittings in a crawlspace',
    afterAlt: 'New PEX supply line with a clean brass transition fitting',
    beforeNote: 'Green corrosion at every joint, and a fitting already weeping.',
    afterNote: 'Replaced in PEX with a brass transition, clipped and clear of the framing.',
    location: 'Boise',
  },
];

/**
 * PLACEHOLDER TESTIMONIALS.
 * Replace with verbatim Google reviews (and the reviewer's real first name and
 * last initial) before the site goes live. Do not publish invented reviews.
 */
export type Review = {
  quote: string;
  name: string;
  location: string;
  job: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    quote:
      'Water was coming through the kitchen ceiling on a Sunday night. They talked me through shutting the main off while they were driving over, and had the line fixed before midnight. I have never had a trade answer the phone that fast.',
    name: 'Danielle R.',
    location: 'North End, Boise',
    job: 'Emergency repair',
    rating: 5,
  },
  {
    quote:
      'Two other companies wanted to open up the wall to look for the leak. KS found it under the slab in about forty minutes with a listening device and rerouted the line instead. The price they quoted was the price I paid.',
    name: 'Marcus T.',
    location: 'Meridian',
    job: 'Leak detection',
    rating: 5,
  },
  {
    quote:
      'Old heater died the week we had family in town. They had a new one in and running the same afternoon, hauled the old tank away, and vacuumed the garage before they left. That last part is what I keep telling people about.',
    name: 'Sara & Ben H.',
    location: 'Eagle',
    job: 'Water heater',
    rating: 5,
  },
  {
    quote:
      'We run a restaurant, so any downtime costs us. They scheduled the grease line work for after close, worked clean, and we opened on time the next morning. Third year we have used them.',
    name: 'Alicia M.',
    location: 'Downtown Boise',
    job: 'Commercial service',
    rating: 5,
  },
  {
    quote:
      'Honest is the word. They looked at my main line, said it did not need replacing yet, cleaned it, and told me what to watch for. Easiest five hundred dollars anyone ever talked themselves out of.',
    name: 'Greg P.',
    location: 'Nampa',
    job: 'Drain cleaning',
    rating: 5,
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: 'Do you charge for estimates?',
    answer:
      'No. Estimates are free, and you get the number before any work starts. If we have to diagnose something first, like a hidden leak or a camera inspection, we tell you that cost up front too, and it comes off the repair if you move forward with us.',
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'Yes. KS Plumbing is licensed and insured in the state of Idaho, and every technician who works on your home carries that coverage. We are happy to send the certificate before we arrive.',
  },
  {
    question: 'How fast can you get to me?',
    answer:
      'Most of the Treasure Valley gets a same-day window, and true emergencies such as burst lines, sewage backups or no water in the house jump the queue at any hour.',
  },
  {
    question: 'What does an after-hours call cost?',
    answer:
      'There is an after-hours dispatch fee outside of normal business hours, and we tell you the exact amount on the phone before we roll a truck. The repair itself is quoted the same way it would be at 10 a.m. on a Tuesday.',
  },
  {
    question: 'Do you warranty the work?',
    answer:
      'Every repair carries a workmanship warranty in writing, and manufacturer coverage on parts and equipment we supply. If something we touched fails inside that window, we come back out at no charge.',
  },
  {
    question: 'How do you handle payment?',
    answer:
      'Cash, check, and all major cards. Payment is due when the job is finished and tested, with nothing up front on standard service calls. Larger projects like repipes are split into a materials deposit and a balance on completion.',
  },
  {
    question: 'Can you work with my home warranty or insurance claim?',
    answer:
      'We can. We document the cause of loss with photos, write the scope in the language adjusters expect, and talk to your carrier directly if that speeds things up.',
  },
  {
    question: 'Do you take on new construction?',
    answer:
      'Yes. Rough-in through trim-out for custom homes and small developments, plus remodel plumbing for additions, basement finishes and full gut jobs.',
  },
];

export type Area = {
  name: string;
  weight: 1 | 2 | 3;
};

export const areas: Area[] = [
  { name: 'Boise', weight: 3 },
  { name: 'Meridian', weight: 3 },
  { name: 'Nampa', weight: 2 },
  { name: 'Eagle', weight: 2 },
  { name: 'Garden City', weight: 2 },
  { name: 'Kuna', weight: 1 },
  { name: 'Star', weight: 1 },
  { name: 'Middleton', weight: 1 },
  { name: 'Emmett', weight: 1 },
  { name: 'Treasure Valley', weight: 2 },
];

export const stats = [
  { value: '24/7', label: 'Emergency line', detail: 'Answered by a plumber, not a call center' },
  { value: '10', label: 'Cities served', detail: 'Across the Treasure Valley' },
  { value: '$0', label: 'For an estimate', detail: 'Price before the wrench comes out' },
  { value: '100%', label: 'Licensed & insured', detail: 'Idaho state licensed, fully covered' },
];
