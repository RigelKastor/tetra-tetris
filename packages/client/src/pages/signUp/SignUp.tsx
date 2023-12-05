import React, { useCallback, useEffect } from 'react'
import classes from './styles.module.less'
import { Form, Input, Button } from 'antd'
import Tetris from '@/components/TetrisImg/Tetris'
import { useForm } from 'antd/lib/form/Form'
import { NewUser, postSignUp } from '@/api/auth'
import useMessage from 'antd/lib/message/useMessage'
import { useNavigate } from 'react-router-dom'
import { urls } from '@/utils/navigation'
import SwitchTheme from '@components/SwitchTheme/SwitchTheme'
import useAction from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { RuleObject } from 'antd/lib/form'
import { validate } from '@/utils/validators'

const SignUp: React.FC = () => {
  const [form] = useForm()
  const [messageApi] = useMessage()
  const navigate = useNavigate()

  const { SignUp } = useAction()
  const { user, errorMessage } = useTypedSelector(state => state.User)

  useEffect(() => {
    if (errorMessage) {
      messageApi.error(errorMessage)
    }
  }, [errorMessage])

  useEffect(() => {
    if (user) {
      navigate(urls.home)
    }
  }, [user])

  const signUp = useCallback((values: NewUser) => {
    SignUp(values)
  }, [])
  return (
    <>
      <div className={classes.signUp__switch_theme}>
        <SwitchTheme />
      </div>
      <div className={classes.signUp}>
        <Tetris />
        <div className={classes.signUp__form}>
          <span className={classes.title}>Welcome to Tetris</span>
          <Form form={form} onFinish={signUp}>
            <Form.Item
              labelCol={{ span: 24 }}
              colon={false}
              label={<span>First name</span>}
              name="first_name"
              rules={[
                {
                  validator: (_: RuleObject, value) => {
                    return validate('name', value)
                  },
                },
              ]}>
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              colon={false}
              label={<span>Second name</span>}
              name="second_name"
              rules={[
                {
                  validator: (_: RuleObject, value) => {
                    return validate('name', value)
                  },
                },
              ]}>
              <Input placeholder="Second name" />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              colon={false}
              label={<span>Login</span>}
              name="login"
              rules={[
                {
                  validator: (_: RuleObject, value) => {
                    return validate('login', value)
                  },
                },
              ]}>
              <Input placeholder="Login" />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              colon={false}
              label={<span>Email</span>}
              name="email"
              rules={[
                {
                  validator: (_: RuleObject, value) => {
                    return validate('email', value)
                  },
                },
              ]}>
              <Input placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              colon={false}
              label={<span>Phone</span>}
              name="phone"
              rules={[
                {
                  validator: (_: RuleObject, value) => {
                    return validate('phone', value)
                  },
                },
              ]}>
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              colon={false}
              label={<span>Password</span>}
              name="password"
              rules={[
                {
                  validator: (_: RuleObject, value) => {
                    return validate('password', value)
                  },
                },
              ]}>
              <Input placeholder="Password" type="password" />
            </Form.Item>
            <Button
              htmlType="submit"
              className={classes.signUp__btn}
              style={{
                width: '100%',
              }}>
              Create account
            </Button>
          </Form>
          <Button
            type="link"
            onClick={() => navigate(urls.login)}
            style={{
              width: '100%',
            }}>
            Do you have account?
          </Button>
        </div>
      </div>
    </>
  )
}

export default SignUp
