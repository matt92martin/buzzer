import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from './reducers/game'
import { questionReducer } from './reducers/questions'
import createSocketIoMiddleware from 'redux-socket.io'

const initialState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

function reducer(state = {}, action) {
    switch (action.type) {
        case 'io/message':
            console.log(action.data)
            return Object.assign({}, { message: action.data })
        default:
            return state
    }
}

export default (socket, preloadedState) => {
    let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

    return configureStore({
        reducer: {
            game: gameReducer(initialState.game),
            question: questionReducer,
            socket: reducer,
        },
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketIoMiddleware),
    })
}
