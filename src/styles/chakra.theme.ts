// 1. Import the extendTheme function
import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    50: '#E7EAF7',
    100: '#6E80CD',
    200: '#566BC4',
    300: '#3E56BC',
    400: '#2641B3',
    500: '#0E2CAB',
    600: '#0D289A',
    700: '#0B2389',
    800: '#0A1F78',
    900: '#081A67',
  },
  background: '#F4F4F4',
  textColor: '#0E2CAB',
  focus: '#3182CE',
}

const fonts = {
  heading: `Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  body: `Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
}

type Components = {
  [key: string]: ComponentStyleConfig
}

const components: Components = {
  Heading: {
    baseStyle: { color: colors.textColor },
  },
  Button: {
    variants: {
      primary: {
        bg: colors.brand[500],
        color: 'white',
        _hover: { bg: colors.brand[300] },
      },
      secondary: {
        bg: 'white',
        color: colors.brand[500],
        _hover: { color: colors.brand[300] },
      },
      clear: {
        bg: 'transparent',
        _hover: { bg: 'transparent' },
      },
      danger: {
        backgroundColor: 'red.500',
        color: 'white',
        _hover: {
          bg: 'red.300',
        },
      },
    },
  },
  Text: {
    baseStyle: {
      color: colors.textColor,
    },
    variants: {
      error: {
        color: 'red.500',
      },
      link: {
        transition: '0.1s ease-in-out',
        color: colors.textColor,
        cursor: 'pointer',
        fontWeight: 'regular',
        _hover: {
          color: colors.brand[300],
        },
      },
    },
  },
}

const theme = extendTheme({ colors, components, fonts })

export default theme
