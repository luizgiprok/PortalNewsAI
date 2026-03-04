'use client'

import { useState, useEffect } from 'react'
import { UserPreferences, NewsletterSegment, NewsletterStats } from '@/types/newsletter'

interface NewsletterAPIResponse {
  success: boolean
  data: any
  error?: string
}

export function useNewsletter() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // User preferences
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null)
  const [allUsers, setAllUsers] = useState<UserPreferences[]>([])

  // Segments
  const [segments, setSegments] = useState<NewsletterSegment[]>([])
  const [stats, setStats] = useState<NewsletterStats | null>(null)

  // Subscribe user
  const subscribeUser = async (email: string, preferences: Partial<UserPreferences>) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'subscribe',
          email,
          preferences,
        }),
      })

      const result: NewsletterAPIResponse = await response.json()

      if (result.success) {
        setUserPreferences(result.data)
        return result.data
      } else {
        throw new Error(result.error || 'Falha ao inscrever usuário')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Get user preferences
  const getUserPreferences = async (email: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/newsletter?email=${encodeURIComponent(email)}`)
      const result: NewsletterAPIResponse = await response.json()

      if (result.success) {
        setUserPreferences(result.data)
        return result.data
      } else {
        throw new Error(result.error || 'Usuário não encontrado')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Get all users
  const getAllUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/newsletter')
      const result: NewsletterAPIResponse = await response.json()

      if (result.success) {
        setAllUsers(result.data)
        return result.data
      } else {
        throw new Error(result.error || 'Falha ao buscar usuários')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Create segment
  const createSegment = async (segment: Omit<NewsletterSegment, 'id' | 'subscribers'>) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create_segment',
          segment,
        }),
      })

      const result: NewsletterAPIResponse = await response.json()

      if (result.success) {
        // Refresh segments
        await getSegments()
        return result.data
      } else {
        throw new Error(result.error || 'Falha ao criar segmento')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Get segments
  const getSegments = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/newsletter')
      const result: NewsletterAPIResponse = await response.json()

      if (result.success) {
        setSegments(result.data)
        return result.data
      } else {
        throw new Error(result.error || 'Falha ao buscar segmentos')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Get newsletter stats
  const getStats = async () => {
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

      const result: NewsletterAPIResponse = await response.json()

      if (result.success) {
        setStats(result.data)
        return result.data
      } else {
        throw new Error(result.error || 'Falha ao buscar estatísticas')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Initialize
  useEffect(() => {
    getSegments()
    getStats()
  }, [])

  // Export stats for direct use
  const useNewsletterStats = () => {
    return { stats, loading: loading, error }
  }

  export { useNewsletterStats }

  return {
    // State
    loading,
    error,
    userPreferences,
    allUsers,
    segments,
    stats,

    // Actions
    subscribeUser,
    getUserPreferences,
    getAllUsers,
    createSegment,
    getSegments,
    getStats,

    // Reset error
    clearError: () => setError(null),
  }
}