import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '@components/ErrorMesage/ErrorMessage'
import { postLoginUser, SignInType } from '@/api/auth'
import { urls } from '@/utils/navigation'
import classes from '../signUp/styles.module.less'
import TetrisImg from '../../components/TetrisImg/Tetris'
import { getServiceId, getYandexUrl } from '@/api/oauth'
import SwitchTheme from '@components/SwitchTheme/SwitchTheme'
import useAction from '@/hooks/useAction'
import { useForm } from 'antd/lib/form/Form'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const Login: React.FC = () => {
  const [authError, setAuthError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [form] = useForm()

  const { GetAuth } = useAction()

  const {
    User: { user, loading },
  } = useTypedSelector(state => state)
  console.log(`loading`, loading)

  // useEffect(() => {
  //   console.log(`USER IN UI`, state)
  // }, [state])

  const submitForm = useCallback(async () => {
    const { login, password } = await form.validateFields()
    if (login && password) {
      GetAuth(login, password)
      // setAuthError(null)
      // postLoginUser({ login, password })
      //   .then(() => {
      //     navigate(urls.home)
      //   })
      //   .catch(({ error }) => {
      //     setAuthError(error.description)
      //   })
    }
  }, [])

  const oAuth = useCallback(async () => {
    try {
      const clientId = await getServiceId()
      window.location.replace(getYandexUrl(clientId))
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <div className={classes.signUp__switch_theme}>
        <SwitchTheme />
      </div>
      <div className={classes.signUp}>
        <TetrisImg />
        <div className={classes.signUp__form}>
          <span className={classes.title}>Welcome to Tetris</span>
          <Form onFinish={submitForm} form={form}>
            <Form.Item
              labelCol={{ span: 24 }}
              colon={false}
              label={<span>Login</span>}
              rules={[
                {
                  required: true,
                  message: 'Поле не может быть пустым',
                },
              ]}
              name="login">
              <Input placeholder="Login" />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              colon={false}
              rules={[
                {
                  required: true,
                  message: 'Поле не может быть пустым',
                },
              ]}
              label={<span>Password</span>}
              name="password">
              <Input placeholder="Password" type="password" />
            </Form.Item>
            <ErrorMessage message={authError} />
            <Button
              className={classes.signUp__btn}
              type="submit"
              style={{
                width: '100%',
              }}>
              Login
            </Button>
          </Form>
          <button
            onClick={oAuth}
            className={classes.yandex_button}
            style={{
              width: '100%',
            }}>
            Login via Yandex
          </button>
          <Button
            href={urls.signup}
            type="link"
            style={{
              width: '100%',
            }}>
            Don’t have an account?
          </Button>
        </div>
      </div>
    </>
  )
}

export default Login
