'use client'

import { useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'

const IframeMessageListener = ({ smapURL }: { smapURL?: string }) => {
  const router = useRouter()

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === smapURL &&
        event.data?.type === 'navigate' &&
        typeof event.data.path === 'string'
      ) {
        router.push(event.data.path)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [router, smapURL])

  return null
}

export default IframeMessageListener
