import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout/Layout'
import MyPosts from '../components/PageComponents/MyPosts'
import ExpiredPosts from '../components/PageComponents/ExpiredPosts'
import { getAllPosts } from '../redux/actions/postsAction'

const Notifications = () => {
    return (
        <Layout>
            <div className='settings-container'>
                Hello
            </div>
        </Layout>
    )
}

export default Notifications