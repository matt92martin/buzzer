import React from 'react'
import { useSocket } from './context/ws'
import { useUser } from './context/user'
import { ChangeName } from './pages/changeName'
import { Game } from './pages/game'

export const App = () => {
    const socket = useSocket()
    const user = useUser()

    const isLoggedIn = user.userObj?.username

    React.useEffect(() => {
        if (isLoggedIn) {
            socket.io.connect()
        }
    }, [user])

    if (!isLoggedIn) {
        socket.io.auth = user.userObj
        return <ChangeName />
    } else {
        socket.io.auth = user.userObj
        return <Game />
    }
}
