import { getServiceId, getYandexUrl } from '@/api/oauth'
import useAction from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { urls } from '@/utils/navigation'
import ErrorMessage from '@components/ErrorMesage/ErrorMessage'
import SwitchTheme from '@components/SwitchTheme/SwitchTheme'
import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TetrisImg from '../../components/TetrisImg/Tetris'
import classes from '../signUp/styles.module.less'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [form] = useForm()

  const { GetAuth } = useAction()

  const { user, loading, errorMessage } = useTypedSelector(state => state.User)

  useEffect(() => {
    if (user) {
      navigate(urls.home)
    }
  }, [user])

  const submitForm = useCallback(async () => {
    const { login, password } = await form.validateFields()
    if (login && password) {
      GetAuth(login, password)
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
              required={false}
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
              required={false}
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
            <ErrorMessage message={errorMessage} />
            <Button
              loading={loading}
              className={classes.signUp__btn}
              htmlType="submit"
              style={{
                width: '100%',
              }}>
              Login
            </Button>
          </Form>
          <Button
            onClick={oAuth}
            className={classes.yandex_button}
            style={{
              width: '100%',
            }}>
            Login via Yandex
          </Button>
          <Button
            onClick={() => navigate(urls.signup)}
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
