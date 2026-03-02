export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  date: string
  url: string
  source: string
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  featured?: boolean
}

export interface NewsSource {
  id: string
  name: string
  type: 'api' | 'rss' | 'scraping'
  url: string
  apiKey?: string
  enabled: boolean
  lastSync: string
  category: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  name: string
  preferences: string[]
  createdAt: string
  verified: boolean
}

export interface SeoData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonicalUrl?: string
}

export interface AdConfig {
  enabled: boolean
  provider: 'google-adsense' | 'doubleclick' | 'custom'
  adUnits: {
    leaderboard: string
    mediumRectangle: string
    skyscraper: string
  }
}