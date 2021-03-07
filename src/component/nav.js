import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSocket } from '../context/ws'
import axios from 'axios'

const Nav = () => {
    const { logout } = useSocket()
    const history = useHistory()
    const clickLogout = async () => {
        logout()
        await axios.post('/api/game/leave').then(() => {
            history.push('/')
        })
    }

    return (
        <div>
            <div>
                <Link to="/">Create Game</Link>
            </div>
            <div>
                <Link to="/game/join">Join Game</Link>
            </div>
            <div>
                <a href="#" onClick={clickLogout}>
                    Leave game
                </a>
            </div>
        </div>
    )
}

export { Nav }
