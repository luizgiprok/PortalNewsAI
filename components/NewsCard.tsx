import { NewsItem } from '@/types'

interface NewsCardProps {
  news: NewsItem
  className?: string
}

export default function NewsCard({ news, className = '' }: NewsCardProps) {
  const formattedDate = new Date(news.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <article className={`news-card ${className}`}>
      <div className="relative">
        <img 
          src={news.image} 
          alt={news.title}
          className="news-image"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold">
            {news.category}
          </span>
        </div>
      </div>
      
      <div className="news-content">
        <h3 className="news-title">
          <a href={news.url} className="block">
            {news.title}
          </a>
        </h3>
        
        <p className="news-excerpt">
          {news.excerpt}
        </p>
        
        <div className="news-meta">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {news.author}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {formattedDate}
          </span>
        </div>
      </div>
    </article>
  )
}