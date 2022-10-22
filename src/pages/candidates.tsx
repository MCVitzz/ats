import CandidateModal from '@/components/candidates/CandidatesDrawer'
import Datatable from '@/components/shared/Datatable/Datatable'
import Page from '@/components/shared/Layout/Page'
import getPrivateProps from '@/lib/auth/getPrivateProps'
import { CustomPage } from '@/types/next'
import { trpc } from '@/utils/trpc'
import { Button, Text, useDisclosure } from '@chakra-ui/react'
import { Candidate } from '@prisma/client'
import { createColumnHelper } from '@tanstack/react-table'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

export const getServerSideProps = getPrivateProps(() => ({ props: {} }))

const CandidatesPage: CustomPage = () => {
  const { t } = useTranslation('candidates')
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>()
  const columnHelper = createColumnHelper<Candidate>()

  const columns = [
    columnHelper.accessor('firstName', {
      header: () => (
        <Text fontWeight="bold" color="black">
          {t('candidate-table-column-label-first-name')}
        </Text>
      ),
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('lastName', {
      header: () => (
        <Text fontWeight="bold" color="black">
          {t('candidate-table-column-label-last-name')}
        </Text>
      ),
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('email', {
      header: () => (
        <Text fontWeight="bold" color="black">
          {t('candidate-table-column-label-email')}
        </Text>
      ),
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('city', {
      header: () => (
        <Text fontWeight="bold" color="black">
          {t('candidate-table-column-label-city')}
        </Text>
      ),
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
  ]

  const onItemSelected = async (item: Candidate) => {
    setSelectedCandidate(item)
    onOpen()
  }

  const onClickAddCandidate = () => {
    setSelectedCandidate(undefined)
    onOpen()
  }

  return (
    <Page>
      <CandidateModal
        candidate={selectedCandidate}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Datatable
        actions={[
          <Button key={1} variant="primary" onClick={onClickAddCandidate}>
            {t('add-candidate')}
          </Button>,
        ]}
        dataQuery={trpc.candidates.getAll.useQuery}
        onItemSelected={onItemSelected}
        columns={columns}
        title={t('table-title')}
      />
    </Page>
  )
}

CandidatesPage.title = 'Candidates'
CandidatesPage.fullPage = false

export default CandidatesPage
