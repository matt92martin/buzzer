import React from 'react'
// import { SocketProvider } from './ws'
// import { UserProvider } from './user'
import { BrowserRouter } from 'react-router-dom'
import { io } from 'socket.io-client'
import { Provider as ReduxProvider } from 'react-redux'
import createStore from '../redux/store'

const store = createStore(io())

store.subscribe(() => {
    console.log('new client state', store.getState())
})

store.dispatch({ type: 'server/hello', data: 'Hello!' })

export const IndexProvider = ({ children }) => {
    return (
        <BrowserRouter>
            <ReduxProvider store={store}>
                {/*<UserProvider>*/}
                {children}
                {/*</UserProvider>*/}
            </ReduxProvider>
        </BrowserRouter>
    )
}
