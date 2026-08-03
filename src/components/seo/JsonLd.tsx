import { areas, faqs, services } from '@/lib/content';
import { site } from '@/lib/site';

/**
 * Structured data. Deliberately no Review / AggregateRating markup while the
 * testimonials on the page are placeholders — publish that only once the real
 * reviews (and their sources) are in place.
 */
export function JsonLd() {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    slogan: site.tagline,
    url: site.url,
    telephone: site.phone.e164,
    email: site.email,
    logo: `${site.url}/assets/brand/ks-logo.png`,
    // Google prefers several images, and prefers them in different shapes.
    image: [
      `${site.url}/assets/og/og-cover.jpg`,
      `${site.url}/assets/gallery/project-01.webp`,
      `${site.url}/assets/gallery/project-03.webp`,
    ],
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Check, Credit Card',
    /**
     * Add the Google Business Profile and any social pages here once they
     * exist. It is the strongest single signal tying this site to the map
     * listing, which is where most plumbing calls actually come from.
     */
    sameAs: [] as string[],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: areas.map((a) => ({
      '@type': a.name === 'Treasure Valley' ? 'AdministrativeArea' : 'City',
      name: a.name === 'Treasure Valley' ? 'Treasure Valley, Idaho' : `${a.name}, Idaho`,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    availableLanguage: 'English',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Plumbing services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.body,
          serviceType: s.title,
          provider: { '@id': `${site.url}/#business` },
          // Each service is offered across the whole service area, which is
          // what lets a "water heater repair Meridian" style query match.
          areaServed: areas.map((a) => ({
            '@type': a.name === 'Treasure Valley' ? 'AdministrativeArea' : 'City',
            name: a.name === 'Treasure Valley' ? 'Treasure Valley, Idaho' : `${a.name}, Idaho`,
          })),
        },
      })),
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { '@id': `${site.url}/#business` },
    inLanguage: 'en-US',
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      {[business, website, faqPage].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify does not escape "<", so a stray "</script>" in any
          // copy string would close this tag early and inject markup. Escaping
          // the angle brackets closes that off for good.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c').replace(/>/g, '\\u003e'),
          }}
        />
      ))}
    </>
  );
}
