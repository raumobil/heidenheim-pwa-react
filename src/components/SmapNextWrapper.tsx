'use client'

import { Button, Typography } from '@mui/material'
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

      <SmapIFrame
        smapUrl={baseURL}
        smapDepartureMonitorBasePath={departureMonitorBasePath}
      />
      <Button
        size='large'
        sx={{
          width: '100%',
          height: '64px',
          left: '50%',
          transform: 'translate(-50%, 0)',
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
    </>
  )
}

export default SmapNextWrapper
