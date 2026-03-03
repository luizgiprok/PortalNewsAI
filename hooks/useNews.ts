'use client'

import { useState, useEffect } from 'react'
import { NewsItem } from '@/types'
import { CachedNewsService } from '@/lib/cachedNewsService'

// Instância global do serviço de notícias
let newsServiceInstance: CachedNewsService | null = null

function getNewsService(): CachedNewsService {
  if (!newsServiceInstance) {
    newsServiceInstance = new CachedNewsService(
      process.env.NEWS_API_KEY || ''
    )
  }
  return newsServiceInstance
}

export function useNews(category?: string, limit?: number) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const service = getNewsService()
        let fetchedNews: NewsItem[] = []
        
        if (category) {
          fetchedNews = await service.getNewsByCategory(category)
        } else if (limit) {
          fetchedNews = await service.getLatestNews(limit)
        } else {
          fetchedNews = await service.getNews()
        }
        
        setNews(fetchedNews)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError('Falha ao carregar notícias. Tente novamente mais tarde.')
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
    
    // Atualizar a cada 10 minutos
    const interval = setInterval(fetchNews, 10 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [category, limit])

  return { news, loading, error, refetch: () => getNewsService().clearCache() }
}

export function useSearchNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string) => {
    if (!query.trim()) {
      setNews([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const service = getNewsService()
      const results = await service.searchNews(query)
      setNews(results)
    } catch (err) {
      console.error('Error searching news:', err)
      setError('Falha na busca. Tente novamente.')
      setNews([])
    } finally {
      setLoading(false)
    }
  }

  return { news, loading, error, search }
}

export function useLatestNews(limit = 10) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const service = getNewsService()
        const latest = await service.getLatestNews(limit)
        setNews(latest)
      } catch (err) {
        console.error('Error fetching latest news:', err)
        setError('Falha ao carregar notícias mais recentes.')
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchLatestNews()
    
    // Atualizar a cada 10 minutos
    const interval = setInterval(fetchLatestNews, 10 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [limit])

  return { news, loading, error }
}

export function useFeaturedNews() {
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const service = getNewsService()
        const news = await service.getFeaturedNews()
        setFeaturedNews(news)
      } catch (err) {
        console.error('Error fetching featured news:', err)
        setError('Falha ao carregar notícias em destaque.')
        setFeaturedNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedNews()
    
    // Atualizar a cada 15 minutos para notícias em destaque
    const interval = setInterval(fetchFeaturedNews, 15 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return { featuredNews, loading, error }
}