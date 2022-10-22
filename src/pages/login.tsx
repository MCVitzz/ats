import LoginForm from '@/components/LoginForm'
import { LoginIcon } from '@/styles/chakra.icons'
import { CustomPage } from '@/types/next'
import { Flex, Heading } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

//TODO: Add Redirect to Main when user is logged in

const LoginPage: CustomPage = () => {
  const { t } = useTranslation('login')
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
          <Heading size="lg">{t('title')}</Heading>
        </Flex>
        <LoginForm />
      </Flex>
    </Flex>
  )
}

LoginPage.title = 'Login'
LoginPage.fullPage = true

export default LoginPage
