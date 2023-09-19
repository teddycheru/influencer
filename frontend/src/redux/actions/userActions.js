import { notification } from 'antd'
import { attachToken, privateAPI } from '../../config/constants'
import { GET_USER_PROFILE } from '../types/generalTypes'
import axios from 'axios'
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

export const updatePassword = (currentPassword, newPassword) => {
  console.log(currentPassword)
  console.log(newPassword)
  return async () => {
    try {
      const response = await privateAPI.post('/user/password/update', {
        currentPassword,
        newPassword,
      });

      // Check the response status
      if (response.status === 200) {
        // Password updated successfully
        notification.success({
          message: 'Password updated successfully',
          duration: 3,
        });
      } else {
        // Show error message if password update failed
        notification.error({
          message: response?.data?.message || 'Password update failed',
          duration: 3,
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: error?.response?.data?.message || 'Server Error',
        duration: 3,
      });
    }
  };
};
