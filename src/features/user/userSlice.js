import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    uid: null,
    likedPosts: [],
    reposts: [],
    name: null,
    username: null,
    photoURL: null,
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload
    },
    likePost: (state, action) => {
      state.user.likedPosts.push(action.payload)
    },
    dislikePost: (state, action) => {
      state.user.likedPosts.splice(state.user.likedPosts.indexOf(action.payload), 1)
    },
    repost: (state, action) => {
      state.user.reposts.push(action.payload)
    },
    rmReposts: (state, action) => {
      state.user.reposts.splice(state.user.reposts.indexOf(action.payload), 1)
    }
  },
})


export const { getUser, likePost, dislikePost, repost, rmReposts } = userSlice.actions

export default userSlice.reducer