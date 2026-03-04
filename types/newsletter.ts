export interface UserPreferences {
  id: string
  email: string
  name: string
  categories: string[]
  sources: string[]
  frequency: 'daily' | 'weekly' | 'breaking' | 'never'
  timeToSend: string // HH:mm format
  active: boolean
  createdAt: string
  lastSent: string
  engagement: {
    opened: number
    clicked: number
    unsubscribed: number
  }
}

export interface NewsletterSegment {
  id: string
  name: string
  description: string
  category: string
  conditions: {
    keywords?: string[]
    sources?: string[]
    dateRange?: {
      from: string
      to: string
    }
    priority?: 'high' | 'medium' | 'low'
  }
  active: boolean
  subscribers: string[]
}

export interface NewsletterCampaign {
  id: string
  name: string
  subject: string
  content: string
  segments: string[]
  scheduledFor: string
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
  totalRecipients: number
  opened: number
  clicked: number
  unsubscribed: number
  createdAt: string
  sentAt?: string
}

export interface NewsletterStats {
  totalSubscribers: number
  activeSubscribers: number
  dailyOpenRate: number
  clickThroughRate: number
  unsubscribeRate: number
  topCategories: Array<{
    category: string
    subscribers: number
  }>
  performanceBySegment: Array<{
    segment: string
    openRate: number
    clickRate: number
  }>
}