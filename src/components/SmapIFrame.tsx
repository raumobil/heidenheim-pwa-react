'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const SmapIFrame = ({
  smapUrl,
  smapDepartureMonitorBasePath,
}: {
  smapUrl?: string
  smapDepartureMonitorBasePath?: string
}) => {
  const t = useTranslations('Home')
  const path = usePathname()
  const searchParams = useSearchParams()
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const router = useRouter()

  const iframeRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    if (isIframeLoaded) {
      if (searchParams.has('link')) {
        if (searchParams.get('link') === 'imprint') {
          iframeRef.current?.contentWindow?.postMessage(
            {
              eventType: 'routing',
              path: '/settings',
            },
            '*'
          )
        }
        router.replace(path)
      } else if (searchParams.has('departureMonitorId')) {
        const departureMonitorId = searchParams.get('departureMonitorId')
        iframeRef.current?.contentWindow?.postMessage(
          {
            eventType: 'routing',
            path: `/${smapDepartureMonitorBasePath}/${departureMonitorId}`,
          },
          '*'
        )
        router.replace(path)
      }
    }
  })

  return (
    <>
      <iframe
        ref={iframeRef}
        onLoad={() => {
          setTimeout(() => {
            setIsIframeLoaded(true)
          }, 1000)
        }}
        title={t('iframe.title')}
        src={smapUrl}
        style={{ width: '100%', height: '100%', border: 0 }}
        allow='geolocation'
      ></iframe>
    </>
  )
}

export default SmapIFrame
