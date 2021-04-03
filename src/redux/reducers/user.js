import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        room: null,
    },
    reducers: {},
})

export default userSlice.reducer
