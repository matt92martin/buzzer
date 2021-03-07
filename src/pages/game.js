import React from 'react'
import { useSocket } from '../context/ws'
import { useUser } from '../context/user'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const GameWindow = ({ children }) => {
    const { id } = useParams()
    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    React.useEffect(() => {
        axios
            .get(`/api/game/${id}`)
            .then((res) => {
                setIsLoggedIn(res.data.success)
            })
            .catch(() => {
                history.push('/game/join')
            })
    }, [id])
    if (!isLoggedIn) return <div>Loading...</div>

    return <div>{children}</div>
    // console.log(params)
    // const socket = useSocket()
    // const user = useUser()
    //
    // const logout = () => {
    //     user.logout()
    //     socket.io.disconnect()
    // }
    //
    // const red = socket.users.filter((user) => user.color === 'red')
    // const blue = socket.users.filter((user) => user.color === 'blue')

    // return (
    //     <div>
    //         <div>Blue</div>
    //         <ul>
    //             {blue.map((user) => (
    //                 <li key={user.userId}>
    //                     {user.username}
    //                     {user.winner && ' - Winner'}
    //                 </li>
    //             ))}
    //         </ul>
    //         <div>Red</div>
    //         <ul>
    //             {red.map((user) => (
    //                 <li key={user.userId}>
    //                     {user.username}
    //                     {user.winner && ' - Winner'}
    //                 </li>
    //             ))}
    //         </ul>
    //         <button onClick={() => socket.io.emit('buzzer')}>Buzzer</button>
    //         {user.userObj.color === 'admin' && <button onClick={() => socket.resetBuzzer()}>Reset</button>}
    //         <button onClick={logout}>Change Name</button>
    //     </div>
    // )
}

const Game = () => {
    const socket = useSocket()

    React.useEffect(() => {
        socket.io.connect()
    }, [])
    return (
        <GameWindow>
            <div>Game</div>
        </GameWindow>
    )
}

export { Game }
