import { Typography } from "@mui/material"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation";
import { Fragment } from "react";

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
    <>
      <Typography
        variant='titleExtraLarge'
        component='h2'
        color='textDark'
      >
        {t('title')}
      </Typography>
      { // render typography for every key under `body`
        messagesForSlug.body && Object.keys(messagesForSlug.body).map((key) => {
        return (
          <Fragment key={key}>
            {t.rich(`body.${key}`, {
              h3: (chunks) => <Typography variant='titleSmall' component='h3' marginTop={2} marginBottom={1} color='textDark'>{chunks}</Typography>,
              p: (chunks) => <Typography variant='textLarge' component='p' color='textDark'>{chunks}</Typography>,
            })}
          </Fragment>
        )
      })}
    </>
  )
}

export default Page