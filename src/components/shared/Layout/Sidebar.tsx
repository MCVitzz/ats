import { Flex } from '@chakra-ui/react'
import Link from '../Link'

const Sidebar: React.FC = () => {
  return (
    <Flex direction="column" boxShadow="md" bg="white" py={8} px={8} gap={4}>
      <Link href="/candidates">Candidates</Link>
      <Link href="/candidates">Candidates</Link>
      <Link href="/candidates">Candidates</Link>
      <Link href="/candidates">Candidates</Link>
    </Flex>
  )
}

export default Sidebar
