import { UserPreferences, NewsletterSegment, NewsletterCampaign, NewsletterStats } from '@/types/newsletter'

export class NewsletterService {
  private users: UserPreferences[] = []
  private segments: NewsletterSegment[] = []
  private campaigns: NewsletterCampaign[] = []

  constructor() {
    this.initializeDefaultSegments()
    this.loadMockData()
  }

  // User Preferences Management
  async getUserPreferences(email: string): Promise<UserPreferences | null> {
    return this.users.find(user => user.email === email) || null
  }

  async updateUserPreferences(email: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    let user = this.users.find(u => u.email === email)
    
    if (!user) {
      user = this.createNewUser(email, preferences)
      this.users.push(user)
    } else {
      Object.assign(user, preferences)
    }

    return user
  }

  async getAllUsers(): Promise<UserPreferences[]> {
    return this.users.filter(user => user.active)
  }

  async getUsersByCategory(category: string): Promise<UserPreferences[]> {
    return this.users.filter(user => 
      user.active && 
      user.categories.includes(category)
    )
  }

  async getUsersBySegment(segmentId: string): Promise<UserPreferences[]> {
    const segment = this.segments.find(s => s.id === segmentId)
    if (!segment) return []

    return this.users.filter(user => 
      user.active && 
      segment.subscribers.includes(user.id)
    )
  }

  // Segment Management
  async getAllSegments(): Promise<NewsletterSegment[]> {
    return this.segments.filter(segment => segment.active)
  }

  async createSegment(segment: Omit<NewsletterSegment, 'id' | 'subscribers'>): Promise<NewsletterSegment> {
    const newSegment: NewsletterSegment = {
      ...segment,
      id: `segment-${Date.now()}`,
      subscribers: []
    }

    this.segments.push(newSegment)
    this.updateSegmentSubscribers(newSegment)
    
    return newSegment
  }

  async updateSegment(id: string, updates: Partial<NewsletterSegment>): Promise<NewsletterSegment | null> {
    const segment = this.segments.find(s => s.id === id)
    if (!segment) return null

    Object.assign(segment, updates)
    
    if (updates.conditions) {
      this.updateSegmentSubscribers(segment)
    }

    return segment
  }

  private updateSegmentSubscribers(segment: NewsletterSegment): void {
    segment.subscribers = this.users
      .filter(user => this.userMatchesSegment(user, segment))
      .map(user => user.id)
  }

  private userMatchesSegment(user: UserPreferences, segment: NewsletterSegment): boolean {
    // Check category match
    if (!user.categories.includes(segment.category)) {
      return false
    }

    // Check keywords
    if (segment.conditions.keywords && segment.conditions.keywords.length > 0) {
      const userInterests = [...user.categories, ...user.sources]
      const hasKeyword = segment.conditions.keywords.some(keyword =>
        userInterests.some(interest => 
          interest.toLowerCase().includes(keyword.toLowerCase())
        )
      )
      if (!hasKeyword) return false
    }

    // Check sources
    if (segment.conditions.sources && segment.conditions.sources.length > 0) {
      const hasSource = segment.conditions.sources.some(source =>
        user.sources.includes(source)
      )
      if (!hasSource) return false
    }

    return true
  }

  // Campaign Management
  async createCampaign(campaign: Omit<NewsletterCampaign, 'id' | 'totalRecipients' | 'opened' | 'clicked' | 'unsubscribed'>): Promise<NewsletterCampaign> {
    const newCampaign: NewsletterCampaign = {
      ...campaign,
      id: `campaign-${Date.now()}`,
      totalRecipients: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0
    }

    this.campaigns.push(newCampaign)
    return newCampaign
  }

