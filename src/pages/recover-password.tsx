import ResetPasswordForm from '@/components/ResetPasswordForm'
import { LoginIcon } from '@/styles/chakra.icons'
import { CustomPage } from '@/types/next'
import { Flex, Heading } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const RecoverPasswordPage: CustomPage = () => {
  const { query, push } = useRouter()
  const { t } = useTranslation('recover-password')

  //TODO: Is this right?
  useEffect(() => {
    if (!query?.token || typeof query.token !== 'string') push('/')
  }, [query, push])

  if (!query?.token || typeof query.token !== 'string') {
    return <></>
  }

  return (
    <Flex h="90vh" w="100vw" bg="brand.500" justify="center" align="center">
      <Flex
        direction="column"
        gap={4}
        p={12}
        bg="white"
        boxShadow="md"
        borderRadius="xl"
      >
        <Flex align="center" gap={4}>
          <LoginIcon w={12} h={12} />
          <Flex justify="center" direction="column">
            <Heading size="lg">{t('title')}</Heading>
            <Heading size="xs">{t('subtitle')}</Heading>
          </Flex>
        </Flex>
        <ResetPasswordForm token={query.token} />
      </Flex>
    </Flex>
  )
}

RecoverPasswordPage.title = 'Recover Password'
RecoverPasswordPage.fullPage = true

export default RecoverPasswordPage
