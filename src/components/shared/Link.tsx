import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

interface LinkProps {
  href: string
  locale?: string
  children: React.ReactNode
}

const Link: React.FC<LinkProps> = ({ href, locale, children }) => {
  return (
    <NextLink locale={locale} href={href} passHref>
      <ChakraLink variant="link">{children}</ChakraLink>
    </NextLink>
  )
}

export default Link
