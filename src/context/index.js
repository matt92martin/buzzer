import React from 'react'
import { SocketProvider } from './ws'
import { UserProvider } from './user'
import { BrowserRouter } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io({ autoConnect: false })

export const IndexProvider = ({ children }) => {
    return (
        <BrowserRouter>
            <UserProvider>
                <SocketProvider socket={socket}>{children}</SocketProvider>
            </UserProvider>
        </BrowserRouter>
    )
}
