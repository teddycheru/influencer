import React from 'react'
// import ReactDOM from 'react-dom'
import ReactDOM from 'react-dom/client'
import App from './config/App'
import { Provider } from 'react-redux'
import store from './redux/store'
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'))
// ReactDOM.render(
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // document.getElementById('root'),
)
