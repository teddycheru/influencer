import React from 'react'
import { Dropdown, Avatar } from 'antd'
// import { DownOutlined } from '@ant-design/icons'
// import { MdArrowDropDown } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import logo from '../../assets/whitehomenav.png'

const Navbar = () => {
  const navigate = useNavigate()
  const profileDetails = useSelector((state) => state.userReducer.user)

  const items = [
    {
      label: <div onClick={() => navigate('/account-details')}>Profile</div>,
      key: '0',
    },
    {
      label: <div onClick={() => navigate('/setting')}>Programs</div>,
      key: '1',
    },
    {
      label: <div>Notifications</div>,
      key: '2',
    },
    {
      label: (
        <div
          onClick={() => {
            localStorage.clear()
            navigate('/login')
          }}
        >
          Logout
        </div>
      ),
      key: '3',
    },
  ]

  return (
    <div className='nav-container'>
      <div className='left'>
        <div className='nav-icon'
          onClick={() => {
            window.scrollTo(0, 0)
            navigate('/home')
          }}
        >
          <img src={logo} />
        </div>
      </div>
      <div className='right'>
        <div
          className='nav-link'
          onClick={() => {
            window.scrollTo(0, 0)
            navigate('/create-post')
          }}
        >
          Enlist Program
        </div>
        <Dropdown
          className='nav-drop-down'
          menu={{
            items,
          }}
          trigger={['click']}
        >
          <div onClick={(e) => e.preventDefault()}>
            <Avatar className='header-avatar' src={profileDetails?.profileImage} />
          </div>
        </Dropdown>
        <i class="fa-solid fa-caret-down"></i>
      </div>
    </div >
  )
}

export default Navbar
