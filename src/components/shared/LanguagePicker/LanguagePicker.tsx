import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'
import Flag from './Flag'
import l from '../../../../i18n.json'

const LanguagePicker: React.FC = () => {
  const { lang } = useTranslation('login')

  return (
    <Menu>
      <MenuButton as={Button}>
        <Flag code={lang} />
      </MenuButton>
      <MenuList>
        {l.locales.map((locale) => (
          <MenuItem
            key={locale}
            as={Button}
            onClick={() => setLanguage(locale)}
          >
            <Flag code={locale} />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default LanguagePicker
