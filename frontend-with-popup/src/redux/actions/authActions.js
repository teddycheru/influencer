import { notification } from 'antd'
import { publicAPI } from '../../config/constants'
// import { profileDetails } from './userActions'
import { GET_USER_PROFILE } from '../types/generalTypes'

export const authLogin = (payload, navigate) => {
  return async (dispatch) => {
    try {
      const res = await publicAPI.post('/auth/login', payload)
      if (res) {
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('name', res.data.data.user.name)
        // await dispatch(profileDetails())
        dispatch({
          type: GET_USER_PROFILE,
          payload: res.data.data.user,
        })
        notification.success({
          description: res.data.data.message,
          duration: 2,
        })
        navigate(res.data.data.user.role == 'influencer' ? '/home' : '/create-post')
      }
    } catch (err) {
      console.log(err)
      notification.error({
        // message: err?.response?.data?.message || 'Server Error',
        message: 'Invalid User',
        duration: 3,
      })
    }
  }
}

export const authSignUp = (payload, navigate) => {
  return async () => {
    const localRole = localStorage.getItem('userRole')
    try {
      const res = await publicAPI.post('/auth/register', { ...payload, role: localRole })
      console.log(res)
      if (res) {
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('name', res.data.data.user.name)
        notification.success({
          description: res.data.data.message,
          duration: 2,
        })
        navigate(res.data.data.user.role == 'influencer' ? '/home' : '/create-post')
      }
    } catch (err) {
      console.log(err)
      notification.error({
        message: err?.response?.data?.message || 'Server Error',
        duration: 3,
      })
    }
  }
}
