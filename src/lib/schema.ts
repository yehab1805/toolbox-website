import { tools, categories } from './tools';

export interface SchemaItem {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export function generateWebsiteSchema(): SchemaItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PDF Tools Online - Free PDF Editor & Converter',
    description: 'Free online PDF tools for editing, converting, merging, splitting, and managing PDF documents. No registration required.',
    url: 'https://toolbox-website.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://toolbox-website.vercel.app/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PDF Tools Online',
      url: 'https://toolbox-website.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://toolbox-website.vercel.app/logo.png'
      }
    }
  };
}

export function generateOrganizationSchema(): SchemaItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PDF Tools Online',
    description: 'Free online PDF tools for editing, converting, and managing PDF documents.',
    url: 'https://toolbox-website.vercel.app',
    logo: {
      '@type': 'ImageObject',
      url: 'https://toolbox-website.vercel.app/logo.png'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://toolbox-website.vercel.app/contact'
    },
    sameAs: [
      'https://github.com/toolbox-website'
    ]
  };
}

export function generateToolSchema(tool: typeof tools[0]): SchemaItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: `https://toolbox-website.vercel.app${tool.path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'Free to use',
      'No registration required',
      'Client-side processing',
      'Secure and private'
    ],
    screenshot: `https://toolbox-website.vercel.app/screenshots/${tool.id}.png`,
    author: {
      '@type': 'Organization',
      name: 'PDF Tools Online'
    }
  };
}

export function generateCategorySchema(category: typeof categories[0]): SchemaItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `https://toolbox-website.vercel.app/category/${category.id}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: category.tools.length,
      itemListElement: category.tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: tool.name,
          description: tool.description,
          url: `https://toolbox-website.vercel.app${tool.path}`
        }
      }))
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>): SchemaItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateFAQSchema(faqs: Array<{question: string, answer: string}>): SchemaItem {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
