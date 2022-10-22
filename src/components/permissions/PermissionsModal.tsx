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
import { Permission } from '@prisma/client'
import useTranslation from 'next-translate/useTranslation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import FormInput from '../forms/FormInput'

interface PermissionModalProps {
  isOpen: boolean
  onClose(): void
  permission?: Permission
}

const PermissionModal: React.FC<PermissionModalProps> = ({
  permission,
  isOpen,
  onClose,
}) => {
  const { confirmationDialog } = useConfirmationDialog()
  const { t } = useTranslation('permissions')
  const utils = trpc.useContext()
  const { mutate: addPermission, isLoading: isLoadingPermission } =
    trpc.permissions.save.useMutation({
      onSuccess: () => {
        utils.permissions.getAll.invalidate()
      },
    })

  const { mutate: deletePermission, isLoading: isLoadingDelete } =
    trpc.permissions.delete.useMutation({
      onSuccess: () => {
        utils.permissions.getAll.invalidate()
      },
    })

  const toast = useToast()

  const onClickDelete = () => {
    confirmationDialog({
      cancelBtn: t('delete-permission-confirmation-cancel'),
      confirmAction: async () => {
        try {
          if (!permission) return
          await deletePermission({ id: permission?.id })
          toast({
            title: t('permission-modal-delete-success'),
            status: 'success',
            duration: 2000,
          })
          onClose()
        } catch {
          toast({
            title: t('permission-modal-delete-failure'),
            status: 'error',
            duration: 2000,
          })
        }
      },
      message: t('delete-permission-confirmation-message'),
      confirmBtn: t('delete-permission-confirmation-confirm'),
      title: t('delete-permission-confirmation-title'),
    })
  }

  const schema = z.object({
    name: z.string().min(1, t('permission-modal-invalid-name')),
  })

  type Schema = z.infer<typeof schema>

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: Schema) => {
    try {
      await addPermission({ ...data, id: permission?.id })
      toast({
        title: t('permission-modal-save-success'),
        status: 'success',
        duration: 2000,
      })
      form.reset(permission ?? { name: '' })
      onClose()
    } catch {
      toast({
        title: t('permission-modal-save-failure'),
        status: 'error',
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    form.reset(permission ?? { name: '' })
  }, [permission, form])

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
                  label={t('permission-modal-label-name')}
                />
              </Flex>
            </ModalBody>
            <ModalFooter gap={4}>
              {permission && (
                <Button
                  isLoading={isLoadingDelete}
                  variant="danger"
                  onClick={onClickDelete}
                >
                  {t('permission-modal-button-delete')}
                </Button>
              )}
              <Button
                variant="primary"
                type="submit"
                isLoading={isLoadingPermission}
              >
                {t('permission-modal-button-save')}
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}

export default PermissionModal
