import React from 'react'

const SocketContext = React.createContext({})

const SocketProvider = ({ socket, ...props }) => {
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
        game,
        users,
        user,
        connected,
        winner,
        resetBuzzer,
        logout,
    }

    React.useEffect(() => {
        // if (connected) {
        if (true) {
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

            socket.onAny((event, ...args) => {
                console.log(event, args)
            })
        }
        // if (!connected) {
        //     socket.connect()
        //     setConnected(true)
        // }
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
