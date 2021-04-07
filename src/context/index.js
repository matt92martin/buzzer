import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { io } from 'socket.io-client'
import { Provider as ReduxProvider } from 'react-redux'
import createStore from '../redux/store'

const socket = io()
const store = createStore(socket)

// socket.onAny((...args) => {
//     console.log(args)
// })

store.subscribe(() => {
    console.log('new client state', store.getState())
})

export const IndexProvider = ({ children }) => {
    return (
        <BrowserRouter>
            <ReduxProvider store={store}>{children}</ReduxProvider>
        </BrowserRouter>
    )
}
