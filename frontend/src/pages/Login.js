import { useState } from 'react'
import { Form, Input, Button, Tabs } from 'antd'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import SignUp from './SignUp'
import Logo from '../assets/project-logo.png'

import { authLogin } from '../redux'

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [tabKey, setTabKey] = useState('1')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeTab = (key) => {
    setTabKey(key)
  }

  const onFinish = async (values) => {
    setLoading(true)
    await dispatch(authLogin(values, navigate))
    setLoading(false)
  }

  if (localStorage.getItem('token')) {
    return <Navigate replace to='/home' />
  } else {
    return (
      <div className='login-body'>
        <div className='signin'>
          <Tabs
            defaultActiveKey='1'
            activeKey={tabKey}
            className='log-sign-tabs'
            onChange={changeTab}
          >
            <Tabs.TabPane key={'1'} tab={'Login'}>
              <Form name='login' className='login-form' layout='vertical' onFinish={onFinish}>
                {/* <img src={logo} /> */}
                <div className='header-container'>
                  <img src={Logo} />
                  <h2>Log In</h2>
                </div>
                <Form.Item
                  name='email'
                  rules={[
                    // {
                    //   type: 'email',
                    //   message: 'The entered email is not valid!',
                    // },
                    {
                      required: true,
                      message: 'Email/Username is Required',
                    },
                  ]}
                  label='Email or Username'
                >
                  <Input autoComplete='off' placeholder='Enter your email or username' />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Password is Required',
                    },
                  ]}
                  label='Password'
                >
                  {/* <Input.Password */}
                  <Input type='password' placeholder='Password...' />
                </Form.Item>

                <Form.Item>
                  <Button loading={loading} type='primary' htmlType='submit'>
                    Login
                  </Button>
                </Form.Item>
                <div className='back-to-login' onClick={() => setTabKey('2')}>
                  {`Register if you don't have an account`}
                </div>
              </Form>
              {/* <div className='login-btn'>
              <p>Do not have an account?</p>
              <div className='back-to-signup' onClick={() => navigate('/signup')}>
                SignUp
              </div>
            </div> */}
            </Tabs.TabPane>
            <Tabs.TabPane key={'2'} tab={'Register'}>
              <SignUp setTabKey={setTabKey} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default SignIn
