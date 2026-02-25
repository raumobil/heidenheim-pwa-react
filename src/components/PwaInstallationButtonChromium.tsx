'use client'

import { InstallMobile } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { MouseEventHandler } from 'react'

/**
 * this component contains the PWA installation button
 * shown on chromium based browsers
 */
const PwaInstallationButtonChromium = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLAnchorElement>
}) => {
  const t = useTranslations('PWAInstallation.install')

  return (
    // @ts-expect-error for some reason now it does not like missing href
    <Button
      startIcon={<InstallMobile />}
      onClick={onClick}
      sx={{ py: 1, color: 'communication.hyperlink.main' }}
    >
      <Typography variant='labelMedium' sx={{ textTransform: 'none' }}>
        {t('button.label')}
      </Typography>
    </Button>
  )
}

export default PwaInstallationButtonChromium
