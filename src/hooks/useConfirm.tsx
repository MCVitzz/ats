import { useDisclosure } from '@chakra-ui/react'
import ConfirmationDialog from '@/components/shared/ConfirmationDialog'
import React, { createContext, useContext, useState } from 'react'

interface ConfirmationDialogProps {
  title: string
  message?: string
  cancelBtn: string
  confirmBtn: string
  confirmAction(): void
}

interface ConfirmationDialogProviderType {
  // eslint-disable-next-line no-unused-vars
  openDialog(options: ConfirmationDialogProps): void
}

const ConfirmationDialogContext = createContext(
  {} as ConfirmationDialogProviderType
)

export default function useConfirmationDialog() {
  const { openDialog } = useContext(ConfirmationDialogContext)

  const confirmationDialog = (options: ConfirmationDialogProps) =>
    openDialog({ ...options })

  return { confirmationDialog }
}

export const ConfirmationDialogProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dialogConfig, setDialogConfig] = useState<
    ConfirmationDialogProps | undefined
  >()

  const openDialog = (options: ConfirmationDialogProps) => {
    setDialogConfig(options)
    onOpen()
  }

  const resetDialog = () => {
    onClose()
    setDialogConfig(undefined)
  }

  const onConfirm = () => {
    resetDialog()
    dialogConfig?.confirmAction()
  }

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={onClose}
        title={dialogConfig?.title ?? ''}
        message={dialogConfig?.message ?? ''}
        confirmAction={onConfirm}
        cancelBtn={dialogConfig?.cancelBtn ?? ''}
        confirmBtn={dialogConfig?.confirmBtn ?? ''}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  )
}
