import PermissionModal from '@/components/permissions/PermissionsModal'
import Datatable from '@/components/shared/Datatable/Datatable'
import Page from '@/components/shared/Layout/Page'
import getPrivateProps from '@/lib/auth/getPrivateProps'
import { CustomPage } from '@/types/next'
import { trpc } from '@/utils/trpc'
import { Button, Text, useDisclosure } from '@chakra-ui/react'
import { Permission } from '@prisma/client'
import { createColumnHelper } from '@tanstack/react-table'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

export const getServerSideProps = getPrivateProps(() => ({ props: {} }))

const PermissionsPage: CustomPage = () => {
  const { t } = useTranslation('permissions')
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [selectedPermission, setSelectedPermission] = useState<Permission>()
  const columnHelper = createColumnHelper<Permission>()

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

  const onItemSelected = async (item: Permission) => {
    setSelectedPermission(item)
    onOpen()
  }

  const onClickAddPermission = () => {
    setSelectedPermission(undefined)
    onOpen()
  }

  return (
    <Page>
      <PermissionModal
        permission={selectedPermission}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Datatable
        actions={[
          <Button key={1} variant="primary" onClick={onClickAddPermission}>
            {t('add-permission')}
          </Button>,
        ]}
        dataQuery={trpc.permissions.getAll.useQuery}
        onItemSelected={onItemSelected}
        columns={columns}
        title={t('table-title')}
      />
    </Page>
  )
}

PermissionsPage.title = 'Permissions'
PermissionsPage.fullPage = false

export default PermissionsPage
