'use client'

import { useEffect } from 'react'

/**
 *  Wrapper around Matomo Opt Out script (work arround)
 * @see {@link https://github.com/vercel/next.js/discussions/55506#discussioncomment-9473153}
 */
const MatomoOptOut = ({ url }: { url: string }) => {
  useEffect(() => {
    const script = document?.createElement('script')
    script.src = url
    script.async = true
    document?.body?.appendChild(script)
  }, [url])

  return null
}

export default MatomoOptOut