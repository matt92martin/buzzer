import React from 'react'
import { useUser } from '../context/user'

export const ChangeName = () => {
    const [username, setUsername] = React.useState('')
    const user = useUser()

    const setUserName = (e, color) => {
        e.preventDefault()
        user.createUserName({ username, color })
    }

    return (
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
}
