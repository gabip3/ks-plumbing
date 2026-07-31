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
    image: `${site.url}/assets/og/og-cover.jpg`,
    priceRange: '$$',
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
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
    availableLanguage: 'English',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Plumbing services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.body },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
