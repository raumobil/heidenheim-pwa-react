'use client'

import { PwaContext } from '@/components/PwaContentProvider'
import PwaInstallationButtonChromium from '@/components/PwaInstallationButtonChromium'
import PwaInstallationInstructionIos from '@/components/PwaInstallationInstructionIos'
import { Close } from '@mui/icons-material'
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  SvgIcon,
  Typography,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import { useContext } from 'react'
import InlineSVG from 'react-inlinesvg'

/**
 * this component contains the PWA installation
 */
const PwaInstallationDialog = () => {
  const { handleInstallClick, showInstallButton, showInstallationInstruction } =
    useContext(PwaContext)

  const t = useTranslations('PWAInstallation')

  return (
    <Dialog
      open={true}
      sx={() => ({
        '& .MuiDialog-paper': {
          borderRadius: 2,
        },
      })}
      aria-labelledby='pwa-installation-dialog-title'
    >
      <DialogTitle
        id='pwa-installation-dialog-title'
        variant='titleSmall'
        sx={() => ({ '&.MuiDialogTitle-root': { p: 1.5, pb: 1 } })}
      >
        <Grid
          container
          direction={'row'}
          flexWrap={'nowrap'}
          gap={2}
          alignContent={'center'}
        >
          <Grid flexGrow={0}>
            <Avatar
              variant={showInstallationInstruction ? 'rounded' : 'circular'}
            >
              <SvgIcon viewBox='0 0 40 40'>
                <InlineSVG width={40} height={40} src={'icon.svg'} />
              </SvgIcon>
            </Avatar>
          </Grid>
          <Grid alignItems={'flex-start'} flexGrow={0}>
            {t('dialog.title')}
          </Grid>
        </Grid>
      </DialogTitle>
      <IconButton
        aria-label='close'
        // onClick={() => {
        //   trackEvent('PWaInstallationDialog', 'close', 'button')
        //   setOpen(false)
        // }}
        sx={{
          position: 'absolute',
          right: 12, // align with checkboxes
          top: 8, // align with title
        }}
      >
        <Close />
      </IconButton>
      <Divider sx={{ my: 1, py: 0 }} />
      <DialogContent sx={{ px: 0, py: 1.5 }}>
        <Grid container>
          {showInstallButton && (
            <Grid container justifyContent={'center'} px={2} gap={1.5}>
              <Typography variant='textLarge'>
                {t('dialog.chromiumText')}
              </Typography>
            </Grid>
          )}
          {showInstallationInstruction && (
            <Grid px={2} container direction={'row'}>
              <Typography variant='textLarge'>{t('dialog.iosText')}</Typography>
              <PwaInstallationInstructionIos />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      {showInstallButton && (
        <DialogActions sx={{ justifyContent: 'center' }}>
          {/* @ts-expect-error ignore undefined */}
          <PwaInstallationButtonChromium onClick={handleInstallClick} />
        </DialogActions>
      )}
    </Dialog>
  )
}

export default PwaInstallationDialog
