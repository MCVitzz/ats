import { trpc } from '@/utils/trpc'
import { Button, Flex, FormErrorMessage, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import FormInput from './forms/FormInput'

interface ResetPasswordFormProps {
  token: string
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const { t } = useTranslation('recover-password')
  const { push } = useRouter()
  const toast = useToast()
  const { mutate, isLoading } = trpc.auth.resetPassword.useMutation()

  const schema = z
    .object({
      password: z.string().min(1, t('password-error')),
      confirmPassword: z.string().min(1, t('confirmPassword-error')),
    })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
      path: ['confirmPassword'],
      message: t('password-match-error'),
    })

  type Schema = z.infer<typeof schema>

  const form = useForm<Schema>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: Schema) => {
    mutate({ password: data.password, token })

    toast({
      title: t('success'),
      status: 'success',
      duration: 2000,
    })

    push('/')
  }

  return (
    <FormProvider {...form}>
      <Flex
        direction="column"
        gap={4}
        as="form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          type="password"
          name="password"
          label={t('password-label')}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          label={t('confirmPassword-label')}
        />
        <FormErrorMessage>
          {form.formState.errors.confirmPassword?.message}
        </FormErrorMessage>
        <Button w="full" variant="primary" type="submit" isLoading={isLoading}>
          {t('reset')}
        </Button>
      </Flex>
    </FormProvider>
  )
}

export default ResetPasswordForm
