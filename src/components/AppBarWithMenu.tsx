'use client'

import HeidenheimLogo from '@/components/HeidenheimLogo'
import MainMenu from '@/components/MainMenu'
import PwaInstallation from '@/components/PwaInstallation'
import { Close, Menu } from '@mui/icons-material'
import {
  AppBar,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import useMatomo from '@/components/Matomo/useMatomo'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'
import Image from 'next/image'

/**
 * this component contains the main navigation
 */
const AppBarWithMenu = () => {
  const { trackEvent } = useMatomo()
  const [menuOpen, setMenuOpen] = useState(false)

  const openMenu = useCallback(() => {
    trackEvent('AppBarWithMenu', 'open', 'menu')
    setMenuOpen(true)
  }, [trackEvent])

  const closeMenu = useCallback(() => {
    trackEvent('AppBarWithMenu', 'close', 'menu')
    setMenuOpen(false)
  }, [trackEvent])

  const t = useTranslations('AppBarWithMenu')

  return (
    <AppBar
      position='sticky'
      component='nav'
      sx={{
        backgroundColor: 'background.paper',
      }}
    >
      <Toolbar variant='dense'>
        <Grid
          container
          direction='row'
          size='grow'
          alignItems='center'
          spacing={0.5}
        >
          <Grid size='auto' display='flex' alignItems='center'>
            <HeidenheimLogo color='primary' sx={{ fontSize: 36 }} />
          </Grid>
          <Grid size='grow' display='flex' alignItems='center'>
            <Image
              src='appgefahren.svg'
              alt={'appgefahren'}
              height={36}
              width={1} // It is neccessary but no effect
              style={{ width: 'auto', height: '36px' }}
            />
          </Grid>
          <Grid size='auto'>
            <IconButton
              onClick={openMenu}
              aria-label={t('toolbar.button.openMenu')}
            >
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
          keepMounted: true,
        }}
        slotProps={{
          paper: {
            sx: {
              width: '100%',
            },
          },
        }}
      >
        <Grid container direction='column'>
          <Grid>
            <Toolbar>
              <Grid container direction='row' alignItems='center' size='grow'>
                <Grid size='grow' justifyItems='center'>
                  <Typography
                    color='primary'
                    variant='titleLarge'
                    component='div'
                  >
                    {t('menu.title')}
                  </Typography>
                </Grid>
                <Grid size='auto'>
                  <IconButton
                    onClick={closeMenu}
                    aria-label={t('menu.button.closeMenu')}
                  >
                    <Close sx={{ color: 'var(--mui-palette-text-dark)' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </Grid>
          <Grid>
            <MainMenu
              // does not use onClose because we do not want trackEvent here
              onMenuItemClick={() => {
                setMenuOpen(false)
              }}
            />
          </Grid>
        </Grid>
        <PwaInstallation />
      </Drawer>
    </AppBar>
  )
}

export default AppBarWithMenu
