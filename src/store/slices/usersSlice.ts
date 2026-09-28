import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface User {
  id: number
  name: string
  email: string
  company: {
    name: string
  }
}

interface UsersState {
  users: User[]
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  error: string | null
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
}

// 1. Асинхронна дія (Thunk)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    const data = await response.json()
    return data as User[]
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  // 2. Обробка станів pending, fulfilled, та rejected
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export default usersSlice.reducer
