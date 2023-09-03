import { notification } from 'antd'
import { attachToken, privateAPI } from '../../config/constants'
import { GET_USER_PROFILE } from '../types/generalTypes'

// export const profileDetails = (setUserProfile) => {
export const profileDetails = () => {
  return async (dispatch) => {
    try {
      attachToken()
      const res = await privateAPI.get('/user/profile/get')
      if (res) {
        dispatch({
          type: GET_USER_PROFILE,
          payload: res.data.data,
        })
        // setUserProfile(res.data.data)
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

export const updateProfile = (payload) => {
  return async () => {
    try {
      attachToken()
      const res = await privateAPI.post('/user/profile/update', payload)
      if (res) {
        window.location.reload()
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
