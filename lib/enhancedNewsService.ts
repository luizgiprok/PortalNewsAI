import { NewsItem } from '@/types'
import { NewsAPIService } from './newsAPIService'
import { RSSNewsService } from './rssNewsService'

export class EnhancedNewsService {
  private newsAPIService: NewsAPIService
  private rssNewsService: RSSNewsService

  constructor(newsApiKey?: string) {
    this.newsAPIService = new NewsAPIService(newsApiKey || '')
    this.rssNewsService = new RSSNewsService()
  }

  async fetchAllNews(): Promise<NewsItem[]> {
    try {
      // Buscar de ambas as fontes em paralelo
      const [apiNews, rssNews] = await Promise.all([
        this.newsAPIService.fetchEverything('technology OR business OR politics', 'pt'),
        this.rssNewsService.fetchAllNews()
      ])

      // Combinar e remover duplicatas
      const combinedNews = [...apiNews, ...rssNews]
      const uniqueNews = this.removeDuplicates(combinedNews)

      // Ordenar por data (mais recentes primeiro)
      return uniqueNews.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    } catch (error) {
      console.error('Error fetching news from all sources:', error)
      // Fallback para RSS apenas
      return this.rssNewsService.fetchAllNews()
    }
  }

  async fetchByCategory(category: string): Promise<NewsItem[]> {
    try {
      const [apiNews, rssNews] = await Promise.all([
        this.newsAPIService.fetchByCategory(category),
        this.rssNewsService.fetchByCategory(category)
      ])

      const combinedNews = [...apiNews, ...rssNews]
      return this.removeDuplicates(combinedNews)
    } catch (error) {
      console.error(`Error fetching news for category ${category}:`, error)
      return this.rssNewsService.fetchByCategory(category)
    }
  }

  async searchNews(query: string): Promise<NewsItem[]> {
    try {
      const [apiNews, rssNews] = await Promise.all([
        this.newsAPIService.fetchEverything(query, 'pt'),
        this.rssNewsService.searchNews(query)
      ])

      const combinedNews = [...apiNews, ...rssNews]
      return this.removeDuplicates(combinedNews)
    } catch (error) {
      console.error(`Error searching news for query ${query}:`, error)
      return this.rssNewsService.searchNews(query)
    }
  }

  async getFeaturedNews(): Promise<NewsItem[]> {
    try {
      const allNews = await this.fetchAllNews()
      return allNews.filter(news => news.featured).slice(0, 5)
    } catch (error) {
      console.error('Error fetching featured news:', error)
      return []
    }
  }

  async getLatestNews(limit: number = 10): Promise<NewsItem[]> {
    try {
      const allNews = await this.fetchAllNews()
      return allNews.slice(0, limit)
    } catch (error) {
      console.error('Error fetching latest news:', error)
      return []
    }
  }

  async getNewsBySource(source: string): Promise<NewsItem[]> {
    try {
      const allNews = await this.fetchAllNews()
      return allNews.filter(news => 
        news.source.toLowerCase().includes(source.toLowerCase())
      )
    } catch (error) {
      console.error(`Error fetching news for source ${source}:`, error)
      return []
    }
  }

  private removeDuplicates(news: NewsItem[]): NewsItem[] {
    const seen = new Set()
    return news.filter(item => {
      // Cria uma chave única baseada no título e fonte
      const key = `${item.title.toLowerCase().substring(0, 50)}-${item.source.toLowerCase()}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }

  // Método para obter estatísticas das fontes
  async getSourceStatistics(): Promise<{
    totalNews: number
    sources: Record<string, number>
    categories: Record<string, number>
  }> {
    try {
      const allNews = await this.fetchAllNews()
      
      const sources: Record<string, number> = {}
      const categories: Record<string, number> = {}

      allNews.forEach(news => {
        sources[news.source] = (sources[news.source] || 0) + 1
        categories[news.category] = (categories[news.category] || 0) + 1
      })

      return {
        totalNews: allNews.length,
        sources,
        categories
      }
    } catch (error) {
      console.error('Error getting source statistics:', error)
      return {
        totalNews: 0,
        sources: {},
        categories: {}
      }
    }
  }
}