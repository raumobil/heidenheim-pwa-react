import { Box } from '@mui/material'

/**
 * this layout places its content inside a box which uses all available width and height
 */
const FullWidthAndHeightLayout = ({ children }: LayoutProps<'/[locale]'>) => {
  return (
    <Box
      // 48px is the height of the AppBar (with dense prop)
      sx={{ height: 'calc(100dvh - 48px)', overflow: 'hidden' }}
    >
      {children}
    </Box>
  )
}

export default FullWidthAndHeightLayout
