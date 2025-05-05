'use client'

import { Menu } from "@mui/icons-material";
import { AppBar, Grid, IconButton, styled, Toolbar } from "@mui/material";

// see https://mui.com/material-ui/react-app-bar/#fixed-placement
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

/**
 * this component contains the main navigation
 */
const AppBarWithMenu = () => (
  <>
    <AppBar
      position='fixed'
      component='nav'
      sx={{
        backgroundColor: 'background.paper'
      }}
    >
      <Toolbar>
        <Grid container direction='row' size='grow'>
          <Grid size='grow'>
            {/* placeholder for logo */}
          </Grid>
          <Grid size='auto'>
            <IconButton>
              <Menu color='primary' />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Offset />
  </>
)

export default AppBarWithMenu