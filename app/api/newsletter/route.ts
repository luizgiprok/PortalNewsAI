import { NextRequest, NextResponse } from 'next/server'
import { NewsletterService } from '@/lib/newsletterService'

const newsletterService = new NewsletterService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (email) {
      // Get specific user preferences
      const user = await newsletterService.getUserPreferences(email)
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, data: user })
    }

    // Get all users
    const users = await newsletterService.getAllUsers()
    return NextResponse.json({ success: true, data: users })

  } catch (error) {
    console.error('Newsletter API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Falha ao buscar usuários',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }

  export async function POST(request: NextRequest) {
    try {
      const body = await request.json()
      const { action, email, preferences, segment, campaign } = body

      switch (action) {
        case 'subscribe':
          if (!email || !preferences) {
            return NextResponse.json(
              { success: false, error: 'Email and preferences are required' },
              { status: 400 }
            )
          }
          
          const user = await newsletterService.updateUserPreferences(email, preferences)
          return NextResponse.json({ success: true, data: user })

        case 'create_segment':
          if (!segment) {
            return NextResponse.json(
              { success: false, error: 'Segment data is required' },
              { status: 400 }
            )
          }
          
          const newSegment = await newsletterService.createSegment(segment)
          return NextResponse.json({ success: true, data: newSegment })

        case 'create_campaign':
          if (!campaign) {
            return NextResponse.json(
              { success: false, error: 'Campaign data is required' },
              { status: 400 }
            )
          }
          
          const newCampaign = await newsletterService.createCampaign(campaign)
          return NextResponse.json({ success: true, data: newCampaign })

        case 'get_stats':
          const stats = await newsletterService.getNewsletterStats()
          return NextResponse.json({ success: true, data: stats })

        default:
          return NextResponse.json(
            { success: false, error: 'Action not supported' },
            { status: 400 }
          )
      }

    } catch (error) {
      console.error('Newsletter API Error:', error)
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
}