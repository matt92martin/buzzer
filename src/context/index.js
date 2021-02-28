import React from 'react'
import { SocketProvider } from './ws'
import { UserProvider } from './user'

export const IndexProvider = ({ children }) => {
    return (
        <UserProvider>
            <SocketProvider>{children}</SocketProvider>
        </UserProvider>
    )
}