  async getCampaigns(): Promise<NewsletterCampaign[]> {
    return this.campaigns.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  async getCampaign(id: string): Promise<NewsletterCampaign | null> {
    return this.campaigns.find(c => c.id === id) || null
  }

  // Analytics
  async getNewsletterStats(): Promise<NewsletterStats> {
    const activeUsers = this.users.filter(user => user.active)
    const totalSubscribers = activeUsers.length
    const activeSubscribers = activeUsers.filter(user => 
      user.frequency !== 'never'
    ).length

    // Calculate engagement rates (mock data for now)
    const dailyOpenRate = 0.24 // 24%
    const clickThroughRate = 0.08 // 8%
    const unsubscribeRate = 0.02 // 2%

    // Top categories
    const categoryCounts = activeUsers.reduce((acc, user) => {
      user.categories.forEach(category => {
        acc[category] = (acc[category] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)

    const topCategories = Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([category, subscribers]) => ({ category, subscribers }))

    // Performance by segment (mock data)
    const performanceBySegment = this.segments
      .filter(segment => segment.active)
      .map(segment => ({
        segment: segment.name,
        openRate: 0.15 + Math.random() * 0.15, // 15-30%
        clickRate: 0.05 + Math.random() * 0.1  // 5-15%
      }))

    return {
      totalSubscribers,
      activeSubscribers,
      dailyOpenRate,
      clickThroughRate,
      unsubscribeRate,
      topCategories,
      performanceBySegment
    }
  }

  // Utility methods
  private createNewUser(email: string, preferences: Partial<UserPreferences>): UserPreferences {
    return {
      id: `user-${Date.now()}`,
      email,
      name: preferences.name || '',
      categories: preferences.categories || [],
      sources: preferences.sources || [],
      frequency: preferences.frequency || 'weekly',
      timeToSend: preferences.timeToSend || '09:00',
      active: preferences.active ?? true,
      createdAt: new Date().toISOString(),
      lastSent: '',
      engagement: {
        opened: 0,
        clicked: 0,
        unsubscribed: 0
      }
    }
  }

  private initializeDefaultSegments(): void {
    this.segments = [
      {
        id: 'segment-breaking',
        name: 'Notícias Urgentes',
        description: 'Notícias quebreaking e importantes',
        category: 'geral',
        conditions: {
          priority: 'high'
        },
        active: true,
        subscribers: []
      },
      {
        id: 'segment-tech',
        name: 'Tecnologia e IA',
        description: 'Inovações tecnológicas e inteligência artificial',
        category: 'tecnologia',
        conditions: {
          keywords: ['tecnologia', 'ia', 'inovação', 'digital']
        },
        active: true,
        subscribers: []
      },
      {
        id: 'segment-business',
        name: 'Negócios e Economia',
        description: 'Mercado financeiro e oportunidades de negócio',
        category: 'economia',
        conditions: {
          keywords: ['economia', 'negócios', 'finanças', 'mercado']
        },
        active: true,
        subscribers: []
      },
      {
        id: 'segment-sports',
        name: 'Esportes',
        description: 'Notícias esportivas e resultados',
        category: 'esportes',
        conditions: {
          keywords: ['esporte', 'futebol', 'jogos', 'olímpico']
        },
        active: true,
        subscribers: []
      }
    ]
  }

  private loadMockData(): void {
    // Load mock users for testing
    const mockUsers: UserPreferences[] = [
      {
        id: 'user-1',
        email: 'joao.silva@example.com',
        name: 'João Silva',
        categories: ['tecnologia', 'esportes'],
        sources: ['G1', 'TecMundo'],
        frequency: 'daily',
        timeToSend: '08:00',
        active: true,
        createdAt: new Date().toISOString(),
        lastSent: '',
        engagement: { opened: 15, clicked: 3, unsubscribed: 0 }
      },
      {
        id: 'user-2',
        email: 'maria.santos@example.com',
        name: 'Maria Santos',
        categories: ['economia', 'politica'],
        sources: ['Folha', 'CNN Brasil'],
        frequency: 'weekly',
        timeToSend: '09:00',
        active: true,
        createdAt: new Date().toISOString(),
        lastSent: '',
        engagement: { opened: 8, clicked: 2, unsubscribed: 0 }
      },
      {
        id: 'user-3',
        email: 'carlos.oliveira@example.com',
        name: 'Carlos Oliveira',
        categories: ['tecnologia', 'ciencia'],
        sources: ['Estadão', 'TechTudo'],
        frequency: 'breaking',
        timeToSend: '07:00',
        active: true,
        createdAt: new Date().toISOString(),
        lastSent: '',
        engagement: { opened: 25, clicked: 5, unsubscribed: 0 }
      }
    ]

    this.users = mockUsers

    // Update segment subscribers
    this.segments.forEach(segment => {
      this.updateSegmentSubscribers(segment)
    })
  }
}