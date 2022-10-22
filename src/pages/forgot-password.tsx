import ResetPasswordForm from '@/components/ForgotPasswordForm'
import { LoginIcon } from '@/styles/chakra.icons'
import { CustomPage } from '@/types/next'
import { Flex, Heading } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

const ForgotPasswordPage: CustomPage = () => {
  const { t } = useTranslation('forgot-password')

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
        <ResetPasswordForm />
      </Flex>
    </Flex>
  )
}

ForgotPasswordPage.title = 'Forgot Password'
ForgotPasswordPage.fullPage = true

export default ForgotPasswordPage
