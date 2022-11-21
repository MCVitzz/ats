import useConfirmationDialog from '@/hooks/useConfirm'
import { trpc } from '@/utils/trpc'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Candidate } from '@prisma/client'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import FormCreatableSelect from '../forms/FormCreatableSelect'
import FormInput from '../forms/FormInput'

interface CandidateModalProps {
  isOpen: boolean
  onClose(): void
  candidate?: Candidate
}

const CandidateModal: React.FC<CandidateModalProps> = ({
  candidate,
  isOpen,
  onClose,
}) => {
  const { confirmationDialog } = useConfirmationDialog()
  const { t } = useTranslation('candidates')
  const utils = trpc.useContext()
  const { mutate: addCandidate, isLoading: isLoadingCandidate } =
    trpc.candidates.save.useMutation({
      onSuccess: () => {
        utils.candidates.getAll.invalidate()
      },
    })

  const { mutate: deleteCandidate, isLoading: isLoadingDelete } =
    trpc.candidates.delete.useMutation({
      onSuccess: () => {
        utils.candidates.getAll.invalidate()
      },
    })

  const { data: tagsRaw } = trpc.tags.getAll.useQuery()

  const tags = useMemo(() => {
    return (
      tagsRaw?.map((tag) => ({
        value: tag.id,
        label: tag.name,
      })) || []
    )
  }, [tagsRaw])

  const toast = useToast()

  const onClickDelete = () => {
    confirmationDialog({
      cancelBtn: t('delete-candidate-confirmation-cancel'),
      confirmAction: async () => {
        try {
          if (!candidate) return
          await deleteCandidate({ id: candidate?.id })
          toast({
            title: t('candidate-modal-delete-success'),
            status: 'success',
            duration: 2000,
          })
          onClose()
        } catch {
          toast({
            title: t('candidate-modal-delete-failure'),
            status: 'error',
            duration: 2000,
          })
        }
      },
      message: t('delete-candidate-confirmation-message'),
      confirmBtn: t('delete-candidate-confirmation-confirm'),
      title: t('delete-candidate-confirmation-title'),
    })
  }

  const schema = z.object({
    email: z.string().min(1, t('candidate-modal-invalid-email')),
    address: z.string().min(1, t('candidate-modal-invalid-address')),
    city: z.string().min(1, t('candidate-modal-invalid-city')),
    desiredPay: z.string().min(1, t('candidate-modal-invalid-desired-pay')),
    firstName: z.string().min(1, t('candidate-modal-invalid-first-name')),
    lastName: z.string().min(1, t('candidate-modal-invalid-last-name')),
    phone: z.string().min(1, t('candidate-modal-invalid-phone')),
    zipCode: z.string().min(1, t('candidate-modal-invalid-zip-code')),
    tags: z.array(z.object({ value: z.string(), label: z.string() })),
  })

  type Schema = z.infer<typeof schema>

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: Schema) => {
    try {
      await addCandidate({
        ...data,
        ownerId: candidate?.ownerId,
        id: candidate?.id,
        tags: data.tags.map((tag) => ({ id: tag.value, name: tag.label })),
      })
      toast({
        title: t('candidate-modal-save-success'),
        status: 'success',
        duration: 2000,
      })
      form.reset(candidate)
      onClose()
    } catch {
      toast({
        title: t('candidate-modal-save-failure'),
        status: 'error',
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    form.reset({ ...candidate })
  }, [candidate, form])

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="xl">
      <DrawerOverlay />
      <FormProvider {...form}>
        <form style={{ height: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerContent h="full">
            <DrawerHeader>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody flexGrow={1}>
              <Flex direction="column">
                <Flex gap={4}>
                  <FormInput
                    autoComplete={false}
                    name="firstName"
                    label={t('candidate-modal-label-first-name')}
                  />
                  <FormInput
                    autoComplete={false}
                    name="lastName"
                    label={t('candidate-modal-label-last-name')}
                  />
                </Flex>
                <FormInput
                  autoComplete={false}
                  name="email"
                  label={t('candidate-modal-label-email')}
                />
                <FormInput
                  autoComplete={false}
                  name="phone"
                  label={t('candidate-modal-label-phone')}
                />
                <FormInput
                  autoComplete={false}
                  name="desiredPay"
                  label={t('candidate-modal-label-desired-pay')}
                />
                <FormInput
                  autoComplete={false}
                  name="address"
                  label={t('candidate-modal-label-address')}
                />
                <Grid templateColumns="1fr 2fr" gap={4}>
                  <FormInput
                    autoComplete={false}
                    name="zipCode"
                    label={t('candidate-modal-label-zip-code')}
                  />
                  <FormInput
                    autoComplete={false}
                    name="city"
                    label={t('candidate-modal-label-city')}
                  />
                </Grid>
                <FormCreatableSelect
                  label={t('candidate-modal-label-tags')}
                  name="tags"
                  options={tags}
                  isMulti
                />
              </Flex>
            </DrawerBody>
            <DrawerFooter justifySelf="end" gap={4}>
              {candidate && (
                <Button
                  isLoading={isLoadingDelete}
                  variant="danger"
                  onClick={onClickDelete}
                >
                  {t('candidate-modal-button-delete')}
                </Button>
              )}
              <Button
                variant="primary"
                type="submit"
                isLoading={isLoadingCandidate}
              >
                {t('candidate-modal-button-save')}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </FormProvider>
    </Drawer>
  )
}

export default CandidateModal
