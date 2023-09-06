import { notification } from 'antd'
import { attachToken, privateAPI } from '../../config/constants'
import {
  GET_LIVE_POSTS_REQUEST,
  GET_LIVE_POSTS,
  GET_POST,
  GET_POST_REQUEST,
  GET_ALL_POSTS,
} from '../types/generalTypes'

export const createPost = (payload) => {
  return async () => {
    try {
      attachToken()
      const res = await privateAPI.post('/post/create', payload.data)
      if (res) {
        payload.navigate('/home')
      }
    } catch (err) {
      console.log(err)
      notification.error({
        message: err?.response?.data?.message || 'Server Error',
        duration: 3,
      })
    }
  }
}

export const deletePost = (payload) => {
  return async (dispatch) => {
    try {
      const res = await privateAPI.post('/post/delete-post', { post: payload })
      if (res) {
        console.log('post deleted', res)
        dispatch(getAllPosts())
        // window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const getPosts = (payload, loadState = true) => {
  return async (dispatch) => {
    try {
      const {
        searchFilter,
        countryFilter,
        tagsFilter,
        rangeFilter,
        categoryFilter,
        commissionState,
        typeState,
        purchaseFirstYes,
        purchaseFirstNo,
        page,
      } = payload
      if (loadState) {
        dispatch({ type: GET_LIVE_POSTS_REQUEST })
      }
      attachToken()
      const res = await privateAPI.post('/post/fetch', {
        search: searchFilter !== null ? searchFilter : '',
        tags: tagsFilter,
        country: countryFilter !== null ? countryFilter : '',
        priceRange: rangeFilter,
        category: categoryFilter?.length > 0 ? categoryFilter[0] : '',
        comission: commissionState,
        type: typeState,
        purchaseFirst: purchaseFirstYes ? true : purchaseFirstNo ? false : '',
        page: page,
        limit: 10,
      })
      if (res) {
        dispatch({
          type: GET_LIVE_POSTS,
          payload: {
            data: res?.data?.data?.livePosts,
            // spread: page > 1 ? true : false,
            total: res?.data?.data?.total,
          },
        })
        // setPosts(res?.data?.data?.livePosts)
      }
    } catch (err) {
      console.log(err)
      notification.error({
        message: err?.response?.data?.message || 'Server Error',
        duration: 3,
      })
    }
  }
}

export const postReact = (payload) => {
  return async (dispatch) => {
    try {
      // console.log(payload)
      attachToken()
      const res = await privateAPI.post('/post/react-post', {
        post: payload.post,
        react: payload.react,
      })
      if (res) {
        if (payload?.tab == 'fav') {
          // console.log(payload.tab)
          dispatch(getAllPosts())
        } else {
          dispatch(getPosts({}, false))
        }
      }
    } catch (err) {
      console.log(err)
      notification.error({
        message: err?.response?.data?.message || 'Server Error',
        duration: 3,
      })
    }
  }
}

export const getAllPosts = () => {
  return async (dispatch) => {
    try {
      attachToken()
      const res = await privateAPI.get('/post/user/fetch')
      if (res) {
        dispatch({ type: GET_ALL_POSTS, payload: res.data.data })
        // setAllPosts(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const reportPost = (payload, setIsModalOpen) => {
  return async (dispatch) => {
    try {
      attachToken()
      const res = await privateAPI.post('/post/report', payload)
      if (res?.data) {
        setIsModalOpen(false)
        dispatch(
          getPosts(
            {
              page: 1,
            },
            false,
          ),
        )
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const rePostFn = (payload) => {
  return async (dispatch) => {
    try {
      attachToken()
      const res = await privateAPI.post('/post/repost', payload)
      if (res) {
        notification.success({
          message: res?.data?.data,
          duration: 2,
        })
        dispatch(getAllPosts())
        // navigate('/home')
        console.log(res)
      }
    } catch (err) {
      notification.error({
        message: err?.response?.data?.message || 'Server Error',
        duration: 3,
      })
      console.log(err)
    }
  }
}

export const addComment = (payload, setInputState) => {
  return async (dispatch) => {
    try {
      const res = await privateAPI.post('/post/add-comment', payload)
      if (res) {
        setInputState(null)
        dispatch(fetchSinglePost(payload.post, false))
      }
    } catch (err) {
      notification.error({
        message: err?.response?.data?.message || 'Server Error',
        duration: 3,
      })
    }
  }
}

export const deleteComment = (payload) => {
  return async (dispatch) => {
    try {
      const res = await privateAPI.post('/post/delete-comment', { commentId: payload.comment })
      if (res) {
        dispatch(fetchSinglePost(payload.post, false))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchSinglePost = (payload, loader = true) => {
  return async (dispatch) => {
    try {
      if (loader) {
        dispatch({ type: GET_POST_REQUEST })
      }
      const res = await privateAPI.get(`/post/fetch/${payload}`)
      if (res) {
        dispatch({ type: GET_POST, payload: res.data.data.post })
      }
    } catch (err) {
      notification.error({
        message: err?.response?.data?.message || 'Server Error',
        duration: 3,
      })
    }
  }
}
