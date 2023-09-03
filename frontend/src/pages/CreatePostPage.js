import React from 'react'

import CreatePostForm from '../components/PageComponents/CreatePostForm'
import Layout from '../layout/Layout'

const CreatePostPage = () => {
  return (
    <Layout>
      <div className='create-post-page-container'>
        <CreatePostForm />
      </div>
    </Layout>
  )
}

export default CreatePostPage
