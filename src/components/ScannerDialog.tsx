import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Grid,
  Typography,
  AlertProps,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { useCallback, useState } from 'react'
import { useTranslations } from 'next-intl'
import ScannerAlert from './ScannerAlert'
import useMatomo from '@/components/Matomo/useMatomo'
import { unshortenUrl } from '@/app/api/actions'

type messagesType = {
  // maybe find a way to get Types from directly i18n
  i18nKey:
    | 'message'
    | 'error.wrongQrCode'
    | 'error.noPermission'
    | 'error.generic'
  severity: AlertProps['severity']
}

const ScannerDialog = ({
  isOpen,
  onClose,
  onScan,
}: {
  isOpen: boolean
  onClose: () => void
  onScan: (stationId: string) => void
}) => {
  const t = useTranslations('QrCodeScanner')
  const [message, setMessage] = useState<messagesType>({
    i18nKey: 'message',
    severity: 'info',
  })
  const { trackEvent } = useMatomo()

  const onScanCallback = useCallback(
    async (detectedCodes: IDetectedBarcode[]) => {
      trackEvent('ScannerDialog', 'scan')
      const rawCode = detectedCodes[0].rawValue
      // this a poc to show that we can decide if a QRCode is one of ours.
      // todo: replace with a correct condition, once we know what our QRCodes actually contain
      if (rawCode.startsWith(window.location.origin)) {
        const departureMonitorId = new URL(rawCode).searchParams.get(
          'departureMonitorId'
        )
        if (departureMonitorId) {
          onScan(departureMonitorId)
        } else {
          // ending up here means there is a broken QRCode out there.
          // todo once we have Tracking:
          // track this with as much information as possible
          trackEvent('ScannerDialog', 'no departure monitor id', 'error')
          setMessage({
            i18nKey: 'error.generic',
            severity: 'error',
          })
        }
      } else if (rawCode.startsWith('https://heidenheim.smartqr.info')) {
        try {
          const redirectUrl = await unshortenUrl(rawCode)
          if (redirectUrl) {
            const departureMonitorId = new URL(redirectUrl).searchParams.get(
              'departureMonitorId'
            )
            if (departureMonitorId) {
              onScan(departureMonitorId)
            }
          }
        } catch (error) {
          console.error('Error:', error)
        }
      } else {
        setMessage({
          i18nKey: 'error.wrongQrCode',
          severity: 'warning',
        })
      }
    },
    [onScan, trackEvent]
  )

  const onErrorCallback = useCallback(() => {
    navigator.permissions.query({ name: 'camera' }).then((result) => {
      // some Browsers, notably Firefox, don't do a great job implementing permission state and resulting errors
      // therefor missing camera permissions can still cause a generic error, instead of a camera permission error
      const isPermissionDenied =
        result.state === 'denied' || result.state === 'prompt'
      if (isPermissionDenied) {
        setMessage({
          i18nKey: 'error.noPermission',
          severity: 'warning',
        })
      } else {
        // todo once we have Tracking:
        // track what caused the generic error, so know if we can and want to add more Error messages
        trackEvent('ScannerDialog', 'unknown', 'error')
        setMessage({
          i18nKey: 'error.generic',
          severity: 'error',
        })
      }
    })
  }, [trackEvent])

  const onCloseCallback = useCallback(() => {
    trackEvent('ScannerDialog', 'close')
    onClose()
    setMessage({
      i18nKey: 'message',
      severity: 'info',
    })
  }, [onClose, trackEvent])

  return (
    <Dialog open={isOpen} fullScreen={true}>
      <AppBar
        sx={{ position: 'relative', backgroundColor: 'background.light' }}
      >
        <Toolbar variant='dense'>
          <Grid
            container
            direction='row'
            size='grow'
            alignItems='center'
            spacing={2}
          >
            {/* Spacer that has the same width as the close-Button */}
            <Grid size='auto' sx={{ width: '28px' }} />
            <Grid size='grow'>
              <Typography
                color='text.dark'
                variant='titleLarge'
                component='h1'
                textAlign={'center'}
              >
                {t('title')}
              </Typography>
            </Grid>
            <Grid size='auto'>
              <IconButton
                edge='start'
                color='inherit'
                onClick={onCloseCallback}
                aria-label={t('aria.close')}
              >
                <CloseIcon sx={{ color: 'text.dark' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Scanner
        onScan={onScanCallback}
        onError={onErrorCallback}
        sound={false}
        components={{
          torch: false,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          // make Alert the same size as the Scanner Rectangle
          width: '70%',
          transform: 'translate(-50%, 0)',
        }}
      >
        <ScannerAlert
          message={t(message.i18nKey)}
          severity={message.severity}
        ></ScannerAlert>
      </Box>
    </Dialog>
  )
}

export default ScannerDialog
