import Link from 'next/link'

interface NewsItem {
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  date: string
  url: string
}

interface HeroSectionProps {
  news: NewsItem
}

export default function HeroSection({ news }: HeroSectionProps) {
  const formattedDate = new Date(news.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${news.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <div className="relative container h-full flex items-center">
        <div className="text-white max-w-2xl">
          <div className="mb-4">
            <span className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {news.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {news.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 text-gray-200 leading-relaxed">
            {news.excerpt}
          </p>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Por {news.author}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">{formattedDate}</span>
            </div>
          </div>
          
          <Link 
            href={news.url}
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Ler Mais
          </Link>
        </div>
      </div>
    </section>
  )
}