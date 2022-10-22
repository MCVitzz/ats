import useConfirmationDialog from '@/hooks/useConfirm'
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
import { Role } from '@prisma/client'
import useTranslation from 'next-translate/useTranslation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import FormInput from '../forms/FormInput'

interface RoleModalProps {
  isOpen: boolean
  onClose(): void
  role?: Role
}

const RoleModal: React.FC<RoleModalProps> = ({ role, isOpen, onClose }) => {
  const { confirmationDialog } = useConfirmationDialog()
  const { t } = useTranslation('roles')
  const utils = trpc.useContext()
  const { mutate: addRole, isLoading: isLoadingRole } =
    trpc.roles.save.useMutation({
      onSuccess: () => {
        utils.roles.getAll.invalidate()
      },
    })

  const { mutate: deleteRole, isLoading: isLoadingDelete } =
    trpc.roles.delete.useMutation({
      onSuccess: () => {
        utils.roles.getAll.invalidate()
      },
    })

  const toast = useToast()

  const onClickDelete = () => {
    confirmationDialog({
      cancelBtn: t('delete-role-confirmation-cancel'),
      confirmAction: async () => {
        try {
          if (!role) return
          await deleteRole({ id: role?.id })
          toast({
            title: t('role-modal-delete-success'),
            status: 'success',
            duration: 2000,
          })
          onClose()
        } catch {
          toast({
            title: t('role-modal-delete-failure'),
            status: 'error',
            duration: 2000,
          })
        }
      },
      message: t('delete-role-confirmation-message'),
      confirmBtn: t('delete-role-confirmation-confirm'),
      title: t('delete-role-confirmation-title'),
    })
  }

  const schema = z.object({
    name: z.string().min(1, t('role-modal-invalid-name')),
  })

  type Schema = z.infer<typeof schema>

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: Schema) => {
    try {
      await addRole({ ...data, id: role?.id })
      toast({
        title: t('role-modal-save-success'),
        status: 'success',
        duration: 2000,
      })
      form.reset(role ?? { name: '' })
      onClose()
    } catch {
      toast({
        title: t('role-modal-save-failure'),
        status: 'error',
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    form.reset(role ?? { name: '' })
  }, [role, form])

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
                  label={t('role-modal-label-name')}
                />
              </Flex>
            </ModalBody>
            <ModalFooter gap={4}>
              {role && (
                <Button
                  isLoading={isLoadingDelete}
                  variant="danger"
                  onClick={onClickDelete}
                >
                  {t('role-modal-button-delete')}
                </Button>
              )}
              <Button variant="primary" type="submit" isLoading={isLoadingRole}>
                {t('role-modal-button-save')}
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}

export default RoleModal
