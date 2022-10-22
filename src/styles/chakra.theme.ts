// 1. Import the extendTheme function
import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    50: '#e2fceb',
    100: '#beefd0',
    200: '#98e4b3',
    300: '#71d894',
    400: '#4bcd77',
    500: '#32b45e',
    600: '#258c48',
    700: '#186433',
    800: '#093d1d',
    900: '#001603',
  },
  background: '#F4F4F4',
  textColor: '#32b45e',
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
