'use client'

import { useState } from 'react'
import { useNewsletter } from '@/hooks/useNewsletter'
import { UserPreferences } from '@/types/newsletter'

interface NewsletterPreferencesProps {
  initialEmail?: string
  className?: string
}

export default function NewsletterPreferences({ 
  initialEmail, 
  className = '' 
}: NewsletterPreferencesProps) {
  const {
    loading,
    error,
    userPreferences,
    subscribeUser,
    clearError
  } = useNewsletter()

  const [email, setEmail] = useState(initialEmail || '')
  const [name, setName] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'breaking' | 'never'>('weekly')
  const [timeToSend, setTimeToSend] = useState('09:00')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const categories = [
    { id: 'tecnologia', name: 'Tecnologia', icon: '💻' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'esportes', name: 'Esportes', icon: '⚽' },
    { id: 'economia', name: 'Economia', icon: '💰' },
    { id: 'saude', name: 'Saúde', icon: '🏥' },
    { id: 'ciencia', name: 'Ciência', icon: '🔬' },
    { id: 'entretenimento', name: 'Entretenimento', icon: '🎬' },
    { id: 'internacional', name: 'Internacional', icon: '🌍' }
  ]

  const sources = [
    { id: 'G1', name: 'G1' },
    { id: 'Folha', name: 'Folha de S.Paulo' },
    { id: 'Estadão', name: 'Estadão' },
    { id: 'TecMundo', name: 'TecMundo' },
    { id: 'TechTudo', name: 'TechTudo' },
    { id: 'CNN Brasil', name: 'CNN Brasil' },
    { id: 'UOL', name: 'UOL' }
  ]

  const frequencies = [
    { value: 'daily', label: 'Diariamente', description: 'Receba notícias todo dia' },
    { value: 'weekly', label: 'Semanalmente', description: 'Resumo semanal' },
    { value: 'breaking', label: 'Urgentes', description: 'Apenas notícias importantes' },
    { value: 'never', label: 'Nunca', description: 'Não enviar notícias' }
  ]

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSourceToggle = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !name) {
      alert('Por favor, preencha seu nome e email')
      return
    }

    try {
      const preferences: Partial<UserPreferences> = {
        name,
        categories: selectedCategories,
        sources: selectedSources,
        frequency,
        timeToSend,
        active: true
      }

      await subscribeUser(email, preferences)
      setIsSubscribed(true)
      clearError()
    } catch (err) {
      console.error('Subscription error:', err)
    }
  }

  const handleUnsubscribe = async () => {
    try {
      await subscribeUser(email, { 
        frequency: 'never',
        active: false 
      })
      setIsSubscribed(false)
    } catch (err) {
      console.error('Unsubscribe error:', err)
    }
  }

  if (isSubscribed) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Inscrição realizada com sucesso!
          </h3>
          <p className="text-green-700 mb-4">
            Você receberá nossas notícias conforme suas preferências.
          </p>
          <button
            onClick={handleUnsubscribe}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            Cancelar Inscrição
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Personalize sua Newsletter
        </h2>
        <p className="text-gray-600">
          Escolha os temas que mais interessam a você e receba notícias personalizadas
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Informações Pessoais</h3>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Categorias de Interesse</h3>
          <p className="text-sm text-gray-600">
            Selecione os temas que você quer receber notícias
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle(category.id)}
                className={`p-4 border-2 rounded-lg text-center transition-colors ${
                  selectedCategories.includes(category.id)
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-700 hover:border-primary-300'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Fontes de Notícias</h3>
          <p className="text-sm text-gray-600">
            Escolha de quais fontes você quer receber notícias (opcional)
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sources.map((source) => (
              <label key={source.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSources.includes(source.id)}
                  onChange={() => handleSourceToggle(source.id)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{source.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Frequency */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Frequência de Envio</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {frequencies.map((freq) => (
              <label
                key={freq.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  frequency === freq.value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="frequency"
                    value={freq.value}
                    checked={frequency === freq.value}
                    onChange={() => setFrequency(freq.value as any)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{freq.label}</div>
                    <div className="text-sm text-gray-600">{freq.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Time to Send */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Horário de Envio</h3>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              Quando você prefere receber as notícias?
            </label>
            <input
              type="time"
              id="time"
              value={timeToSend}
              onChange={(e) => setTimeToSend(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processando...' : 'Inscrever-se na Newsletter'}
          </button>
        </div>
      </form>
    </div>
  )
}