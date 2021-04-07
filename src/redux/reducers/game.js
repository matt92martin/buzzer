import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createGame = createAsyncThunk('game/create_game', async ({ moderator, moderatorPassword }, thunkAPI) => {
    if (!moderator || !moderatorPassword) {
        return thunkAPI.rejectWithValue('Values entered are incorrect')
    }
    const { data } = await axios.post('/api/game/create', {
        moderator,
        moderatorPassword,
    })
    return data
})

export const modJoinGame = createAsyncThunk(
    'game/mod_join_game',
    async ({ moderator, moderatorPassword, gamePassword }, thunkAPI) => {
        if (!moderator || !moderatorPassword || !gamePassword) {
            return thunkAPI.rejectWithValue('Values entered are incorrect')
        }
        const { data } = await axios.post('/api/game/login', {
            moderator,
            moderatorPassword,
            gamePassword,
        })
        return data
    }
)

export const changeName = createAsyncThunk('game/change_name', async ({ username, color, gameId }, thunkAPI) => {
    if (!username || !color || !gameId) {
        return thunkAPI.rejectWithValue('Values entered are incorrect')
    }
    const { data } = await axios.post('/api/user/name', { username, color, gameId })
    return data
})

export const joinGame = createAsyncThunk('game/join_game', async ({ gamePassword }, thunkAPI) => {
    if (!gamePassword) {
        return thunkAPI.rejectWithValue('Game password incorrect')
    }
    const { data } = await axios.post(`/api/game`, { gamePassword })
    return data
})

export const logout = createAsyncThunk('game/logout', async (_, thunkAPI) => {
    const { data } = await axios.post('/api/game/leave')
    return data
})

const initialState = {
    username: null,
    gameId: null,
    gamePassword: null,
    color: null,
    userId: null,
    users: [],
}
const gameReducer = (preLoadedState) => {
    const setInitialState = {
        ...initialState,
        ...preLoadedState,
    }
    return createReducer(setInitialState, (builder) => {
        builder
            .addCase(createGame.fulfilled, (state, action) => {
                const { gamePassword, moderator, gameId, userId, color } = action.payload

                state.username = moderator
                state.color = color
                state.gamePassword = gamePassword
                state.gameId = gameId
                state.userId = userId
            })
            .addCase(modJoinGame.fulfilled, (state, action) => {
                const { gamePassword, moderator, gameId, userId, color } = action.payload

                state.username = moderator
                state.color = color
                state.gamePassword = gamePassword
                state.gameId = gameId
                state.userId = userId
            })
            .addCase(changeName.fulfilled, (state, action) => {
                const { username, color, id } = action.payload

                state.username = username
                state.color = color
                state.userId = id
            })
            .addCase(joinGame.fulfilled, (state, action) => {
                state.gameId = action.payload.id
                state.gamePassword = action.meta.arg.id
            })
            .addCase(logout.fulfilled, (state, action) => {
                return initialState
            })
            .addCase('io/set_users', (state, action) => {
                console.log(action)
                state.users = action.payload.users.map((user) => {
                    console.log(user)
                    if (user) {
                        return {
                            gameId: user.user.gameId,
                            username: user.user.username,
                            color: user.user.color,
                        }
                    }
                    return undefined
                })
            })
    })
}

export { gameReducer }
