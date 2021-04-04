import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const setUser = createAction('io/set_user')

export const createGame = createAsyncThunk('game/create_game', async ({ moderator, moderatorPassword }, thunkAPI) => {
    const { data } = await axios.post('/api/game/create', {
        moderator,
        moderatorPassword,
    })
    return data
})

export const changeName = createAsyncThunk('game/change_name', async ({ username, color }, thunkAPI) => {
    const { data } = await axios.post('/api/user/name', { username, color })
    return data
})

export const joinGame = createAsyncThunk('game/join_game', async ({ id }, thunkAPI) => {
    const { data } = await axios.post(`/api/game`, { gamePassword: id })
    return data
})

const gameReducer = createReducer(
    {
        username: null,
        moderator: null,
        room: null,
        gamePassword: null,
        color: null,
        userUUID: null,
    },
    (builder) => {
        builder
            .addCase(createGame.fulfilled, (state, action) => {
                const { gamePassword, moderator, id } = action.payload

                state.moderator = moderator
                state.gamePassword = gamePassword
                state.room = id
            })
            .addCase(changeName.fulfilled, (state, action) => {
                const { username, color, uuid } = action.payload

                state.username = username
                state.color = color
                state.userUUID = uuid
            })
            .addCase(joinGame.fulfilled, (state, action) => {
                state.room = action.payload.id
                state.gamePassword = action.meta.arg.id
            })
    }
)

export { gameReducer }

// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         username: null,
//         room: null,
//     },
//     reducers: {},
// })
//
// export default userSlice.reducer
