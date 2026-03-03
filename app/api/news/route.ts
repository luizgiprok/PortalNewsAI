import { NextRequest, NextResponse } from 'next/server'
import { CachedNewsService } from '@/lib/cachedNewsService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    const forceRefresh = searchParams.get('refresh') === 'true'

    const newsService = new CachedNewsService(
      process.env.NEWS_API_KEY || ''
    )

    let news
    
    if (category) {
      news = await newsService.getNewsByCategory(category, forceRefresh)
    } else if (limit) {
      news = await newsService.getLatestNews(parseInt(limit), forceRefresh)
    } else {
      news = await newsService.getNews(forceRefresh)
    }

    // Adicionar headers de cache
    const cacheStatus = newsService.getCacheStatus()
    const headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('X-Cache-Status', cacheStatus.isCached ? 'HIT' : 'MISS')
    headers.set('X-Cache-Age', cacheStatus.cacheAge.toString())
    
    return NextResponse.json({
      success: true,
      data: news,
      cache: cacheStatus,
      total: news.length
    }, { headers })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Falha ao buscar notícias',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, query, category } = body

    const newsService = new CachedNewsService(
      process.env.NEWS_API_KEY || ''
    )

    switch (action) {
      case 'search':
        const results = await newsService.searchNews(query)
        return NextResponse.json({
          success: true,
          data: results,
          query,
          total: results.length
        })

      case 'refresh':
        newsService.clearCache()
        const freshNews = await newsService.getNews(true)
        return NextResponse.json({
          success: true,
          data: freshNews,
          message: 'Cache atualizado com sucesso'
        })

      case 'statistics':
        const stats = await newsService.getSourceStatistics()
        return NextResponse.json({
          success: true,
          data: stats
        })

      default:
        return NextResponse.json(
          { success: false, error: 'Ação não suportada' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Falha na operação',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}