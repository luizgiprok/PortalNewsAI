'use client'

import { useState, useEffect } from 'react'
import { NewsItem } from '@/types'

interface NewsAPIResponse {
  success: boolean
  data: NewsItem[]
  total: number
  cache?: {
    isCached: boolean
    lastUpdate: number
    cacheAge: number
    newsCount: number
  }
}

export function useNewsAPI(category?: string, limit?: number) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cacheStatus, setCacheStatus] = useState<{ isCached: boolean; age: number }>({
    isCached: false,
    age: 0
  })

  const fetchNews = async (forceRefresh = false) => {
    try {
      setLoading(true)
      setError(null)
      
      let url = '/api/news'
      const params = new URLSearchParams()
      
      if (category) {
        url = `/api/news/category/${category}`
      }
      
      if (limit) {
        params.append('limit', limit.toString())
      }
      
      if (forceRefresh) {
        params.append('refresh', 'true')
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`
      }
      
      const response = await fetch(url)
      const result: NewsAPIResponse = await response.json()
      
      if (result.success) {
        setNews(result.data)
        if (result.cache) {
          setCacheStatus({
            isCached: result.cache.isCached,
            age: result.cache.cacheAge
          })
        }
      } else {
        setError(result.error || 'Falha ao carregar notícias')
        setNews([])
      }
    } catch (err) {
      console.error('Error fetching news:', err)
      setError('Falha ao carregar notícias. Tente novamente mais tarde.')
      setNews([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
    
    // Atualizar a cada 10 minutos
    const interval = setInterval(() => fetchNews(), 10 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [category, limit])

  return { 
    news, 
    loading, 
    error, 
    cacheStatus,
    refetch: () => fetchNews(true) 
  }
}

export function useSearchNewsAPI() {
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
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const result = await response.json()
      
      if (result.success) {
        setNews(result.data)
      } else {
        setError(result.error || 'Falha na busca')
        setNews([])
      }
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