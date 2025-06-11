'use client'

import { MatomoTracking } from '@raumobil/next-matomo'

const MatomoTrackingWrapper = ({
  url,
  siteId,
  matomoEnv,
}: {
  url: string
  siteId: string | number
  matomoEnv: string
}) => {
  return <MatomoTracking url={url} siteId={siteId} matomoEnv={matomoEnv} />
}

export default MatomoTrackingWrapper
