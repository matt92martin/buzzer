import React from 'react'
import { useSocket } from '../context/ws'
import { useUser } from '../context/user'

export const Game = () => {
    const socket = useSocket()
    const user = useUser()

    const logout = () => {
        user.logout()
        socket.io.disconnect()
    }

    const red = socket.users.filter((user) => user.color === 'red')
    const blue = socket.users.filter((user) => user.color === 'blue')

    return (
        <div>
            <div>Blue</div>
            <ul>
                {blue.map((user) => (
                    <li key={user.userId}>
                        {user.username}
                        {user.winner && ' - Winner'}
                    </li>
                ))}
            </ul>
            <div>Red</div>
            <ul>
                {red.map((user) => (
                    <li key={user.userId}>
                        {user.username}
                        {user.winner && ' - Winner'}
                    </li>
                ))}
            </ul>
            <button onClick={() => socket.io.emit('buzzer')}>Buzzer</button>
            {user.userObj.color === 'admin' && <button onClick={() => socket.resetBuzzer()}>Reset</button>}
            <button onClick={logout}>Change Name</button>
        </div>
    )
}
