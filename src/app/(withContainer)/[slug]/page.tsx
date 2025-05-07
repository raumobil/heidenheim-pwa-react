import { Typography } from "@mui/material"

/**
 * this is a regular page with content depending on the slug (WIP)
 */
const Page = ({ params } : { params: { slug: string}}) => {
  return (
    <Typography
      variant='titleExtraLarge'
      component='h2'
      color='textDark'
    >
      {params.slug}
    </Typography>
  )
}

export default Page