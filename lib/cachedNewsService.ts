import { NewsItem } from '@/types'
import { EnhancedNewsService } from './enhancedNewsService'

// Cache para melhor performance
let newsCache: NewsItem[] = []
let lastCacheUpdate = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

export class CachedNewsService {
  private newsService: EnhancedNewsService
  private isUpdating = false

  constructor(newsApiKey?: string) {
    this.newsService = new EnhancedNewsService(newsApiKey)
  }

  async getNews(forceRefresh = false): Promise<NewsItem[]> {
    // Se não for forçado refresh e cache for recente, retorna cache
    if (!forceRefresh && Date.now() - lastCacheUpdate < CACHE_DURATION) {
      return newsCache
    }

    // Se já estiver atualizando, retorna cache atual
    if (this.isUpdating) {
      return newsCache
    }

    this.isUpdating = true
    try {
      const freshNews = await this.newsService.fetchAllNews()
      newsCache = freshNews
      lastCacheUpdate = Date.now()
      return freshNews
    } catch (error) {
      console.error('Error fetching fresh news:', error)
      // Retorna cache mesmo com erro
      return newsCache
    } finally {
      this.isUpdating = false
    }
  }

  async getNewsByCategory(category: string, forceRefresh = false): Promise<NewsItem[]> {
    const allNews = await this.getNews(forceRefresh)
    return allNews.filter(news => news.category === category)
  }

  async searchNews(query: string, forceRefresh = false): Promise<NewsItem[]> {
    const allNews = await this.getNews(forceRefresh)
    const lowercaseQuery = query.toLowerCase()
    
    return allNews.filter(news => 
      news.title.toLowerCase().includes(lowercaseQuery) ||
      news.excerpt.toLowerCase().includes(lowercaseQuery) ||
      news.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  async getFeaturedNews(forceRefresh = false): Promise<NewsItem[]> {
    const allNews = await this.getNews(forceRefresh)
    return allNews.filter(news => news.featured).slice(0, 5)
  }

  async getLatestNews(limit = 10, forceRefresh = false): Promise<NewsItem[]> {
    const allNews = await this.getNews(forceRefresh)
    return allNews.slice(0, limit)
  }

  // Método para limpar cache manualmente
  clearCache(): void {
    newsCache = []
    lastCacheUpdate = 0
  }

  // Método para obter status do cache
  getCacheStatus(): {
    isCached: boolean
    lastUpdate: number
    cacheAge: number
    newsCount: number
  } {
    return {
      isCached: newsCache.length > 0,
      lastUpdate: lastCacheUpdate,
      cacheAge: Date.now() - lastCacheUpdate,
      newsCount: newsCache.length
    }
  }
}