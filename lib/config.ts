import { NewsSource, NewsItem } from '@/types'

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: 'newsapi',
    name: 'NewsAPI',
    type: 'api',
    url: 'https://newsapi.org/v2/everything',
    enabled: true,
    category: 'geral',
    lastSync: new Date().toISOString()
  },
  {
    id: 'google-news',
    name: 'Google News RSS',
    type: 'rss',
    url: 'https://news.google.com/rss',
    enabled: true,
    category: 'geral',
    lastSync: new Date().toISOString()
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    type: 'rss',
    url: 'https://techcrunch.com/feed/',
    enabled: true,
    category: 'tecnologia',
    lastSync: new Date().toISOString()
  },
  {
    id: 'bbc-news',
    name: 'BBC News',
    type: 'rss',
    url: 'http://feeds.bbci.co.uk/news/rss.xml',
    enabled: true,
    category: 'internacional',
    lastSync: new Date().toISOString()
  }
]

export const CATEGORIES = [
  { id: 'geral', name: 'Geral', color: 'blue' },
  { id: 'tecnologia', name: 'Tecnologia', color: 'purple' },
  { id: 'politica', name: 'Política', color: 'red' },
  { id: 'esportes', name: 'Esportes', color: 'green' },
  { id: 'economia', name: 'Economia', color: 'yellow' },
  { id: 'saude', name: 'Saúde', color: 'pink' },
  { id: 'entretenimento', name: 'Entretenimento', color: 'indigo' },
  { id: 'internacional', name: 'Internacional', color: 'gray' }
]

export const SEO_CONFIG = {
  title: 'PortalNewsAI - Notícias Inteligentes com IA',
  description: 'Seu portal de notícias com inteligência artificial. Conteúdo atualizado, análise preditiva e personalização inteligente.',
  keywords: ['notícias', 'ia', 'inteligência artificial', 'portal de notícias', 'tecnologia', 'política', 'esportes'],
  ogImage: '/images/og-image.jpg'
}

export const NEWSLETTER_CONFIG = {
  provider: 'resend' as const,
  fromEmail: 'news@portalnewsai.com',
  listId: 'subscribers',
  frequency: 'daily' as const,
  unsubscribeUrl: '/unsubscribe'
}