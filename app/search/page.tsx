import { Metadata } from 'next'
import { Suspense } from 'react'
import NewsGrid from '@/components/NewsGrid'
import LoadingSpinner from '@/components/LoadingSpinner'
import NewsletterForm from '@/components/NewsletterForm'
import { CATEGORIES } from '@/lib/config'

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export const metadata: Metadata = {
  title: 'Buscar Notícias - PortalNewsAI',
  description: 'Encontre notícias sobre tecnologia, política, esportes e mais em nosso portal inteligente.',
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        {/* Search header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Buscar Notícias
          </h1>
          
          {query && (
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    defaultValue={query}
                    placeholder="Buscar notícias, tópicos, categorias..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              </div>
            </div>
          )}
          
          {query && (
            <p className="text-gray-600 mb-6">
              Resultados para: <span className="font-semibold text-primary-600">"{query}"</span>
            </p>
          )}
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category) => (
              <a
                key={category.id}
                href={`/categoria/${category.id}`}
                className="group block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="text-2xl mb-2">
                  {category.id === 'tecnologia' && '💻'}
                  {category.id === 'politica' && '🏛️'}
                  {category.id === 'esportes' && '⚽'}
                  {category.id === 'economia' && '💰'}
                  {category.id === 'saude' && '🏥'}
                  {category.id === 'entretenimento' && '🎬'}
                  {category.id === 'internacional' && '🌍'}
                  {category.id === 'geral' && '📰'}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
              </a>
            ))}
          </div>
        </div>

        {/* Search results */}
        {query && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Resultados da Busca
            </h2>
            <Suspense fallback={<LoadingSpinner />}>
              {/* Aqui você implementaria a busca real */}
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Sistema de busca em desenvolvimento
                </h3>
                <p className="text-gray-500">
                  Em breve você poderá buscar notícias por palavra-chave, autor ou categoria.
                </p>
              </div>
            </Suspense>
          </div>
        )}

        {/* Newsletter */}
        <div className="mb-12">
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}