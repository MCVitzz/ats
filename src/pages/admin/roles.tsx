import Datatable from '@/components/shared/Datatable/Datatable'
import Page from '@/components/shared/Layout/Page'
import RoleModal from '@/components/roles/RoleModal'
import getPrivateProps from '@/lib/auth/getPrivateProps'
import { CustomPage } from '@/types/next'
import { trpc } from '@/utils/trpc'
import { Button, Text, useDisclosure } from '@chakra-ui/react'
import { Role } from '@prisma/client'
import { createColumnHelper } from '@tanstack/react-table'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

export const getServerSideProps = getPrivateProps(() => ({ props: {} }))

const RolesPage: CustomPage = () => {
  const { t } = useTranslation('roles')
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [selectedRole, setSelectedRole] = useState<Role>()
  const columnHelper = createColumnHelper<Role>()

  const columns = [
    columnHelper.accessor('name', {
      header: () => (
        <Text fontWeight="bold" color="black">
          Name
        </Text>
      ),
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
  ]

  const onItemSelected = async (item: Role) => {
    setSelectedRole(item)
    onOpen()
  }

  const onClickAddRole = () => {
    setSelectedRole(undefined)
    onOpen()
  }

  return (
    <Page>
      <RoleModal role={selectedRole} isOpen={isOpen} onClose={onClose} />
      <Datatable
        actions={[
          <Button key={1} variant="primary" onClick={onClickAddRole}>
            {t('add-role')}
          </Button>,
        ]}
        dataQuery={trpc.roles.getAll.useQuery}
        onItemSelected={onItemSelected}
        columns={columns}
        title={t('table-title')}
      />
    </Page>
  )
}

RolesPage.title = 'Roles'
RolesPage.fullPage = false

export default RolesPage
