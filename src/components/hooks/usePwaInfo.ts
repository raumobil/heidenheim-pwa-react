import { useMemo } from 'react'

export default function usePwaInfo() {
  const pwaInfos = useMemo(() => {
    if (typeof window !== 'undefined') {
      const browser = window.navigator.userAgent
      const isPwa = window.matchMedia('(display-mode: standalone)').matches
      const hasChrome = browser.includes('Chrome')
      const hasSafari = browser.includes('Safari')
      return { isPwa, hasChrome, hasSafari }
    }
    return {}
  }, [])

  return { ...pwaInfos }
}
