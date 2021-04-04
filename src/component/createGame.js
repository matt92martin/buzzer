import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { createGame } from '../redux/reducers/game'

const CreateGame = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [moderator, setModerator] = React.useState('')
    const [moderatorPassword, setModeratorPassword] = React.useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(
            createGame({
                moderator,
                moderatorPassword,
            })
        ).then((res) => {
            history.push(`/game/${res.payload.id}`)
        })
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
        </div>
    )
}

export { CreateGame }
