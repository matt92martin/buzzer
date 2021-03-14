import React from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../context/user'
import { useSocket } from '../context/ws'

const Player = () => {
    const params = useParams()
    const socket = useSocket()
    const [username, setUsername] = React.useState('')
    const user = useUser()

    const setUserName = (e, color) => {
        e.preventDefault()
        user.createUserName({ username, color }).then((res) => {
            if (res) {
                socket.io.emit('changeInfo', {
                    gameRoom: params.id,
                    username,
                    color,
                })
            }
        })
    }

    return (
        ((!socket.user?.username && socket.user !== null) || !socket.connected) && (
            <div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button type="button" onClick={(e) => setUserName(e, 'blue')}>
                    Join Blue
                </button>
                <button type="button" onClick={(e) => setUserName(e, 'red')}>
                    Join Red
                </button>
            </div>
        )
    )
}

const ChangeName = () => {
    return (
        <>
            <Player />
        </>
    )
}

export { ChangeName }
