import { NewsItem, NewsSource } from '@/types'

export class NewsAPIService {
  private apiKey: string
  private baseUrl: string = 'https://newsapi.org/v2'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async fetchTopHeadlines(category: string = 'general', language: string = 'pt'): Promise<NewsItem[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/top-headlines?` +
        new URLSearchParams({
          category,
          language,
          apiKey: this.apiKey,
          pageSize: 20,
          sortBy: 'publishedAt'
        })
      )

      if (!response.ok) {
        throw new Error(`NewsAPI error: ${response.status}`)
      }

      const data = await response.json()
      return this.transformNewsItems(data.articles)
    } catch (error) {
      console.error('Error fetching NewsAPI headlines:', error)
      return []
    }
  }

  async fetchEverything(query: string, language: string = 'pt'): Promise<NewsItem[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/everything?` +
        new URLSearchParams({
          q: query,
          language,
          apiKey: this.apiKey,
          pageSize: 20,
          sortBy: 'publishedAt',
          domains: 'g1.globo.com,folha.uol.com.br,estadao.com.br,techmundo.com.br'
        })
      )

      if (!response.ok) {
        throw new Error(`NewsAPI error: ${response.status}`)
      }

      const data = await response.json()
      return this.transformNewsItems(data.articles)
    } catch (error) {
      console.error('Error fetching NewsAPI everything:', error)
      return []
    }
  }

  async fetchByCategory(category: string): Promise<NewsItem[]> {
    const categoryMap: Record<string, string> = {
      'tecnologia': 'technology',
      'politica': 'politics',
      'esportes': 'sports',
      'negocios': 'business',
      'saude': 'health',
      'entretenimento': 'entertainment',
      'ciencia': 'science',
      'geral': 'general'
    }

    const apiCategory = categoryMap[category] || 'general'
    return await this.fetchTopHeadlines(apiCategory)
  }

  private transformNewsItems(articles: any[]): NewsItem[] {
    if (!articles || !Array.isArray(articles)) {
      return []
    }

    return articles
      .filter(article => article.title && article.url)
      .map((article, index) => ({
        id: `newsapi-${Date.now()}-${index}`,
        title: article.title || 'Sem título',
        excerpt: article.description || article.content?.substring(0, 200) + '...' || '',
        content: article.content || '',
        image: article.urlToImage || this.generateFallbackImage(),
        category: this.extractCategory(article),
        author: article.author || 'PortalNewsAI',
        date: article.publishedAt || new Date().toISOString(),
        url: article.url,
        source: article.source?.name || 'NewsAPI',
        tags: this.extractTags(article.title, article.description),
        seoTitle: article.title,
        seoDescription: article.description,
        featured: this.isFeatured(article)
      }))
  }

  private generateFallbackImage(): string {
    const seeds = ['news', 'technology', 'business', 'politics', 'sports']
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)]
    return `https://picsum.photos/seed/${randomSeed}/400/250.jpg`
  }

  private extractCategory(article: any): string {
    const categories = ['technology', 'politics', 'sports', 'business', 'health', 'entertainment', 'science']
    const title = (article.title || '').toLowerCase()
    
    for (const category of categories) {
      if (title.includes(category)) {
        return category
      }
    }
    
    return 'geral'
  }

  private extractTags(title: string, description: string): string[] {
    const text = `${title} ${description}`.toLowerCase()
    const tags = []
    
    if (text.includes('tecnologia') || text.includes('tech')) tags.push('tecnologia')
    if (text.includes('política') || text.includes('politic')) tags.push('política')
    if (text.includes('esporte') || text.includes('futebol')) tags.push('esportes')
    if (text.includes('economia') || text.includes('finança')) tags.push('economia')
    if (text.includes('saúde') || text.includes('medicina')) tags.push('saúde')
    if (text.includes('ciência')) tags.push('ciência')
    
    return tags.length > 0 ? tags : ['notícias']
  }

  private isFeatured(article: any): boolean {
    const title = (article.title || '').toLowerCase()
    const keywords = ['breaking', 'exclusivo', 'urgente', 'importante']
    
    return keywords.some(keyword => title.includes(keyword))
  }
}