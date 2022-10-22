import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Link from './shared/Link'

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()
  const toast = useToast()
  const { t } = useTranslation('login')

  const schema = z.object({
    email: z
      .string({
        required_error: t('email-error'),
      })
      .email(t('email-error-format')),
    password: z
      .string({
        required_error: t('password-error'),
      })
      .min(1, t('password-error')),
  })

  type Schema = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: Schema) => {
    setIsLoading(true)
    const res = await signIn('app', {
      ...data,
      redirect: false,
    })
    setIsLoading(false)

    if (res?.ok) {
      toast({
        title: t('loginSuccess'),
        status: 'success',
        duration: 2000,
      })
      push('/')
    } else
      toast({
        title: t('invalidCredentials'),
        status: 'error',
        duration: 2000,
      })
  }

  return (
    <Flex
      direction="column"
      gap={4}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={!!errors.email}>
        <FormLabel fontWeight="bold">
          <Text>{t('email-label')}</Text>
        </FormLabel>
        <Input {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel fontWeight="bold">
          <Text>{t('password-label')}</Text>
        </FormLabel>
        <Input type="password" {...register('password')} />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button w="full" variant="primary" type="submit" isLoading={isLoading}>
        {t('signIn')}
      </Button>
      <Link href="/forgot-password">
        <Text textAlign="center" fontSize={12}>
          {t('forgotPassword')}
        </Text>
      </Link>
    </Flex>
  )
}

export default LoginForm
