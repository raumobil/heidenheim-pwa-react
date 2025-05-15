'use client'

import { useTranslations } from "next-intl"

const SmapIframe = ({
  smapUrl
} : {
  smapUrl?: string
}) => {
  const t = useTranslations('Home')

  return (
    <iframe
      title={t('iframe.title')}
      src={smapUrl}
      style={{ width: "100%", height: "100%", border: 0 }}
      allow="geolocation"
    ></iframe>
  )
}

export default SmapIframe