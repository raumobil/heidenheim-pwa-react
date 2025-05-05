'use client'

import { Close, Menu } from "@mui/icons-material";
import { AppBar, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, styled, Toolbar, Typography } from "@mui/material";
import { useCallback, useState } from "react";

// see https://mui.com/material-ui/react-app-bar/#fixed-placement
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

/**
 * this component contains the main navigation
 */
const AppBarWithMenu = () => {

  const [menuOpen, setMenuOpen] = useState(false)

  const openMenu = useCallback(() => {
    setMenuOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])
  
  return (
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
              <IconButton onClick={openMenu}>
                <Menu color='primary' />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
        <Drawer
          anchor='right'
          open={menuOpen}
          onClose={closeMenu}
          ModalProps={{
            keepMounted: true
          }}
          slotProps={{
            paper: {
              sx: {
                width: '100%'
              }
            }
          }}
        >
          <Grid container direction='column'>
            <Grid>
              <Toolbar>
                <Grid container direction='row' alignItems='center' size='grow'>
                  <Grid size='grow' justifyItems='center'>
                    <Typography color='primary' variant='titleLarge' component='div'>Menü</Typography>
                  </Grid>
                  <Grid size='auto'>
                    <IconButton onClick={closeMenu}>
                      <Close sx={{ color: 'var(--mui-palette-text-dark)' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Toolbar>
            </Grid>
            <Grid>
              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemText
                      primary='Kartenansicht'
                      slotProps={{
                        primary: {
                          variant: 'textLarge',
                          color: 'textDark'
                        }
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Drawer>
      </AppBar>
      <Offset />
    </>
  )
}

export default AppBarWithMenu