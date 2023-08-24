import { createSlice } from '@reduxjs/toolkit'

export interface User {
  id?: number
  username: string
  email: string
  token?: string
  profile: Profile
}

export interface Profile {
  id?: number
  userId?: number
  weight: number
  height: number
  age: number
  gender: string
}

const userSlice = createSlice({
  name: 'user',
  initialState: { user: {} as User },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUserProfile: (state, action) => {
      state.user.profile = action.payload
    },
  },
})
export const { setUser, setUserProfile } = userSlice.actions
export default userSlice.reducer
