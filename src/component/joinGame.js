import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
// import axios from 'axios'
import { useSocket } from '../context/ws'
import { useDispatch } from 'react-redux'
import { joinGame } from '../redux/reducers/game'

const JoinGame = () => {
    const dispatch = useDispatch()
    const socket = useSocket()
    const history = useHistory()
    const { id } = useParams()
    const [gameId, setGameId] = React.useState(id || '')
    const gameIdRef = React.useRef(null)
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(joinGame({ id: gameId })).then((res) => {
            dispatch({ type: 'server/change_room', payload: { gameRoom: res.payload.id } })
            history.push(`/game/${res.payload.id}`)
        })
        // axios
        //     .post(`/api/game`, { gamePassword: gameId })
        //     .then((res) => {
        //         if (res.data.id) {
        //             socket.io.emit('changeInfo', {
        //                 gameRoom: gameId,
        //             })
        //             history.push(`/game/${res.data.id}`)
        //         }
        //     })
        //     .catch(() => {
        //         alert('Something went wrong. Please try again')
        //     })
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
