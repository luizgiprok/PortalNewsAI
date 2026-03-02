import NewsCard from './NewsCard'

interface NewsGridProps {
  news: any[]
  loading?: boolean
}

export default function NewsGrid({ news, loading = false }: NewsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="news-card">
            <div className="skeleton h-48 w-full mb-4"></div>
            <div className="space-y-3">
              <div className="skeleton h-6 w-3/4"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-5/6"></div>
              <div className="skeleton h-4 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📰</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma notícia encontrada</h3>
        <p className="text-gray-500">Tente novamente mais tarde ou explore outras categorias.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  )
}