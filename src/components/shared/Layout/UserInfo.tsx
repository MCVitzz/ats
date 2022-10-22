import useConfirmationDialog from '@/hooks/useConfirm'
import {
  Button,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { FaChevronDown } from 'react-icons/fa'
import Link from '../Link'

const UserInfo: React.FC = () => {
  const { data: session } = useSession()
  const { confirmationDialog } = useConfirmationDialog()
  const { t } = useTranslation('common')

  const logOut = () => {
    confirmationDialog({
      cancelBtn: t('log-out-cancel-button'),
      confirmAction: () => signOut(),
      message: t('log-out-message'),
      confirmBtn: t('log-out-confirm-button'),
      title: t('log-out-cancel-title'),
    })
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<Icon as={FaChevronDown} color="white" />}
        variant="clear"
        _hover={{ opacity: '0.75' }}
      >
        <Heading size="sm" color="white">
          {session?.user.name}
        </Heading>
      </MenuButton>
      <MenuList>
        <Link href="/profile">
          <MenuItem>{t('user-menu-profile')}</MenuItem>
        </Link>
        <MenuItem onClick={logOut}>{t('user-menu-log-out')}</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserInfo
