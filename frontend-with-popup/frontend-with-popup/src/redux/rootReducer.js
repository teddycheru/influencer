import { combineReducers } from 'redux'

import theme from './reducers/themeReducer'
import userReducer from './reducers/userReducer'
import postReducer from './reducers/postReducer'

const rootReducer = combineReducers({
  theme,
  userReducer,
  postReducer,
})

export default rootReducer
