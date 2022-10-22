import Datatable from '@/components/shared/Datatable/Datatable'
import Page from '@/components/shared/Layout/Page'
import UserModal from '@/components/users/UserModal'
import getPrivateProps from '@/lib/auth/getPrivateProps'
import { CustomPage } from '@/types/next'
import { SessionUser } from '@/types/next-auth'
import { trpc } from '@/utils/trpc'
import { Button, Text, useDisclosure } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

export const getServerSideProps = getPrivateProps(() => ({ props: {} }))

const UsersPage: CustomPage = () => {
  const { t } = useTranslation('users')
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [selectedUser, setSelectedUser] = useState<SessionUser>()
  const columnHelper = createColumnHelper<SessionUser>()

  const columns = [
    columnHelper.accessor('name', {
      header: () => (
        <Text fontWeight="bold" color="black">
          Name
        </Text>
      ),
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('email', {
      header: () => (
        <Text fontWeight="bold" color="black">
          Email
        </Text>
      ),
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
  ]

  const onItemSelected = async (item: SessionUser) => {
    setSelectedUser(item)
    onOpen()
  }

  const onClickAddUser = () => {
    setSelectedUser(undefined)
    onOpen()
  }

  return (
    <Page>
      <UserModal user={selectedUser} isOpen={isOpen} onClose={onClose} />
      <Datatable
        actions={[
          <Button key={1} variant="primary" onClick={onClickAddUser}>
            {t('add-user')}
          </Button>,
        ]}
        dataQuery={trpc.users.getAll.useQuery}
        onItemSelected={onItemSelected}
        columns={columns}
        title={t('table-title')}
      />
    </Page>
  )
}

UsersPage.title = 'Users'
UsersPage.fullPage = false

export default UsersPage
