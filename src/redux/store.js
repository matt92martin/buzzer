import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import createSocketIoMiddleware from 'redux-socket.io'

function reducer(state = {}, action) {
    switch (action.type) {
        case 'message':
            return Object.assign({}, { message: action.data })
        default:
            return state
    }
}

export default (socket) => {
    let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

    return configureStore({
        reducer: {
            user: userReducer,
            socket: reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketIoMiddleware),
    })
}
