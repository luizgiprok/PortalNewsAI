import { Metadata } from 'next'
import { Suspense } from 'react'
import NewsGrid from '@/components/NewsGrid'
import LoadingSpinner from '@/components/LoadingSpinner'
import NewsletterForm from '@/components/NewsletterForm'
import { CATEGORIES } from '@/lib/config'

interface CategoryPageProps {
  params: {
    category: string
  }
}

// Metadata dinâmica para cada categoria
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = CATEGORIES.find(cat => cat.id === params.category)
  
  if (!category) {
    return {
      title: 'Categoria não encontrada - PortalNewsAI',
      description: 'A categoria que você procura não existe ou não possui notícias disponíveis.'
    }
  }

  return {
    title: `${category.name} - PortalNewsAI`,
    description: `Notícias de ${category.name} com análises exclusivas e atualizações em tempo real.`,
    keywords: [category.name.toLowerCase(), 'notícias', 'últimas', 'atualizações'],
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find(cat => cat.id === params.category)
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoria não encontrada</h1>
          <p className="text-gray-600">A categoria que você procura não existe.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        {/* Category header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl">
              {category.id === 'tecnologia' && '💻'}
              {category.id === 'politica' && '🏛️'}
              {category.id === 'esportes' && '⚽'}
              {category.id === 'economia' && '💰'}
              {category.id === 'saude' && '🏥'}
              {category.id === 'entretenimento' && '🎬'}
              {category.id === 'internacional' && '🌍'}
              {category.id === 'geral' && '📰'}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {category.name}
              </h1>
              <p className="text-gray-600">
                Todas as notícias sobre {category.name.toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Filter tags */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium">
              Todas
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
              Hoje
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
          {/* Aqui você implementaria a busca real por categoria */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Últimas notícias de {category.name.toLowerCase()}
            </h2>
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Carregando notícias de {category.name.toLowerCase()}...
              </h3>
              <p className="text-gray-500">
                Em breve você verá todas as notícias mais recentes desta categoria.
              </p>
            </div>
          </div>
        </Suspense>

        {/* Newsletter */}
        <div className="mb-12">
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}

// Geração de estáticas para todas as categorias
export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.id,
  }))
}