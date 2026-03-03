import { NewsItem } from '@/types'
import { NewsAPIService } from './newsAPIService'
import RSSParser from 'rss-parser'

const rssParser = new RSSParser()

export class RSSNewsService {
  private sources: Array<{
    name: string
    url: string
    category: string
    enabled: boolean
  }>

  constructor() {
    this.sources = [
      {
        name: 'G1',
        url: 'https://g1.globo.com/rss/g1/',
        category: 'geral',
        enabled: true
      },
      {
        name: 'Folha de S.Paulo',
        url: 'https://feeds.folha.uol.com.br/emcimadaire/',
        category: 'geral',
        enabled: true
      },
      {
        name: 'Estadão',
        url: 'https://www.estadao.com.br/rss/ultimas-noticias',
        category: 'geral',
        enabled: true
      },
      {
        name: 'TecMundo',
        url: 'https://www.tecmundo.com.br/feed',
        category: 'tecnologia',
        enabled: true
      },
      {
        name: 'TechTudo',
        url: 'https://www.techtudo.com.br/feed/',
        category: 'tecnologia',
        enabled: true
      },
      {
        name: 'UOL Esporte',
        url: 'https://esporte.uol.com.br/rss/esporte.xml',
        category: 'esportes',
        enabled: true
      },
      {
        name: 'CNN Brasil',
        url: 'https://www.cnnbrasil.com.br/rss/',
        category: 'geral',
        enabled: true
      }
    ]
  }

  async fetchAllNews(): Promise<NewsItem[]> {
    const allNews: NewsItem[] = []
    
    for (const source of this.sources.filter(s => s.enabled)) {
      try {
        const news = await this.fetchFromRSS(source)
        allNews.push(...news)
      } catch (error) {
        console.error(`Error fetching RSS from ${source.name}:`, error)
      }
    }

    // Remove duplicatas e ordena por data
    const uniqueNews = this.removeDuplicates(allNews)
    return uniqueNews.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  async fetchByCategory(category: string): Promise<NewsItem[]> {
    const allNews = await this.fetchAllNews()
    return allNews.filter(news => news.category === category)
  }

  async searchNews(query: string): Promise<NewsItem[]> {
    const allNews = await this.fetchAllNews()
    const lowercaseQuery = query.toLowerCase()
    
    return allNews.filter(news => 
      news.title.toLowerCase().includes(lowercaseQuery) ||
      news.excerpt.toLowerCase().includes(lowercaseQuery) ||
      news.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  private async fetchFromRSS(source: any): Promise<NewsItem[]> {
    try {
      const feed = await rssParser.parseURL(source.url)
      
      return feed.items.slice(0, 10).map((item, index) => ({
        id: `${source.name}-${index}-${Date.now()}`,
        title: this.cleanText(item.title || ''),
        excerpt: this.cleanText(item.contentSnippet || item.content?.substring(0, 200) + '...'),
        content: this.cleanText(item.content || ''),
        image: this.extractImage(item.content),
        category: source.category,
        author: item.creator || item.author || 'PortalNewsAI',
        date: item.pubDate || new Date().toISOString(),
        url: item.link || '#',
        source: source.name,
        tags: this.extractTags(item.title || '', item.contentSnippet || ''),
        seoTitle: item.title,
        seoDescription: item.contentSnippet
      }))
    } catch (error) {
      console.error(`RSS fetch error for ${source.name}:`, error)
      return []
    }
  }

  private cleanText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Remove espaços extras
      .trim()
  }

  private extractImage(content: string): string {
    if (!content) return `https://picsum.photos/seed/rss/400/250.jpg`
    
    // Tenta encontrar imagem no conteúdo
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/)
    if (imgMatch) {
      return imgMatch[1]
    }
    
    // Tenta encontrar imagem no link
    const urlMatch = content.match(/https:\/\/[^\s]+?\.(jpg|jpeg|png|gif)/i)
    if (urlMatch) {
      return urlMatch[0]
    }
    
    return `https://picsum.photos/seed/rss/400/250.jpg`
  }

  private extractTags(title: string, content: string): string[] {
    const text = `${title} ${content}`.toLowerCase()
    const tags = []
    
    if (text.includes('tecnologia') || text.includes('tech')) tags.push('tecnologia')
    if (text.includes('política') || text.includes('politic')) tags.push('política')
    if (text.includes('esporte') || text.includes('futebol')) tags.push('esportes')
    if (text.includes('economia') || text.includes('finança')) tags.push('economia')
    if (text.includes('saúde') || text.includes('medicina')) tags.push('saúde')
    if (text.includes('ciência')) tags.push('ciência')
    
    return tags.length > 0 ? tags : ['notícias']
  }

  private removeDuplicates(news: NewsItem[]): NewsItem[] {
    const seen = new Set()
    return news.filter(item => {
      const key = `${item.title}-${item.source}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }
}