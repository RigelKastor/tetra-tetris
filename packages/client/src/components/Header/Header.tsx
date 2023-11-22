import useAction from '@/hooks/useAction'
import { urls } from '@/utils/navigation'
import Avatar from '@components/Avatar/Avatar'
import SwitchTheme from '@components/SwitchTheme/SwitchTheme'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import classes from './styles.module.less'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const cx = classNames.bind(classes)

const menuList = [
  {
    id: 'index',
    title: 'Home',
    link: '/',
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard',
    link: '/leaderboard',
  },
  {
    id: 'game',
    title: 'Game',
    link: '/game',
  },
  {
    id: 'forum',
    title: 'Forum',
    link: '/forum',
  },
]

const Header = () => {
  const location = useLocation()

  const activePage =
    location.pathname === '/'
      ? 'index'
      : location.pathname.substring(1).split('/')[0]
  const [showUserMenu, setShowUserMenu] = useState(false)
  // const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const menu = useMemo(
    () =>
      menuList.map(item => ({
        ...item,
        className:
          item.id === activePage
            ? classes['header__menu__item--active']
            : classes['header__menu__item--default'],
      })),
    []
  )

  const { LogoutSession } = useAction()
  const { user } = useTypedSelector(state => state.User)

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate(urls.login)
    }
  }, [])

  const handleLogout = async () => {
    await LogoutSession()
    navigate(urls.login)
  }

  const switchShowUserMenu = () => {
    setShowUserMenu(prevState => !prevState)
  }

  return (
    <div className={classes.header}>
      <div className={classes.header__logotype}>Tetris</div>
      <div className={classes.header__menu}>
        {menu.map(item => (
          <NavLink
            to={item.link}
            className={cx(classes.header__menu__item, item.className)}
            key={`menu-header__item-${item.id}`}>
            {item.title}
          </NavLink>
        ))}
      </div>
      <SwitchTheme />
      <div
        className={classes.header__menu__avatar}
        onClick={switchShowUserMenu}>
        <Avatar size="xs" img={user?.avatar ?? ''} />
        {showUserMenu && (
          <ul className={classes.header__user_menu}>
            <li>
              <a href={urls.profile}>Profile</a>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Header
