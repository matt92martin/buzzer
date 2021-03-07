import React from 'react'
import { useSocket } from './context/ws'
import { useUser } from './context/user'
import { ChangeName } from './pages/changeName'
import { Game } from './pages/game'
import { CreateGame } from './component/createGame'
import { Home } from './pages/home'

export const App = () => {
    // const socket = useSocket()
    // const user = useUser()

    // const isLoggedIn = user.userObj?.username

    // React.useEffect(() => {
    //     if (isLoggedIn) {
    //         socket.io.connect()
    //     }
    // }, [user])
    // const isLoggedIn = false
    //
    // if (!isLoggedIn) {
    //     // socket.io.auth = user.userObj
    //     return <CreateGame />
    // } else {
    // socket.io.auth = user.userObj
    return <Home />
    // }
}
