{
    /*Todo: User */
}
// import { useUser } from '../context/user'
import { useHistory } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

const CreateGame = () => {
    {
        /*Todo: User */
    }
    // const userContext = useUser()
    const history = useHistory()
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
                {
                    /*Todo: User */
                }
                // userContext.setUsername({
                //     username: res.data.game.moderator,
                //     moderator: true,
                // })
                history.push(`/game/${res.data.game.id}`)
            })
            .catch((err) => {
                console.log(err)
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
