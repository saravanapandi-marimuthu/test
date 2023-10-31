import { Link } from 'react-router-dom'
import horizenLogo from '../../assets/logo-01.svg'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import ProfileMenu from '../../menus/ProfileMenu/ProfileMenu'

const Header = ({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean
  toggleMenu: () => void
}) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 bg-vivid-gray-50 dark:bg-vivid-gray-800 transition-all duration-500 ease-in-out text-vivid-gray-900 dark:text-vivid-light-blue-500 shadow-md`}
    >
      <div className="px-4 py-2 flex items-center justify-between">
        <button onClick={toggleMenu} className="text-gray-900 dark:text-white">
          {isMenuOpen ? (
            <XMarkIcon
              className={`text-vivid-light-blue-900 dark:text-vivid-light-blue-50 w-6 h-6`}
            />
          ) : (
            <Bars3Icon
              className={`text-vivid-light-blue-900 dark:text-vivid-light-blue-50 w-6 h-6`}
            />
          )}
        </button>
        {/* Logo */}
        <Link
          to="/"
          className="text-logo-color flex items-center py-3 px-3 hover:text-indigo-900"
        >
          <img src={horizenLogo} className="h-8 w-auto" alt="horizen logo" />
        </Link>
        <div className="flex items-center">
          <div>
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
