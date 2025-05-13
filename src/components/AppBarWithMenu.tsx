'use client'

import HeidenheimLogo from "@/components/HeidenheimLogo";
import MainMenu from "@/components/MainMenu";
import { AddBoxOutlined, Close, InstallMobile, IosShare, Menu } from "@mui/icons-material";
import { Alert, AppBar, Button, Drawer, Grid, IconButton, List, ListItem, ListItemText, Paper, Toolbar, Typography } from "@mui/material";
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
  const [showInstallationInstruction, setShowInstallationInstruction] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<Event | null>(null)

  useEffect(() => {
    const browser = window.navigator.userAgent
    const isPWA = window.matchMedia("(display-mode: standalone)").matches
    const hasChrome = browser.includes("Chrome")
    const hasSafari = browser.includes("Safari")

    // this is needed because chrome on mac contains both strings
    if (!isPWA && !hasChrome && hasSafari) {
      // safari
      setShowInstallationInstruction(true)
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()

      if (!isPWA && hasChrome && !hasSafari) {
        // chrome
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
          </Grid>
          <Grid container direction='column' justifyContent='flex-end' alignItems='stretch' pb={7.5} sx={{height: '100%'}}>
            {showInstallButton && <Grid>
              <Button startIcon={<InstallMobile />} onClick={handleInstallClick} sx={{py: 1, color: 'communication.hyperlink.main'}}>
                <Typography variant='labelMedium' sx={{textTransform: "none" }}>{t('install.button.label')}</Typography>
              </Button>
            </Grid>}
            {showInstallationInstruction && <Grid px={2} container direction={'row'}>
              <Grid size='grow'>
                <Alert icon={false} severity="info" sx={{borderRadius: '8px', px: 1.5, py: 1, color: 'text.dark', width: '100%'}}>
                  <Typography color='textDark' variant='textLargeColored'>{t('install.instruction.title')}</Typography>
                  <List sx={{ listStyle: "decimal", pl: 2.5 }} component={'ol'}>
                    <ListItem sx={{ display: "list-item", paddingX: 0, paddingY: 0.5 }}>
                      <ListItemText>
                        <Grid container direction='row' alignItems='center' gap={0.5}>
                          <Grid>
                            <Typography color='textDark' variant='textLarge'>{t('install.instruction.step1')} </Typography>
                          </Grid>
                          <Grid>
                            <Paper sx={{borderRadius: 0, display: 'inline-block', px: 0.5}}><IosShare /></Paper>
                          </Grid>
                        </Grid>
                      </ListItemText>
                    </ListItem>
                    <ListItem sx={{ display: "list-item", paddingX: 0, paddingY: 0.5 }}>
                      <ListItemText>
                        <Typography color='textDark' variant='textLarge'>
                          {t('install.instruction.step2')}
                        </Typography>
                        <Paper sx={{borderRadius: 0, display: 'inline-block', p: 0.5}}>
                          <Grid container direction='row' alignItems='center' gap={0.5}>
                            <Typography variant='textLarge'>{t('install.instruction.toHomeScreen')}</Typography>
                            <AddBoxOutlined />
                          </Grid>
                        </Paper>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Alert>
              </Grid>
            </Grid>}
          </Grid>
        </Drawer>
      </AppBar>
    </>
  )
}

export default AppBarWithMenu