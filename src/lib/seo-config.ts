// SEO Configuration for ToolBox
export const seoConfig = {
  // Site Information
  siteName: 'ToolBox',
  siteUrl: 'https://toolbox-website.vercel.app', // Replace with your actual domain
  siteDescription: 'Access 25+ free online tools for studying, business, file management, and daily tasks. No registration required, no hidden costs.',
  
  // Default SEO Settings
  defaultTitle: 'ToolBox - All-in-One Digital Toolbox',
  defaultDescription: 'Access 25+ free online tools for studying, business, file management, and daily tasks. No registration required, no hidden costs.',
  
  // Keywords by Category
  categoryKeywords: {
    study: ['study tools', 'education', 'academic', 'student', 'GPA calculator', 'grade calculator', 'citation generator', 'flashcard maker', 'math solver'],
    business: ['business tools', 'productivity', 'work', 'professional', 'invoice generator', 'todo list', 'expense tracker', 'QR code generator', 'text to PDF'],
    file: ['file tools', 'PDF tools', 'document', 'converter', 'merge PDF', 'split PDF', 'compress PDF', 'image converter', 'video compressor'],
    fun: ['fun tools', 'creative', 'entertainment', 'generator', 'meme generator', 'name generator', 'password generator', 'idea generator'],
    utility: ['utility tools', 'calculator', 'converter', 'daily tools', 'unit converter', 'currency converter', 'BMI calculator', 'mortgage calculator']
  },
  
  // Social Media
  social: {
    twitter: '@toolbox',
    facebook: 'toolbox',
    instagram: 'toolbox'
  },
  
  // Analytics (replace with your actual IDs)
  analytics: {
    googleAnalytics: 'GA_MEASUREMENT_ID', // Replace with your GA4 measurement ID
    googleTagManager: 'GTM_ID', // Replace with your GTM ID
  },
  
  // Search Console
  searchConsole: {
    googleSiteVerification: 'your-google-verification-code', // Replace with your verification code
  },
  
  // Structured Data
  structuredData: {
    organization: {
      name: 'ToolBox',
      url: 'https://toolbox-website.vercel.app',
      logo: 'https://toolbox-website.vercel.app/logo.png',
      description: 'A comprehensive collection of free online tools for productivity and daily tasks.',
      sameAs: [
        'https://twitter.com/toolbox',
        'https://facebook.com/toolbox',
        'https://instagram.com/toolbox'
      ]
    },
    website: {
      name: 'ToolBox',
      url: 'https://toolbox-website.vercel.app',
      description: 'Access 25+ free online tools for studying, business, file management, and daily tasks.',
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      author: {
        name: 'ToolBox Team',
        url: 'https://toolbox-website.vercel.app'
      }
    }
  }
};

// Helper function to get category-specific keywords
export function getCategoryKeywords(category: string): string[] {
  return seoConfig.categoryKeywords[category] || [];
}

// Helper function to generate structured data
export function generateStructuredData(type: 'organization' | 'website', data?: any) {
  const baseData = seoConfig.structuredData[type];
  return {
    '@context': 'https://schema.org',
    ...baseData,
    ...data
  };
}
