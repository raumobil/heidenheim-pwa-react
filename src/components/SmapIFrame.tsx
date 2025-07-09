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

  // send Routing-Events to smap depending on searchParams
  useEffect(() => {
    const targetOrigin =
      smapUrl && smapUrl?.length > 0 ? new URL(smapUrl ?? '').origin : null
    if (isIframeLoaded && targetOrigin) {
      if (searchParams.has('link')) {
        if (searchParams.get('link') === 'legal') {
          iframeRef.current?.contentWindow?.postMessage(
            {
              eventType: 'routing',
              path: '/settings/datenschutz',
            },
            targetOrigin
          )
        }
        if (searchParams.get('link') === 'imprint') {
          iframeRef.current?.contentWindow?.postMessage(
            {
              eventType: 'routing',
              path: '/settings/impressum',
            },
            targetOrigin
          )
        }
        if (searchParams.get('link') === 'accessibility') {
          iframeRef.current?.contentWindow?.postMessage(
            {
              eventType: 'routing',
              // todo: correct Link once we have it
              path: '/settings',
            },
            targetOrigin
          )
        }
        // remove searchParams to avoid retriggering useEffect on rerender and to allow triggering by the same parameter value
        router.replace(path)
      } else if (searchParams.has('departureMonitorId')) {
        const departureMonitorId = searchParams.get('departureMonitorId')
        iframeRef.current?.contentWindow?.postMessage(
          {
            eventType: 'routing',
            path: `/${smapDepartureMonitorBasePath}/${departureMonitorId}`,
          },
          targetOrigin
        )
        // remove searchParams to avoid retriggering useEffect on rerender and to allow triggering by the same parameter value
        router.replace(path)
      }
    }
  })

  return (
    <iframe
      ref={iframeRef}
      onLoad={() => {
        // wait a second for smap to initialize javascript
        setTimeout(() => {
          setIsIframeLoaded(true)
        }, 1000)
      }}
      title={t('iframe.title')}
      src={smapUrl}
      style={{ width: '100%', height: '100%', border: 0 }}
      allow='geolocation'
    ></iframe>
  )
}

export default SmapIFrame
