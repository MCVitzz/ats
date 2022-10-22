import Layout from '@/components/shared/Layout/Layout'
import { ConfirmationDialogProvider } from '@/hooks/useConfirm'
import theme from '@/styles/chakra.theme'
import { CustomPage } from '@/types/next'
import { trpc } from '@/utils/trpc'
import { ChakraProvider } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import '../styles/global.scss'

interface CustomAppProps
  extends Omit<
    AppProps<{
      session: Session
    }>,
    'Component'
  > {
  Component: CustomPage
}

function ATS({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <ConfirmationDialogProvider>
          <Layout fullPage={Component.fullPage} title={Component.title}>
            <Component {...pageProps} />
          </Layout>
        </ConfirmationDialogProvider>
      </SessionProvider>
    </ChakraProvider>
  )
}

export default trpc.withTRPC(ATS)
