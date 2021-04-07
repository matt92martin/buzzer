import { createReducer, createAction } from '@reduxjs/toolkit'

export const updateQuerySettings = createAction()

const questionReducer = createReducer(
    {
        questions: [],
        querySettings: [],
    },
    (builder) => {
        builder.addCase(updateQuerySettings, (state, action) => {
            state.querySettings = action.payload
        })
    }
)

export { questionReducer }
