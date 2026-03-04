'use client'

import { useState, useEffect } from 'react'
import { NewsletterStats } from '@/types/newsletter'

export function useNewsletterStats() {
  const [stats, setStats] = useState<NewsletterStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'get_stats',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStats(result.data)
      } else {
        throw new Error(result.error || 'Falha ao buscar estatísticas')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    
    // Atualizar a cada 5 minutos
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return { stats, loading, error, refetch: fetchStats }
}