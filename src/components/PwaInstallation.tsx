'use client'

import { PwaContext } from '@/components/PwaContentProvider'
import PwaInstallationButtonChromium from '@/components/PwaInstallationButtonChromium'
import PwaInstallationInstructionIos from '@/components/PwaInstallationInstructionIos'
import { Alert, Grid, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useContext } from 'react'

/**
 * this component contains the PWA installation
 */
const PwaInstallation = () => {
  const { handleInstallClick, showInstallButton, showInstallationInstruction } =
    useContext(PwaContext)

  const t = useTranslations('PWAInstallation')

  return (
    <Grid
      container
      direction='column'
      justifyContent='flex-end'
      alignItems='stretch'
      pb={7.5}
      sx={{ height: '100%' }}
    >
      {showInstallButton && (
        <Grid container justifyContent={'center'}>
          {/* @ts-expect-error ignore undefined */}
          <PwaInstallationButtonChromium onClick={handleInstallClick} />
        </Grid>
      )}
      {showInstallationInstruction && (
        <Grid px={2} container direction={'row'}>
          <Grid size='grow'>
            <Alert
              icon={false}
              severity='info'
              sx={(theme) => ({
                borderRadius: '8px',
                px: 1.5,
                py: 1,
                color: 'text.dark',
                width: '100%',
                // MUI docs recommends use of css color-mix https://mui.com/material-ui/migration/upgrade-to-v7/#theme-behavior-changes
                // @ts-expect-error non standard color not defined in typescript
                backgroundColor: `color-mix(in srgb, ${theme.palette.communication.hyperlink.main}, transparent 95%)`,
              })}
            >
              <Typography color='textDark' variant='textLargeColored'>
                {t('install.instruction.title')}
              </Typography>
              <PwaInstallationInstructionIos />
            </Alert>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default PwaInstallation
