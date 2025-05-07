import { Typography } from "@mui/material"

/**
 * this is a regular page with content depending on the slug (WIP)
 */
const Page = async ({ params } : { params: Promise<{ slug: string}>}) => {
  const { slug } = await params
  return (
    <Typography
      variant='titleExtraLarge'
      component='h2'
      color='textDark'
    >
      {slug}
    </Typography>
  )
}

export default Page