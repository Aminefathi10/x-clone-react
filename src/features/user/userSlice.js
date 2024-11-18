import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

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
    }
  },
})


export const { getUser, likePost, dislikePost } = userSlice.actions

export default userSlice.reducer