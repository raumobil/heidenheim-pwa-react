'use client'

import { Link } from '@/i18n/navigation'
import { ArrowBackIosNew } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import useMatomo from '@/components/Matomo/useMatomo'
import { useTranslations } from 'next-intl'

/**
 * this button always leads to the home page
 */
const BackButton = () => {
  const t = useTranslations('BackButton')
  const { trackEvent } = useMatomo()

  return (
    <IconButton
      href='/'
      onClick={() => {
        trackEvent('BackButton', 'click')
      }}
      LinkComponent={Link}
      sx={{ width: '36px', height: '36px' }}
      aria-label={t('label')}
    >
      <ArrowBackIosNew sx={{ color: '#000' }} />
    </IconButton>
  )
}

export default BackButton
