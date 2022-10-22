import { Flex } from '@chakra-ui/react'

interface PageProps {
  children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <Flex bg="background" direction="column" w="full" h="90vh" p={8}>
      {children}
    </Flex>
  )
}

export default Page
