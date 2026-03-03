'use client'

import { Suspense } from 'react'
import NewsCard from '@/components/NewsCard'
import NewsGrid from '@/components/NewsGrid'
import LoadingSpinner from '@/components/LoadingSpinner'
import HeroSection from '@/components/HeroSection'
import useFeaturedNews from '@/hooks/useNews'
import useLatestNews from '@/hooks/useNews'

export default function HomePage() {
  const { featuredNews, loading: featuredLoading, error: featuredError } = useFeaturedNews()
  const { news: latestNews, loading: latestLoading, error: latestError } = useLatestNews(6)

  // Se não houver notícias em destaque, usar uma padrão
  const displayFeaturedNews = featuredNews.length > 0 ? featuredNews[0] : {
    title: "Tecnologia revoluciona o mundo digital",
    excerpt: "Descubra as últimas inovações que estão moldando o futuro da tecnologia e como elas impactam nosso dia a dia.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    category: "Tecnologia",
    author: "Redação Portal",
    date: "2024-03-02",
    url: "#"
  }

  return (
    <div className="min-h-screen">
      <HeroSection news={displayFeaturedNews} />
      
      <div className="container py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Últimas Notícias</h2>
          <p className="text-gray-600">
            {latestLoading ? 'Carregando notícias...' : 'Fique por dentro das principais notícias do momento'}
          </p>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          {latestError ? (
            <div className="text-center py-12">
              <div className="text-red-500 text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Erro ao carregar notícias</h3>
              <p className="text-gray-500">{latestError}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <NewsGrid news={latestNews} loading={latestLoading} />
          )}
        </Suspense>
      </div>
    </div>
  )
}