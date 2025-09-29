import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  path?: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
}

const baseUrl = 'https://toolbox-website.vercel.app' // Replace with your actual domain

export function generateMetadata({
  title,
  description,
  path = '',
  keywords = [],
  image,
  noIndex = false,
}: SEOProps): Metadata {
  const url = `${baseUrl}${path}`
  const fullTitle = title.includes('ToolBox') ? title : `${title} | ToolBox`
  
  const defaultKeywords = [
    'online tools',
    'free tools',
    'productivity',
    'study tools',
    'business tools',
    'file tools',
    'PDF tools',
    'calculators',
    'converters'
  ]
  
  const allKeywords = [...defaultKeywords, ...keywords]

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(', '),
    authors: [{ name: "ToolBox Team" }],
    creator: "ToolBox Team",
    publisher: "ToolBox",
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "ToolBox",
      title: fullTitle,
      description,
      images: [
        {
          url: image || `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image || `${baseUrl}/og-image.png`],
      creator: "@toolbox",
    },
    alternates: {
      canonical: url,
    },
  }
}

// Helper function for tool pages
export function generateToolMetadata(tool: {
  name: string
  description: string
  path: string
  category: string
}): Metadata {
  const categoryKeywords = {
    study: ['study tools', 'education', 'academic', 'student'],
    business: ['business tools', 'productivity', 'work', 'professional'],
    file: ['file tools', 'PDF tools', 'document', 'converter'],
    fun: ['fun tools', 'creative', 'entertainment', 'generator'],
    utility: ['utility tools', 'calculator', 'converter', 'daily tools']
  }

  return generateMetadata({
    title: tool.name,
    description: tool.description,
    path: tool.path,
    keywords: categoryKeywords[tool.category] || [],
  })
}

// Helper function for category pages
export function generateCategoryMetadata(category: {
  name: string
  description: string
  id: string
}): Metadata {
  return generateMetadata({
    title: category.name,
    description: category.description,
    path: `/category/${category.id}`,
    keywords: [`${category.name.toLowerCase()} tools`, 'productivity', 'online tools'],
  })
}
