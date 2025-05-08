import BackButton from "@/components/BackButton";
import { Grid, Typography } from "@mui/material"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

/**
 * this is a regular page with content depending on the slug (WIP)
 */
const Page = async ({ params } : { params: Promise<{ slug: string}>}) => {
  const { slug } = await params

  // load messages depending on slug
  const messages = await getMessages();
  const messagesForSlug = messages.pages?.[slug]
  
  // 404 if no messages found for slug
  if (!messagesForSlug) {
    notFound()
  }

  const t = await getTranslations(`pages.${slug}`)
  return (
    <Grid container direction='column'>
      <Grid container direction='row'>
        <Grid>
          <BackButton />
        </Grid>
        <Grid>
          <Typography
            variant='titleExtraLarge'
            component='h2'
            color='textDark'
          >
            {t('title')}
          </Typography>
        </Grid>
      </Grid>
      { // render typography for every key under `body`
        messagesForSlug.body && Object.keys(messagesForSlug.body).map((key) => {
        return (
          <Grid key={key}>
            {t.rich(`body.${key}`, {
              h3: (chunks) => <Typography variant='titleSmall' component='h3' marginTop={2} marginBottom={1} color='textDark'>{chunks}</Typography>,
              p: (chunks) => <Typography variant='textLarge' component='p' color='textDark'>{chunks}</Typography>,
            })}
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Page