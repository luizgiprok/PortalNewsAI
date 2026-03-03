import { NextRequest, NextResponse } from 'next/server'
import { CachedNewsService } from '@/lib/cachedNewsService'

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const category = params.category
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const forceRefresh = searchParams.get('refresh') === 'true'

    const newsService = new CachedNewsService(
      process.env.NEWS_API_KEY || ''
    )

    let news
    
    if (limit) {
      news = await newsService.getLatestNews(parseInt(limit), forceRefresh)
    } else {
      news = await newsService.getNewsByCategory(category, forceRefresh)
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
      category,
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