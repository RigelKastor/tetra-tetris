import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '@components/ErrorMesage/ErrorMessage'
import { postLoginUser, SignInType } from '@/api/auth'
import { urls } from '@/utils/navigation'
import classes from '../signUp/styles.module.less'
import TetrisImg from '../../components/TetrisImg/Tetris'
import { getServiceId, getYandexUrl } from '@/api/oauth'

const Login: React.FC = () => {
  const [authError, setAuthError] = useState<string | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      console.log(code)
    }
  }, [])
  const submitForm = useCallback((values: SignInType) => {
    if (values.login && values.password) {
      setAuthError(null)
      postLoginUser(values)
        .then(() => {
          navigate(urls.home)
        })
        .catch(({ error }) => {
          setAuthError(error.description)
        })
    }
  }, [])

  const oAuth = useCallback(async () => {
    const clientId = await getServiceId()
    window.location.replace(getYandexUrl(clientId))
  }, [])

  return (
    <div className={classes.signUp}>
      <TetrisImg />
      <div className={classes.signUp__form}>
        <span className={classes.title}>Welcome to Tetris</span>
        <Form onFinish={submitForm}>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={<span>Login</span>}
            name="login">
            <Input placeholder="Login" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={<span>Password</span>}
            name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <ErrorMessage message={authError} />
          <button
            className={classes.signUp__btn}
            type="submit"
            style={{
              width: '100%',
            }}>
            Login
          </button>
          <Button
            href={urls.signup}
            type="link"
            style={{
              width: '100%',
            }}>
            Don’t have an account?
          </Button>
        </Form>
        <span>or</span>
        <button
          onClick={oAuth}
          className={classes.signUp__btn}
          style={{
            width: '100%',
          }}>
          Login via Yandex
        </button>
      </div>
    </div>
  )
}

export default Login
