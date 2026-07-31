import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono, Instrument_Serif, Poppins } from 'next/font/google';
import MotionRoot from '@/components/motion/MotionRoot';
import { JsonLd } from '@/components/seo/JsonLd';
import { asset } from '@/lib/paths';
import { site } from '@/lib/site';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

/** Body copy, buttons, form and every running paragraph. */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const ogImage = `${site.url}/assets/og/og-cover.jpg`;

const title = 'KS Plumbing | Plumbers in Boise, Meridian & the Treasure Valley';
const description =
  'Licensed, insured plumbers in Boise, Idaho. 24/7 emergency repairs, leak detection, drain cleaning, water heaters and repipes across the Treasure Valley. Free estimates. Call (986) 280-9087.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    'plumber Boise',
    'plumbing Boise Idaho',
    'emergency plumber Boise',
    'leak detection Boise',
    'drain cleaning Meridian',
    'water heater repair Boise',
    'repipe Treasure Valley',
    'commercial plumber Nampa',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: '/' },
  category: 'Home services',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title,
    description,
    images: [
      {
        // Absolute, because a relative URL resolves against the origin and
        // would drop the subfolder when the site is served from one.
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'KS Plumbing. Fast, reliable, done right. Boise, Idaho.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  manifest: asset('/site.webmanifest'),
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f8fa' },
    { media: '(prefers-color-scheme: dark)', color: '#050b16' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-US"
      className={`${archivo.variable} ${poppins.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
    >
      <body>
        <MotionRoot>{children}</MotionRoot>
        <JsonLd />
      </body>
    </html>
  );
}
