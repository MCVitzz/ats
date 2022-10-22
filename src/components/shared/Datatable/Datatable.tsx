import {
  Flex,
  Icon,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import useTranslation from 'next-translate/useTranslation'
import { useMemo, useState } from 'react'
import {
  BiChevronLeft,
  BiChevronRight,
  BiSkipNext,
  BiSkipPrevious,
} from 'react-icons/bi'
import DatatableContainer from './DatatableContainer'

interface DatatableProps<T> {
  title: string
  columns: ColumnDef<T, string>[]
  actions?: React.ReactNode
  onItemSelected?(item: T): void
  dataQuery(fetchDataOptions: PaginationState): {
    isLoading: boolean
    data?: {
      rows: T[]
      count: number
    }
  }
}

function Datatable<T>({
  title,
  columns,
  dataQuery,
  onItemSelected,
  actions,
}: DatatableProps<T>) {
  const { t } = useTranslation('common')
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }

  const { data, isLoading } = dataQuery(fetchDataOptions)

  const table = useReactTable({
    data: data?.rows ?? [],
    columns,
    pageCount: data?.count ? data.count / pageSize : -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  })

  return (
    <DatatableContainer title={title} actions={actions}>
      <Table>
        <Thead />
        <Tbody>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
          {!isLoading ? (
            table.getRowModel().rows.map((row) => (
              <Tr
                _hover={{
                  bg: 'brand.50',
                }}
                cursor={onItemSelected ? 'pointer' : undefined}
                key={row.id}
                onClick={() =>
                  onItemSelected ? onItemSelected(row.original) : undefined
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={2}>
                <Flex w="full" h="full" p={16} justify="center">
                  <Spinner color="brand.500" w={16} h={16} />
                </Flex>
              </Td>
            </Tr>
          )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={2}>
              <SimpleGrid columns={3} w="full">
                <Flex align="center" placeSelf="left">
                  <Text color="black" fontSize={12}>
                    {table.getState().pagination.pageIndex + 1}
                    {` ${t('datatable-page-separator')} `}
                    {table.getPageCount()}
                  </Text>
                </Flex>
                <Flex align="center" gap={4} placeSelf="center">
                  <IconButton
                    icon={<Icon as={BiSkipPrevious} />}
                    p={1}
                    borderRadius="md"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="first page"
                  />
                  <IconButton
                    icon={<Icon as={BiChevronLeft} />}
                    p={1}
                    borderRadius="md"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="previous page"
                  />
                  <Input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0
                      table.setPageIndex(page)
                    }}
                    fontSize={12}
                    w={16}
                    textAlign="center"
                    borderRadius="md"
                    disabled={
                      !table.getCanPreviousPage() && !table.getCanNextPage()
                    }
                    p={1}
                  />
                  <IconButton
                    icon={<Icon as={BiChevronRight} />}
                    p={1}
                    borderRadius="md"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label="next page"
                  />
                  <IconButton
                    icon={<Icon as={BiSkipNext} />}
                    p={1}
                    borderRadius="md"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    aria-label="last page"
                  />
                </Flex>
                <Flex align="center" gap={2} placeSelf="end">
                  <Text color="black" fontSize={12}>
                    {t('datatable-page-size')}
                  </Text>
                  <Select
                    w={20}
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value))
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </SimpleGrid>
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </DatatableContainer>
  )
}

export default Datatable
