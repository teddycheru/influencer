import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../layout/Layout'
import MyPosts from '../components/PageComponents/MyPosts'
import ExpiredPosts from '../components/PageComponents/ExpiredPosts'
import ReportedPosts from '../components/PageComponents/ReportedPosts'
import { getAllPosts } from '../redux/actions/postsAction'
import FavPosts from '../components/PageComponents/FavPosts'

const Settings = () => {
  const dispatch = useDispatch()
  const { allPosts } = useSelector((state) => state.postReducer)
  // const [allPosts, setAllPosts] = useState(null)
  const items = [
    {
      key: '1',
      label: `My Programs`,
      children: <MyPosts posts={allPosts?.myPosts} />,
    },
    {
      key: '2',
      label: `Favourite Programs`,
      children: <FavPosts posts={allPosts?.favPosts} />,
    },
    {
      key: '3',
      label: `Expired Programs`,
      children: <ExpiredPosts posts={allPosts?.expiredPosts} />,
    },
    {
      key: '4',
      label: `Reported Programs`,
      children: <ReportedPosts posts={allPosts?.reportedPosts} />,
    },
  ]

  useEffect(() => {
    // dispatch(getAllPosts(setAllPosts))
    dispatch(getAllPosts())
  }, [])

  return (
    <Layout>
      <div className='settings-container'>
        <Tabs defaultActiveKey='1' items={items} />
      </div>
    </Layout>
  )
}

export default Settings
