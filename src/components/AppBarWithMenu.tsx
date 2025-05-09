'use client'

import HeidenheimLogo from "@/components/HeidenheimLogo";
import MainMenu from "@/components/MainMenu";
import { Close, InstallMobile, Menu } from "@mui/icons-material";
import { AppBar, Button, Drawer, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

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

  const [showInstallButton, setShowInstallButton] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<Event | null>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()

      if (!window.matchMedia("(desplay-mode: standalone)").matches) {
        setShowInstallButton(true)
        // is needed in order to open the installation prompt
        setPrompt(event)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = () => {
    // @ts-expect-error actually we expect here the BeforeInstallPromptEvent but it is not supported by at least firefox
    prompt?.prompt()
  }

  const t = useTranslations('AppBarWithMenu')
  
  return (
    <>
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
            {showInstallButton && <Grid>
              <Button startIcon={<InstallMobile />} onClick={handleInstallClick}>
                <Typography variant='labelMedium' sx={{textTransform: "none"}}>{t('install.button.label')}</Typography>
              </Button>
            </Grid>}
          </Grid>
        </Drawer>
      </AppBar>
    </>
  )
}

export default AppBarWithMenu