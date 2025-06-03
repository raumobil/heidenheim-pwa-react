'use client'

import { Button, Grid, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import SmapIFrame from './SmapIFrame'
import ScannerDialog from './ScannerDialog'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'

const SmapNextWrapper = ({
  baseURL,
  departureMonitorBasePath,
}: {
  baseURL: string
  departureMonitorBasePath: string
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('Home')
  const isScannerOpen = searchParams.get('isScannerOpen') === 'true'

  return (
    <>
      <ScannerDialog
        isOpen={isScannerOpen}
        onScan={(id: string) => {
          router.replace(`${pathname}?departureMonitorId=${id}`)
        }}
        onClose={() => {
          router.replace(`${pathname}`)
        }}
      />
      <Grid container direction='column' height='100%'>
        <Grid size='grow'>
          <SmapIFrame
            smapUrl={baseURL}
            smapDepartureMonitorBasePath={departureMonitorBasePath}
          />
        </Grid>
        <Grid
          size='auto'
          sx={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
        >
          <Button
            size='large'
            fullWidth
            sx={{
              height: '64px',
              backgroundColor: 'background.light',
              color: 'text.dark',
              textTransform: 'none',
              borderRadius: 0,
            }}
            onClick={() => {
              router.replace(`${pathname}?isScannerOpen=true`)
            }}
            startIcon={<QrCodeScannerIcon />}
          >
            <Typography variant='labelMedium'>{t('qrCodeScanner')}</Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default SmapNextWrapper
