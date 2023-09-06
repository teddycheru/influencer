import { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import { BsArrowLeft } from 'react-icons/bs'

import Logo from '../assets/project-logo.png'
import { authSignUp } from '../redux'

const SignUp = ({ setTabKey }) => {
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [userNameState, setUserNameState] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    setLoading(true)
    await dispatch(authSignUp(values, navigate))
    setLoading(false)
  }

  useEffect(() => console.log(userNameState), [userNameState])

  // if (localStorage.hasOwnProperty("token")) {
  //   // return <Navigate replace to="/home" />;
  // } else {
  return (
    <>
      {/* <div className='signin'> */}
      <Form name='signup' className='login-form' layout='vertical' onFinish={onFinish}>
        <div className='header-container'>
          <img src={Logo} />
          <h2>Create New Account</h2>
        </div>
        <Form.Item
          name='name'
          rules={[
            {
              type: 'text',
            },
            {
              required: true,
              message: 'Username Required',
            },
          ]}
          label='Username'
        >
          <Input
            value={userNameState}
            type='text'
            placeholder='Choose a unique username'
            onKeyDown={(e) => {
              if (e.keyCode == 32) {
                e.preventDefault()
              } else {
                setUserNameState(e.target.value)
              }
            }}
          />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[
            {
              type: 'email',
              message: 'The entered email is not valid!',
            },
            {
              required: true,
              message: 'Email is Required',
            },
          ]}
          label='Email'
        >
          <Input autoComplete='off' placeholder='Enter Email' />
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
          <Input type='password' placeholder='Enter a password' />
        </Form.Item>
        <Form.Item name='businessLink' label='Your Profile/Business Link'>
          <Input />
        </Form.Item>
        <Form.Item name='termsAndConditions' valuePropName='checked'>
          <Checkbox onChange={(e) => setChecked(e.target.checked)}>
            {' '}
            I accept the{' '}
            <a href='/privacy-policy' target='_blank'>
              Terms of Use
            </a>{' '}
            and{' '}
            <a href='/privacy-policy' target='_blank'>
              Privacy Policy
            </a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type='primary' htmlType='submit' disabled={!checked}>
            Sign Up
          </Button>
        </Form.Item>
        <div className='back-to-login' onClick={() => setTabKey('1')}>
          Login if you already have an account
        </div>
      </Form>
      {/* </div> */}
    </>
  )
  // }
}

export default SignUp
