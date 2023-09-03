import { GET_USER_PROFILE } from '../types/generalTypes'

const initialState = {
  user: {},
}

const userReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_USER_PROFILE: {
      return {
        user: payload,
      }
    }
    default:
      return state
  }
}

export default userReducer
