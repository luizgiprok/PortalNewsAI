import { Metadata } from 'next'
import { Suspense } from 'react'
import NewsGrid from '@/components/NewsGrid'
import LoadingSpinner from '@/components/LoadingSpinner'
import NewsletterForm from '@/components/NewsletterForm'
import Ads from '@/components/Ads'

export const metadata: Metadata = {
  title: 'Últimas Notícias - PortalNewsAI',
  description: 'Fique por dentro das últimas notícias de tecnologia, política, esportes e mais em tempo real.',
  keywords: ['notícias', 'últimas', 'atualizações', 'tecnologia', 'política', 'esportes'],
}

export default function UltimasPage() {
  return (
    <div className="min-h-screen">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Últimas Notícias
          </h1>
          <p className="text-gray-600">
            As notícias mais recentes e atualizadas em tempo real
          </p>
        </div>

        {/* Leaderboard ad */}
        <div className="mb-8">
          <Ads unit="leaderboard" />
        </div>

        {/* Filter options */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium">
              Todas
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              Hoje
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              Ontem
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              Esta Semana
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              Mais Lidas
            </button>
          </div>
        </div>

        {/* News grid */}
        <Suspense fallback={<LoadingSpinner />}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Notícias mais recentes
            </h2>
            <NewsGrid news={[]} loading={true} />
          </div>
        </Suspense>

        {/* Medium rectangle ad */}
        <div className="mb-8">
          <Ads unit="mediumRectangle" />
        </div>

        {/* Newsletter section */}
        <div className="mb-12">
          <NewsletterForm />
        </div>

        {/* Skyscraper ad (sidebar) */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Ads unit="skyscraper" />
          </div>
        </div>
      </div>
    </div>
  )
}