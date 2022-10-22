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
  Text,
} from '@chakra-ui/react'
import React from 'react'

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose(): void
  title: string
  message: string
  cancelBtn: string
  confirmBtn: string
  confirmAction(): void
}

export default function ConfirmationDialog({
  cancelBtn,
  confirmAction,
  confirmBtn,
  isOpen,
  message,
  onClose,
  title,
}: ConfirmationDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader p={4}>
          <Text>{title}</Text>
          <ModalCloseButton color="brand.500" />
        </ModalHeader>
        {message && (
          <ModalBody>
            <Text>{message}</Text>
          </ModalBody>
        )}
        <ModalFooter>
          <Flex>
            <Button variant="secondary" mr={2} onClick={onClose}>
              {cancelBtn}
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onClose()
                confirmAction()
              }}
            >
              {confirmBtn}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
