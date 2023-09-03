import React from 'react'
// import Post from './Post'
import { Empty } from 'antd'
import PostNew from './PostNew'

const ExpiredPosts = ({ posts }) => {
  return (
    <div className='expired-post-container'>
      <div className='page-header'></div>
      <div className='post-list-container'>
        {posts?.length == 0 ? (
          <div>
            <Empty description={'No Posts'} />
          </div>
        ) : (
          posts?.map((data, index) => {
            return <PostNew key={index} data={data} tabName={'expired'} />
          })
        )}
      </div>
    </div>
  )
}

export default ExpiredPosts
