import { GET_USER_PROFILE, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL } from '../types/generalTypes';

const initialState = {
  user: {},
  message: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        user: payload,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        message: payload,
        error: null,
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        message: null,
        error: payload,
      };
    default:
      return state;
  }
};

export default userReducer;