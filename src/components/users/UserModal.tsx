import useConfirmationDialog from '@/hooks/useConfirm'
import { SessionUser } from '@/types/next-auth'
import { trpc } from '@/utils/trpc'
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import useTranslation from 'next-translate/useTranslation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import FormInput from '../forms/FormInput'

interface UserModalProps {
  isOpen: boolean
  onClose(): void
  user?: SessionUser
}

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  const { confirmationDialog } = useConfirmationDialog()
  const { t } = useTranslation('users')
  const utils = trpc.useContext()
  const { mutate: addUser, isLoading: isLoadingUser } =
    trpc.users.save.useMutation({
      onSuccess: () => {
        utils.users.getAll.invalidate()
      },
    })

  const { mutate: deleteUser, isLoading: isLoadingDelete } =
    trpc.users.delete.useMutation({
      onSuccess: () => {
        utils.users.getAll.invalidate()
      },
    })

  const toast = useToast()

  const onClickDelete = () => {
    confirmationDialog({
      cancelBtn: t('delete-user-confirmation-cancel'),
      confirmAction: async () => {
        try {
          if (!user) return
          await deleteUser({ id: user?.id })
          toast({
            title: t('user-modal-delete-success'),
            status: 'success',
            duration: 2000,
          })
          onClose()
        } catch {
          toast({
            title: t('user-modal-delete-failure'),
            status: 'error',
            duration: 2000,
          })
        }
      },
      message: t('delete-user-confirmation-message'),
      confirmBtn: t('delete-user-confirmation-confirm'),
      title: t('delete-user-confirmation-title'),
    })
  }

  const schema = z.object({
    name: z.string().min(1, t('user-modal-invalid-name')),
    email: z.string().email(t('user-modal-invalid-email')),
  })

  type Schema = z.infer<typeof schema>

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: Schema) => {
    try {
      await addUser({ ...data, id: user?.id })
      toast({
        title: t('user-modal-save-success'),
        status: 'success',
        duration: 2000,
      })
      form.reset(user ?? { email: '', name: '' })
      onClose()
    } catch {
      toast({
        title: t('user-modal-save-failure'),
        status: 'error',
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    form.reset(user ?? { email: '', name: '' })
  }, [user, form])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ModalHeader>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <Flex direction="column" gap={4}>
                <FormInput
                  autoComplete={false}
                  name="name"
                  label={t('user-modal-label-name')}
                />
                <FormInput
                  autoComplete={false}
                  name="email"
                  label={t('user-modal-label-email')}
                />
              </Flex>
            </ModalBody>
            <ModalFooter gap={4}>
              {user && (
                <Button
                  isLoading={isLoadingDelete}
                  variant="danger"
                  onClick={onClickDelete}
                >
                  {t('user-modal-button-delete')}
                </Button>
              )}
              <Button variant="primary" type="submit" isLoading={isLoadingUser}>
                {t('user-modal-button-save')}
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}

export default UserModal
