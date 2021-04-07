import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { joinGame } from '../redux/reducers/game'

const JoinGame = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const [gameId, setGameId] = React.useState(id || '')
    const gameIdRef = React.useRef(null)
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(joinGame({ gamePassword: gameId })).then((res) => {
            if (res.error) {
                return
            }
            history.push(`/game/${res.payload.id}`)
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
