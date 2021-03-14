import { useUser } from '../context/user'
import { useHistory } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

const ModJoinGame = () => {
    const userContext = useUser()
    const history = useHistory()
    const [gamePassword, setGamePassword] = React.useState('')
    const [moderator, setModerator] = React.useState('')
    const [moderatorPassword, setModeratorPassword] = React.useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        axios
            .post('/api/game/login', {
                moderator,
                moderatorPassword,
                gamePassword,
            })
            .then((res) => {
                userContext.setUsername({
                    username: res.data.game.moderator,
                    moderator: true,
                })
                history.push(`/game/${res.data.game.id}`)
            })
            .catch((err) => {
                console.log(err)
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
