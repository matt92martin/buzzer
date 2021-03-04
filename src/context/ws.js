import React from 'react'
import { io } from 'socket.io-client'

const SocketContext = React.createContext({})

const socket = io({ autoConnect: false })

socket.onAny((event, ...args) => {
    console.log(event, args)
})

const SocketProvider = (props) => {
    const [users, setUsers] = React.useState([])
    const [winner, setWinner] = React.useState(null)

    const resetBuzzer = () => {
        setWinner(null)
        socket.emit('reset_buzzer')
    }

    const value = {
        io: socket,
        users,
        winner,
        resetBuzzer,
    }

    React.useEffect(() => {
        socket.on('connect_error', (err) => {
            if (err.message === 'invalid username') {
                console.log(err)
            }
        })
        socket.on('users', (users) => {
            setUsers(users)
        })

        socket.on('winner', (w) => {
            setWinner(w)
        })
    }, [])

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

const useWS = () => {
    return React.useContext(SocketContext)
}

const useSocket = () => {
    return useWS()
}

export { SocketProvider, useWS, useSocket }
