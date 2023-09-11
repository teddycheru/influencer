import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Upload, Checkbox } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { profileDetails, updateProfile } from '../../redux/actions/userActions'

const Profile = () => {
  const dispatch = useDispatch()
  const userProfileDetails = useSelector((state) => state?.userReducer?.user)
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState([])
  const [blockAdState, setBlockAdState] = useState(false)
  // const [userProfile, setUserProfile] = useState()

  useEffect(() => {
    ; (async () => {
      await dispatch(profileDetails())
    })()
  }, [])

  // const uploadHandleChange = ({ fileList: newFileList }) => setFileList(newFileList)

  const uploadHandleChange = ({ fileList: newFileList, file }) => {
    console.log(newFileList)
    if (file.status === 'removed') {
      setFileList([])
    } else {
      setFileList([
        {
          ...file,
          status: 'done',
        },
      ])
    }
  }

  const onFinish = async (values) => {
    const formData = new FormData()
    setLoading(true)
    if (fileList.length > 0) {
      formData.append('pictures', values.image.file.originFileObj)
    } else {
      formData.append('pictures', userProfileDetails?.profileImage)
    }
    // formData.append('userImage', values.image.file.originFileObj)
    formData.append('name', values.name)
    formData.append('bio', values.bio)
    formData.append('businessLink', values.link)
    formData.append('blockAds', userProfileDetails?.premium ? blockAdState : false)
    dispatch(updateProfile(formData))
    setLoading(false)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  return (
    <div className='profile-container'>
      <div className='profile-wrapper'>
        <Form
          name='profile'
          className='profile-form'
          layout='vertical'
          onFinish={onFinish}
          fields={[
            {
              name: 'name',
              value: userProfileDetails?.name,
            },
            {
              name: 'email',
              value: userProfileDetails?.email,
            },
            {
              name: 'bio',
              value: userProfileDetails?.bio,
            },
            {
              name: 'link',
              value: userProfileDetails?.businessLink,
            },
            {
              name: 'advertisement',
              value: userProfileDetails?.blockAds,
            },
          ]}
        >
          <h2>Profile Details</h2>
          <Form.Item name='image' label='Image'>
            <Upload
              customRequest={() => { }}
              listType='picture-circle'
              fileList={fileList}
              onChange={uploadHandleChange}
            >
              {fileList?.length > 0 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item name='name' label='Name'>
            <Input autoComplete='off' placeholder='Enter Name' />
          </Form.Item>
          <Form.Item name='email' label='Email'>
            <Input
              autoComplete='off'
              placeholder='Enter Email'
              // defaultValue={userProfile?.email}
              disabled={true}
            />
          </Form.Item>
          <Form.Item name='bio' label='Bio'>
            <Input.TextArea
              rows={4}
              autoComplete='off'
              className='custom-text-area'
              placeholder='Bio ...'
              style={{ height: 'auto !important', resize: 'none' }}
            />
            {/* <textarea className='custom-text-area' placeholder='Bio ...' /> */}
          </Form.Item>
          <Form.Item name='link' label='Business Link'>
            <Input
              autoComplete='off'
              placeholder='Enter Email'
            // defaultValue={userProfile?.businessLink}
            />
          </Form.Item>
          <Form.Item name='payment' label='Payment-method'>
            <div className='payment-container'>
              <Button className='premium-btn' disabled={true}>
                Go Premium
              </Button>
            </div>
          </Form.Item>
          {userProfileDetails?.premium && (
            <Form.Item name='advertisement' label='Block Ads' valuePropName='checked'>
              <Checkbox onChange={(e) => setBlockAdState(e.target.checked)}>
                Block Advertisements
              </Checkbox>
            </Form.Item>
          )}
          <Form.Item>
            <Button loading={loading} type='primary' htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Profile
