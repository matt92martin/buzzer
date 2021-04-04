import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const setUser = createAction('io/set_user')

export const createGame = createAsyncThunk('user/create_game', async ({ moderator, moderatorPassword }, thunkAPI) => {
    const { data } = await axios.post('/api/game/create', {
        moderator,
        moderatorPassword,
    })
    return data
})

export const changeName = createAsyncThunk('user/change_name', async ({ username, color }, thunkAPI) => {
    const { data } = await axios.post('/api/user/name', { username, color })
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
