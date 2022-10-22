import { Flex } from '@chakra-ui/react'
import Link from '../Link'
import Logo from '../Logo'
import LanguagePicker from '../LanguagePicker/LanguagePicker'
import UserInfo from './UserInfo'

interface HeaderProps {
  fullPage: boolean
}

const Header: React.FC<HeaderProps> = ({ fullPage }) => {
  return (
    <Flex p={8} h="10vh" bg="brand.500" align="center" justify="space-between">
      <Link href="/">
        <Logo />
      </Link>
      <Flex>
        <LanguagePicker />
        {!fullPage && <UserInfo />}
      </Flex>
    </Flex>
  )
}

export default Header
