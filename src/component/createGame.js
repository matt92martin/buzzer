import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CreateGame = () => {
    const [game, setGame] = React.useState({})
    const [moderator, setModerator] = React.useState('')
    const [moderatorPassword, setModeratorPassword] = React.useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        axios
            .post('/api/game/create', {
                moderator,
                moderatorPassword,
            })
            .then((res) => {
                setGame(res.data.game)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (game && Object.keys(game).length > 0) {
        return (
            <div>
                <div>Moderator: {game.moderator}</div>
                <div>Moderator password: {game.moderatorPassword}</div>
                <div>
                    Link: <Link to={`/game/join/${game.gamePassword}`}>{`/game/join/${game.gamePassword}`}</Link>
                </div>
            </div>
        )
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Create New Game</h2>
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

            <div>
                <Link to="/game/join">or join with code</Link>
            </div>
        </div>
    )
}

export { CreateGame }
