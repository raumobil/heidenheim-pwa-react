import { Link, usePathname } from "@/i18n/navigation"
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useTranslations } from "next-intl"
import { MouseEventHandler } from "react"


/**
 * a single menu item
 */
const MenuItem = ({ text, href, onClick } : { text: string, href?: string, onClick: MouseEventHandler }) => {
  const pathname = usePathname()
  const isActive = href === pathname

  return (
    <ListItem>
      <ListItemButton
        dense
        disabled={!href}
        {...(href && {href: href})}
        onClick={onClick}
        LinkComponent={Link}
      >
        <ListItemText
          primary={text}
          slotProps={{
            primary: {
              variant: isActive ? 'textLargeColored' : 'textLarge',
              color: 'textDark',
              sx: {
                textDecoration: isActive ? 'underline' : 'none'
              }
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}

/**
 * a list of menu items
 */
const MainMenu = ({ onMenuItemClick } : { onMenuItemClick: MouseEventHandler }) => {
  const t = useTranslations('MainMenu')

  return (
    <List>
      <MenuItem text={t('map')} href="/" onClick={onMenuItemClick} />
      <MenuItem text={t('qrCodeScanner')} href="/?isScannerOpen=true" onClick={onMenuItemClick} />
      <MenuItem text={t('legal')} href="/legal" onClick={onMenuItemClick} />
      <MenuItem text={t('accessibility')} href="/accessibility" onClick={onMenuItemClick} />
      <MenuItem text={t('imprint')} onClick={onMenuItemClick} />
      <MenuItem text={t('language')} onClick={onMenuItemClick} />
    </List>
  )
}

export default MainMenu