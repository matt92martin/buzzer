import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { modJoinGame } from '../redux/reducers/game'

const ModJoinGame = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [gamePassword, setGamePassword] = React.useState('')
    const [moderator, setModerator] = React.useState('')
    const [moderatorPassword, setModeratorPassword] = React.useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(
            modJoinGame({
                moderator,
                moderatorPassword,
                gamePassword,
            })
        ).then((res) => {
            if (res.error) {
                return
            }

            history.push(`/game/${res.payload.gameId}`)
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Login to Game</h2>
                <div>
                    <input
                        type="text"
                        name="game_password"
                        placeholder="Game hash..."
                        onChange={(e) => setGamePassword(e.target.value)}
                        value={gamePassword}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="moderator"
                        placeholder="Moderator name..."
                        onChange={(e) => setModerator(e.target.value)}
                        value={moderator}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="moderatorPassword"
                        placeholder="Password..."
                        onChange={(e) => setModeratorPassword(e.target.value)}
                        value={moderatorPassword}
                    />
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export { ModJoinGame }
