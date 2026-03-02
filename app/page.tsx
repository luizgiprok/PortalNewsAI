import { Suspense } from 'react'
import NewsCard from '@/components/NewsCard'
import NewsGrid from '@/components/NewsGrid'
import LoadingSpinner from '@/components/LoadingSpinner'
import HeroSection from '@/components/HeroSection'

// Mock data for demonstration - in production this would come from API
const featuredNews = {
  title: "Tecnologia revoluciona o mundo digital",
  excerpt: "Descubra as últimas inovações que estão moldando o futuro da tecnologia e como elas impactam nosso dia a dia.",
  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
  category: "Tecnologia",
  author: "Redação Portal",
  date: "2024-03-02",
  url: "#"
}

const latestNews = [
  {
    id: 1,
    title: "Mercado de ações atinge novo recorde histórico",
    excerpt: "O índice Bovespa fechou em alta de 2,3%, impulsionado por boas notícias do setor tecnológico.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    category: "Economia",
    author: "João Silva",
    date: "2024-03-02",
    url: "#"
  },
  {
    id: 2,
    title: "Seleção brasileira se classifica para próxima fase",
    excerpt: "A equipe venceu por 3-1 e garantiu vaga nas oitavas de final do campeonato internacional.",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=250&fit=crop",
    category: "Esportes",
    author: "Maria Santos",
    date: "2024-03-02",
    url: "#"
  },
  {
    id: 3,
    title: "Novo projeto de lei sobre proteção de dados é aprovado",
    excerpt: "O Congresso Nacional aprovou uma legislação mais rigorosa para proteção de dados pessoais no país.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    category: "Política",
    author: "Carlos Oliveira",
    date: "2024-03-02",
    url: "#"
  },
  {
    id: 4,
    title: "Inovação agrícola promete aumento na produtividade",
    excerpt: "Tecnologias de precisão e novas técnicas de cultivo estão revolucionando o agronegócio nacional.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
    category: "Agricultura",
    author: "Ana Paula",
    date: "2024-03-02",
    url: "#"
  },
  {
    id: 5,
    title: "Saúde mental: novo estudo revela impactos da tecnologia",
    excerpt: "Pesquisadores analisam como o uso excessivo de dispositivos afeta o bem-estar mental da população.",
    image: "https://images.unsplash.com/photo-1541767027777-d20a1b78efd4?w=400&h=250&fit=crop",
    category: "Saúde",
    author: "Dr. Ricardo Mendes",
    date: "2024-03-02",
    url: "#"
  },
  {
    id: 6,
    title: "Educação online cresce 300% nos últimos dois anos",
    excerpt: "Plataformas de ensino remoto ganham popularidade e transformam o cenário educacional do país.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    category: "Educação",
    author: "Laura Costa",
    date: "2024-03-02",
    url: "#"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection news={featuredNews} />
      
      <div className="container py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Últimas Notícias</h2>
          <p className="text-gray-600">Fique por dentro das principais notícias do momento</p>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <NewsGrid news={latestNews} />
        </Suspense>
      </div>
    </div>
  )
}