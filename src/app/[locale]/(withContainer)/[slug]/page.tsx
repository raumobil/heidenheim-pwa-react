import BackButton from '@/components/BackButton'
import MatomoOptOut from '@/components/Matomo/MatomoOptOut'
import { Grid, Typography } from '@mui/material'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

/**
 * this is a regular page with content depending on the slug (WIP)
 */
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  // load messages depending on slug
  const messages = await getMessages()
  // @ts-expect-error dynamic key cannot be typechecked
  const messagesForSlug = messages.pages?.[slug]

  // 404 if no messages found for slug
  if (!messagesForSlug) {
    notFound()
  }

  // @ts-expect-error dynamic key cannot be typechecked
  const t = await getTranslations(`pages.${slug}`)
  return (
    <Grid container direction='column' role='main'>
      <Grid container direction='row' paddingY={2} spacing={2}>
        <Grid size='auto'>
          <BackButton />
        </Grid>
        <Grid size='grow'>
          <Typography variant='titleExtraLarge' component='h2' color='textDark'>
            {t('title')}
          </Typography>
        </Grid>
      </Grid>
      {
        // render typography for every key under `body`
        messagesForSlug.body &&
          Object.keys(messagesForSlug.body).map((key) => {
            return (
              <Grid key={key}>
                {
                  // @ts-expect-error dynamic key cannot be typechecked
                  t.rich(`body.${key}`, {
                    h3: (chunks) => (
                      <Typography
                        variant='titleSmall'
                        component='h3'
                        marginBottom={1}
                        color='textDark'
                      >
                        {chunks}
                      </Typography>
                    ),
                    p: (chunks) => (
                      <Typography
                        variant='textLarge'
                        component='p'
                        marginBottom={2.5}
                        color='textDark'
                      >
                        {chunks}
                      </Typography>
                    ),
                    br: () => <br />,
                    ul: (chunks) => (
                      <ul style={{ margin: 0, paddingLeft: '16px' }}>
                        {chunks}
                      </ul>
                    ),
                    li: (chunks) => <li>{chunks}</li>,
                  })
                }
              </Grid>
            )
          })
      }
      {slug === 'data-protection-statement' && (
        <>
          <div id='matomo-opt-out'></div>
          <MatomoOptOut
            url={
              `${process.env.MATOMO_URL}/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=de&showIntro=1`
            }
          />
          <Typography
            variant='textLarge'
            my={2}
            sx={{ color: 'textDark.main' }}
          >
            {t('matomo.text')}
          </Typography>
        </>
      )}
    </Grid>
  )
}

export default Page
