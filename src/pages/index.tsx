import Page from '@/components/shared/Layout/Page'
import getPrivateProps from '@/lib/auth/getPrivateProps'
import { CustomPage } from '@/types/next'

export const getServerSideProps = getPrivateProps(() => ({ props: {} }))

const MainPage: CustomPage = () => {
  return <Page>Home</Page>
}

MainPage.title = 'Main'
MainPage.fullPage = false

export default MainPage
