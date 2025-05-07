import { Box } from "@mui/material"

/**
 * this layout places its content inside a box which uses all available width and height
 */
const FullWidthAndHeightLayout = ({ children } : { children: React.ReactNode}) => {
  return (
    <Box
      // 64px is the height of the AppBar
      sx={{ height: "calc(100dvh - 64px)" }}
    >
      {children}
    </Box>
  )
}

export default FullWidthAndHeightLayout