'use client'

import Script from 'next/script'

/**
 *  initializes Matomo Tag Manager tracking
 */
const MatomoTagManager = () => {
  // XXX: for the first step we use the hard coded snipet for it-trans
  // see: https://smap.stat.raumobil.net/index.php?module=TagManager&action=dashboard&idSite=51&period=day&date=yesterday&idContainer=UeVDBpeH
  return (
    <Script id='matomo-tag-manager'>
      {`
        var _mtm = window._mtm = window._mtm || [];
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src='https://smap.stat.raumobil.net/js/container_UeVDBpeH_staging_f25fa6f12cac0c9ed2ea975e.js'; s.parentNode.insertBefore(g,s);
      `}
    </Script>
  )
}

export default MatomoTagManager
