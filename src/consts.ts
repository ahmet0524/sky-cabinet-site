// Business facts live here once. Change them here, never in a page.
export const SITE_URL = 'https://www.skycabinetva.com';

export const BIZ = {
  name: 'SKY Cabinet Kitchen & Bath',
  shortName: 'SKY Cabinet',
  legalName: 'KLF Trading LLC',
  street: '3101 Lafayette Blvd',
  city: 'Norfolk',
  region: 'VA',
  zip: '23509',
  phoneDisplay: '(757) 797-9004',
  phoneTel: '+17577979004',
  phoneSchema: '+1-757-797-9004',
  email: 'info@skycabinetva.com',
  hours: 'Mon–Sat, 9 am – 6 pm',
  instagram: 'https://www.instagram.com/skycabinetva/',
  instagramHandle: '@skycabinetva',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=3101+Lafayette+Blvd+Norfolk+VA+23509',
  cities: ['Norfolk', 'Virginia Beach', 'Chesapeake', 'Portsmouth', 'Suffolk', 'Hampton', 'Newport News', 'Williamsburg'],
};

export const DEFAULT_DESCRIPTION =
  'Kitchen cabinets, bathroom vanities and closets from our Norfolk, VA showroom. Free 3D design, free door samples and professional installation across Hampton Roads.';

export const OG_IMAGE = `${SITE_URL}/img/og.jpg`;

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#business`,
  name: BIZ.name,
  legalName: BIZ.legalName,
  description: DEFAULT_DESCRIPTION,
  url: `${SITE_URL}/`,
  sameAs: [BIZ.instagram],
  image: OG_IMAGE,
  telephone: BIZ.phoneSchema,
  email: BIZ.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BIZ.street,
    addressLocality: BIZ.city,
    addressRegion: BIZ.region,
    postalCode: BIZ.zip,
    addressCountry: 'US',
  },
  hasMap: BIZ.mapsUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  areaServed: BIZ.cities.map((c) => ({ '@type': 'City', name: `${c}, VA` })),
  knowsAbout: ['Kitchen cabinets', 'Bathroom vanities', 'Closets and pantries', 'Countertops', 'Kitchen remodeling', 'Cabinet installation'],
};
