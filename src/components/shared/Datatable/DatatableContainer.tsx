import { Box, Flex, Heading } from '@chakra-ui/react'

interface DatatableContainerProps {
  children: React.ReactNode
  actions: React.ReactNode
  title: string
}

const DatatableContainer: React.FC<DatatableContainerProps> = ({
  children,
  actions,
  title,
}) => {
  return (
    <Flex
      w="full"
      direction="column"
      bg="white"
      boxShadow="md"
      borderRadius="md"
    >
      <Flex align="center" px={4} py={2} justify="space-around">
        <Heading flexGrow={1} size="md">
          {title}
        </Heading>
        <Flex>{actions}</Flex>
      </Flex>
      <Box h="1px" bg="brand.100" />
      <Box>{children}</Box>
    </Flex>
  )
}

export default DatatableContainer
