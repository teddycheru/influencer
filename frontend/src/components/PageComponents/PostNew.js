import React, { useEffect, useState } from 'react'
import { Avatar, Button, Modal, Typography, Checkbox, Badge } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsHeart, BsFillHeartFill, BsFlag, BsFillFlagFill } from 'react-icons/bs'
import { FaRegTrashAlt } from 'react-icons/fa'
import { VscComment } from 'react-icons/vsc'
// import moment from 'moment/moment'

import PostDescriptionModal from './PostDescriptionModal'
// import earth from '../../assets/earth.png'
import earth from '../../assets/earth2.png'
import Reward from '../../assets/RewardBox.png'

// import { postReact, reportPost, rePostFn } from '../../redux/actions/postsAction'
import {
  fetchSinglePost,
  postReact,
  reportPost,
  deletePost,
  rePostFn,
} from '../../redux/actions/postsAction'

const PostNew = ({ data, tabName }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.userReducer)
  const navigate = useNavigate()

  const { Title, Paragraph } = Typography

  console.log('data', data)
  const [reducedDesc, setReducedDesc] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reportCheck, setReportCheck] = useState('')
  const [isModalOpen2, setIsModalOpen2] = useState(false)

  useEffect(() => {
    const tempArr = data?.description?.slice(0, 300) + '...'
    setReducedDesc(tempArr)
  }, [data.description])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const showModal2 = () => {
    setIsModalOpen2(true)
    dispatch(fetchSinglePost(data?._id))
  }

  return (
    <>
      <>
        <Modal
          title={`Report ${data?.title}`}
          footer={false}
          centered
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        >
          <div className='report-modal'>
            <div className='report-sec'>
              <Checkbox
                checked={reportCheck == 'expired' ? true : false}
                onChange={() => {
                  if (reportCheck !== 'expired') {
                    setReportCheck('expired')
                  } else if (reportCheck == 'expired') {
                    setReportCheck('')
                  }
                }}
              >
                Expired
              </Checkbox>
              <Checkbox
                checked={reportCheck == 'scam' ? true : false}
                onChange={() => {
                  if (reportCheck !== 'scam') {
                    setReportCheck('scam')
                  } else if (reportCheck == 'scam') {
                    setReportCheck('')
                  }
                }}
              >
                Scam
              </Checkbox>
              <Checkbox
                checked={reportCheck == 'spam' ? true : false}
                onChange={() => {
                  if (reportCheck !== 'spam') {
                    setReportCheck('spam')
                  } else if (reportCheck == 'spam') {
                    setReportCheck('')
                  }
                }}
              >
                Spam
              </Checkbox>
              <Checkbox
                checked={reportCheck == 'inappropriate' ? true : false}
                onChange={() => {
                  if (reportCheck !== 'inappropriate') {
                    setReportCheck('inappropriate')
                  } else if (reportCheck == 'inappropriate') {
                    setReportCheck('')
                  }
                }}
              >
                Inappropriate
              </Checkbox>
              <Checkbox
                checked={reportCheck == 'infringes' ? true : false}
                onChange={() => {
                  if (reportCheck !== 'infringes') {
                    setReportCheck('infringes')
                  } else if (reportCheck == 'infringes') {
                    setReportCheck('')
                  }
                }}
              >
                Infringes Rights
              </Checkbox>
              <Checkbox
                checked={reportCheck == 'invalid' ? true : false}
                onChange={() => {
                  if (reportCheck !== 'invalid') {
                    setReportCheck('invalid')
                  } else if (reportCheck == 'invalid') {
                    setReportCheck('')
                  }
                }}
              >
                Invalid Link
              </Checkbox>
              <Checkbox
                checked={reportCheck == 'unethical' ? true : false}
                onChange={() => {
                  if (reportCheck !== 'unethical') {
                    setReportCheck('unethical')
                  } else if (reportCheck == 'unethical') {
                    setReportCheck('')
                  }
                }}
              >
                Unethical Item
              </Checkbox>
              <Checkbox
                checked={reportCheck == 'else' ? true : false}
                onChange={() => {
                  if (reportCheck !== 'else') {
                    setReportCheck('else')
                  } else if (reportCheck == 'else') {
                    setReportCheck('')
                  }
                }}
              >
                Something Else
              </Checkbox>
            </div>
            <div className='bottom-container'>
              <Button
                className='report-btn'
                disabled={reportCheck == '' ? true : false}
                onClick={() => {
                  dispatch(reportPost({ text: reportCheck, postId: data?._id }, setIsModalOpen))
                }}
              >
                Report
              </Button>
            </div>
          </div>
        </Modal>
        <PostDescriptionModal
          data={data}
          isModalOpen2={isModalOpen2}
          setIsModalOpen2={setIsModalOpen2}
        />
      </>
      <div className='post-new-main-container'>
        {tabName !== 'expired' && (
          <div className='left-react-container'>
            {tabName !== 'reported' && (
              <div
                className='react-post'
                onClick={async () => {
                  await dispatch(
                    postReact({
                      tab: tabName,
                      post: data?._id,
                      react:
                        data?.likes?.filter((likedData) => likedData._id === data?.user._id)
                          .length > 0
                          ? false
                          : true,
                    }),
                  )
                }}
              >
                {data?.likes?.filter((likedData) => likedData._id === user?._id).length > 0 ? (
                  <BsFillHeartFill style={{ fill: 'red', cursor: 'pointer' }} />
                ) : (
                  <BsHeart style={{ fill: 'red', cursor: 'pointer' }} />
                )}
                {user?.premium && <Paragraph className='count'>{data.likes.length}</Paragraph>}
              </div>
            )}
            <div className='comment-sec' onClick={showModal2} style={{ cursor: 'pointer' }}>
              <VscComment className='comment-svg' />
              <Paragraph className='count'>{data?.comments.length}</Paragraph>
            </div>
          </div>
          // <div className='react-column'>
          //   {tabName !== 'reported' && (
          //     <div
          //       className='react-post'
          //       onClick={async () => {
          //         await dispatch(
          //           postReact({
          //             post: data?._id,
          //             react:
          //               data?.likes?.filter((likedData) => likedData._id === data?.user._id).length >
          //               0
          //                 ? false
          //                 : true,
          //           }),
          //         )
          //       }}
          //     >
          //       {data?.likes?.filter((likedData) => likedData._id === data?.user._id).length > 0 ? (
          //         <BsFillHeartFill style={{ fill: 'red', cursor: 'pointer' }} />
          //       ) : (
          //         <BsHeart style={{ fill: 'red', cursor: 'pointer' }} />
          //       )}
          //     </div>
          //   )}
          //   <div className='report-post' onClick={showModal}>
          //     {tabName == 'reported' ? (
          //       <Badge
          //         count={data?.reports?.length}
          //         style={{
          //           fontSize: '10px',
          //         }}
          //       >
          //         <BsFillFlagFill style={{ fill: '#ff9c6e', cursor: 'pointer' }} />
          //       </Badge>
          //     ) : (
          //       <BsFlag style={{ fill: '#ff9c6e', cursor: 'pointer' }} />
          //     )}
          //   </div>
          // </div>
        )}

        {/* <div className='desc-column'>
        <div className='top'>
          <div className='left'>
            <Avatar src={data.user.profileImage} className='custom-avatar' />
          </div>
          <div className='right'>
            <Title className='name'>{data?.user?.name}</Title>
            <Paragraph className='time'>{moment(data?.createdAt).format('DD MMM YYYY')}</Paragraph>
          </div>
        </div>
        <div className='middle'>
          <div className='middle-top'>
            <img src={data?.image} />
            <div className='middle-top-left'>
              <Title style={{ fontSize: '16px', margin: '0' }}>{data?.title}</Title>
              <Paragraph className='para'>{reducedDesc}</Paragraph>
            </div>
          </div>
          <div className='hash-tags'>
            {data?.tags?.map((tag, index) => {
              return (
                <Paragraph key={index} className='hash-tag'>
                  #{tag}
                </Paragraph>
              )
            })}
          </div>
          <div className='tags-sec'>
            <div className='country'>
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
            </div>
            <div className='tags-container'>
              <Paragraph className='para'>${data?.price}</Paragraph>
            </div>
            <div className='tags-container'>
              <Paragraph className='para'>{data?.comission}</Paragraph>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
              {data?.category.map((item, index) => (
                <div className='tags-container' key={index}>
                  <Paragraph className='para'>{item}</Paragraph>
                </div>
              ))}
            </div>
            <div className='tags-container'>
              <Paragraph className='para'>{data?.type}</Paragraph>
            </div>
          </div>
        </div>
        <div className='bottom'>
          <div className='left-sec'>
            <PostDescriptionModal data={data} />
            {tabName == 'expired' && (
              <Button
                className='repost-btn'
                onClick={() => {
                  dispatch(rePostFn({ post: data?._id }, navigate))
                }}
              >
                RePost
              </Button>
            )}
          </div>
          <div className='right-sec'>
            <div className='count-container'>
              <FaRegComment className='comment-icon' />
              <Paragraph className='count'>{data.comments.length}</Paragraph>
            </div>
            <div className='count-container'>
              <BsHeart className='heart-icon' />
              <Paragraph className='count'>{data.likes.length}</Paragraph>
            </div>
          </div>
        </div>
      </div> */}

        <div className='middle' onClick={showModal2}>
          <div className='middle-left'>
            <div className='left'>
              <div className='top'>
                <Avatar src={data.user.profileImage} className='custom-avatar' />
              </div>
              <div className='bottom'>
                <div className='country'>
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
                      width: data?.countryCode == undefined && '30px',
                      height: data?.countryCode == undefined && '30px',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='right-desc'>
              <Title className='title'>{data?.title}</Title>
              <Paragraph className='para'>{reducedDesc}</Paragraph>
              <div className='category-container'>
                {data?.category.map((item, index) => (
                  <div className='tags-container' key={index}>
                    <Paragraph className='para'>{item}</Paragraph>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='middle-right'>
            <div className='section' style={{ borderBottom: '1px solid black' }}>
              <Paragraph className='para-1'>
                {/* {data?.price == 0 ? 'PRICE: Free' : `PRICE: $${data?.price}`} */}
                PRICE:
              </Paragraph>
              <Paragraph className='para-2'>
                {data?.price == 0 ? 'Free' : `$${data?.price}`}
              </Paragraph>
            </div>
            <div className='section' style={{ borderBottom: '1px solid black' }}>
              <Paragraph className='para-1'> COMM:</Paragraph>
              <Paragraph className='para-2'>
                {data.comission?.length === 2 && (
                  <>
                    {`$${data?.comissionValue}`} / <img src={Reward} />
                  </>
                )}
                {data.comission?.length < 2 &&
                  data.comission?.[0] === 'cash' &&
                  data.comissionValue &&
                  `$${data?.comissionValue}`}
                {data.comission?.length < 2 && data.comission?.[0] === 'reward' && (
                  <img src={Reward} />
                )}
                {/* {data?.comission == 'reward' ? <img src={Reward} /> : `${data?.comissionValue}`} */}
              </Paragraph>
            </div>
            <div className='section'>
              <Paragraph className='para'>{data?.type.toUpperCase()}</Paragraph>
            </div>
          </div>
        </div>
        <div className='below-tab-container'>
          {tabName !== 'expired' && (
            <div className='bottom-left'>
              {tabName !== 'reported' && (
                <div
                  className='react-post'
                  onClick={async () => {
                    await dispatch(
                      postReact({
                        tab: tabName,
                        post: data?._id,
                        react:
                          data?.likes?.filter((likedData) => likedData._id === user?._id).length > 0
                            ? false
                            : true,
                      }),
                    )
                  }}
                >
                  {data?.likes?.filter((likedData) => likedData._id === data?.user._id).length >
                  0 ? (
                    <BsFillHeartFill style={{ fill: 'red', cursor: 'pointer' }} />
                  ) : (
                    <BsHeart style={{ fill: 'red', cursor: 'pointer' }} />
                  )}
                  {user?.premium && <Paragraph className='count'>{data.likes.length}</Paragraph>}
                </div>
              )}
              <div className='comment-sec' onClick={showModal2} style={{ cursor: 'pointer' }}>
                <VscComment className='comment-svg' />
                <Paragraph className='count'>{data?.comments.length}</Paragraph>
              </div>
            </div>
          )}
          <div className='bottom-right'>
            <div className='report-post' onClick={showModal}>
              {tabName == 'reported' ? (
                <Badge
                  count={data?.reports?.length}
                  style={{
                    fontSize: '10px',
                  }}
                >
                  <BsFillFlagFill style={{ fill: '#ff9c6e', cursor: 'pointer' }} />
                </Badge>
              ) : (
                <BsFlag style={{ fill: '#ff9c6e', cursor: 'pointer' }} />
              )}
            </div>
            {tabName == 'my' && (
              <Button className='delete-post' onClick={() => dispatch(deletePost(data?._id))}>
                <FaRegTrashAlt />
              </Button>
            )}
            {tabName == 'expired' && (
              <Button
                className='repost-btn'
                onClick={() => {
                  dispatch(rePostFn({ post: data?._id }, navigate))
                }}
              >
                Repost
              </Button>
            )}
          </div>
        </div>
        <div className='right'>
          <div className='report-post' onClick={showModal}>
            {tabName == 'reported' ? (
              <Badge
                count={data?.reports?.length}
                style={{
                  fontSize: '10px',
                }}
              >
                <BsFillFlagFill style={{ fill: '#ff9c6e', cursor: 'pointer' }} />
              </Badge>
            ) : (
              <BsFlag style={{ fill: '#ff9c6e', cursor: 'pointer' }} />
            )}
          </div>
          {tabName == 'my' && (
            <Button className='delete-post' onClick={() => dispatch(deletePost(data?._id))}>
              <FaRegTrashAlt />
            </Button>
          )}
          {tabName == 'expired' && (
            <Button
              className='repost-btn'
              onClick={() => {
                dispatch(rePostFn({ post: data?._id }, navigate))
              }}
            >
              RePost
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default PostNew
