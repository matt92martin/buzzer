import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from './reducers/game'
import createSocketIoMiddleware from 'redux-socket.io'

function reducer(state = {}, action) {
    switch (action.type) {
        case 'io/message':
            console.log(action.data)
            return Object.assign({}, { message: action.data })
        default:
            return state
    }
}

export default (socket) => {
    let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

    return configureStore({
        reducer: {
            game: gameReducer,
            socket: reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketIoMiddleware),
    })
}
