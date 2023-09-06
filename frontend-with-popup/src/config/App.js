import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profileDetails } from '../redux/actions/userActions'

import '../styles/style.css'
import Routes from './Routes'
import { light, dark } from './theme'

const App = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.theme)

  useEffect(() => {
    if (theme === 'light') {
      Object.keys(light).forEach((key) => {
        document.body.style.setProperty(`--${key}`, light[key])
      })
    } else {
      Object.keys(dark).forEach((key) => {
        document.body.style.setProperty(`--${key}`, dark[key])
      })
    }
  }, [theme])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(profileDetails())
    }
  }, [])

  return <Routes />
}

export default App
