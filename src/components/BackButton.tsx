'use client'

import { Link } from "@/i18n/navigation"
import { ArrowBackIosNew } from "@mui/icons-material"
import { IconButton } from "@mui/material"

/**
 * this button always leads to the home page
 */
const BackButton = () => {
  return (
    <IconButton href='/' LinkComponent={Link} sx={{ width: '36px', height: '36px' }}>
      <ArrowBackIosNew sx={{ color: '#000' }}/>
    </IconButton>
  )
}

export default BackButton
