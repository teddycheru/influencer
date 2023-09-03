import React from 'react'
// import Post from './Post'
import { Empty } from 'antd'
import PostNew from './PostNew'

const ReportedPosts = ({ posts }) => {
  return (
    <div className='reported-post-container'>
      <div className='page-header'></div>
      <div className='post-list-container'>
        {posts?.length == 0 ? (
          <div>
            <Empty description={'No Posts'} />
          </div>
        ) : (
          posts?.map((data, index) => {
            return <PostNew key={index} data={data} tabName={'reported'} />
          })
        )}
      </div>
    </div>
  )
}

export default ReportedPosts
