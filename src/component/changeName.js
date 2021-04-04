import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeName } from '../redux/reducers/game'
import { useSocket } from '../context/ws'

const Player = () => {
    const params = useParams()
    const socket = useSocket()
    const [username, setUsername] = React.useState('')
    const dispatch = useDispatch()

    const setUserName = (e, color) => {
        e.preventDefault()
        dispatch(changeName({ username, color })).then((res) => {
            dispatch({
                type: 'server/change_info',
                payload: {
                    gameRoom: params.id,
                    username,
                    color,
                },
            })
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
