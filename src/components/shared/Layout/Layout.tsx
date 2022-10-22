import { Box, Flex, Grid } from '@chakra-ui/react'
import Head from 'next/head'
import Header from './Header'
import Sidebar from './Sidebar'

interface LayoutProps {
  fullPage: boolean
  title: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ fullPage, title, children }) => {
  return (
    <>
      <Head>
        <title>{`ATS | ${title}`}</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      </Head>
      <Flex
        maxH="100vh"
        h="100vh"
        maxW="100vw"
        w="100vw"
        bg="background"
        overflow="auto"
      >
        <Box maxH="100vh" overflow="auto" flexGrow={1}>
          <Header fullPage={fullPage} />
          {fullPage ? (
            <Box overflowY="auto">{children}</Box>
          ) : (
            <Grid templateColumns="12.5fr 87.5fr">
              <Sidebar />
              <Box overflowY="auto">{children}</Box>
            </Grid>
          )}
        </Box>
      </Flex>
    </>
  )
}

export default Layout
