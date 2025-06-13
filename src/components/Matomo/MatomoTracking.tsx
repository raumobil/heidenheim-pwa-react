'use client'
import { CustomDimensions } from '@/components/Matomo/constants'
import Script from 'next/script'
import { useEffect } from 'react'
import useMatomo from './useMatomo'
import { usePathname } from 'next/navigation'

/**
 *  Wrapper around Matomo tracking Code, initializes tracking
 */
const MatomoTracking = ({
  url,
  siteId,
  matomoEnv,
}: {
  url: string
  siteId: string | number
  matomoEnv: string
}) => {
  // intentionally not using intl router, because we want to track the full url including language param
  const pathname = usePathname()
  const { trackPageView } = useMatomo()

  // next js docs suggest using a useEffect with dependencies on pathname and searchParams
  // https://nextjs.org/docs/app/api-reference/functions/use-router#router-events
  // currently not tracking search params as page views
  // those probably have events attached anyway
  useEffect(() => {
    trackPageView(pathname)
  }, [pathname, trackPageView])

  return (
    // using next/script ensures that script is only loaded once even during navigation
    // https://nextjs.org/docs/app/building-your-application/optimizing/scripts
    // there is a github issue in matomo-next (which doesn't support app router yet) where this is used
    // https://github.com/SocialGouv/matomo-next/issues/112#issuecomment-1902075271
    <Script id='matomo' strategy='afterInteractive'>
      {`
        var _paq = window._paq = window._paq || [];
        _paq.push([
          'setCustomDimension',
          '${CustomDimensions.ENVIRONMENT}',
          '${matomoEnv}'
        ]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function () {
          var u = '${url}/';
          _paq.push(['setTrackerUrl', u + 'matomo.php']);
          _paq.push(['setSiteId', '${siteId}']);
          var d = document;
          var g = d.createElement('script');
          var s = d.getElementsByTagName('script')[0];
          g.type = 'text/javascript';
          g.async = true;
          g.src = u + 'matomo.js';
          s.parentNode.insertBefore(g, s);
        })();
      `}
    </Script>
  )
}

export default MatomoTracking
