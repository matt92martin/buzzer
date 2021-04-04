import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const setUser = createAction('io/set_user')

export const createGame = createAsyncThunk('user/create_game', async ({ moderator, moderatorPassword }, thunkAPI) => {
    const res = await axios.post('/api/game/create', {
        moderator,
        moderatorPassword,
    })
    return res.data
})

const gameReducer = createReducer(
    {
        username: null,
        moderator: null,
        room: null,
        gamePassword: null,
    },
    (builder) => {
        builder.addCase(createGame.fulfilled, (state, action) => {
            const { gamePassword, moderator, id } = action.payload

            state.moderator = moderator
            state.gamePassword = gamePassword
            state.room = id
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
