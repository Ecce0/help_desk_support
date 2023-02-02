import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {
 try {
    return await authService.register(user)
 } catch (error) {
    const message = (error.response && error.response.data & error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
 }
})

export const loginUser = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
 } catch (error) {
    const message = (error.response && error.response.data & error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
 }
 })

export const logoutUser = createAsyncThunk('auth/logout', async () =>{
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder.
         addCase(registerUser.pending, (state) => {
          state.isLoading = true
         })
         .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
         })
         .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false
          state.user = null
          state.isError = true
          state.message = action.payload
         })
         .addCase(loginUser.pending, (state) => {
          state.isLoading = true
         })
         .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
         })
         .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false
          state.user = null
          state.isError = true
          state.message = action.payload
         })
         .addCase(logoutUser.pending, (state) => {
          state.user = null
         })
         .addCase(logoutUser.fulfilled, (state) => {
          state.user = null
         })
  }
})

export const { reset } = authSlice.actions

export default authSlice.reducer