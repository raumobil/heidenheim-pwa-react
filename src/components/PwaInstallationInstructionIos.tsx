'use client'

import { AddBoxOutlined, IosShare } from '@mui/icons-material'
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { useTranslations } from 'next-intl'

/**
 * this component contains the PWA installation instruction for safari
 */
const PwaInstallationInstructionIos = () => {
  const t = useTranslations('pwa.install.instruction')

  return (
    <List sx={{ listStyle: 'decimal', pl: 2.5 }} component={'ol'}>
      <ListItem sx={{ display: 'list-item', paddingX: 0, paddingY: 0.5 }}>
        <ListItemText>
          <Grid container direction='row' alignItems='center' gap={0.5}>
            <Grid>
              <Typography color='textDark' variant='textLarge'>
                {t('step1')}{' '}
              </Typography>
            </Grid>
            <Grid>
              <Paper
                sx={{
                  borderRadius: 0,
                  display: 'inline-block',
                  px: 0.5,
                }}
              >
                <IosShare titleAccess={t('titleAccessIosShareIcon')} />
              </Paper>
            </Grid>
          </Grid>
        </ListItemText>
      </ListItem>
      <ListItem sx={{ display: 'list-item', paddingX: 0, paddingY: 0.5 }}>
        <ListItemText>
          <Typography color='textDark' variant='textLarge'>
            {t('step2')}
          </Typography>
          <Paper
            sx={{
              borderRadius: 0,
              display: 'inline-block',
              p: 0.5,
            }}
          >
            <Grid container direction='row' alignItems='center' gap={0.5}>
              <Typography variant='textLarge'>{t('toHomeScreen')}</Typography>
              <AddBoxOutlined
                titleAccess={t('titleAccessAddBoxIconOutlinedIcon')}
              />
            </Grid>
          </Paper>
        </ListItemText>
      </ListItem>
    </List>
  )
}

export default PwaInstallationInstructionIos
