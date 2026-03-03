import { AdConfig } from '@/types'

export const AD_CONFIG: AdConfig = {
  enabled: true,
  provider: 'google-adsense',
  adUnits: {
    leaderboard: 'ca-pub-0000000000000000/0000000000',
    mediumRectangle: 'ca-pub-0000000000000000/0000000001',
    skyscraper: 'ca-pub-0000000000000000/0000000002'
  }
}

export interface AdProps {
  unit: 'leaderboard' | 'mediumRectangle' | 'skyscraper'
  className?: string
  lazyLoad?: boolean
}

export function GoogleAd({ unit, className = '', lazyLoad = true }: AdProps) {
  if (!AD_CONFIG.enabled) {
    return null
  }

  const adId = AD_CONFIG.adUnits[unit]
  
  return (
    <div className={`ad-container ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{
          display: unit === 'leaderboard' ? 'block' : 'inline-block',
          width: unit === 'leaderboard' ? '728px' : unit === 'mediumRectangle' ? '300px' : '160px',
          height: unit === 'leaderboard' ? '90px' : unit === 'mediumRectangle' ? '250px' : '600px'
        }}
        data-ad-client={AD_CONFIG.provider === 'google-adsense' ? adId.split('/')[0] : undefined}
        data-ad-slot={AD_CONFIG.provider === 'google-adsense' ? adId.split('/')[1] : undefined}
        data-ad-format={unit === 'leaderboard' ? 'auto' : undefined}
        data-full-width-responsive={unit === 'leaderboard' ? 'true' : undefined}
        data-lazy-load={lazyLoad ? 'lazy' : undefined}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({});
          `
        }}
      />
    </div>
  )
}

// Componente de fallback para quando os anúncios estão desativados ou em desenvolvimento
export function AdPlaceholder({ unit, className = '' }: AdProps) {
  return (
    <div 
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
      style={{
        height: unit === 'leaderboard' ? '90px' : unit === 'mediumRectangle' ? '250px' : '600px',
        width: unit === 'leaderboard' ? '728px' : unit === 'mediumRectangle' ? '300px' : '160px'
      }}
    >
      <div className="text-center text-gray-500">
        <div className="text-2xl mb-2">📢</div>
        <div className="text-sm">Espaço para anúncios</div>
      </div>
    </div>
  )
}

export default GoogleAd