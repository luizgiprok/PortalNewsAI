import axios from 'axios'
import RSSParser from 'rss-parser'
import { NewsItem, NewsSource } from '@/types'
import { NEWS_SOURCES } from './config'

const rssParser = new RSSParser()

export class NewsService {
  private sources: NewsSource[]

  constructor() {
    this.sources = NEWS_SOURCES
  }

  async fetchNewsFromSource(source: NewsSource): Promise<NewsItem[]> {
    try {
      switch (source.type) {
        case 'api':
          return this.fetchFromApi(source)
        case 'rss':
          return this.fetchFromRSS(source)
        case 'scraping':
          return this.fetchFromScraping(source)
        default:
          return []
      }
    } catch (error) {
      console.error(`Erro ao buscar notícias de ${source.name}:`, error)
      return []
    }
  }

  private async fetchFromApi(source: NewsSource): Promise<NewsItem[]> {
    // Exemplo com NewsAPI (você precisará de uma chave de API gratuita)
    if (source.id === 'newsapi') {
      try {
        const response = await axios.get(source.url, {
          params: {
            q: 'technology OR business OR politics',
            sortBy: 'publishedAt',
            language: 'pt',
            pageSize: 10,
            apiKey: process.env.NEWS_API_KEY || 'demo-key'
          }
        })

        return response.data.articles.map((article: any, index: number) => ({
          id: `${source.id}-${index}`,
          title: article.title,
          excerpt: article.description || article.content?.substring(0, 200) + '...',
          content: article.content || '',
          image: article.urlToImage || `https://picsum.photos/seed/${source.id}-${index}/400/250.jpg`,
          category: source.category,
          author: article.author || 'PortalNewsAI',
          date: article.publishedAt || new Date().toISOString(),
          url: article.url,
          source: source.name,
          tags: this.extractTags(article.title, article.description),
          seoTitle: article.title,
          seoDescription: article.description
        }))
      } catch (error) {
        console.error('Erro ao acessar NewsAPI:', error)
        // Retorna dados mockados como fallback
        return this.getMockNews(source.category, source.name)
      }
    }

    return []
  }

  private async fetchFromRSS(source: NewsSource): Promise<NewsItem[]> {
    try {
      const feed = await rssParser.parseURL(source.url)
      
      return feed.items.slice(0, 10).map((item, index) => ({
        id: `${source.id}-${index}`,
        title: item.title || '',
        excerpt: item.contentSnippet || item.content?.substring(0, 200) + '...',
        content: item.content || '',
        image: this.extractImageFromContent(item.content),
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
      console.error(`Erro ao processar RSS ${source.name}:`, error)
      return this.getMockNews(source.category, source.name)
    }
  }

  private async fetchFromScraping(source: NewsSource): Promise<NewsItem[]> {
    // Implementação futura de web scraping
    return this.getMockNews(source.category, source.name)
  }

  private extractImageFromContent(content: string): string {
    if (!content) return `https://picsum.photos/seed/default/400/250.jpg`
    
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/)
    return imgMatch ? imgMatch[1] : `https://picsum.photos/seed/default/400/250.jpg`
  }

  private extractTags(title: string, content: string): string[] {
    const text = `${title} ${content}`.toLowerCase()
    const commonTags = ['tecnologia', 'política', 'esportes', 'economia', 'saúde', 'educação']
    
    return commonTags.filter(tag => text.includes(tag))
  }

  private getMockNews(category: string, source: string): NewsItem[] {
    const mockTitles = [
      'Inovação tecnológica revoluciona indústria',
      'Novas políticas públicas impactam mercado',
      'Esportes: equipe nacional se destaca',
      'Economia mostra sinais de recuperação',
      'Saúde: avanços na medicina moderna'
    ]

    return mockTitles.map((title, index) => ({
      id: `${source}-mock-${index}`,
      title,
      excerpt: `Notícia de última hora sobre ${category.toLowerCase()} com informações exclusivas e atualizadas.`,
      content: `Contúdo completo da notícia sobre ${category.toLowerCase()}...`,
      image: `https://picsum.photos/seed/${source}-${index}/400/250.jpg`,
      category,
      author: 'PortalNewsAI',
      date: new Date().toISOString(),
      url: '#',
      source,
      tags: [category, 'notícia', 'atualização']
    }))
  }

  async fetchAllNews(): Promise<NewsItem[]> {
    const allNews: NewsItem[] = []
    
    for (const source of this.sources.filter(s => s.enabled)) {
      const news = await this.fetchNewsFromSource(source)
      allNews.push(...news)
    }

    // Ordenar por data (mais recentes primeiro)
    return allNews.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  async fetchNewsByCategory(category: string): Promise<NewsItem[]> {
    const allNews = await this.fetchAllNews()
    return allNews.filter(news => news.category === category)
  }

  async searchNews(query: string): Promise<NewsItem[]> {
    const allNews = await this.fetchAllNews()
    const lowercaseQuery = query.toLowerCase()
    
    return allNews.filter(news => 
      news.title.toLowerCase().includes(lowercaseQuery) ||
      news.excerpt.toLowerCase().includes(lowercaseQuery) ||
      news.content.toLowerCase().includes(lowercaseQuery) ||
      news.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }
}