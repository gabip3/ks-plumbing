/**
 * Single source of truth for business data.
 * Change it here and it propagates to the UI, the metadata and the JSON-LD.
 */

export const site = {
  name: 'KS Plumbing',
  legalName: 'KS Plumbing LLC',
  tagline: 'Fast. Reliable. Done right.',
  motto: 'We show up. We solve it. You relax.',
  /** Update to the production domain before launch — used by canonical, OG and sitemap. */
  url: 'https://ksplumbingidaho.com',
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
  hours: [
    { label: 'Monday to Friday', value: '7:00 AM to 6:00 PM' },
    { label: 'Saturday', value: '8:00 AM to 4:00 PM' },
    { label: 'Sunday', value: 'Emergency calls only' },
    { label: 'After hours', value: '24/7 emergency line' },
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
