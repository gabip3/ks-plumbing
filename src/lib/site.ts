/**
 * Single source of truth for business data.
 * Change it here and it propagates to the UI, the metadata and the JSON-LD.
 */

export const site = {
  name: 'KS Plumbing',
  legalName: 'KS Plumbing LLC',
  tagline: 'Fast. Reliable. Done right.',
  motto: 'We show up. We solve it. You relax.',
  /**
   * Public address of the site, including any subfolder. Drives the canonical
   * tag, Open Graph URLs, robots.txt and sitemap.xml.
   *
   * The GitHub Pages workflow overrides it with NEXT_PUBLIC_SITE_URL, so when
   * the custom domain is attached there is one value to change, in one place.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ksplumbingidaho.com',
  phone: {
    display: '(986) 280-9087',
    href: 'tel:+19862809087',
    sms: 'sms:+19862809087',
    e164: '+19862809087',
  },
  email: 'ksplumbingidaho@gmail.com',
  address: {
    city: 'Boise',
    region: 'ID',
    regionName: 'Idaho',
    postalCode: '83702',
    country: 'US',
  },
  geo: { lat: 43.615, lng: -116.2023 },
  /** Confirmed by the client. */
  hours: [
    { label: 'Monday to Friday', value: '8:00 AM to 5:00 PM' },
    { label: 'Saturday & Sunday', value: 'Closed' },
  ],
  credentials: ['Licensed & insured in Idaho', 'Free estimates', 'Workmanship warranty'],
} as const;

export const navigation = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#gallery' },
  { label: 'Areas', href: '#areas' },
  { label: 'Contact', href: '#contact' },
] as const;
