import { trpc } from '@/utils/trpc'
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
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const ForgotPasswordForm: React.FC = () => {
  const { push } = useRouter()
  const toast = useToast()
  const { t } = useTranslation('forgot-password')

  const { mutate, isLoading } = trpc.auth.recoverPassword.useMutation()

  const schema = z.object({
    email: z
      .string({
        required_error: t('email-error'),
      })
      .email(t('email-error-format')),
  })

  type Schema = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: Schema) => {
    mutate(data)

    toast({
      title: t('success'),
      status: 'success',
      duration: 2000,
    })

    push('/')
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
      <Button w="full" variant="primary" type="submit" isLoading={isLoading}>
        {t('reset')}
      </Button>
    </Flex>
  )
}

export default ForgotPasswordForm
