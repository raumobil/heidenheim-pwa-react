'use client'

import { Link } from '@/i18n/navigation'
import { ArrowBackIosNew } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useTranslations } from 'next-intl'

/**
 * this button always leads to the home page
 */
const BackButton = () => {
  const t = useTranslations('BackButton')

  return (
    <IconButton
      href='/'
      LinkComponent={Link}
      sx={{ width: '36px', height: '36px' }}
      aria-label={t('label')}
    >
      <ArrowBackIosNew sx={{ color: '#000' }} />
    </IconButton>
  )
}

export default BackButton
