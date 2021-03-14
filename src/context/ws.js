import React from 'react'
import { io } from 'socket.io-client'

const SocketContext = React.createContext({})

const socket = io({ autoConnect: false })

// socket.onAny((event, ...args) => {
//     console.log(event, args)
// })

const SocketProvider = (props) => {
    const [user, setUser] = React.useState(null)
    const [users, setUsers] = React.useState([])
    const [game, setGame] = React.useState({})
    const [connected, setConnected] = React.useState(false)
    const [winner, setWinner] = React.useState(null)

    const resetBuzzer = () => {
        setWinner(null)
        socket.emit('reset_buzzer')
    }

    const logout = () => {
        setConnected(false)
        setUser(null)
        socket.emit('logout')
    }

    const value = {
        io: socket,
        setGame,
        users,
        user,
        connected,
        winner,
        resetBuzzer,
        logout,
    }

    React.useEffect(() => {
        if (connected) {
            socket.on('connect_error', (err) => {
                if (err.message === 'invalid username') {
                    console.log(err)
                }
            })
            socket.on('users', (users) => {
                console.log(users)
                setUsers(users)
            })

            socket.on('winner', (w) => {
                setWinner(w)
            })
            socket.on('me', (info) => {
                setUser(info)
            })
        }
        if (!connected) {
            socket.connect()
            setConnected(true)
        }
    }, [connected])

    React.useEffect(() => {
        const newUsers = users.map((user) => {
            return {
                ...user,
                winner: winner === user.userId,
            }
        })
        console.log(newUsers)
        setUsers(newUsers)
    }, [winner])

    return <SocketContext.Provider value={value} {...props} />
}

const useSocket = () => {
    return React.useContext(SocketContext)
}

export { SocketProvider, useSocket }
