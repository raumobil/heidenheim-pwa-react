import { useCallback, useEffect } from 'react'
import { debounce } from 'lodash'

/**
 * provides matomo helpers to client components
 */
const useMatomo = () => {
  // XXX poc matomo tracking
  // eslint-disable-next-line
  const push = (args: any[]) => {
    // @ts-expect-error prevent unknown property error
    // eslint-disable-next-line
    const _paq: any = (window._paq = window._paq || [])
    _paq.push(args)
  }

  // the essence of what matomo-next does
  // https://github.com/SocialGouv/matomo-next/blob/f10602b1383cc18a3097c68e5192556405d68d7d/src/index.ts#L143-L182
  const trackPageView = useCallback((pathname: string) => {
    push(['setCustomUrl', pathname])
    push(['trackPageView'])
  }, [])

  const trackEvent = (
    category: string,
    action: string,
    name?: string,
    value?: number
  ) => {
    push(['trackEvent', category, action, name, value])
  }

  const trackSiteSearch = (
    search: string,
    category?: string,
    numberOfResults?: number
  ) => {
    push(['trackSiteSearch', search, category, numberOfResults])
  }

  const setCustomDimension = (
    customDimensionId: number,
    customDimensionValue: string | number
  ) => {
    push(['setCustomDimension', customDimensionId, customDimensionValue])
    push(['trackPageView'])
  }

  // this is a debounced version of the standard trackSiteSearch call
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedTrackSiteSearch = useCallback(
    debounce(trackSiteSearch, 200),
    []
  )

  useEffect(() => {
    return () => {
      debouncedTrackSiteSearch.cancel()
    }
  }, [debouncedTrackSiteSearch])

  return {
    push,
    setCustomDimension,
    trackPageView,
    trackEvent,
    trackSiteSearch,
    debouncedTrackSiteSearch,
  }
}

export default useMatomo
