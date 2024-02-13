import { Switch } from 'antd'
import { BulbOutlined } from '@ant-design/icons'

import classes from './styles.module.less'
import { useCallback, useContext } from 'react'
import UserContext from '@/providers/userProvider/UserContext'

const SwitchTheme = () => {
  const { theme, setTheme } = useContext(UserContext)
  const handleChange = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'default' ? 'light' : 'default'
      const bodyThemeElement = document.querySelector('body')
      if (bodyThemeElement) {
        bodyThemeElement.setAttribute('theme-mode', newTheme)
      }

      //TODO когда будет готов метод сохранения настройки темы, добавить вызов запрос на сохранение изменений
      return newTheme
    })
  }, [theme])
  return (
    <div className={classes.switch_theme}>
      <Switch onChange={handleChange} checked={theme === 'light'} />
      <BulbOutlined className={classes.switch_theme__icon} />
    </div>
  )
}

export default SwitchTheme
