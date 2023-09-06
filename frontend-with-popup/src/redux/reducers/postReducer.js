import {
  GET_LIVE_POSTS_REQUEST,
  GET_LIVE_POSTS,
  GET_POST,
  GET_POST_REQUEST,
  GET_ALL_POSTS,
} from '../types/generalTypes'

const initialState = {
  allPosts: {},
  livePosts: [],
  loading: false,
  singlePost: {},
  getPostLoading: false,
  totalLivePosts: 0,
}

const postReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_LIVE_POSTS_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_LIVE_POSTS: {
      return {
        ...state,
        // livePosts: payload.spread ? [...state.livePosts, ...payload.data] : payload.data,
        livePosts: payload.data,
        totalLivePosts: payload.total,
        loading: false,
      }
    }
    case GET_POST_REQUEST: {
      return {
        ...state,
        getPostLoading: true,
      }
    }
    case GET_POST: {
      return {
        ...state,
        singlePost: payload,
        getPostLoading: false,
      }
    }
    case GET_ALL_POSTS: {
      return {
        ...state,
        allPosts: payload,
      }
    }
    default:
      return state
  }
}

export default postReducer
