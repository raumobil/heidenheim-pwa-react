import { Container } from '@mui/material'

/**
 * this layout places its content inside a container with maxWidth and padding
 */
const ContainerLayout = ({ children }: LayoutProps<'/[locale]'>) => {
  return (
    <Container
      maxWidth='sm'
      sx={{
        paddingY: 3,
      }}
    >
      {children}
    </Container>
  )
}

export default ContainerLayout
