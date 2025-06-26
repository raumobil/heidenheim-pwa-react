import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '@/theme'
import AppBarWithMenu from '@/components/AppBarWithMenu'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import MatomoTracking from '@/components/Matomo/MatomoTracking'
import IframeMessageListener from '@/components/IframeMessageListener'

const inter = Inter({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'appgefahren',
}

export const viewport: Viewport = {
  // viewportFit is required to make the css variable safe-area-inset usable
  // https://developer.mozilla.org/en-US/docs/Web/CSS/env#usage
  viewportFit: 'cover',
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <head>
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppBarWithMenu />
              {children}
              <MatomoTracking
                // @ts-expect-error prevent undefined env variable
                url={process.env.MATOMO_URL}
                // @ts-expect-error prevent undefined env variable
                siteId={process.env.MATOMO_ID}
                // @ts-expect-error this is a server side environment variable that can be changed at runtime in docker
                matomoEnv={process.env.MATOMO_ENV}
              />
            </ThemeProvider>
          </AppRouterCacheProvider>
          <IframeMessageListener smapURL={process.env.SMAP_URL} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
