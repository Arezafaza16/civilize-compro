interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd(company: {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    description: company.description,
    url: company.url,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressCountry: 'ID',
    },
    sameAs: [],
  };
}

export function localBusinessJsonLd(company: {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': company.url,
    name: company.name,
    description: company.description,
    url: company.url,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressCountry: 'ID',
    },
    priceRange: '$$$$',
    openingHours: 'Mo-Fr 08:00-17:00',
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceJsonLd(service: {
  name: string;
  description: string;
  url: string;
  provider: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'Organization',
      name: service.provider,
    },
  };
}

export function personJsonLd(person: {
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  url: string;
  worksFor: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    image: person.image,
    url: person.url,
    worksFor: {
      '@type': 'Organization',
      name: person.worksFor,
    },
  };
}
