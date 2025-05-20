'use client'
import { createTheme } from '@mui/material/styles'

/**
 * customized material ui theme:
 * - changed font family to inter
 * - custom colors https://mui.com/material-ui/customization/palette/#custom-colors
 * - typography variants https://mui.com/material-ui/customization/typography/#adding-amp-disabling-variants 
 */
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#194873'
    },
    text: {
      dark: '#1A1A1A',
      light: '#FAFAFA'
    },
    background: {
      light: '#FDFDFD'
    },
    info: {
      main: '#1D8F0C'
    },
    warning: {
      main: '#E67300'
    },
    error: {
      main: '#F52300'
    },
    communication: {
      hyperlink: {
        main: '#005FCC'
      }
    },
    smap: {
      primary: {
        main: '#1D8F0C'
      }
    }
  },
  typography: {
    fontFamily: 'var(--font-inter)',
    labelMedium: {
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    textLarge: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.3,
    },
    textLargeColored: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    titleExtraLarge: {
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    titleLarge: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    titleLargeThin: {
      fontSize: '20px',
      fontWeight: 300,
      lineHeight: 1.2,
    },
    titleSmall: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
  },
})

export default theme

declare module '@mui/material/styles' {
  interface TypeText {
    dark?: string;
    light?: string;
  }

  interface TypeBackground {
    light?: string
  }

  interface SimplePaletteColorOptions {
    dark?: string;
  }

  interface PaletteOptions {
    communication?: {
      hyperlink?: {
        main?: string;
      }
    }
    smap?: {
      primary?: {
        main?: string;
      }
    }
  }

  interface TypographyVariants {
    labelMedium: React.CSSProperties;
    textLarge: React.CSSProperties;
    textLargeColored: React.CSSProperties;
    titleExtraLarge: React.CSSProperties;
    titleLarge: React.CSSProperties;
    titleLargeThin: React.CSSProperties;
    titleSmall: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    labelMedium?: React.CSSProperties;
    textLarge?: React.CSSProperties;
    textLargeColored?: React.CSSProperties;
    titleExtraLarge?: React.CSSProperties;
    titleLarge?: React.CSSProperties;
    titleLargeThin?: React.CSSProperties;
    titleSmall?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    labelMedium: true;
    textLarge: true;
    textLargeColored: true;
    titleExtraLarge: true;
    titleLarge: true;
    titleLargeThin: true;
    titleSmall: true;
  }
}
