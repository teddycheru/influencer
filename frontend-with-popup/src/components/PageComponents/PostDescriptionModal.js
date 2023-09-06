import React, { useState } from 'react'
import { Avatar, Input, Modal, Typography, Spin, Button } from 'antd'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment/moment'
import earth from '../../assets/earth2.png'
import { BsHeart, BsFillHeartFill, BsFlag } from 'react-icons/bs'
import { postReact } from '../../redux/actions/postsAction'

// import { addComment, fetchSinglePost } from '../../redux/actions/postsAction'
import { addComment, deleteComment } from '../../redux/actions/postsAction'

const PostDescriptionModal = ({ data, isModalOpen2, setIsModalOpen2 }) => {
  const dispatch = useDispatch()
  const userProfileDetails = useSelector((state) => state.userReducer.user)
  const { singlePost, getPostLoading } = useSelector((state) => state.postReducer)

  // const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputState, setInputState] = useState(null)

  // const showModal = () => {
  //   setIsModalOpen2(true)
  //   dispatch(fetchSinglePost(data?._id))
  // }

  // useEffect(() => console.log(singlePost), [singlePost])

  const handleOk = () => {
    setIsModalOpen2(false)
  }

  const handleCancel = () => {
    setIsModalOpen2(false)
  }

  const commentHandler = (e) => {
    dispatch(addComment({ post: data?._id, text: e.target.value }, setInputState))
  }

  return (
    <>
      {/* <Button onClick={showModal} className='post-modal-show-btn'>
        View Post
      </Button> */}
      <Modal
        className='post-desc-modal'
        // title='Basic Modal'
        open={isModalOpen2}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        closable={true}
        closeIcon={<AiOutlineClose style={{ fill: '#222' }} />}
      >
        {getPostLoading ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spin size='large' />
          </div>
        ) : (
          <div className='container'>
            <div className='left my-left' style={{ border: '1px solid #d5e0d5' }}>
              <div className='left-top'>
                <div className='left-top-left'>
                  <Avatar className='post-user-img' src={singlePost?.image} />
                  <div className='post-title'>
                    <h1 className='title'>{singlePost?.title}</h1>
                    <p className='usr-name'>{singlePost?.user?.username}</p>
                  </div>
                </div>
                <div className='country'>
                  <div className='report-post'>
                    <img
                      alt='flag'
                      loading='lazy'
                      src={
                        data?.countryCode
                          ? `https://flagcdn.com/w40/${data?.countryCode?.toLowerCase()}.png`
                          : earth
                      }
                      srcSet={`https://flagcdn.com/w40/${data?.countryCode?.toLowerCase()}.png 2x`}
                      style={{
                        width: data?.countryCode == undefined && '20px',
                        height: data?.countryCode == undefined && '20px',
                      }}
                    />
                    <BsFlag style={{ fill: '#ff9c6e', cursor: 'pointer', marginLeft: '30px', fontSize: '30px' }} />
                  </div>
                  <p className='time'>{data?.country}</p>
                  <div>
                    <p className='time'> Posted {moment(data?.createdAt).fromNow()}</p>
                  </div>
                </div>
              </div>
              <div className='bottom-desc'>
                <div className='tags-card'>
                  <div className='tags-tags'>
                    {singlePost?.category?.map((item, index) => (
                      <div className='tags-item' key={index}>
                        <p className='para'>{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className='tags-price'>
                    <span>Price:</span><p className='parag'> ${singlePost?.price}</p>
                  </div>
                  <div className='tags-price'>
                    <span>Commision:</span><p className='parag'>${singlePost?.comissionValue}</p>
                  </div>
                  <div className='tags-refer'>
                    <p className='parag'>
                      <span className='free'>
                        Self-Purchase: {singlePost?.purchaseFirst ? <span style={{ color: '#1abd46' }}>Optional</span> : <span style={{ color: 'darkred' }}>Required</span>}
                      </span>
                    </p>
                  </div>
                  <div className='tags-containerr'>
                    <p className='digital'>{singlePost?.type} item</p>
                  </div>
                </div>
                <p className='descr'>
                  {singlePost?.description}
                </p>
              </div>
              <div className='react'>
                <div className='react-heart'>
                  <p className='react-count'>12</p>
                  <div
                    className='react-post'
                    onClick={async () => {
                      await dispatch(
                        postReact({
                          post: data?._id,
                          react:
                            data?.likes?.filter((likedData) => likedData._id === data?.user._id).length >
                              0
                              ? false
                              : true,
                        }),
                      )
                    }}
                  >
                    {data?.likes?.filter((likedData) => likedData._id === data?.user._id).length > 0 ? (
                      <BsFillHeartFill style={{ fill: 'red', cursor: 'pointer' }} />
                    ) : (
                      <BsHeart style={{ fill: 'red', cursor: 'pointer' }} />
                    )}
                  </div>
                  <i class="fa-regular fa-share-from-square"></i>
                </div>
              </div>
              <div className='link'>
                <a href={singlePost?.link} target='_blank'><p>Program: &nbsp;&nbsp;&nbsp; <span>{`${singlePost?.link}`}<span>...</span></span></p></a>
                <Button className='bbtn' href={singlePost?.link} target='_blank'>Visit Site</Button>
              </div>
            </div>
            <div className='right'>
              <div className='right-top-container'>
                <Typography.Title className='title'>Comments</Typography.Title>
                <div className='main-container'>
                  {singlePost?.comments?.map((comment, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          comment?.user?._id == userProfileDetails?._id
                            ? 'comment-container comment-container-right'
                            : 'comment-container'
                        }
                      >
                        <div className='comment-left'>
                          <Avatar src={comment?.user?.profileImage} />
                        </div>
                        <div className='comment-right-container'>
                          <div className='comment-right'>
                            <Typography.Paragraph className='name'>
                              {comment?.user?.name}
                            </Typography.Paragraph>
                            <Typography.Paragraph className='comment'>
                              {comment?.text}
                            </Typography.Paragraph>
                          </div>
                          {comment?.user?._id == userProfileDetails?._id && (
                            <div
                              className='delete-comment-container'
                              onClick={() =>
                                dispatch(
                                  deleteComment({ comment: comment._id, post: singlePost._id }),
                                )
                              }
                            >
                              <FaRegTrashAlt />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='comments-container'>
                <Input
                  placeholder='Add Comment...'
                  className='comment-input'
                  value={inputState}
                  onChange={(e) => setInputState(e.target.value)}
                  onPressEnter={commentHandler}
                // onChange={commentHandler}
                />
                <i class="fa-solid fa-arrow-right" onClick={commentHandler}></i>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default PostDescriptionModal
