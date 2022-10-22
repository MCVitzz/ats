import Page from '@/components/shared/Layout/Page'
import getPrivateProps from '@/lib/auth/getPrivateProps'
import { AccountIcon } from '@/styles/chakra.icons'
import { CustomPage } from '@/types/next'
import { Flex, Heading } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

export const getServerSideProps = getPrivateProps(() => ({ props: {} }))

const ProfilePage: CustomPage = () => {
  const { t } = useTranslation('profile')

  return (
    <Page>
      <Flex align="center" gap={4}>
        <AccountIcon w={8} h={8} />
        <Heading size="lg">{t('title')}</Heading>
      </Flex>
    </Page>
  )
}

ProfilePage.title = 'Profile'
ProfilePage.fullPage = false

export default ProfilePage
