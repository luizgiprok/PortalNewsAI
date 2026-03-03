'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Check, AlertCircle } from 'lucide-react'
import { NewsletterSubscriber } from '@/types'

interface NewsletterFormProps {
  className?: string
}

export default function NewsletterForm({ className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [preferences, setPreferences] = useState<string[]>(['geral'])

  const handlePreferenceToggle = (category: string) => {
    setPreferences(prev => 
      prev.includes(category)
        ? prev.filter(p => p !== category)
        : [...prev, category]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Aqui você integraria com seu serviço de newsletter
      // Exemplo: Resend, Mailchimp, etc.
      const subscriber: NewsletterSubscriber = {
        id: Date.now().toString(),
        email,
        name,
        preferences,
        createdAt: new Date().toISOString(),
        verified: false
      }

      // Simulação de envio
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setStatus('success')
      setEmail('')
      setName('')
      setPreferences(['geral'])
      
      // Redirecionar para página de confirmação após 3 segundos
      setTimeout(() => {
        setStatus('idle')
      }, 3000)
      
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    { id: 'geral', name: 'Notícias Gerais' },
    { id: 'tecnologia', name: 'Tecnologia & IA' },
    { id: 'politica', name: 'Política' },
    { id: 'esportes', name: 'Esportes' },
    { id: 'economia', name: 'Economia' },
    { id: 'saude', name: 'Saúde' }
  ]

  return (
    <div className={`bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white ${className}`}>
      <div className="flex items-center mb-4">
        <Mail className="w-6 h-6 mr-2" />
        <h3 className="text-xl font-semibold">Newsletter PortalNewsAI</h3>
      </div>
      
      <p className="text-primary-100 mb-6">
        Receba notícias exclusivas e análises inteligentes diretamente no seu email. 
        Personalize seu conteúdo e mantenha-se sempre informado.
      </p>

      {status === 'success' && (
        <div className="bg-green-500 border border-green-400 text-green-100 px-4 py-3 rounded mb-4 flex items-center">
          <Check className="w-5 h-5 mr-2" />
          <span>Inscrição realizada com sucesso! Verifique seu email.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500 border border-red-400 text-red-100 px-4 py-3 rounded mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Erro ao realizar inscrição. Tente novamente.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Escolha suas preferências de conteúdo:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.includes(category.id)}
                  onChange={() => handlePreferenceToggle(category.id)}
                  className="rounded border-white/20 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-primary-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Inscrito...' : 'Inscrever-se'}
        </button>

        <p className="text-xs text-white/70 text-center">
          Ao se inscrever, você concorda com nossa <Link href="/privacidade" className="underline">política de privacidade</Link>.
        </p>
      </form>
    </div>
  )
}