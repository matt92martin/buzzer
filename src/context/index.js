import React from 'react'
import { SocketProvider } from './ws'
import { UserProvider } from './user'
import { BrowserRouter } from 'react-router-dom'

export const IndexProvider = ({ children }) => {
    return (
        <BrowserRouter>
            <UserProvider>
                <SocketProvider>{children}</SocketProvider>
            </UserProvider>
        </BrowserRouter>
    )
}
