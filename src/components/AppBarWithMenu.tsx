'use client'

import HeidenheimLogo from "@/components/HeidenheimLogo";
import MainMenu from "@/components/MainMenu";
import PwaInstallation from "@/components/PwaInstallation";
import { Close, Menu } from "@mui/icons-material";
import { AppBar, Drawer, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

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

  const t = useTranslations('AppBarWithMenu')
  
  return (
    <AppBar
      position='sticky'
      component='nav'
      sx={{
        backgroundColor: 'background.paper'
      }}
    >
      <Toolbar variant='dense'>
        <Grid container direction='row' size='grow' alignItems='center' spacing={2}>
          <Grid size='auto'>
            <HeidenheimLogo color='primary'/>
          </Grid>
          <Grid size='grow'>
            <Typography color='primary' variant='titleLarge' component='h1'>
              {t.rich('toolbar.title', {
                thin: (chunk) => <Typography variant='titleLargeThin'>{chunk}</Typography>
              })}
            </Typography>
          </Grid>
          <Grid size='auto'>
            <IconButton onClick={openMenu} aria-label={t('toolbar.button.openMenu')}>
              <Menu sx={{ color: 'var(--mui-palette-text-dark)' }} />
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
                  <Typography color='primary' variant='titleLarge' component='div'>{t('menu.title')}</Typography>
                </Grid>
                <Grid size='auto'>
                  <IconButton onClick={closeMenu} aria-label={t('menu.button.closeMenu')}>
                    <Close sx={{ color: 'var(--mui-palette-text-dark)' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </Grid>
          <Grid>
            <MainMenu onMenuItemClick={closeMenu} />
          </Grid>
        </Grid>
        <PwaInstallation />
      </Drawer>
    </AppBar>
  )
}

export default AppBarWithMenu