'use client'

import { CustomDimensions } from '@/components/Matomo/constants'
import useMatomo from '@/components/Matomo/useMatomo'
import {
  createContext,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

interface PwaContextType {
  handleInstallClick?: MouseEventHandler<HTMLAnchorElement>
  showInstallButton: boolean
  showInstallationInstruction: boolean
  setShowInstallationInstruction?: Dispatch<SetStateAction<boolean>>
  prompt?: Event
}

export const PwaContext = createContext<PwaContextType>({
  showInstallButton: false,
  showInstallationInstruction: false,
})

/**
 * this provider contains PWA information needed for components
 */
export const PwaContentProvider = ({ children }: { children: ReactNode }) => {
  const [showInstallButton, setShowInstallButton] = useState<boolean>(false)
  const [showInstallationInstruction, setShowInstallationInstruction] =
    useState<boolean>(false)
  const [prompt, setPrompt] = useState<Event | undefined>(undefined)

  const browser = window?.navigator?.userAgent
  const isPWA = window?.matchMedia('(display-mode: standalone)')?.matches
  const hasChrome = browser?.includes('Chrome')
  const hasSafari = browser?.includes('Safari')

  const { trackEvent, setCustomDimension } = useMatomo()

  useEffect(() => {
    // set PWA state custom dimension
    setCustomDimension(CustomDimensions.IS_PWA, isPWA ? 1 : 0)

    // this is needed because chrome on mac contains both strings
    if (!isPWA && !hasChrome && hasSafari) {
      // safari
      setShowInstallButton(true)
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()

      if (!isPWA && hasChrome) {
        // chrome
        setShowInstallButton(true)
        // is needed in order to open the installation prompt
        setPrompt(event)
      }
    }

    const handleAfterInstallPrompt = () => {
      trackEvent('PwaInstallation', 'PWA installed')
      setShowInstallButton(false)
    }

    window?.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window?.addEventListener('appinstalled', handleAfterInstallPrompt)

    return () => {
      window?.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
      window?.removeEventListener('appinstalled', handleAfterInstallPrompt)
    }
  }, [hasChrome, hasSafari, isPWA, setCustomDimension, trackEvent])

  const handleInstallClick = useCallback(() => {
    if (prompt) {
      trackEvent('PwaInstallation', 'click', 'installButton')
      // @ts-expect-error actually we expect here the BeforeInstallPromptEvent but it is not supported by at least firefox
      prompt?.prompt()
    } else if (!hasChrome && hasSafari) {
      setShowInstallButton(false)
      setShowInstallationInstruction(true)
    }
  }, [prompt, hasChrome, hasSafari, trackEvent])

  return (
    <PwaContext.Provider
      value={{
        handleInstallClick,
        showInstallButton,
        showInstallationInstruction,
        setShowInstallationInstruction,
        prompt,
      }}
    >
      {children}
    </PwaContext.Provider>
  )
}

export default PwaContentProvider
