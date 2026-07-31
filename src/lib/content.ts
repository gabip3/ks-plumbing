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
    lead: 'Burst line, no water, drain backing up.',
    body: 'Call or text and we work you into the schedule as fast as we can. We talk you through shutting the water off while you wait, and the repair starts on that first visit.',
    details: ['Water shut-off guidance by phone', 'Same-visit repair', 'Call or text'],
    image: '/assets/services/service-emergency.webp',
  },
  {
    id: 'water-treatment',
    index: '02',
    title: 'Water Treatment',
    lead: 'Hard water, handled.',
    body: 'Softeners, carbon filtration and full treatment systems, installed or replaced. Treasure Valley water is hard, and it is what shortens the life of every fixture and heater in the house.',
    details: ['Softener install and replacement', 'Whole-home filtration', 'System swaps'],
    image: '/assets/services/service-treatment.webp',
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
    details: ['Tank and tankless', 'Repair or replacement', 'Flush and maintenance'],
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
    body: 'Restaurants, offices and multi-unit buildings across the Valley. Grease lines, backflow testing and tenant improvements, scheduled around your hours when the floor has to stay open.',
    details: ['Grease line service', 'Backflow testing', 'Scheduled around your hours'],
    image: '/assets/services/service-commercial.webp',
  },
  {
    id: 'residential-plumbing',
    index: '08',
    title: 'Residential Plumbing',
    lead: 'Everything a house asks for.',
    body: 'New construction rough-in, remodel plumbing, pressure regulators, hose bibs, and the short list of small things you keep meaning to call about.',
    details: ['New construction rough-in', 'Remodel plumbing', 'Repairs and replacements'],
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
 * The client's own before / after photos, supplied already matched. To change
 * a pairing, swap the file names in scripts/prepare-images.mjs and run
 * `npm run images`.
 *
 * NOTE: the `location` on each pair is generic. Replace with the real city
 * once the client confirms, since city names are what local search matches on.
 */
export const comparisons: ComparisonPair[] = [
  {
    id: 'pair-01',
    title: 'Water line protected from freezing',
    before: '/assets/before-after/pair-01-before.webp',
    after: '/assets/before-after/pair-01-after.webp',
    beforeAlt: 'Water supply line left exposed below the insulation in a crawlspace',
    afterAlt: 'The same line tucked back inside the insulation and closed in',
    beforeNote:
      'Supply line hanging below the batt, out in the air that moves through a crawlspace all winter.',
    afterNote:
      'Line tucked back up inside the insulation and closed in, so it is no longer the first thing in the house to freeze.',
    location: 'Treasure Valley',
  },
  {
    id: 'pair-02',
    title: 'Drain and vent rebuilt through the floor',
    before: '/assets/before-after/pair-02-before.webp',
    after: '/assets/before-after/pair-02-after.webp',
    beforeAlt: 'Opened subfloor with old waste lines cut back and nothing connected',
    afterAlt: 'New ABS waste and vent run, stubbed for fixtures and tied into the stack',
    beforeNote: 'Floor opened up, the old waste lines cut back, nothing tied together.',
    afterNote:
      'New ABS waste and vent run, stubbed for the fixtures and tied into the stack going up the wall.',
    location: 'Treasure Valley',
  },
  {
    id: 'pair-03',
    title: 'Valve and supply lines set to layout',
    before: '/assets/before-after/pair-03-before.webp',
    after: '/assets/before-after/pair-03-after.webp',
    beforeAlt: 'Bare stud bay with the valve position marked in pencil on the framing',
    afterAlt: 'Valve mounted on the mark with hot and cold PEX run in and secured',
    beforeNote: 'Bare stud bay with the height marked on the framing and nothing run to it.',
    afterNote:
      'Valve mounted on the mark, hot and cold run in and clipped, ready for the wall to close.',
    location: 'Treasure Valley',
  },
  {
    id: 'pair-04',
    title: 'New vent run up the wall',
    before: '/assets/before-after/pair-04-before.webp',
    after: '/assets/before-after/pair-04-after.webp',
    beforeAlt: 'Interior wall opened at the ceiling to trace the line, insulation pulled back',
    afterAlt: 'New ABS vent run straight up through the top plate and turned into the attic',
    beforeNote: 'Wall opened to find the run. Insulation pulled back, and a gap where it had to go.',
    afterNote:
      'New ABS run straight up through the top plate and turned into the attic, with the framing and insulation put back around it.',
    location: 'Treasure Valley',
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
      'Water was coming through the kitchen ceiling. They talked me through shutting the main off on the phone, got out to the house that day, and had the line fixed on the first visit. I have never had a trade answer the phone that fast.',
    name: 'Danielle R.',
    location: 'North End, Boise',
    job: 'Emergency repair',
    rating: 5,
  },
  {
    quote:
      'Two other companies quoted me for a full repipe. KS looked at the same house, replaced the two sections that had actually failed, and told me the rest had years left. The price they quoted was the price I paid.',
    name: 'Marcus T.',
    location: 'Meridian',
    job: 'Pipe repair',
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
      'Call or text and we will tell you honestly where you land in the day. Something actively causing damage, like a burst line, a sewage backup or no water in the house, moves to the front of the schedule.',
  },
  {
    question: 'Do you handle emergencies?',
    answer:
      'Yes, during our working hours. We are not a 24 hour call center, so if something breaks overnight, shut the water off at the main and call us first thing. We will talk you through it on the phone and get you on the schedule that day.',
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
  {
    value: 'In writing',
    label: 'Workmanship warranty',
    detail: 'Every repair, documented and covered',
  },
  { value: '10', label: 'Cities served', detail: 'Across the Treasure Valley' },
  { value: '$0', label: 'For an estimate', detail: 'Price before the wrench comes out' },
  { value: '100%', label: 'Licensed & insured', detail: 'Idaho state licensed, fully covered' },
];
