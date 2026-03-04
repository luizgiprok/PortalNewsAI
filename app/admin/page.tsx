'use client'

import { useState, useEffect } from 'react'
import { useNewsletter } from '@/hooks/useNewsletter'
import { NewsletterStats } from '@/types/newsletter'

export default function AdminDashboard() {
  const { 
    loading, 
    error, 
    segments, 
    stats, 
    getSegments, 
    getStats,
    createSegment 
  } = useNewsletter()
  
  const [statsLoading, setStatsLoading] = useState(false)

  const [newSegment, setNewSegment] = useState({
    name: '',
    description: '',
    category: 'geral',
    conditions: { keywords: [], sources: [] }
  })

  const handleCreateSegment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createSegment(newSegment)
      setNewSegment({
        name: '',
        description: '',
        category: 'geral',
        conditions: { keywords: [], sources: [] }
      })
      getSegments() // Refresh segments
    } catch (err) {
      console.error('Error creating segment:', err)
    }
  }

  useEffect(() => {
    getSegments()
    setStatsLoading(true)
    getStats().finally(() => setStatsLoading(false))
  }, [])

  if (loading && statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p>Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard de Newsletter
          </h1>
          <p className="text-gray-600">
            Gerencie sua base de inscritos e campanhas
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Inscritos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalSubscribers.toLocaleString() || '0'}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inscritos Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.activeSubscribers.toLocaleString() || '0'}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-green-600 text-xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taxa de Abertura</p>
                <p className="text-2xl font-bold text-purple-600">
                  {((stats?.dailyOpenRate || 0) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-purple-600 text-xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taxa de Cliques</p>
                <p className="text-2xl font-bold text-orange-600">
                  {((stats?.clickThroughRate || 0) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <span className="text-orange-600 text-xl">🔗</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Segments */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Segmentos de Inscritos
            </h2>
            
            <div className="space-y-4">
              {segments.map((segment) => (
                <div key={segment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{segment.name}</h3>
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {segment.subscribers.length} inscritos
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{segment.description}</p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">
                      Categoria: {segment.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create Segment */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Criar Novo Segmento
            </h2>
            
            <form onSubmit={handleCreateSegment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Segmento
                </label>
                <input
                  type="text"
                  value={newSegment.name}
                  onChange={(e) => setNewSegment({...newSegment, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={newSegment.description}
                  onChange={(e) => setNewSegment({...newSegment, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={newSegment.category}
                  onChange={(e) => setNewSegment({...newSegment, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="geral">Geral</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="politica">Política</option>
                  <option value="esportes">Esportes</option>
                  <option value="economia">Economia</option>
                  <option value="saude">Saúde</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
              >
                Criar Segmento
              </button>
            </form>
          </div>
        </div>

        {/* Top Categories */}
        {stats && stats.topCategories.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Categorias Mais Populares
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.topCategories.map((category, index) => (
                <div key={category.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {category.category === 'tecnologia' && '💻'}
                      {category.category === 'politica' && '🏛️'}
                      {category.category === 'esportes' && '⚽'}
                      {category.category === 'economia' && '💰'}
                      {category.category === 'saude' && '🏥'}
                      {category.category === 'ciencia' && '🔬'}
                      {category.category === 'entretenimento' && '🎬'}
                      {category.category === 'internacional' && '🌍'}
                      {category.category === 'geral' && '📰'}
                    </span>
                    <span className="font-medium text-gray-900">
                      {category.category}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {category.subscribers} inscritos
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}