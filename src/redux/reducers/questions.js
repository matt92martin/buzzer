import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { categories } from '../../component/game/questions/constants'

const defaultQuerySettings = [-1, 'easy', 5]

export const updatePlayerQuerySetting = createAction('io/question/update_player_query_setting')

export const updateQuerySetting = createAsyncThunk(
    'question/update_query_setting',
    async ({ index, values, gameId }, thunkAPI) => {
        const allValues = thunkAPI.getState().question.querySettings
        console.log({ allValues })
        thunkAPI.dispatch({ type: 'server/question/update_query_setting', payload: { values: allValues, gameId } })
        return { index, values }
    }
)
export const addQuerySetting = createAction('question/add_query_setting')

export const generateQuestions = createAsyncThunk('question/generate_questions', async ({ qSettings }, thunkAPI) => {})

export const getQuestions = createAsyncThunk('question/get_questions', async ({ gameId }, thunkAPI) => {})

const questionReducer = createReducer(
    {
        questions: [],
        waitingForQuestions: false,
        querySettings: [defaultQuerySettings],
        playerQuerySettings: [],
    },
    (builder) => {
        builder
            .addCase(updateQuerySetting.fulfilled, (state, action) => {
                const { index, values } = action.payload
                console.log({ index, values })
                state.querySettings[action.payload.index] = action.payload.values
            })
            .addCase(addQuerySetting, (state, action) => {
                state.querySettings.push(defaultQuerySettings)
            })
            .addCase(generateQuestions.fulfilled, (state, action) => {
                state.querySettings = []
            })
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.waitingForQuestions = false
            })
            .addCase(getQuestions.pending, (state, action) => {
                state.waitingForQuestions = true
            })
            .addCase(getQuestions.rejected, (state, action) => {
                state.waitingForQuestions = false
            })
            .addCase(updatePlayerQuerySetting, (state, action) => {
                state.playerQuerySettings = action.payload.values
            })
    }
)

export { questionReducer }
