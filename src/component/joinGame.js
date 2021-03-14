import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSocket } from '../context/ws'

const JoinGame = () => {
    const socket = useSocket()
    const history = useHistory()
    const { id } = useParams()
    const [gameId, setGameId] = React.useState(id || '')
    const gameIdRef = React.useRef(null)
    const onSubmit = (e) => {
        e.preventDefault()
        axios
            .post(`/api/game`, { gamePassword: gameId })
            .then((res) => {
                if (res.data.id) {
                    socket.io.emit('changeInfo', {
                        gameRoom: gameId,
                    })
                    history.push(`/game/${res.data.id}`)
                }
            })
            .catch(() => {
                alert('Something went wrong. Please try again')
            })
    }
    return (
        <form onSubmit={onSubmit}>
            <h2>Join with code</h2>
            <div>
                <input
                    type="text"
                    name="gamePassword"
                    placeholder="Game code..."
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                    ref={gameIdRef}
                    onFocus={(e) => gameIdRef.current.select()}
                />
            </div>
            <div>
                <button type="submit">Play!</button>
            </div>
        </form>
    )
}

export { JoinGame }
